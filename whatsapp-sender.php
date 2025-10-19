<?php
// WhatsApp Message Sender for SRI GURU CONSTRUCTIONS
// Upload this file to your web hosting server

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $phone = $input['phone'] ?? '';
    $service = $input['service'] ?? '';
    $message = $input['message'] ?? '';
    $timestamp = $input['timestamp'] ?? date('Y-m-d H:i:s');
    
    // Your WhatsApp number
    $your_whatsapp = '917795444954';
    
    // Format the WhatsApp message
    $whatsapp_message = "🚨 *NEW WEBSITE INQUIRY*\n\n";
    $whatsapp_message .= "📋 *CUSTOMER DETAILS:*\n";
    $whatsapp_message .= "👤 Name: $name\n";
    $whatsapp_message .= "📧 Email: $email\n";
    $whatsapp_message .= "📱 Phone: $phone\n";
    $whatsapp_message .= "🔧 Service: $service\n\n";
    $whatsapp_message .= "💬 *PROJECT DETAILS:*\n$message\n\n";
    $whatsapp_message .= "⏰ Time: $timestamp\n";
    $whatsapp_message .= "🌐 Source: Website Contact Form\n\n";
    $whatsapp_message .= "⚡ *PLEASE CONTACT THIS CUSTOMER!*";
    
    // Method 1: Using CallMeBot API (Free - requires setup)
    $callmebot_url = "https://api.callmebot.com/whatsapp.php?phone=$your_whatsapp&text=" . urlencode($whatsapp_message) . "&apikey=YOUR_API_KEY";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $callmebot_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    $callmebot_response = curl_exec($ch);
    $callmebot_http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($callmebot_http_code === 200) {
        echo json_encode(['success' => true, 'method' => 'CallMeBot', 'message' => 'WhatsApp message sent successfully']);
        exit;
    }
    
    // Method 2: Using WhatsApp Business API (if you have it set up)
    // This requires WhatsApp Business API credentials
    /*
    $whatsapp_api_url = "https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages";
    $whatsapp_api_data = [
        'messaging_product' => 'whatsapp',
        'to' => $your_whatsapp,
        'type' => 'text',
        'text' => ['body' => $whatsapp_message]
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $whatsapp_api_url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($whatsapp_api_data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer YOUR_ACCESS_TOKEN',
        'Content-Type: application/json'
    ]);
    $whatsapp_response = curl_exec($ch);
    $whatsapp_http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($whatsapp_http_code === 200) {
        echo json_encode(['success' => true, 'method' => 'WhatsApp Business API', 'message' => 'WhatsApp message sent successfully']);
        exit;
    }
    */
    
    // Method 3: Fallback - Send email notification
    $to = 'sriguruconsultancy05@gmail.com';
    $subject = '🚨 URGENT: New Website Inquiry - ' . $service;
    $email_body = "URGENT CUSTOMER INQUIRY\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Phone: $phone\n";
    $email_body .= "Service: $service\n";
    $email_body .= "Message: $message\n";
    $email_body .= "Time: $timestamp\n\n";
    $email_body .= "WhatsApp Link: https://wa.me/$phone?text=Hello%20" . urlencode($name) . ",%20thank%20you%20for%20contacting%20SRI%20GURU%20CONSTRUCTIONS.";
    
    $headers = "From: website@sriguruconstrutions.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Priority: 1\r\n";
    
    if (mail($to, $subject, $email_body, $headers)) {
        echo json_encode(['success' => true, 'method' => 'Email Fallback', 'message' => 'Email notification sent successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send notification']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Only POST method allowed']);
}
?>