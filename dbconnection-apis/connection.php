<?php
    $host = "localhost";
    $dbuser ="root";
    $pass="";
    $dbname="movie_recommender_db";

    $connection = new mysqli($host, $dbuser, $pass, $dbname);

    if ($connection->connect_error){
        die("Connection falied:".$connection->connect_error);
    }
?>