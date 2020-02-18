// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const List = require('../models/list')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// GET => index
router.get('/lists', requireToken, (req, res, next) => {
  List.find()
    .then(lists => {
      return lists.map(list => list.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(lists => res.status(200).json({ lists: lists }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// GET => show
router.get('/lists/:id', requireToken, (req, res, next) => {
  List.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(list => res.status(200).json({ list: list.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// POST => create
router.post('/lists', requireToken, (req, res, next) => {
  // set owner of new list to be current user
  req.body.list.owner = req.user.id

  List.create(req.body.list)
    // respond to succesful `create` with status 201 and JSON of new "list"
    .then(list => {
      res.status(201).json({ list: list.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// PATCH => update
router.patch('/lists/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.list.owner

  List.findById(req.params.id)
    .then(handle404)
    .then(list => {
      requireOwnership(req, list)
      // pass the result of Mongoose's `.update` to the next `.then`
      return list.updateOne(req.body.list)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DELETE => destroy
router.delete('/lists/:id', requireToken, (req, res, next) => {
  List.findById(req.params.id)
    .then(handle404)
    .then(list => {
      // throw an error if current user doesn't own `list`
      requireOwnership(req, list)
      // delete the list ONLY IF the above didn't throw
      list.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})
module.exports = router
