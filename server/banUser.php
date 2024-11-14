<?php
header("Content-Type: application/json");

$host = "localhost";
$dbname = "movie_recommender_db";
$dbuser = "root";
$dbpass = "";

$input = json_decode(file_get_contents("php://input"), true);
$user_id = $input['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["message" => "User ID is required"]);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("UPDATE users SET status = 'banned' WHERE id = ?");
    $stmt->execute([$user_id]);

    echo json_encode(["message" => "User has been banned successfully"]);
} catch (PDOException $e) {
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
