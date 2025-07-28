<?php
    if (!isset ($_POST ['fetch_call']) OR $_POST ['fetch_call'] != "fetch_origin")
    {
        header ("Location: /");
        exit ();
    }
    else header ("Content-type: application/json");

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
                $resultado->free ();
                $resultado = $mysqli->query ('INSERT INTO players VALUES (NULL, 0, "'. $_POST ['email'].'", "", "'.$_POST ['password'].'", "")');
                if ($mysqli->errno) $return ["error"] = 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                else $return ["player"] = ['validated' => 0, 'email' => $_POST ['email'], 'name' => '', 'password' => $_POST ['password'], 'skins' => ''];
            }
            $resultado->free ();
        }
    }
    if (isset ($mysqli)) $mysqli->close ();
    echo json_encode ($return);