const express = require("express");
const request = require("request");
const app = express();
const code = require("./code/code");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.locals.moment = require('moment');


// let url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=d0783d7b08a751209bc77567140ebbb5`;

//Get weather data by making a call to weather API
app.get("/", function(req, res){
    let location = req.query.search;
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' +today.getDate();
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=d0783d7b08a751209bc77567140ebbb5`;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            let currentData = JSON.parse(body);
            let forcastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=d0783d7b08a751209bc77567140ebbb5`;
            request(forcastUrl, function(error, response, body){
                let forcastData = JSON.parse(body);
                let weatherMap = code.getUnique(forcastData.list);
                res.render("weather", {weather: currentData, date: date, forcastData: weatherMap});
            })
        }
    });
})

//Server setting
app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started");
})