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
        $resultado = $mysqli->query ('SELECT * FROM players WHERE email = "'.$_POST ['email'].'" AND password = "'.$_POST ['password'].'"');
        if ($mysqli->errno) $return ["error"] = 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
        else
        {
            if ($resultado->num_rows == 0) $return ["error"] = 'Wrong credentials';
            else
            {
                $player = $resultado->fetch_assoc ();
                if ($player ['validated'] == 0) $return ["error"] = 'Account not validated';
                else $return ["player"] = [ 'id' => intval ($player ['id']), 'validated' => intval ($player ['validated']), 'email' => $player ['email'], 'user' => $player ['user'], 'password' => $player ['password'], 'skins' => $player ['skins'] ];
            }
            $resultado->free ();
        }
    }
    if (isset ($mysqli)) $mysqli->close ();
    echo json_encode ($return);