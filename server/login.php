<?php
include "connection.php";

$username = $_POST["username"];
$password = $_POST["password"];

$query = $connection->prepare("SELECT * FROM users WHERE username = ?");
$query->bind_param("s", $username);
$query->execute();
$result = $query->get_result();

if ($result->num_rows != 0) {
    $user = $result->fetch_assoc();
    $check=password_verify($password,$user["password"]);

if($check){
    echo json_encode([
        "status" => "Login successful",
        "message" => $user,
    ]);
} else {
    echo json_encode([
        "status" => "Wrong username or password",
    ]);
}
}else {
    echo json_encode([
        "status" => "Wrong username or password",
    ]);
}
