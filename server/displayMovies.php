<?php
include "connection.php";

$query = $connection->prepare("SELECT * FROM movies");
$query->execute();
$result = $query->get_result();

if ($result->num_rows > 0) {
  $movies = [];

  while ($resultObject = $result->fetch_assoc()) {
    $movies[] = $resultObject;
  }

  echo json_encode($movies);
} else {
  $response = [
    "message" => "Empty result"
  ];

  echo json_encode($response);
}
