<?php
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, GET");
    $host = "localhost";
    $dbuser ="root";
    $pass="";
    $dbname="movie_recommender_db";

    $connection = new mysqli($host, $dbuser, $pass, $dbname);

    if ($connection->connect_error){
        die("Connection Error:".$connection->connect_error);
    }
?>