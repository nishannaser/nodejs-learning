const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

const todoListItems = ["Buy Food", "Cook Food", "Eat Food"];

// Root GET
app.get("/", function (req, res) {

  const currentDay = date.getDate();

  res.render("list", {
    typeOfDay: currentDay,
    listItems: todoListItems
  });
});


// Root POST
app.post("/", function (req, res) {
  todoListItem = req.body.newItem;
  todoListItems.push(todoListItem);
  res.redirect("/");
});


// Server port
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started on port " + port);
});