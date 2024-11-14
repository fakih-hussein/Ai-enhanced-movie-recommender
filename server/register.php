<?php
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);
$username = $input['username'];
$password = $input['password'];

$host = "localhost"; 
$dbname = "movie_recommender_db"; 
$dbuser = "root"; 
$dbpass = ""; 

if (empty($username) || empty($password)) {
    echo json_encode(["message" => "Username and password are required"]);
    exit;
}


try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(["message" => "Username already taken"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO users (username, password, user_type_id) VALUES (?, ?, ?)");
    $usertype = 2;
    $stmt->execute([$username, $password, $usertype]);

    echo json_encode(["message" => "Registration successful"]);
} catch (PDOException $e) {
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}
