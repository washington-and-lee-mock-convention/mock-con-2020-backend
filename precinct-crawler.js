/*
   Retrieves the precincts for a state from its 
   respective wikipedia page and dumps it into an
   array called precinct_county_tuples
 */
const { Builder, By, Key, util} = require('selenium-webdriver');
const cheerio = require('cheerio');//makes easier to use jquery syntax. Parses html content
const axios = require('axios');//makes http request and returns the site's html content as a response

//perhaps we should pick out the states that have similar wiki-links (i.e. virginia, indiana, etc..)
const states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado",
"Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
"Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine",
"Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
"Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
"New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma",
"Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
"Tennessee","Texas","Utah","Vermont","Virginia","Washington",
"West Virginia","Wisconsin","Wyoming"];

const options = {
    illinois_url:"https://en.wikipedia.org/wiki/List_of_precincts_in_Illinois",
    virginia_url: "https://en.wikipedia.org/wiki/Virginia%27s_congressional_districts",
}
let precinct_county_tuples = [];
//trying to automate states
// for(s in states){
//     url = "https://en.wikipedia.org/wiki/"+s+"%27s_congressional_districts";
// }



//get the html content
let html_body = '';
axios.get(options.virginia_url)
    .then((response) => {
        let retrievePrecincts = (html) => {     

            //load the html
            const $ = cheerio.load(html);

            //find the tags that contain relevant information, then retrieve their 'index' and object
            $("tbody tr th a").each((i, e) =>{
                //the precincts start at the fourty-third and end at the 870th list element
                if( (i>=1) && (i<=11) && (e!=undefined) ){
                    console.log(i, e.attribs.title);

                    //parse string to retrieve precinct, county, and state names
                    let parsedTitle = parseString(e.attribs.title);

                    // parsedTitle.state = parsedTitle.state.replace(" (page does not exist)","");
                    var obj = {
                        precinctID: i-43,
                        precinctName: parsedTitle.precinct,
                        precinctCounty: parsedTitle.county,
                        precinctState: parsedTitle.state,
                    }
                    precinct_county_tuples.push(obj);
                    // console.log(precinct_county_tuples.length);
                }
                
            });
            
            return precinct_county_tuples;
        }
        //adds all of the precincts to precinct_county_tuples
        precinct_county_tuples = retrievePrecincts(response.data);
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