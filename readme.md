# Simple Mern auth demo Pt One

## Step one

First you will need to create a folder to store your project in.
Once you have this created navigate to the project in your terminal
and enter the following command `npm init -y`
This will create a package.json file with the default settings.

Next you will need to install the following npm packages

- express
- cors
- mongoose
- dotenv
- jsonwebtoken
- bcrypt
- helmet.js

## Step Two

Now we will establish our connection to our database by first creating a .env file to store our URI for connecting to MongoDB.
After you have created your file you will need to add in a variable
to hold our connection link. EX: MONGO_URI=mongodb://localhost:27017

Note that the above variable does not have quotes, and there should be no spaces between your

## Step Three

- Create a new file at the root of your project called server.js

In that file we will first need to require in express, mongoose, helmet and cors, along with requiring dotenv

``const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const helmet = require("helmet");

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(helmet())``

Next we are going to use app.listen to set our port for the server.

``const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`The server is now on port: ${PORT}`)); ``

From there we will need to connect to our database with mongoose

`mongoose.connect( process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }, (err) => { if (err) throw err; console.log("Connected to DB"); } );`

## Step 4

Now that we are connected to our database, it is time to define what that looks like by creating a user Model. To do this first we need to create a folder called models and we will make a new js file called usermodel.js. to create the user model first we will need to import mongoose. Next you will need to create a new Schema that will define what data you are saving in your database, in this case we have a email, a password, and a displayName. Finally don't forget to export the model.

`
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
email: {type: String, required: true, unique: true},
password:{type: String, required: true, minlength:5},
displayName: { type: String },
});

module.exports = User = mongoose.model("user", userSchema);

`

## Step 5

Now that we have our user model completed, lets work on creating the route to allow our end users to create an account. To do this we will start on our server js page where we will add in the following line of code: `app.use("/users", require("./routes/users"));` that will tell our express app to use the route at user that will authenticate our user.

From there lets create a new file called routes. In that new folder, lets create a new file titled users.js.

In that new file we will need to start with importing everything we will need access to with the following lines of code.
`const router = require("express").Router(); const bcrypt = require("bcryptjs"); const jwt = require("jsonwebtoken"); const User = require("../models/usermodel");`
Once you have the above all required correctly we can begin to write our route.

Beginning on line 9 first we create our router.post, with the first parameter being the url path /register, and then we call async so that our site waits to finish the post untill all of our verification checks pass.
`router.post("/register", async (req, res) => { try { `
From there we destructure the request so that we can set each of the properties in the response object to seperate variables to make it easier to run through our verification checks.
`let { email, password, passwordCheck, displayName } = req.body;`

Now we can run various checks on our user input, for example to see if the password is long enough, the check would look like

`if (password.length < 8) return res.status(400).json({ msg: "The password needs to be at least 8 characters.", });`

Starting on line 38 we will use bcrypt to hash our password before we save it to our database

` const salt = await bcrypt.genSalt(); const passwordHash = await bcrypt.hash(password, salt); `

 and then on line 42 we will take the information submitted by the user, and organize it into an object to be saved as a new user in our database.

`
const newUser = newUser({
email,
password: passwordHash,
displayName,
});

const savedUser = await newUser.save();
res.json(savedUser);

`
As a last step we create a catch to display any errors if they are present


} catch (err) {
res.status(500).json({ error: err.message });
}



### Step 5.5

Now while we are here lets create the route to delete information. On line 45 below our original register route, start with ~ router.delete( "/delete"). From there we will need to take in the auth middleware (we will create this in a bit)

## Step 6

Now if you try to start up your server at this point it will crash with the following error `TypeError [ERR_INVALID_ARG_VALUE]: The argument 'id' must be a non-empty string. Received ''  `
To ensure our id is not an empty string we will need to finish our verification, by checking to see if the JWT is valid or not. We will do this in 2 parts, first starting with the route, and then we will create our middle ware.

