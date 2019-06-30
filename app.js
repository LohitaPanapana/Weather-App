require('dotenv').config();
const express = require("express");
const request = require("request");
const app = express();
const code = require("./code/code");

//App configurations
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.locals.moment = require('moment');

//Get weather data by making a call to weather API
app.get("/", function(req, res){
    let location = req.query.search || 'London';
    //API call to get current weather
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.API_KEY}`;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            let currentData = JSON.parse(body);
            //API call to get 5 days data
            let forcastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.API_KEY}`;
            request(forcastUrl, function(error, response, body){
                let forcastData = JSON.parse(body);
                let weatherMap = code.getUnique(forcastData.list);
                res.render("weather", {weather: currentData, forcastData: weatherMap});
            })
        }
    });
})

//Server setting
app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started");
})