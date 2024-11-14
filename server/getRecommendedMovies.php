<?php
header("Content-Type: application/json");

$host = "localhost";
$dbname = "movie_recommender_db";
$dbuser = "root";
$dbpass = "";

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["message" => "User ID is required"]);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("
        SELECT m.id, m.title, m.image_url
        FROM movies m
        JOIN users_activity a ON m.id = a.movies_id
        WHERE a.users_id = ?
        ORDER BY a.total_time_spent DESC
        LIMIT 5
    ");
    $stmt->execute([$user_id]);
    $recommendedMovies = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($recommendedMovies);
} catch (PDOException $e) {
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
