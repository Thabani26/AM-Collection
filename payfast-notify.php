<?php
// payfast-notify.php

// Read raw POST data
$data = $_POST;

// Optional logging for debugging
$logFile = __DIR__ . '/payfast_notify.log';
$logEntry = date('Y-m-d H:i:s') . " - " . json_encode($data) . "\n";
file_put_contents($logFile, $logEntry, FILE_APPEND);

// Check if payment_status exists
if (isset($data['payment_status']) && $data['payment_status'] == 'COMPLETE') {
    // TODO: Update database or send confirmation email
    http_response_code(200);
    echo "Payment completed";
} else {
    // Payment pending or failed
    http_response_code(200);
    echo "Payment not completed";
}
?>

