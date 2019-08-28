/*
   Retrieves the precincts for all fifty state from its 
   respective wikipedia page and dumps it into an
   array called precinct_county_tuples
 */
const { Builder, By, Key, util} = require('selenium-webdriver');
const cheerio = require('cheerio');//makes easier to use jquery syntax. Parses html content
const axios = require('axios');//makes http request and returns the site's html content as a response


const options = {
    nation_url: "https://en.wikipedia.org/wiki/List_of_United_States_congressional_districts",
}
let precinct_county_tuples = [];

//get the html content
let html_body = '';
axios.get(options.nation_url)
    .then((response) => {
        let retrievePrecincts = (html) => {     

            //load the html
            const $ = cheerio.load(html);

            //collects state names
            $("body div div div div h2 span a").each((i, e) =>{
                //the precincts start at the fourty-third and end at the 870th list element
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

                let final_precincts = [];
                let count = 0;
                $(e.parent.parent.parent).find("ul li span a").each((k, e2)=>{
                    if( k ){
                        // console.log(k, e2);
    
                        //parse string to retrieve precinct, county, and state names
                         let precinct = (e2.attribs.title);
                        // console.log(k);
    
                        count = count+1;
                        let overflow = 1;
                        if(precinct_county_tuples[count]){
                            console.log(precinct_county_tuples[count]);
                            precinct_county_tuples[count].precincts.push(precinct);
                        }
                        // else{
                        //     precinct_county_tuples.push({id: (count+overflow), state:'',precincts: final_precincts});
                        //     overflow = overflow+1;
                        // }
                    }
                });
                // final_precincts = [];
                // count = 0;
            });

            return precinct_county_tuples;
        }
        //adds all of the precincts to precinct_county_tuples
        precinct_county_tuples = retrievePrecincts(response.data);
        console.log(precinct_county_tuples);
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