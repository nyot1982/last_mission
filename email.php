<!DOCTYPE html>
<html lang="en">
    <head>
        <base href="/last_mission/">
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Last Mission email</title>
        <meta name="description" content="Last Mission">
        <meta name="keywords" content="last mission">
        <link rel="shortcut icon" href="favicon.ico">
        <link rel="apple-touch-icon" href="favicon.png">
        <link rel="stylesheet" href="css/game_styles.css" type="text/css">
        <script type="text/javascript" src="js/jquery-3.7.1.min.js"></script>
    </head>
    <body>
        <main>
            <article>
                <?php
                    // Import PHPMailer classes into the global namespace
                    require 'vendor/autoload.php';

                    use PHPMailer\PHPMailer\PHPMailer;
                    use PHPMailer\PHPMailer\SMTP;
                    use PHPMailer\PHPMailer\Exception;
                    use League\OAuth2\Client\Provider\Google;
                    use League\OAuth2\Client\Token\AccessToken;

                    // Google OAuth configuration
                    $googleClientId = '1023851977928-6oevi32erk1hj8pv0886j9ti17i72irk.apps.googleusercontent.com';
                    $googleClientSecret = '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';
                    $googleRedirectUri = 'https://pinyot.ddns.net';
                    $googleRefreshToken = 'YOUR_GOOGLE_REFRESH_TOKEN';

                    // Create a Google OAuth2 provider instance
                    $provider = new Google
                    ([
                        'clientId' => $googleClientId,
                        'clientSecret' => $googleClientSecret,
                        'redirectUri' => $googleRedirectUri
                    ]);

                    // Create an AccessToken instance
                    $token = new AccessToken
                    ([
                        'refresh_token' => $googleRefreshToken
                    ]);

                    // Create a PHPMailer instance
                    $mail = new PHPMailer (true);

                    //Tell PHPMailer to use SMTP
                    $mail->isSMTP ();

                    //Enable SMTP debugging
                    //SMTP::DEBUG_OFF = off (for production use)
                    //SMTP::DEBUG_CLIENT = client messages
                    //SMTP::DEBUG_SERVER = client and server messages
                    $mail->SMTPDebug = SMTP::DEBUG_SERVER;

                    //Set the hostname of the mail server
                    $mail->Host = 'smtp.gmail.com';
                    //Use `$mail->Host = gethostbyname('smtp.gmail.com');`
                    //if your network does not support SMTP over IPv6,
                    //though this may cause issues with TLS

                    //Set the SMTP port number:
                    // - 465 for SMTP with implicit TLS, a.k.a. RFC8314 SMTPS or
                    // - 587 for SMTP+STARTTLS
                    $mail->Port = 465;

                    //Set the encryption mechanism to use:
                    // - SMTPS (implicit TLS on port 465) or
                    // - STARTTLS (explicit TLS on port 587)
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;

                    //Whether to use SMTP authentication
                    $mail->SMTPAuth = true;

                    //Username to use for SMTP authentication - use full email address for gmail
                    $mail->Username = 'marcpinyot@gmail.com';

                    //Password to use for SMTP authentication
                    $mail->Password = '$P33dM4n1982+3,14nYoT';

                    //Set who the message is to be sent from
                    //Note that with gmail you can only use your account address (same as `Username`)
                    //or predefined aliases that you have configured within your account.
                    //Do not use user-submitted addresses in here
                    $mail->setFrom('marcpinyot@gmail.com', 'Marc Pinyot Gascón');

                    //Set an alternative reply-to address
                    //This is a good place to put user-submitted addresses
                    $mail->addReplyTo('marcpinyot@hotmail.com', '3,14 nYoT');

                    //Set who the message is to be sent to
                    $mail->addAddress('marcpinyot@hotmail.com', 'Joan Dau');

                    //Set the subject line
                    $mail->Subject = 'PHPMailer GMail SMTP test';

                    //Read an HTML message body from an external file, convert referenced images to embedded,
                    //convert HTML into a basic plain-text alternative body
                    $mail->msgHTML(file_get_contents('contentsutf8.html'), __DIR__);

                    //Replace the plain text body with one created manually
                    $mail->AltBody = 'This is a plain-text message body';

                    //Attach an image file
                    $mail->addAttachment('favicon.png');

                    //send the message, check for errors
                    if (!$mail->send()) {
                        echo 'Mailer Error: ' . $mail->ErrorInfo;
                    } else {
                        echo 'Message sent!';
                    }
                ?>
            </article>
        </main>
    </body>
</html>