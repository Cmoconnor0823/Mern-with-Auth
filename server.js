const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const helmet = require("helmet");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(helmet());

app.listen(PORT, () => console.log(`The server is now on port: ${PORT}`));

mongoose.connect(
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

// app.use("/users", require("./routes/users"));

//app.use("/todos", require("./routes/todo"));
