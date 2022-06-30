const express = require('express');
const app=express();
const https =require("https");
const bodyParser= require("body-parser")


app.use(bodyParser.urlencoded({extended: true}))


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")

    
})

app.post("/", function(req,res){
    const query= req.body.cityName;
    const apiKey= "1b9a523c4aff1d643d041ee5a37b02b5";
    const unit="metric"
   
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey + "&units="+ unit;
    console.log(url);


    https.get(url, function(response)
    {
        console.log(response.statusCode);
        response.on("data", function(data){
           
           const weatherData= JSON.parse(data);
           const temp= weatherData.main.temp;
           const weatherDescription =weatherData.weather[0].description;
           const icon= weatherData.weather[0].icon;
           const imageURL= " http://openweathermap.org/img/wn/" + icon + "@2x.png";

           res.write("<p>Teh weather is currently " + weatherDescription +"</p>");
           res.write("<h1>The temperature of "+ query +" is " + temp + " degreee Celcius</h1>")
           res.write("<img src=" + imageURL + ">")
           res.send();




        });

    })
})







app.listen(3000,function()
{
    console.log("server is running on port 3000")

});