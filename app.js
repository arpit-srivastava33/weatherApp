const express=require("express");
const https=require("https"); // to connect with external server it already installed with node.js 
const bodyParser=require("body-parser"); // to collect form data
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    const apiKey="ffb67c892ed72151bf615119d392d8e7";
    const city=req.body.cityName; // value of name attribute treat like variable 
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+ apiKey +"&units=metric"

    https.get(url,function(response){
        //console.log(response.statusCode);
        response.on("data",function(data){ // data can be text,hexadecimal,binary
            const weatherData=JSON.parse(data); // convert data in json format 
            const temperature=weatherData.main.temp;
            const icon=weatherData.weather[0].icon;
            const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            // var object ={
            //     name:"Arpit",
            //     favouritefood:"Biryani"
            // }
            // console.log(JSON.stringify(object)); // compress object to string == ({"name":"Arpit","favouritefood":"Biryani"}
            const description=weatherData.weather[0].description;
            // res.write is used write multiple data on server We can only use one res.send() in our server
            res.write("<p>The weather description is "+description+"</p>");
            res.write("<h1>The temperature in "+city+" is "+temperature+" degree Celsius</h1>");
            res.write("<img src="+imgURL+">");
            res.send();
        })
    })
})


app.listen("3000",function(){
    console.log("Server is running on port 3000.");
})