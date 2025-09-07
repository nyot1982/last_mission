<?php
    /*if ((!isset ($_POST ['fetch_call']) || $_POST ['fetch_call'] != "fetch_origin") && (!isset ($_GET ['code']) || !isset ($_GET ['state'])))
    {
        header ("Location: /");
        exit ();
    }
    else */header ("Content-type: application/json");

    use League\OAuth2\Client\Provider\Google;

    require '../vendor/autoload.php';

    session_start ();

    $clientId = '686557513597-ekg78s28rmsistjf7i8a8o9g8qc5gi02.apps.googleusercontent.com';
    $clientSecret = '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';
    //$clientId = $_POST ['client_id'];
    //$clientSecret = $_POST ['client_secret'];

    $redirectUri = (isset ($_SERVER ['HTTPS']) ? 'https://' : 'http://').$_SERVER ['HTTP_HOST'].$_SERVER ['PHP_SELF'];
    $params =
    [
        'clientId' => $clientId,
        'clientSecret' => $clientSecret,
        'redirectUri' => $redirectUri,
        'accessType' => 'offline'
    ];
    $provider = new Google ($params);
    $options =
    [
        'scope' =>
        [
            'https://mail.google.com/'
        ]
    ];
    if ($provider === null) $return ['error'] = 'Provider missing';
    else if (!isset ($_GET ['code']))
    {
        $authUrl = $provider->getAuthorizationUrl ($options);
        $_SESSION ['oauth2state'] = $provider->getState ();
        header ("Location: ".$authUrl);
        exit;
    }
    else if (empty ($_GET ['state']) || ($_GET ['state'] !== $_SESSION ['oauth2state']))
    {
        unset ($_SESSION ['oauth2state']);   
        $return ['error'] = 'Invalid state';
    }
    else
    {
        unset ($_SESSION ['oauth2state']);   
        $token = $provider->getAccessToken
        (
            'authorization_code',
            [
                'code' => $_GET ['code']
            ]
        );
        $refreshToken = htmlspecialchars ($token->getRefreshToken ());
        $return ['ok'] = $refreshToken;
    }
    echo json_encode ($return);