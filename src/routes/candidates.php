<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

# Route to get all Candidates
$app -> get('/candidates', function(Request $request, Response $response) {

});

# Route to get Candidate by name
$app -> get('/candidates/{name}', function(Request $request, Response $response) {

});

?>