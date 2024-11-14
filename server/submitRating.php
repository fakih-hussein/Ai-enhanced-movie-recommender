<?php
header("Content-Type: application/json");

$host = "localhost";
$dbname = "movie_recommender_db";
$dbuser = "root";
$dbpass = "";

$input = json_decode(file_get_contents("php://input"), true);
$movie_id = $input['movie_id'] ?? null;
$user_id = $input['user_id'] ?? null;
$rating = $input['rating'] ?? null;

if (!$movie_id || !$user_id || !$rating) {
    echo json_encode(["message" => "Movie ID, User ID, and Rating are required"]);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("INSERT INTO movie_rating (users_id, movies_id, rate) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?");
    $stmt->execute([$user_id, $movie_id, $rating, $rating]);

    echo json_encode(["message" => "Rating submitted successfully"]);
} catch (PDOException $e) {
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
