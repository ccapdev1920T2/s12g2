# Bids++

Bids++ is a (developing) web application that aims to simulate the concept of online bidding, specifically that of Bids to Pick.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the web application, here are a few things needed to be installed in your system:

* __[MongoDB](https://www.mongodb.com/download-center/community)__ - to add data into the database
* __[Node.js](https://nodejs.org/en/download/)__ - to run the web app

### Installing

You may opt to download the repository or create a clone by running the following code on the command line:

```
git clone https://github.com/ccapdev1920T2/s12g2.git
```

Open the command prompt to the folder where the project is.

Step 1. Run the following code to install the Node.js modules needed:

```
npm install
```

Step 2. Populate the database:

```
node add_data.js
```

Step 3. Run the application itself:

```
node index.js
```

Once done, open the web application at [localhost:3000](http://localhost:3000/).

## Log In
There are two types of users of the web app: client and admin.

To log in as a client, you may opt to create a new account yourself or use the following dummy account:

Email | Password
----- | --------
nemo@puppers.com | henloworld

To log in as the admin, use the following credentials:

Email | Password
----- | --------
bidspp@gmail.com | p@ssword

## Features

### Client Features

Users may register a new account using a valid DLSU ID number and any email address.

Once logged in, clients may be able to:

__Edit profile__
  1. Go to "My Profile" located on the top right of the page.
  2. Click edit profile.

__Create, edit, and delete posts__
  1. Go to "My Profile" located on the top right of the page.
  2. Click the "+" button to create a new post.
  3. Click "EDIT" on a post to edit that post.
  4. Click "X" on a post to delete the post.

__Bid and/or steal__
  1. Click on the title of a post to view its details.
  2. If the post has not yet been stolen by another user or is not yet past its cut-off, either of the following can be done:

  * Click "bid" to bid on the post
  * Click "steal" to steal the item/s and automatically become the buyer.

__Leave a review on other clients__
  1. Go to a user's profile by clicking on their username.
  2. Go to "User Reviews".
  3. Choose the number of stars, type in your review, and click submit.

__Report account__
  1. Go to a user's profile by clicking on their username.
  2. Click "Report User".
  3. Select the appropriate reason, type in your complaint and click submit.

### Admin Features

Once logged in, an admin is able to:

__Delete new posts__
  1. Click on the "x" button on a post to delete it and the check button to let it remain in public.

__Suspend reported users__
  1. Go to "Reported Users" located on the top right of the page.
  2. Click on the "x" button to suspend the user or the check button to disregard the report.

### Additional Notes
* Suspended clients are prohibited to access any client feature.
* Suspended clients' profiles cannot be accessed by other clients.
* Suspended clients' posts will not apper in other clients' homepage and cannot be viewed.


## Built With

* [Express](https://www.mongodb.com) - The web framework used
* [MongoDB](https://maven.apache.org/) - Database management

## Modules Used
* async
* bcrypt
* body-parser
* express
* express-handlebars
* express-hbs
* express-session
* handlebars
* hbs
* mongodb
* mongoose
* multer

## Authors

* **Robi Banogon**
* **Christine Deticio**
* **Sharmaine Gaw**

## Acknowledgments

* [Sir Arren Antioquia](https://github.com/arvention)
* DLSU Bids to Pick for inspiration
* [Antonio B.](https://dev.to/abourass/how-to-solve-the-own-property-issue-in-handlebars-with-mongoose-2l7c) for code snippet
* [w3schools](https://www.w3schools.com/howto/howto_css_star_rating.asp) for star rating icons
* [Freepik](https://www.flaticon.com/authors/freepik) for the social media icons
* [Kyle Fox](https://jquerymodal.com/) for the modal plugin
