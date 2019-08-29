const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql');
const client = require ('mongodb').MongoClient;

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

cands = {};
endorsers = [];
states = [];
greenlight = "";//doesn't do anything for now, but should be fleshed out in the future...
legislation = {};
candidate_bornin_data = [];
candidate_election_data = [];
candidate_endorsements_data = [];
candidate_hasvisited_data = [];
candidate_residesin_data = [];
county_data = [];
county_election_data = [];
election_data = [];
nation_data = [];
nation_election_data = [];
precinct_data = [];
region_data = [];
state_data = [];
state_election_data = [];
territory_data = [];
territory_election = [];

password  = "Ozymandias123!"
connect_uri = "mongodb+srv://alecaines:"+password+"@cluster0-5pgnh.mongodb.net/test?retryWrites=true&w=majority";
//establish connection and get resources for calls. Later try and distribute resource-collection to individual endpoitns, perhaps?
client.connect(connect_uri, 
{useNewUrlParser: true, useUnifiedTopology: true}, 
    (err, db)=>{
        if(err) {throw err}
        var dbo = db.db("mc_db");

        //collect candidate data from mongodb
        dbo.collection("candidate").find({}).toArray((err, result)=>{
            if(err){throw err}
            cands = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect candidate_bornin data from mongodb
        dbo.collection("candidate_bornin").find({}).toArray((err, result)=>{
            if(err){throw err}
            candidate_bornin_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect candidate_election data from mongodb
        dbo.collection("candidate_election").find({}).toArray((err, result)=>{
            if(err){throw err}
            candidate_election_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect endorsement data from mongodb
        dbo.collection("candidate_endorsements").find({}).toArray((err, result)=>{
            if(err){throw err}
            endorsers = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect candidate_hasvisited data from mongodb
        dbo.collection("candidate_hasvisited").find({}).toArray((err, result)=>{
            if(err){throw err}
            candidate_hasvisited_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect candidate_residesin data from mongodb
        dbo.collection("candidate_residesin").find({}).toArray((err, result)=>{
            if(err){throw err}
            candidate_residesin_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect county data from mongodb
        dbo.collection("county").find({}).toArray((err, result)=>{
            if(err){throw err}
            county_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect county_election data from mongodb
        dbo.collection("county_election").find({}).toArray((err, result)=>{
            if(err){throw err}
            county_election_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect election data from mongodb
        dbo.collection("election").find({}).toArray((err, result)=>{
            if(err){throw err}
            election_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });
        
        //collect nation data from mongodb
        dbo.collection("nation").find({}).toArray((err, result)=>{
            if(err){throw err}
            nation_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect nation_election data from mongodb
        dbo.collection("nation_election").find({}).toArray((err, result)=>{
            if(err){throw err}
            nation_election_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect precinct data from mongodb
        dbo.collection("precinct").find({}).toArray((err, result)=>{
            if(err){throw err}
            precinct_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });
        
         //collect precinct data from mongodb
         dbo.collection("region").find({}).toArray((err, result)=>{
            if(err){throw err}
            region_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect state data from mongodb
        dbo.collection("state").find({}).toArray((err, result)=>{
            if(err){throw err}
            states = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect state election data from mongodb
        dbo.collection("state_election").find({}).toArray((err, result)=>{
            if(err){throw err}
            state_election_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect territory data from mongodb
        dbo.collection("territory").find({}).toArray((err, result)=>{
            if(err){throw err}
            territory_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });

        //collect territory election data from mongodb
        dbo.collection("territory_election").find({}).toArray((err, result)=>{
            if(err){throw err}
            territory_election_data = result;
            greenlight = "go";
            console.log("worked");
            // db.close();
        });


    }
);

//candidates endpoint
app.get("/candidates", (req, res)=>{
    if(greenlight == "go"){
        console.log(cands);
        res.json(cands);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//candidate_bornin endpoint
app.get("/candidate_bornin", (req, res)=>{
    if(greenlight == "go"){
        console.log(candidate_bornin_data);
        res.json(candidate_bornin_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//candidate_election endpoint
app.get("/candidate_election", (req, res)=>{
    if(greenlight == "go"){
        console.log(candidate_election_data);
        res.json(candidate_election_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//candidate_endorsements endpoint
app.get("/candidate_endorsements", (req, res)=>{
    if(greenlight == "go"){
        console.log(candidate_endorsements_data);
        res.json(candidate_endorsements_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//candidate_hasvisited endpoint
app.get("/candidate_hasvisited", (req, res)=>{
    if(greenlight == "go"){
        console.log(candidate_hasvisited_data);
        res.json(candidate_hasvisited_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//candidate_residesin endpoint
app.get("/candidate_residesin", (req, res)=>{
    if(greenlight == "go"){
        console.log(candidate_residesin_data);
        res.json(candidate_residesin_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//county endpoint
app.get("/county", (req, res)=>{
    if(greenlight == "go"){
        console.log(county_data);
        res.json(county_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//county_election endpoint
app.get("/county_election", (req, res)=>{
    if(greenlight == "go"){
        console.log(county_election_data);
        res.json(county_election_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//election endpoint
app.get("/election", (req, res)=>{
    if(greenlight == "go"){
        console.log(election_data);
        res.json(election_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//nation endpoint
app.get("/nation", (req, res)=>{
    if(greenlight == "go"){
        console.log(nation_data);
        res.json(nation_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//nation_election endpoint
app.get("/nation_election", (req, res)=>{
    if(greenlight == "go"){
        console.log(nation_election_data);
        res.json(nation_election_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//precinct endpoint
app.get("/precinct", (req, res)=>{
    if(greenlight == "go"){
        console.log(precinct_data);
        res.json(precinct_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//region endpoint
app.get("/region", (req, res)=>{
    if(greenlight == "go"){
        console.log(region_data);
        res.json(region_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//states endpoint
app.get("/states", (req, res)=>{
    if(greenlight == "go"){
        console.log(states);
        res.json(states);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//state_election endpoint
app.get("/state_election", (req, res)=>{
    if(greenlight == "go"){
        console.log(state_election_data);
        res.json(state_election_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//territory endpoint
app.get("/territory", (req, res)=>{
    if(greenlight == "go"){
        console.log(territory_data);
        res.json(territory_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//territory_election endpoint
app.get("/territory_election", (req, res)=>{
    if(greenlight == "go"){
        console.log(territory_election_data);
        res.json(territory_election_data);
        greenlight = "";
    }
    else{
        res.json("refresh")
    }
});

//endorsements endpoint
app.get("/candidate_endorsements", (req, res)=>{
    if(greenlight == "go"){
        console.log(endorsers);
        res.json(endorsers);
        greenlight = ""
    }
    else{
        res.json("refresh")
    }
});

//legislation endpoint
app.get("/candidate_legislation", (req, res) => {
    legis_uri = "https://api.govinfo.gov/packages/BILLS-116s129is/summary?api_key=tXSG9k1ZBOgarywn0AlyakeThJfgMwpyUrBRy1zN";

    if(greenlight == "go"){
        console.log(legislation);
        res.json(legislation);
        greenlight = "";
    }
});

//with route registered, we can now GET
app.listen(3000, () =>  {
    console.log("3000 feet high and rising");
});