/*
   Retrieves the precincts for all fifty state from its respective wikipedia 
   page and dumps it into an array called precinct_county_tuples. The runtime
   of this app is probably atrocious. If anyone wants to try to improve it, be my guest.
 */
const { Builder, By, Key, util} = require('selenium-webdriver');
const cheerio = require('cheerio');//makes easier to use jquery syntax. Parses html content
const axios = require('axios');//makes http request and returns the site's html content as a response
const client = require ('mongodb').MongoClient;

var ObjectId = require('mongodb').ObjectId;

const options = {
    nation_url: "https://en.wikipedia.org/wiki/List_of_United_States_congressional_districts",
}
let precinct_county_tuples = [];

//get the html content
let html_body = '';

let final_precincts = [];
final_precincts = new Set(final_precincts);

axios.get(options.nation_url)//if someone can find a way to not have to include anything in the axios clause, that'd be great. Not imperative, though
.then((response) => {
    let retrievePrecincts = (html) => {     

        //load the html
        const $ = cheerio.load(html);

        //collects state names
        $("body div div div div h2 span a").each((i, e) =>{
            //each iteration loads a new state into precinct_county_tuples
            if(i>0 && i<=57){
                let s = e.attribs.title;
                s = s.replace('Edit section: ','');
                let obj = {
                    id: i,
                    state: s,
                    precincts: []
                }
                precinct_county_tuples.push(obj);
            }

            
            //goes back to the relative root of the doc and then searches for the precincts
            $(e.parent.parent.parent).find("ul li span a").each((k, e2)=>{
                if( k ){

                    //parse string to retrieve precinct, county, and state names
                    final_precincts.add(e2.attribs.title);
                }
            });
            //assigns each precinct to its respective state

        });

        for(j =0;j <precinct_county_tuples.length;j++){

            const iterator = final_precincts.values();
            for(let entry of iterator){
                if(entry.includes(precinct_county_tuples[j].state)){
                    precinct_county_tuples[j].precincts.push(entry);
                }
            }
        }
        //runtime needs to be refactored as soon as possible, damn lol. Maybe remove the duplication
        // parameter of the if statement above
        return precinct_county_tuples;
    }
    //adds all of the precincts to precinct_county_tuples (but for some reason is not available outside of the scope of axios.get(...))
    precinct_county_tuples = retrievePrecincts(response.data);
    console.log(precinct_county_tuples);
    return precinct_county_tuples;

    //---------------------------------------------------------------------
    //add the precincts to mongo???
    // password  = "Ozymandias123!"
    // connect_uri = "mongodb+srv://alecaines:"+password+"@cluster0-5pgnh.mongodb.net/test?retryWrites=true&w=majority";
    //establish connection and get resources for calls. Later try and distribute resource-collection to individual endpoitns, perhaps?
    // client.connect(connect_uri, 
    // {useNewUrlParser: true, useUnifiedTopology: true}, 
    //     (err, db)=>{
    //         if(err) {throw err}
    //         var dbo = db.db("mc_db");
        
    //         for(i = 0;i<5;i++){
    //             for(precinct in precinct_county_tuples[i].precincts){
    //                 try{
    //                     console.log(precinct,"to be isnerted");
    //                     dbo.collection("precincts").insertOne(
    //                         {
    //                             precinct_ID: precinct_county_tuples[i].id,
    //                             county_ID: null,//damn it
    //                             precinct_name: precinct
    //                         });
    //                     // console.log(precinct_county_tuples[i], "inserted");
    //                 }
    //                 catch(err){
    //                     throw err;
    //                 }
    //             }
    //         }

    //         // for(e in precinct_county_tuples){
    //         //     for(precinct in e.precincts){
    //         //         try{
    //         //             console.log("trying")
    //         //             dbo.collection("precincts").insertOne(
    //         //                 {
    //         //                     precinct_ID: e.id,
    //         //                     county_ID: null,//damn it
    //         //                     precinct_name: precinct
    //         //                 });
    //         //             console.log(precinct, "inserted");
    //         //         }
    //         //         catch(err){
    //         //             throw err;
    //         //         }
                    
    //         //     }
    //         // }
    // });
})
.catch(error => {
    console.log(error);
})



function parseString(s){
    tuple= {
        precinct: '',
        county: '',
        state: '',
    };
    arr = s.split(",");

    //data cleaning concerning missing precincts and counties needs severe improvement.
    if(arr[0] == undefined || arr[0] == ''){
        arr[0] = null;
    }
    else{
        tuple.precinct = arr[0];
    }
    if(arr[1] == undefined || arr[1] == ''){
        arr[1] = null;
    }
    else{
        tuple.county = arr[1];
    }
    if(arr[2] == undefined || arr[2] == ''){
        arr[2] = null;
    }
    else{
        tuple.state = arr[2];
    }

    return tuple;
}

//runs script
function runCrawler(){
    //this will return an empty array because it runs first and axios.get(...) second. Needs to be fixed
    //in the future, find a way to run the axios.get(...) in a js-function and still be able to return the data. Just for simplicity's sake
    // return getPrecinctTouples();
}
// runCrawler();