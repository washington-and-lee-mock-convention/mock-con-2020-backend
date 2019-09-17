<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

include_once $_SERVER['DOCUMENT_ROOT'].'/api/src/utilities/responses.php';

# Route to get all Candidates
$app -> get('/candidates', function(Request $request, Response $response) {
    $conn = mysqli_connect('localhost', 'mockconv_testdbc', 'dbtest06984527', 'mockconv_database');
    $response = $conn->query('SELECT * FROM Candidate');
    if($response) {
        return get($response);
    } else {
        return 'Oops, server got in trouble.';
    };
    $conn->close();
});

# Route to get Candidate by name
$app -> get('/candidates/{name}', function(Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $conn = mysqli_connect('localhost', 'mockconv_testdbc', 'dbtest06984527', 'mockconv_database');
    $response = $conn->query('SELECT * FROM Candidate WHERE lastName='."'$name'");
    if ($response) {
        return get($response);
    } else {
        echo 'Oops, server got in trouble.';
        return null;
    };
    $conn->close();
});

# Route to get all counties in a state
$app -> get('/counties-by-state/{state_name}', function(Request $request, Response $response) {
    $conn = mysqli_connect('localhost', 'mockconv_testdbc', 'dbtest06984527', 'mockconv_database');
    $response = $conn->query('SELECT c.county_name, c.median_income, c.avg_education,c.last_election_party FROM County c,State s WHERE c.state_ID = s.state_id and state_name='."'$state_name'");
    if($response) {
        return get($response);
    } else {
        return 'Oops, server got in trouble.';
    };
    $conn->close();
});

# Route to precincts by county
$app -> get('/precincts-by-county/{county_name}', function(Request $request, Response $response) {
    $conn = mysqli_connect('localhost', 'mockconv_testdbc', 'dbtest06984527', 'mockconv_database');
    $response = $conn->query('SELECT c.county_name, p.precinct_name FROM County c,Precinct p WHERE c.county_ID = p.county_id and county_name='."'$county_name'");
    if($response) {
        return get($response);
    } else {
        return 'Oops, server got in trouble.';
    };
    $conn->close();
});

# Route to state elections
$app -> get('/state-election-result/{state_name}', function(Request $request, Response $response) {
    $conn = mysqli_connect('localhost', 'mockconv_testdbc', 'dbtest06984527', 'mockconv_database');
    $response = $conn->query('SELECT s.state_name, e.election_name, e.year, e.type, e.winner FROM State s, State_Election se, Election e WHERE s.state_ID = se.state_id and se.election_id = e.election_id and state_name='."'$state_name'");
    if($response) {
        return get($response);
    } else {
        return 'Oops, server got in trouble.';
    };
    $conn->close();
});

# Route to county elections
$app -> get('/county-election-result/{county_name}', function(Request $request, Response $response) {
    $conn = mysqli_connect('localhost', 'mockconv_testdbc', 'dbtest06984527', 'mockconv_database');
    $response = $conn->query('SELECT c.county_name, e.election_name, e.year, e.type, e.winner FROM County c, County_Election ce, Election e WHERE c.county_ID = ce.county_id and ce.election_id = e.election_id and county_name='."'$county_name'");
    if($response) {
        return get($response);
    } else {
        return 'Oops, server got in trouble.';
    };
    $conn->close();
});

?>
