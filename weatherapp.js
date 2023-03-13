//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();


app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});


app.post("/", function (req, res) {
    // now the browser has made a request for the weather info so we want our server to request to weather api to get us info
    // so we want us https to request 
    const countryName=req.body.place;
    const query = countryName;
    const appid = "347ffd39b7e644c32b17073ec7926f8d";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;

    https.get(url, function (response) {//here we don't need the request as we alredy use https as the response
        // console.log(response);
        //console.log(response.statusCode);
        // console.log(response.headers);

        response.on("data", function (data) {
            const convertedData = JSON.parse(data);
            const temp = convertedData.main.temp;
            const weather = convertedData.weather[0].description;
            res.write("<h1>The weather is :" + weather + "</h1>");
            res.write("<h1>The temperature is: " + temp + "</h1>");
            const icon = convertedData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<img src=" + imgURL + "  alt=an image>");
            res.send();
        });

    });


});
app.listen(3000, function () {
    console.log("Server is working on the port 3000");
});

