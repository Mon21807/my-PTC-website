<?php
// mail.php - Cleaned version
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Prevent PHP from outputting errors as HTML (this breaks JSON)
error_reporting(E_ALL);
ini_set('display_errors', 0); 
ini_set('log_errors', 1);

// Headers for JSON and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Include PHPMailer files
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

function SendMail($recipient_email, $subject, $firstName, $lastName, $senderEmail, $message)
{
    try {
        $mail = new PHPMailer(true);
        
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        
        // Credentials
        $mail->Username = 'ptcjos2016@gmail.com';     
        $mail->Password = 'vzqyzcvjgvarvmxo';  // Use your 16-character App Password
        
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        
        $mail->setFrom('ptcjos2016@gmail.com', 'PTC Contact Form');
        $mail->addAddress($recipient_email, 'PTC Jos');
        $mail->addReplyTo($senderEmail, $firstName . ' ' . $lastName);
        
        $mail->isHTML(true);
        $mail->Subject = $subject;
        
      // HTML Email Body - EXACT MATCH TO IMAGE + LOGO
        $emailBody = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; border: 1px solid #eee; }
                
                /* Blue Header */
                .header { 
                    background: #1a56db; 
                    color: white; 
                    padding: 40px 20px; 
                    text-align: center; 
                }
                .header img {
                    max-width: 150px;
                    margin-bottom: 15px;
                    background: white; /* Optional: adds white background if logo is transparent */
                    padding: 5px;
                    border-radius: 5px;
                }
                .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
                .header p { margin: 10px 0 0; font-size: 18px; opacity: 0.9; }

                /* Content Area */
                .content { padding: 30px; background: #ffffff; }
                
                .field-group { margin-bottom: 25px; }
                
                .label { 
                    color: #1a56db; 
                    font-weight: bold; 
                    font-size: 18px; 
                    display: block; 
                    margin-bottom: 8px;
                }
                
                .value { 
                    font-size: 16px; 
                    color: #444; 
                    padding-left: 5px;
                }

                .footer { 
                    text-align: center; 
                    padding: 20px; 
                    font-size: 12px; 
                    color: #888; 
                    background: #f9f9f9;
                }
            </style>
        </head>
        <body>
            <div class='container'>
                <!-- Header with Logo -->
                <div class='header'>
                    <!-- REPLACE URL WITH YOUR ACTUAL LOGO LINK -->
                    <img src='https://your-website.com/images/logo.png' alt='PTC Logo'>
                    <h1>New Contact Form Submission</h1>
                    <p>Peace Training Centre, Jos</p>
                </div>

                <div class='content'>
                    <!-- Name Field -->
                    <div class='field-group'>
                        <span class='label'>👤 Name:</span>
                        <div class='value'>{$firstName} {$lastName}</div>
                    </div>

                    <!-- Email Field -->
                    <div class='field-group'>
                        <span class='label'>📧 Email:</span>
                        <div class='value'><a href='mailto:{$senderEmail}' style='color: #1a56db; text-decoration: underline;'>{$senderEmail}</a></div>
                    </div>

                    <!-- Subject Field -->
                    <div class='field-group'>
                        <span class='label'>📌 Subject:</span>
                        <div class='value'>{$subject}</div>
                    </div>

                    <!-- Message Field -->
                    <div class='field-group'>
                        <span class='label'>💬 Message:</span>
                        <div class='value' style='white-space: pre-wrap;'>" . nl2br(htmlspecialchars($message)) . "</div>
                    </div>
                </div>

                <div class='footer'>
                    <p>This message was sent from the PTC Website Contact Form</p>
                    <p>&copy; " . date('Y') . " Peace Training Centre</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        $mail->Body = $emailBody;
        $mail->AltBody = "Name: {$firstName} {$lastName}\nEmail: {$senderEmail}\n\nMessage:\n{$message}";
        
        $mail->send();
        return array('success' => true, 'message' => 'Your message has been sent successfully!');
        
    } catch (Exception $e) {
        return array('success' => false, 'message' => "Mailer Error: " . $mail->ErrorInfo);
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = isset($_POST['firstName']) ? trim($_POST['firstName']) : '';
    $lastName = isset($_POST['lastName']) ? trim($_POST['lastName']) : '';
    $senderEmail = isset($_POST['contactEmail']) ? trim($_POST['contactEmail']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['contactMessage']) ? trim($_POST['contactMessage']) : '';
    
    if (empty($firstName) || empty($lastName) || !filter_var($senderEmail, FILTER_VALIDATE_EMAIL) || empty($message)) {
        echo json_encode(array('success' => false, 'message' => 'Please fill all fields correctly.'));
        exit;
    }

    $orgEmail = 'ptcjos2016@gmail.com'; 
    $fullSubject = "PTC Website Contact: " . $subject;
    
    // Call the function and echo the ACTUAL result
    $result = SendMail($orgEmail, $fullSubject, $firstName, $lastName, $senderEmail, $message);
    echo json_encode($result);
    exit;
} else {
    echo json_encode(array('success' => false, 'message' => 'Invalid request method.'));
}
?>