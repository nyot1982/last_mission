<?php
    if (!isset ($_POST ['fetch_call']) OR $_POST ['fetch_call'] != "fetch_origin")
    {
        header ("Location: /");
        exit ();
    }
    else header ("Content-type: application/json");

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
    require '../vendor/autoload.php';


    $mysqli = new mysqli ('localhost', 'nyot', '$P33dM4n1982', 'last_mission');
    $mysqli->query ("SET NAMES 'utf8'");
    if ($mysqli->connect_errno) $return ["error"] = 'Error! Conexion has failed: ('.$mysqli->connect_errno.') '.$mysqli->connect_error;
    else
    {
        $resultado = $mysqli->query ('SELECT * FROM players WHERE email = "'.$_POST ['email'].'"');
        if ($mysqli->errno) $return ["error"] = 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
        else
        {
            if ($resultado->num_rows > 0) $return ["error"] = 'E.mail already exists';
            else
            {
                $mysqli->query ('INSERT INTO players VALUES (NULL, 0, "'. $_POST ['email'].'", "", "'.$_POST ['password'].'", "'.$_POST ['color'].'", "")');
                if ($mysqli->errno) $return ["error"] = 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                else
                {
                    $return ["ok"] = "Player created.";
                    if (isset ($_SERVER ['HTTPS'])) $path = 'https://';
                    else $path = 'http://';
                    $path .= $_SERVER ['HTTP_HOST'].dirname ($_SERVER ['PHP_SELF']);

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
                    $refreshToken = '1//03jqCrJOXf6zGCgYIARAAGAMSNwF-L9Ir4EDsxmJzE1j_Pe5cC-apNWULpjQiRcOD67iVqHwx0knh6h_zPO8sJ-vPUIYzDVh9s_Y';

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
                    $mail->addAddress ($_POST ['email']);

                    //Set the subject 
                    $mail->Subject = 'Validate your player e.mail';

                    //Read an HTML message body from an external file, convert referenced images to embedded,

                    $mail->CharSet = PHPMailer::CHARSET_UTF8;
                    $mail->msgHTML ('<!DOCTYPE html>
                    <html lang="en" style="margin: 0; padding: 0; overflow: hidden;">
                        <head>
                            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                            <title>Last Mission - Validate your player e.mail</title>
                        </head>
                        <body style="margin: 0; padding: 0; font-size: 14pt; font-family: Arial, Helvetica, sans-serif; text-align: left; overflow: auto;">
                            <div align="center">
                                <img width="203" height="92" src="cid:title" alt="Last Mission">
                                <h1>Player created.</h1>
                            </div>
                            <p>Validate your emlail to activate the player account by clicking on the following link:</p>
                            <div align="center">
                                <a href="'.$path.'/validate_email.php"><h2>Validate e.mail</h2></a>
                            </div>
                        </body>
                    </html>
                    ');

                    //Replace the plain text body with one created manually
                    $mail->AltBody = 'This is a plain-text message body';

                    $mail->AddEmbeddedImage ('../img/title.png','title', 'title.png'); 

                    //send the message, check for errors
                    if (!$mail->send ()) $return ['ok'] .= ' Mailer Error: '.$mail->ErrorInfo;
                    else $return ['ok'] .= ' E.mail sent.';
                }
            }
            $resultado->free ();
        }
    }
    if (isset ($mysqli)) $mysqli->close ();
    echo json_encode ($return);