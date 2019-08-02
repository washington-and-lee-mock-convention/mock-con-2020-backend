<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

function get_json_response($response){
    $responseArray = Array();
    while($row = $response->fetch_assoc()) {
            $myArray[] = $row;
    }
    return json_encode($myArray);
};

# Route to get all Candidates
$app -> get('/candidates', function(Request $request, Response $response) {
    $conn = mysqli_connect('localhost', 'mockconv_testdbc', 'dbtest06984527', 'mockconv_database');
    $response = $conn->query('SELECT * FROM Candidate');
    if ($response) {
        echo get_json_response($response);
    } else {
        echo 'Oops, server got in trouble.';
    };
    $conn->close();
});

# Route to get Candidate by name
$app -> get('/candidates/{name}', function(Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $conn = mysqli_connect('localhost', 'mockconv_testdbc', 'dbtest06984527', 'mockconv_database');
    $response = $conn->query('SELECT * FROM Candidate AS c WHERE c.name = $name');
    if ($response) {
        echo get_json_response($response);
    } else {
        echo 'Oops, server got in trouble.';
    };
    $conn->close();
});

?>