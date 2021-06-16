//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const apiKey = "2fd7f2c61aa9dc8b1a52a555b30dbfe9";
  const units = "metric";
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

      res.write("<p>The weather condition is <b>" + weatherDescription + "</b> </p>");
      res.write("<h1>The temperature in " + query + " is: " + temp + " degree celcius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });

  });
});


app.listen(3000, function() {
  console.log("Your server is running on PORT 3000");
});
