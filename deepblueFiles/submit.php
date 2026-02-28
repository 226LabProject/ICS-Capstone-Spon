<?php
// ============================================================
// submit.php — ICS Capstone Sponsorship Lead Handler
// Saves each form submission as an individual JSON file.
// Logos saved to sponsorship-leads/logos/
// ============================================================


// ============================================================
// CONFIG
// ============================================================
define('LEADS_DIR',    __DIR__ . '/sponsorship-leads/');
define('LOGOS_DIR',    __DIR__ . '/sponsorship-leads/logos/');
define('RETURN_PAGE',  'index.html');
define('MAX_LOGO_BYTES', 5 * 1024 * 1024); // 5 MB


// ============================================================
// ONLY ACCEPT POST
// ============================================================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . RETURN_PAGE);
    exit;
}


// ============================================================
// HONEYPOT CHECK
// ============================================================
if (!empty($_POST['website'])) {
    header('Location: ' . RETURN_PAGE . '?success=1#sponsor-form');
    exit;
}


// ============================================================
// SANITIZE INPUTS
// ============================================================
function clean(string $value): string {
    return htmlspecialchars(trim(strip_tags($value)), ENT_QUOTES, 'UTF-8');
}

$company          = clean($_POST['companyName']      ?? '');
$email            = filter_var(trim($_POST['email']  ?? ''), FILTER_SANITIZE_EMAIL);
$phone            = clean($_POST['phone']            ?? '');
$amount           = clean($_POST['amount']           ?? '');
$level            = clean($_POST['resolvedLevel']    ?? '');
$payment          = clean($_POST['payment']          ?? '');
$preferredContact = clean($_POST['preferredContact'] ?? '');
$comments         = clean($_POST['comments']         ?? '');


// ============================================================
// VALIDATE REQUIRED FIELDS
// ============================================================
if (empty($company) || empty($email) || empty($amount)) {
    header('Location: ' . RETURN_PAGE . '?error=validation#sponsor-form');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ' . RETURN_PAGE . '?error=validation#sponsor-form');
    exit;
}


// ============================================================
// ENSURE DIRECTORIES EXIST
// ============================================================
foreach ([LEADS_DIR, LOGOS_DIR] as $dir) {
    if (!is_dir($dir)) {
        if (!mkdir($dir, 0777, true)) {
            header('Location: ' . RETURN_PAGE . '?error=save#sponsor-form');
            exit;
        }
    }
}


// ============================================================
// HANDLE OPTIONAL LOGO UPLOAD
// ============================================================
$logoFilename = null;

if (!empty($_FILES['logo']['name']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
    $allowedMime  = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    $finfo        = new finfo(FILEINFO_MIME_TYPE);
    $detectedMime = $finfo->file($_FILES['logo']['tmp_name']);

    if (in_array($detectedMime, $allowedMime, true) && $_FILES['logo']['size'] <= MAX_LOGO_BYTES) {
        $ext          = pathinfo($_FILES['logo']['name'], PATHINFO_EXTENSION);
        $safeCompany  = preg_replace('/[^a-zA-Z0-9_-]/', '_', $company);
        $logoFilename = date('Y-m-d_Hi') . '_' . $safeCompany . '_logo.' . strtolower($ext);

        if (!move_uploaded_file($_FILES['logo']['tmp_name'], LOGOS_DIR . $logoFilename)) {
            $logoFilename = 'upload_failed';
        }
    } else {
        $logoFilename = 'rejected_invalid_type_or_size';
    }
}


// ============================================================
// BUILD LEAD RECORD
// ============================================================
$lead = [
    'submitted_at'      => date('Y-m-d H:i:s'),
    'company'           => $company,
    'email'             => $email,
    'phone'             => $phone            ?: null,
    'preferred_contact' => $preferredContact ?: null,
    'amount'            => $amount,
    'level'             => $level            ?: null,
    'payment'           => $payment          ?: null,
    'comments'          => $comments         ?: null,
    'logo_file'         => $logoFilename,
];


// ============================================================
// WRITE LEAD FILE
// Filename format: 2026-02-25_1140_CGI.json
// ============================================================
$safeCompany = preg_replace('/[^a-zA-Z0-9_-]/', '_', $company);
$filename    = date('Y-m-d_Hi') . '_' . $safeCompany . '.json';
$filepath    = LEADS_DIR . $filename;

$written = file_put_contents(
    $filepath,
    json_encode($lead, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);

if ($written === false) {
    header('Location: ' . RETURN_PAGE . '?error=save#sponsor-form');
    exit;
}


// ============================================================
// SUCCESS
// ============================================================
header('Location: ' . RETURN_PAGE . '?success=1#sponsor-form');
exit;