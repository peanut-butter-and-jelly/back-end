# Web-Based Bucket-List
This app is meant to let a user create a bucket list, a list of things the user would like to do before they "Kick the bucket". You can create new items by clicking the plus sign, update them, and delete them with the corresponding buttons. It also allows the user to click a check box, marking the item as complete and crossing out the title.

## Important Links

- [Deployed Client](https://peanut-butter-and-jelly.github.io/front-end/)
- [API Repo](https://github.com/peanut-butter-and-jelly/back-end)
- [Client Repo](https://github.com/peanut-butter-and-jelly/front-end)
- [Deployed Heroku Link](https://agile-waters-57550.herokuapp.com)

## Planning Story
We began by taking the user stories provided and breaking them down into issues for the project board. Next, we drew out our wireframes and ERD. We decided that once the templates for the client and api were both set up, it would be good to split off into 2 groups for pair programming and tackle some of the fundamental things we would need for the app to work.

One team was originally tasked with creating a schema and model for our API while the other team tackled Authentication on the client. After this was completed, we swapped so that each team could have varied tasks. For the back end this was creating routes and for the front end this was creating the last functions for auth.

After we had our API set up, it was all client so we mob programmed using VScode Live Share. We tackled one problem at a time, prioritizing as a team.

We tackled allowing a user to create a bucket list item using a form, and once that was done we wanted to use handlebars to show all of the user's items when they login, so we created an AJAX call and displayed all items.

After each step completed, we found ourselves thinking of a few improvements that we wanted, and it took a lot of restraint to set them as issues tagged as enhancements and wait until MVP was met to tackle them.

After create was complete, we worked on update, and delete for the users bucket list items. This went fairly smoothly though using event listeners for elements that aren't there on page load was a bit tricky and took careful planning.

After this point we regrouped and did some more planning and decided that next our goal was to 1) fix any bugs, 2), refresh the list whenever an action on an item is completed, and 3), move all of our forms to modals. We again mob programmed for this.

Finally we were down to our final main task of allowing a user to check a box to strike out their bucket list item. This was done with a simple checkbox, event listener, and some css.

Around this time, we were very close to MVP and decided to split off into 4 individual smaller tasks. This worked well and allowed us to get more done while still having the team as a resource if anybody got stuck. 

For the final day, most of it was spent on a few last minute QOL features and styling. Two of us pair programmed styling the whole app for the entire day, and it was extremely challenging.



## Wireframes
![Updated Wireframe](https://user-images.githubusercontent.com/58189799/74890388-d50bd400-5351-11ea-9ffd-f4a91712ae11.jpg)
![Sign In](https://media.git.generalassemb.ly/user/24753/files/30de3c00-5230-11ea-8bf2-247533f6c86c)
![Logged In](https://media.git.generalassemb.ly/user/24753/files/33d92c80-5230-11ea-876d-996f01ec6621)

## ERD

![ERD](https://media.git.generalassemb.ly/user/24753/files/36d41d00-5230-11ea-93cb-93c4b912cb37)

### User Stories

- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to create a bucket list item with a title and description.
- As a signed in user, I would like to update my bucket list item's title and description.
- As a signed in user, I would like to delete my bucket list item.
- As a signed in user, I would like to see all my bucket list items but not other users'.
- As a signed in user, I would like to cross off items to complete them.

## STRETCH GOALS
- Create multiple views for the bucket list
  - All items
  - Completed items only
  - Uncompleted items only

### Technologies Used

- Express
- MongoDB
- Mongoose
- node.js
- Heroku

### Unsolved Problems
We would really like to have multiple views for the user as well as to sort the items by if they were completed or not so that the completed items go to the bottom of the page.