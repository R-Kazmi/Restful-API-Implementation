//imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//local imports
const postsRoute = require("./routes/posts")

//middleware
app.use(bodyParser.json());
app.use('/posts', postsRoute);

//home
app.get("/", (req, res) => {
  res.send("home");
});

//db connection
mongoose.connect("mongodb://localhost:27017/rest-api", (err) => {
  if (!err) {
    console.log("DB Connection Sucessful");
  } else {
    console.log("Error in Connection" + err);
  }
});

app.listen(3000);
