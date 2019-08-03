<?php

function get($response){
    $responseArray = Array();
    while($row = $response->fetch_assoc()) {
            $myArray[] = $row;
    }
    return json_encode(array("data"=>$myArray));
};

?>