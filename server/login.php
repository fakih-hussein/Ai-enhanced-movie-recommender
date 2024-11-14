<?php
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);
$username = $input['username'];
$password = $input['password'];

$host = "localhost";
$dbname = "movie_recommender_db";
$dbuser = "root";
$dbpass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if ($password== $user['password']) {
            if ($user['status'] === 'banned') {
                echo json_encode(["success" => false, "message" => "Your account has been banned."]);
                exit;
            }
            $redirectPage = ($user['user_type_id'] == 1) ? "admin.html" : "homepage.html";
            echo json_encode([
                "success" => true,
                "message" => "Login successful",
                "user_id" => $user['id'],   
                "username" => $user['username'],
                "redirect" => $redirectPage
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Incorrect password"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Username not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
