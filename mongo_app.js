const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql');
const mongo = require ('mongodb').MongoClient;

var ObjectId = require('mongodb').ObjectId;
//initialize framework
const app = express();

//prints the request made to the console.
app.use(morgan('combined'));

//CORS middleware
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization, sid");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    // Pass to next layer of middleware
    next();
  });


//specify the routes
app.get("/", (req, res)=>{
    console.log("Responding to root route");
    res.send("We have breached the atmosphere, captain");
});

doc = {};
arr = [];
greenlight = "";

mongo.connect("mongodb+srv://alecaines:Ozymandias123!@cluster0-5pgnh.mongodb.net/test?retryWrites=true&w=majority", 
{useNewUrlParser: true, useUnifiedTopology: true}, 
    (err, db)=>{
        if(err) {throw err}
        var dbo = db.db("mc_db");

        dbo.collection("candidate").find({}).toArray((err, result)=>{
            if(err){throw err}
            doc = result;
            greenlight = "go";
            console.log("worked");
            db.close();
        })
    }
);

app.get("/candidates", (req, res)=>{
    if(greenlight == "go"){
        console.log(doc);
        res.json(doc);
    }
    else{
        res.json("halting")
    }
});

//with route registered, we can now GET
app.listen(3000, () =>  {
    console.log("3000 feet high and rising");
});