<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) mkdir($dataDir, 0755, true);

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $msg = [
        'id' => uniqid(),
        'name' => $input['name'] ?? '',
        'email' => $input['email'] ?? '',
        'subject' => $input['subject'] ?? '',
        'message' => $input['message'] ?? '',
        'created_at' => date('c')
    ];

    $file = $dataDir . '/contacts.json';
    $data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    $data[] = $msg;
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));

    echo json_encode($msg);
}
?>
