<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//session to store previous converstation

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $apiKey = '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'; // Replace with your OpenAI API key
    $userQuery = $_POST['query'];

    
    if (!isset($_SESSION['conversation'])) {
        $_SESSION['conversation'] = [];
    }

    
    $_SESSION['conversation'][] = ['role' => 'user', 'content' => $userQuery];

   
    $url = 'https://api.openai.com/v1/chat/completions';
    $data = [
        'model' => 'gpt-3.5-turbo',
        'messages' => $_SESSION['conversation'],
    ];

   
    $options = [
        'http' => [
            'header' => [
                "Content-Type: application/json",
                "Authorization: Bearer $apiKey",
            ],
            'method' => 'POST',
            'content' => json_encode($data),
        ],
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $response = json_decode($result, true);

   
    if (isset($response['choices'][0]['message']['content'])) {
        $botResponse = $response['choices'][0]['message']['content'];
        $_SESSION['conversation'][] = ['role' => 'assistant', 'content' => $botResponse];
        echo json_encode(['response' => $botResponse]);
    } else {
        echo json_encode(['response' => 'Sorry, I could not get a response.']);
    }

    
}




?>