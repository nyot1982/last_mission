<?php
    /**
     * This example shows how to send via Google's Gmail servers using XOAUTH2 authentication
     * using the league/oauth2-client to provide the OAuth2 token.
     * To use a different OAuth2 library create a wrapper class that implements OAuthTokenProvider and
     * pass that wrapper class to PHPMailer::setOAuth().
     */

    //Import PHPMailer classes into the global namespace
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\OAuth;
    //Alias the League Google OAuth2 provider class
    use League\OAuth2\Client\Provider\Google;

    //SMTP needs accurate times, and the PHP time zone MUST be set
    //This should be done in your php.ini, but this is how to do it if you don't have access to that
    date_default_timezone_set ('Etc/UTC');

    //Load dependencies from composer
    //If this causes an error, run 'composer install'
    require 'vendor/autoload.php';
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <base href="/last_mission/">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Last Mission</title>
        <meta name="description" content="Last Mission">
        <meta name="keywords" content="last mission">
        <link rel="shortcut icon" href="favicon.ico">
        <link rel="apple-touch-icon" href="favicon.png">
    </head>
    <body style="margin: 0; padding: 1em; overflow: auto; font-size: 14px; white-space: nowrap;">
        <?php
            //Create a new PHPMailer instance
            $mail = new PHPMailer ();

            //Tell PHPMailer to use SMTP
            $mail->isSMTP ();

            //Enable SMTP debugging
            //SMTP::DEBUG_OFF (0): Normal production setting; no debug output.
            //SMTP::DEBUG_CLIENT (1): show client -> server messages only. Don't use this - it's very unlikely to tell you anything useful.
            //SMTP::DEBUG_SERVER (2): show client -> server and server -> client messages - this is usually the setting you want
            //SMTP::DEBUG_CONNECTION (3): As 2, but also show details about the initial connection; only use this if you're having trouble connecting (e.g. connection timing out)
            //SMTP::DEBUG_LOWLEVEL (4): As 3, but also shows detailed low-level traffic. Only really useful for analyzing protocol-level bugs, very verbose, probably not what you need.
            $mail->SMTPDebug = SMTP::DEBUG_OFF;

            //Set the hostname of the mail server
            $mail->Host = 'smtp.gmail.com';

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

            //Set AuthType to use XOAUTH2
            $mail->AuthType = 'XOAUTH2';

            //Use league/oauth2-client as OAuth2 token provider
            //Fill in authentication details here
            //Either the gmail account owner, or the user that gave consent
            $email = 'marcpinyot@gmail.com';
            $clientId = '686557513597-ekg78s28rmsistjf7i8a8o9g8qc5gi02.apps.googleusercontent.com';
            $clientSecret = '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';

            //Obtained by configuring and running get_oauth_token.php
            //after setting up an app in Google Developer Console.
            $refreshToken = '1//03ZJ78h6zt7HaCgYIARAAGAMSNwF-L9Ir74pVHi5UzIC-lUOAWSH2YuvznFgxpTiNtZUAy_DCri8zYj6VWR_0jWHakHtUEAO7QXw';

            //Create a new OAuth2 provider instance
            $provider = new Google
            (
                [
                    'clientId' => $clientId,
                    'clientSecret' => $clientSecret,
                ]
            );

            //Pass the OAuth provider instance to PHPMailer
            $mail->setOAuth
            (
                new OAuth
                (
                    [
                        'provider' => $provider,
                        'clientId' => $clientId,
                        'clientSecret' => $clientSecret,
                        'refreshToken' => $refreshToken,
                        'userName' => $email,
                    ]
                )
            );

            //Set who the message is to be sent from
            //For gmail, this generally needs to be the same as the user you logged in as
            $mail->setFrom ($email, 'Last Mission');

            //Set who the message is to be sent to
            $mail->addAddress ('marcpinyot@hotmail.com', 'Marc Pinyot Gascón');

            //Set the subject 
            if (isset ($_SERVER ['HTTPS'])) $mail->Subject = 'https://';
            else $mail->Subject = 'http://';
            $mail->Subject .= $_SERVER ['HTTP_HOST'].$_SERVER ['PHP_SELF'];

            //Read an HTML message body from an external file, convert referenced images to embedded,
            //convert HTML into a basic plain-text alternative body
            $mail->CharSet = PHPMailer::CHARSET_UTF8;
            $mail->msgHTML (file_get_contents ('contentsutf8.html'), __DIR__);

            //Replace the plain text body with one created manually
            $mail->AltBody = 'This is a plain-text message body';

            //send the message, check for errors
            if (!$mail->send ()) echo 'Mailer Error: '.$mail->ErrorInfo;
            else echo 'Message sent!';
        ?>
    </body>
</html>