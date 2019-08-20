/*
 * Entry point that loads app server using express
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql');

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

//connecting to mysql db on phpmyadmin
// var connection  = mysql.createConnection({
//     host: 'localhost',
//     user: 'mockconv_testdbc',
//     port: 3306,
//     password: 'dbtest06984527',
//     insecureAuth: true, 
//     database: 'mockconv_database'
// })

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: 'Ozymandias123!',
    database: 'database_beta_0'
});

connection.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("MySQL Connected");
    
});

app.get("/candidates", (req, res)=>{
    connection.query("SELECT * FROM Candidate", function(err, rows, fields){
        if(err){
            throw err;
        }
        res.json(rows);
        console.log(rows);
        // console.log("The solution is:", rows[0].solution);
    });
});


//with route registered, we can now GET
app.listen(3000, () =>  {
    console.log("3000 feet high and rising");
});
