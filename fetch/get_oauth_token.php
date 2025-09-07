<?php
    if ((!isset ($_POST ['fetch_call']) || $_POST ['fetch_call'] != "fetch_origin") && (!isset ($_GET ['code']) || !isset ($_GET ['state'])))
    {
        header ("Location: /");
        exit ();
    }
    else header ("Content-type: application/json");

    //Import League Google OAuth2 provider class
    use League\OAuth2\Client\Provider\Google;

    //Load dependencies from composer
    //If this causes an error, run 'composer install'
    require '../vendor/autoload.php';

    if (!isset ($_GET ['code']))
    {
        //If you don't want to use the built-in form, set your client id and secret here
        $clientId = $_POST ['client_id'];
        $clientSecret = $_POST ['client_secret'];

        //If this automatic URL doesn't work, set it yourself manually to the URL of this script
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
        else
        {
            //If we don't have an authorization code then get one
            $authUrl = $provider->getAuthorizationUrl ($options);
            $_SESSION ['provider'] = $provider;
            $_SESSION ['oauth2state'] = $provider->getState ();
            header ("Access-Control-Allow-Origin: *");
            header ("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
            header ("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
            header ("Allow: GET, POST, OPTIONS, PUT, DELETE");
            header ("Location: ".$authUrl);
            exit;
        }
    }
    else if (empty ($_GET ['state']) || ($_GET ['state'] !== $_SESSION ['oauth2state']))
    {
        //Check given state against previously stored one to mitigate CSRF attack
        unset ($_SESSION ['provider']);
        unset ($_SESSION ['oauth2state']);
        $return ['error'] = 'Invalid state';
    }
    else
    {
        //Try to get an access token (using the authorization code grant)
        $provider = $_SESSION ['provider'];
        $token = $provider->getAccessToken
        (
            'authorization_code',
            [
                'code' => $_GET ['code']
            ]
        );
        //Use this to interact with an API on the users behalf
        //Use this to get a new access token if the old one expires
        $refreshToken = htmlspecialchars ($token->getRefreshToken ());
        $return ['ok'] = $refreshToken;
    }
    echo json_encode ($return);