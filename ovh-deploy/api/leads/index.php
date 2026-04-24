<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

$dataDir = $_SERVER['DOCUMENT_ROOT'] . '/data';
if (!is_dir($dataDir)) mkdir($dataDir, 0755, true);

// ADMIN EMAIL - change this to Coach Lady Wassa's real email
$ADMIN_EMAIL = 'contact@coachladywassa.com';
$FROM_EMAIL  = 'no-reply@coachladywassa.com';
$FROM_NAME   = 'Coach Lady Wassa';

$input = json_decode(file_get_contents('php://input'), true);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'ok']);
    exit;
}

$first_name    = trim($input['first_name']   ?? '');
$email         = trim($input['email']        ?? '');
$whatsapp      = trim($input['whatsapp']     ?? '');
$profile_type  = trim($input['profile_type'] ?? '');
$source        = trim($input['source']       ?? 'quiz');

$lead = [
    'id'             => uniqid(),
    'first_name'     => $first_name,
    'email'          => $email,
    'whatsapp'       => $whatsapp,
    'profile_type'   => $profile_type,
    'prefer_whatsapp'=> $input['prefer_whatsapp'] ?? true,
    'source'         => $source,
    'created_at'     => date('c'),
];

// Save to JSON file
$file = $dataDir . '/leads.json';
$data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
$data[] = $lead;
file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));

// Try to send notification emails
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $safeName  = htmlspecialchars($first_name, ENT_QUOTES, 'UTF-8');
    $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safeProf  = htmlspecialchars($profile_type, ENT_QUOTES, 'UTF-8');
    $safeWA    = htmlspecialchars($whatsapp, ENT_QUOTES, 'UTF-8');

    // 1) Email to admin (Coach Lady Wassa)
    $adminSubject = "[Coach Lady Wassa] Nouveau lead : {$safeName}";
    $adminBody = "
    <html><body style='font-family:Arial,sans-serif;background:#FAF9F6;padding:24px;'>
      <div style='max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border-top:4px solid #D4AF37;'>
        <h2 style='color:#0B3A5A;margin:0 0 16px;'>Nouveau lead capturé</h2>
        <p style='color:#4A4A4A;'>Une nouvelle personne vient de s'inscrire via le site web :</p>
        <table style='width:100%;border-collapse:collapse;margin-top:16px;'>
          <tr><td style='padding:8px;background:#FAF9F6;'><b>Prénom :</b></td><td style='padding:8px;'>{$safeName}</td></tr>
          <tr><td style='padding:8px;'><b>Email :</b></td><td style='padding:8px;'>{$safeEmail}</td></tr>
          <tr><td style='padding:8px;background:#FAF9F6;'><b>WhatsApp :</b></td><td style='padding:8px;'>{$safeWA}</td></tr>
          <tr><td style='padding:8px;'><b>Profil :</b></td><td style='padding:8px;'>{$safeProf}</td></tr>
          <tr><td style='padding:8px;background:#FAF9F6;'><b>Source :</b></td><td style='padding:8px;'>{$source}</td></tr>
          <tr><td style='padding:8px;'><b>Date :</b></td><td style='padding:8px;'>" . date('d/m/Y H:i') . "</td></tr>
        </table>
        <p style='margin-top:24px;'>
          <a href='https://wa.me/22657575701?text=Bonjour%20{$safeName}%2C%20merci%20de%20votre%20int%C3%A9r%C3%AAt%20%21' 
             style='background:#25D366;color:#fff;padding:12px 24px;border-radius:24px;text-decoration:none;font-weight:bold;'>
            Contacter via WhatsApp
          </a>
        </p>
      </div>
    </body></html>";
    $adminHeaders = "MIME-Version: 1.0\r\n"
                  . "Content-type: text/html; charset=UTF-8\r\n"
                  . "From: {$FROM_NAME} <{$FROM_EMAIL}>\r\n"
                  . "Reply-To: {$email}\r\n";
    @mail($ADMIN_EMAIL, $adminSubject, $adminBody, $adminHeaders);

    // 2) Confirmation email to visitor
    $visitorSubject = "Bienvenue {$first_name} ! Votre quiz neuro-cognitif";
    $visitorBody = "
    <html><body style='font-family:Arial,sans-serif;background:#FAF9F6;padding:24px;'>
      <div style='max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:40px;border-top:4px solid #D4AF37;'>
        <h1 style='color:#0B3A5A;margin:0 0 16px;'>Bonjour {$safeName},</h1>
        <p style='color:#4A4A4A;font-size:15px;line-height:1.6;'>
          Merci pour votre inscription ! Je suis ravie de vous compter parmi les personnes qui choisissent de transformer leur vie grâce aux neurosciences.
        </p>
        <p style='color:#4A4A4A;font-size:15px;line-height:1.6;'>
          Pour démarrer dès maintenant, je vous invite à <b>faire le quiz personnalisé</b> sur le site. En 2 minutes, vous découvrirez votre profil neuro-cognitif et recevrez des recommandations adaptées.
        </p>
        <p style='text-align:center;margin:32px 0;'>
          <a href='https://www.coachladywassa.com/#quiz' 
             style='background:#D4AF37;color:#0B3A5A;padding:14px 32px;border-radius:24px;text-decoration:none;font-weight:bold;font-size:15px;'>
            Faire le quiz maintenant
          </a>
        </p>
        <p style='color:#4A4A4A;font-size:14px;'>
          Vous avez des questions ? Contactez-moi directement sur WhatsApp : 
          <a href='https://wa.me/22657575701' style='color:#25D366;'>+226 57 57 57 01</a>
        </p>
        <hr style='border:none;border-top:1px solid #eee;margin:32px 0;'>
        <p style='color:#999;font-size:12px;text-align:center;'>
          Coach Lady Wassa &bull; MasterCoach ICI certifiée<br>
          Cabinet Mindset Coaching &bull; Ouagadougou, Burkina Faso<br>
          <a href='https://www.coachladywassa.com' style='color:#0B3A5A;'>www.coachladywassa.com</a>
        </p>
      </div>
    </body></html>";
    $visitorHeaders = "MIME-Version: 1.0\r\n"
                    . "Content-type: text/html; charset=UTF-8\r\n"
                    . "From: {$FROM_NAME} <{$FROM_EMAIL}>\r\n"
                    . "Reply-To: {$ADMIN_EMAIL}\r\n";
    @mail($email, $visitorSubject, $visitorBody, $visitorHeaders);
}

echo json_encode($lead);
