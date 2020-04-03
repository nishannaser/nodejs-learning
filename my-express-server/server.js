const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("<h1>Hello, World!</h1>");
});

app.get("/contact", function(req, res) {
  res.send("Mail me at nnishan@gmail.com");
});

app.get("/hobbies", function(req, res) {
  res.send("<ul><li>Food</li><li>Football</li><li>Coding</li></ul>");
});

app.listen(3000, function() {
  console.log("Server started on port 3000...");
});
