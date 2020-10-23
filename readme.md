# Simple Mern auth demo 

## Step one
First you will need to create a folder to store your project in. 
Once you have this created navigate to the project in your terminal 
and enter the following command `` npm init -y ``
This will create a package.json file with the default settings.

Next you will need to install the following npm packages

* express
* cors
* mongoose
* dotenv
* jsonwebtoken
* bcrypt
* helmet.js

## Step Two 
Now we will establish our connection to our database by first creating a .env file to store our URI for connecting to MongoDB.
After you have created your file you will need to add in a variable 
to hold our connection link. EX: MONGO_URI=mongodb://localhost:27017

Note that the above variable does not have quotes, and there should be no spaces between your

## Step Three
* Create a new file at the root of your project called server.js

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

`` mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to DB");
  }
);
``