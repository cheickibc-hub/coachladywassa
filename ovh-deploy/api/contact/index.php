<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

$ADMIN_EMAIL = 'contact@coachladywassa.com';
$FROM_EMAIL  = 'no-reply@coachladywassa.com';
$FROM_NAME   = 'Coach Lady Wassa';

$dataDir = $_SERVER['DOCUMENT_ROOT'] . '/data';
if (!is_dir($dataDir)) mkdir($dataDir, 0755, true);

$input = json_decode(file_get_contents('php://input'), true);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'ok']);
    exit;
}

$name    = trim($input['name']    ?? '');
$email   = trim($input['email']   ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

$msg = [
    'id'         => uniqid(),
    'name'       => $name,
    'email'      => $email,
    'subject'    => $subject,
    'message'    => $message,
    'created_at' => date('c'),
];

$file = $dataDir . '/contacts.json';
$data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
$data[] = $msg;
file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));

if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $safeSubj = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
    $safeMsg  = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
    $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');

    // 1) Notify admin
    $adminSubject = "[Coach Lady Wassa] Message de contact : {$safeSubj}";
    $adminBody = "<html><body style='font-family:Arial,sans-serif;background:#FAF9F6;padding:24px;'>
      <div style='max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border-top:4px solid #D4AF37;'>
        <h2 style='color:#0B3A5A;margin:0 0 16px;'>Nouveau message de contact</h2>
        <p><b>Nom :</b> {$safeName}</p>
        <p><b>Email :</b> {$safeEmail}</p>
        <p><b>Sujet :</b> {$safeSubj}</p>
        <p><b>Message :</b></p>
        <div style='background:#FAF9F6;padding:16px;border-radius:8px;'>{$safeMsg}</div>
      </div></body></html>";
    $headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\n"
             . "From: {$FROM_NAME} <{$FROM_EMAIL}>\r\nReply-To: {$email}\r\n";
    @mail($ADMIN_EMAIL, $adminSubject, $adminBody, $headers);

    // 2) Auto-reply to visitor
    $replySubject = "Votre message est bien reçu, {$name} !";
    $replyBody = "<html><body style='font-family:Arial,sans-serif;background:#FAF9F6;padding:24px;'>
      <div style='max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:40px;border-top:4px solid #D4AF37;'>
        <h1 style='color:#0B3A5A;'>Bonjour {$safeName},</h1>
        <p style='color:#4A4A4A;font-size:15px;line-height:1.6;'>
          Merci pour votre message. Je l'ai bien reçu et je vous réponds dans les plus brefs délais (sous 24-48h).
        </p>
        <p style='color:#4A4A4A;font-size:15px;line-height:1.6;'>
          Pour une réponse plus rapide, vous pouvez aussi me contacter directement sur WhatsApp :
        </p>
        <p style='text-align:center;margin:32px 0;'>
          <a href='https://wa.me/22657575701' style='background:#25D366;color:#fff;padding:14px 32px;border-radius:24px;text-decoration:none;font-weight:bold;'>Contacter sur WhatsApp</a>
        </p>
        <hr style='border:none;border-top:1px solid #eee;margin:32px 0;'>
        <p style='color:#999;font-size:12px;text-align:center;'>
          Coach Lady Wassa &bull; Cabinet Mindset Coaching<br>
          Ouagadougou, Burkina Faso &bull; <a href='https://www.coachladywassa.com' style='color:#0B3A5A;'>www.coachladywassa.com</a>
        </p>
      </div></body></html>";
    $replyHeaders = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\n"
                  . "From: {$FROM_NAME} <{$FROM_EMAIL}>\r\nReply-To: {$ADMIN_EMAIL}\r\n";
    @mail($email, $replySubject, $replyBody, $replyHeaders);
}

echo json_encode($msg);
