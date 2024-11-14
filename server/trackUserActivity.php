<?php
header("Content-Type: application/json");

$host = "localhost";
$dbname = "movie_recommender_db";
$dbuser = "root";
$dbpass = "";

$input = json_decode(file_get_contents("php://input"), true);
$movie_id = $input['movie_id'] ?? null;
$user_id = $input['user_id'] ?? null;
$time_spent = $input['time_spent'] ?? 0;

if (!$movie_id || !$user_id) {
    echo json_encode(["message" => "Movie ID and User ID are required"]);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("
        INSERT INTO users_activity (users_id, movies_id, total_time_spent)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
            total_time_spent = total_time_spent + VALUES(total_time_spent)
    ");
    $stmt->execute([$user_id, $movie_id, $time_spent]);

    echo json_encode(["message" => "User activity tracked successfully"]);
} catch (PDOException $e) {
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
