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
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { echo json_encode(['status'=>'ok']); exit; }

$first_name = trim($input['first_name'] ?? '');
$email      = trim($input['email']      ?? '');
$challenge  = trim($input['biggest_challenge'] ?? '');
$reminder   = trim($input['reminder_preference'] ?? 'whatsapp');

$reg = [
    'id'                  => uniqid(),
    'first_name'          => $first_name,
    'email'               => $email,
    'biggest_challenge'   => $challenge,
    'reminder_preference' => $reminder,
    'created_at'          => date('c'),
];

$file = $dataDir . '/webinar.json';
$data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
$data[] = $reg;
file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));

if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $safeName = htmlspecialchars($first_name, ENT_QUOTES, 'UTF-8');
    $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safeCh = htmlspecialchars($challenge, ENT_QUOTES, 'UTF-8');

    // Admin notification
    $adminSubject = "[Coach Lady Wassa] Nouvelle inscription webinaire : {$safeName}";
    $adminBody = "<html><body style='font-family:Arial,sans-serif;background:#FAF9F6;padding:24px;'>
      <div style='max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border-top:4px solid #D4AF37;'>
        <h2 style='color:#0B3A5A;'>Nouvelle inscription au webinaire</h2>
        <p><b>Prénom :</b> {$safeName}</p>
        <p><b>Email :</b> {$safeEmail}</p>
        <p><b>Défi :</b> {$safeCh}</p>
        <p><b>Rappel via :</b> {$reminder}</p>
      </div></body></html>";
    $headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\n"
             . "From: {$FROM_NAME} <{$FROM_EMAIL}>\r\nReply-To: {$email}\r\n";
    @mail($ADMIN_EMAIL, $adminSubject, $adminBody, $headers);

    // Visitor confirmation
    $repSubject = "Confirmation : votre place au webinaire est réservée, {$first_name}";
    $repBody = "<html><body style='font-family:Arial,sans-serif;background:#FAF9F6;padding:24px;'>
      <div style='max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:40px;border-top:4px solid #D4AF37;'>
        <h1 style='color:#0B3A5A;'>Félicitations {$safeName} !</h1>
        <p style='color:#4A4A4A;font-size:15px;line-height:1.6;'>
          Votre place au prochain webinaire est bien réservée. Je vous enverrai un rappel quelques jours avant avec le lien de connexion.
        </p>
        <p style='color:#4A4A4A;font-size:15px;line-height:1.6;'>
          En attendant, préparez vos questions et vos notes - ce webinaire va vraiment transformer votre manière de voir votre cerveau et votre potentiel.
        </p>
        <p style='text-align:center;margin:32px 0;'>
          <a href='https://wa.me/22657575701?text=Bonjour%20Coach%2C%20je%20me%20suis%20inscrit%20au%20webinaire' style='background:#25D366;color:#fff;padding:14px 32px;border-radius:24px;text-decoration:none;font-weight:bold;'>Rejoindre le groupe WhatsApp</a>
        </p>
        <hr style='border:none;border-top:1px solid #eee;margin:32px 0;'>
        <p style='color:#999;font-size:12px;text-align:center;'>Coach Lady Wassa &bull; <a href='https://www.coachladywassa.com' style='color:#0B3A5A;'>www.coachladywassa.com</a></p>
      </div></body></html>";
    $repHeaders = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\n"
                . "From: {$FROM_NAME} <{$FROM_EMAIL}>\r\nReply-To: {$ADMIN_EMAIL}\r\n";
    @mail($email, $repSubject, $repBody, $repHeaders);
}

echo json_encode($reg);
