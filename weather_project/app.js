const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const city = req.body.cityName;
  const apiKey = "fdb8b45fab205ef86067e6415b255211";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The current temperature in " + city + " is " + temperature + "</h1>");
      res.write("<p>The weather is currently " + description + "</p>");
      res.write("<img src='" + imageUrl + "'></img>");
      res.send();
    })
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000...")
});
