/*
   Retrieves the precincts for all fifty state from its respective wikipedia 
   page and dumps it into an array called precinct_county_tuples. The runtime
   of this app is probably atrocious. If anyone wants to try to improve it, be my guest.
 */
const cheerio = require('cheerio');//makes easier to use jquery syntax. Parses html content
const axios = require('axios');//makes http request and returns the site's html content as a response
const client = require ('mongodb').MongoClient;

var ObjectId = require('mongodb').ObjectId;

const options = {
    nation_url: "https://en.wikipedia.org/wiki/List_of_United_States_congressional_districts",
}
let precinct_county_tuples = [];
precinct_county_tuples = new Set(precinct_county_tuples);
county_names = new Set([]);


//get the html content
let html_body = '';

let final_precincts = [];
final_precincts = new Set(final_precincts);//sets don't allow duplication. One less check on our end

axios.get(options.nation_url)//if someone can find a way to not have to include anything in the axios clause, that'd be great. Not imperative, though
.then((response) => {
    let retrievePrecincts = (html) => {     

        //load the html
        const $ = cheerio.load(html);

        //collects state names.
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
                precinct_county_tuples.add(obj);
            }

            
            //goes back to the relative root of the doc and then searches for the precincts
            //I don't think that this part has to be inside of the .each(...) loop that 
            //collects the states. Its going through the entire page 57 times and collecting the same information
            //if I understand correctly. However, when I move it, the precincts are not populated. For a later day, perhaps?
            //it just ruins the runtime...
            $(e.parent.parent.parent).find("ul li span a").each((k, e2)=>{
                if( k ){

                    //parse string to retrieve precinct, county, and state names
                    final_precincts.add(e2.attribs.title);
                }
            });

        });

        //assign the precincts to their respective state
        for(let tuple of precinct_county_tuples){
            const iterator = final_precincts.values();
            for(let entry of iterator){
                if(entry.includes(tuple.state)){
                    tuple.precincts.push(entry);
                }
            }
        }
        //runtime needs to be refactored as soon as possible, damn lol. Maybe remove the duplication
        // parameter of the if statement above
        return precinct_county_tuples;
    }
    //adds all of the precincts to precinct_county_tuples (but for some reason is not available outside of the scope of axios.get(...))
    precinct_county_tuples = retrievePrecincts(response.data);


    //---------------------------------------------------------------------
    //add the precincts to mongo??? Should be changed to mysql later
    let user = "alecaines"
    let password  = "Ozymandias123!"
    connect_uri = "mongodb+srv://alecaines:Ozymandias123!@cluster0-5pgnh.mongodb.net/test?retryWrites=true&w=majority";
    // establish connection and get resources for calls. Later try and distribute resource-collection to individual endpoitns, perhaps?
    client.connect(connect_uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
        (err, db)=>{
            if(err) {throw err}
            var dbo = db.db("mc_db");

            try{
                // dbo.collection("precinct").drop();
                // dbo.createCollection("precinct",{
                //     capped: false,
                //     autoIndexId: true,
                // });

                for(i = 0;i<2;i++){
                    const iterator = precinct_county_tuples.values();
                    for(let entry of iterator){
                        for(j =0; j< entry.precincts.length;j++){
                            try{
                                dbo.collection("precinct").insertOne({
                                    precinct_ID: entry.id,
                                    county_ID: null,
                                    precinct_name: entry.precincts[j]
                                });
                            }
                            catch(err){
                                throw err
                            }
                        }
                        
                    }
                    
                }

                return precinct_county_tuples;
            }
            catch (err){

                throw ("the collection precinct may not exist");
            }

           

        

    });
})
.catch(error => {
    console.log(error);
})

axios.get(options.nation_url)//if someone can find a way to not have to include anything in the axios clause, that'd be great. Not imperative, though
.then((response) => {
    let retrieveCounties = (html) => {     

        //return result after this line
    }

    county_names = retrieveCounties(response.data);
    //append to approriate precincts in db
    //method: 
    //(1) find which precinct a county is in 
    //(2) once the precinct is established, query the county table for the county id 
    //(3) insert the county id into the precinct table
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