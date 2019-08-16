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

?>