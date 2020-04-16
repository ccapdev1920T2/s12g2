# Bids++

Bids++ is a (developing) web application that aims to simulate the concept of online bidding, specifically that of Bids to Pick.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. _See deployment for notes on how to deploy the project on a live system._

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

To log in as a client, use the following credentials:

Email | Password
----- | --------
nemo@puppers.com | henloworld

To log in as the admin, use the following credentials:

Email | Password
----- | --------
bidspp@gmail.com | p@ssword

## Features

### Client Features

New users may register a new account using a valid DLSU ID number and any email address.

Once logged in, clients may be able to:

* Edit profile
* Create, edit, and delete posts
* Bid and/or steal
* Leave a review on other clients
* Report account

### Admin Features

An admin is able to:

* Delete new posts
* Suspend reported users


## Built With

* [Express](https://www.mongodb.com) - The web framework used
* [MongoDB](https://maven.apache.org/) - Database management

## Authors

* **Robi Banogon**
* **Christine Deticio**
* **Sharmaine Gaw**

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
