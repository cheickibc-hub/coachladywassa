<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
$dataDir = $_SERVER['DOCUMENT_ROOT'] . '/data';
if (!is_dir($dataDir)) mkdir($dataDir, 0755, true);
$input = json_decode(file_get_contents('php://input'), true);
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $lead = ['id'=>uniqid(),'first_name'=>$input['first_name']??'','email'=>$input['email']??'','whatsapp'=>$input['whatsapp']??'','profile_type'=>$input['profile_type']??'','prefer_whatsapp'=>$input['prefer_whatsapp']??true,'source'=>$input['source']??'quiz','created_at'=>date('c')];
    $file = $dataDir . '/leads.json';
    $data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    $data[] = $lead;
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
    echo json_encode($lead);
} else { echo json_encode(['status'=>'ok']); }
