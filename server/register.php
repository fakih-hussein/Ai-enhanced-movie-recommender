<?php
    include "connection.php";

    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $hashed = password_hash($password, PASSWORD_DEFAULT);

    $query = $connection->prepare("INSERT INTO users(username, email, password,user_type) values(?,?,?,1)");
    $query->bind_param("sss", $username, $email, $hashed);
    $query->execute();
    $result = $query->affected_rows;

    if ($result!=0){
        echo json_encode([
            "status"=> "Register successful",
            "message"=> "$result user(s) created",
        ]);
    }
    else{
        echo json_encode([
            "status"=> "Failed",
            "message"=> "Could not create record",
        ]);
    }
?>