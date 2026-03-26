<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Last Mission</title>
        <base href="/last_mission/">
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="language" content="English">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Last Mission">
        <meta name="keywords" content="last mission">
        <link rel="shortcut icon" href="favicon.ico">
        <link rel="apple-touch-icon" href="favicon.png">
        <link rel="alternate" href="http://example.com/en" hreflang="en">
        <link rel="stylesheet" href="css/fontawesome.css" type="text/css">
        <link rel="stylesheet" href="css/brands.css" type="text/css">
        <link rel="stylesheet" href="css/regular.css" type="text/css">
        <link rel="stylesheet" href="css/solid.css" type="text/css">
        <link rel="stylesheet" href="css/game_styles.css" type="text/css">
        <script type="text/javascript">wssServer = "<?=(isset ($_SERVER ['HTTPS']) ? 'wss://' : 'ws://').$_SERVER ['HTTP_HOST'].':4000'?>";</script>
        <script type="text/javascript" src="js/jquery-3.7.1.min.js"></script>
        <script type="text/javascript" src="js/tinycolor.min.js"></script>
        <script type="text/javascript" src="js/game_scripts.js"></script>
        <script type="text/javascript" src="js/game_screen.js"></script>
        <script type="text/javascript" src="js/game_controls.js"></script>
        <script type="text/javascript" src="js/game_multiplayer.js"></script>
        <script type="text/javascript" src="js/game_ground.js"></script>
        <script type="text/javascript" src="js/game_ships.js"></script>
        <script type="text/javascript" src="js/game_enemies.js"></script>
        <script type="text/javascript" src="js/game_bosses.js"></script>
        <script type="text/javascript" src="js/game_objects.js"></script>
        <script type="text/javascript" src="js/game_hud.js"></script>
    </head>
    <body>
        <preloader><div class="spinner"></div></preloader>
        <?php
            locale_set_default ('en-ES');
            ini_set ('date.timezone', 'Europe/Madrid');
            date_default_timezone_set ('Europe/Madrid');
            $db_host = 'localhost';
            $db_user = 'nyot';
            $db_pass = '$P33dM4n1982';
            $db_name = 'last_mission';
            $db_tables = [];
            $mysqli = new mysqli ($db_host, $db_user, $db_pass);
            if ($mysqli->connect_errno)
            {
                echo 'Error! Conexion has failed: ('.$mysqli->connect_errno.') '.$mysqli->connect_error;
                exit ();
            }
            $mysqli->query ("SET NAMES 'utf8'");
            $mysqli->query ("SET time_zone = '+01:00'");
            $resultado = $mysqli->query ('SHOW DATABASES LIKE "'.$db_name.'"');
            if ($mysqli->errno)
            {
                echo 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                exit ();
            }
            if ($mysqli->errno)
            {
                echo 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                exit ();
            }
            if ($resultado->num_rows == 0)
            {
                $resultado->free ();
                $mysqli->query ('CREATE DATABASE `'.$db_name.'` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci');
                if ($mysqli->errno)
                {
                    echo 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                    exit ();
                }
            }
            $mysqli->close ();
            $mysqli = new mysqli ($db_host, $db_user, $db_pass, $db_name);
            if ($mysqli->connect_errno)
            {
                echo 'Error! Conexion has failed: ('.$mysqli->connect_errno.') '.$mysqli->connect_error;
                exit ();
            }
            $mysqli->query ("SET NAMES 'utf8'");
            $mysqli->query ("SET time_zone = '+01:00'");
            $resultado = $mysqli->query ('SHOW TABLES');
            if ($mysqli->errno)
            {
                echo 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                exit ();
            }
            if ($resultado->num_rows > 0)
            {
                while ($db_table = $resultado->fetch_column()) $db_tables [] = $db_table;
                $resultado->free ();
            }
            if (!in_array ('high_scores', $db_tables))
            {   
                $mysqli->query (
                    'CREATE TABLE `high_scores`
                    (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `name` varchar(999) NOT NULL,
                        `score` int(11) NOT NULL,
                        PRIMARY KEY (`id`)
                    )
                    ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
                );
                if ($mysqli->errno)
                {
                    echo 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                    exit ();
                }
            }
            if (!in_array ('players', $db_tables))
            {  
                $mysqli->query (
                    'CREATE TABLE `players`
                    (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `validated` tinyint(1) NOT NULL DEFAULT 0,
                        `email` varchar(999) NOT NULL,
                        `name` varchar(11) DEFAULT NULL,
                        `password` varchar(12) NOT NULL,
                        `color` varchar(11) NOT NULL,
                        `skins` varchar(999) NOT NULL,
                        `xp` int(5) NOT NULL DEFAULT 0,
                        `game_music` tinyint(1) DEFAULT NULL,
                        `game_sound` tinyint(1) DEFAULT NULL,
                        `fps_monitor` tinyint(1) DEFAULT NULL,
                        `user_actions` varchar(9999) DEFAULT NULL,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `name` (`name`) USING BTREE,
                        UNIQUE KEY `email` (`email`) USING HASH
                    )
                    ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
                );
                if ($mysqli->errno)
                {
                    echo 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                    exit ();
                }
                $mysqli->query (
                    "INSERT INTO `players` (`id`, `validated`, `email`, `name`, `password`, `color`, `skins`, `xp`, `game_music`, `game_sound`, `fps_monitor`, `user_actions`) VALUES
                    (1, 1, 'marcpinyot@hotmail.com', 'π·nYoT', '\$P33dM4n1982', 'skin16', '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99', 10000, 0, 0, 0, '[{\"screen\":[\"menu\",\"modal_menu\"],\"action\":\"strafe_up\",\"keyboard\":{\"keys\":[40]},\"gamepad\":{\"buttons\":[13],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"menu\",\"modal_menu\"],\"action\":\"strafe_down\",\"keyboard\":{\"keys\":[38]},\"gamepad\":{\"buttons\":[12],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"menu\",\"modal_menu\"],\"action\":\"fire_menu\",\"keyboard\":{\"keys\":[13,32]},\"gamepad\":{\"buttons\":[0],\"axes\":[]},\"joystick\":{\"buttons\":[0],\"axes\":[]}},{\"screen\":[\"modal_continue\"],\"action\":\"close_continue\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[9,16],\"axes\":[]},\"joystick\":{\"buttons\":[7],\"axes\":[]}},{\"screen\":[\"modal_exit\"],\"action\":\"close_exit\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[9,16],\"axes\":[]},\"joystick\":{\"buttons\":[7],\"axes\":[]}},{\"screen\":[\"modal_menu\"],\"action\":\"close_modal\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[9,16],\"axes\":[]},\"joystick\":{\"buttons\":[7],\"axes\":[]}},{\"screen\":[\"confirm\"],\"action\":\"confirm_yes\",\"keyboard\":{\"keys\":[89]},\"gamepad\":{\"buttons\":[9],\"axes\":[]},\"joystick\":{\"buttons\":[1],\"axes\":[]}},{\"screen\":[\"confirm\"],\"action\":\"confirm_no\",\"keyboard\":{\"keys\":[78]},\"gamepad\":{\"buttons\":[8],\"axes\":[]},\"joystick\":{\"buttons\":[0],\"axes\":[]}},{\"screen\":[\"input\"],\"action\":\"input_change\",\"keyboard\":{\"keys\":[9]},\"gamepad\":{\"buttons\":[],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[]}},{\"screen\":[\"input\"],\"action\":\"input_exit\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[2,8],\"axes\":[]},\"joystick\":{\"buttons\":[2],\"axes\":[]}},{\"screen\":[\"skins\"],\"action\":\"skin_left\",\"keyboard\":{\"keys\":[37]},\"gamepad\":{\"buttons\":[10],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[0]}},{\"screen\":[\"skins\"],\"action\":\"skin_right\",\"keyboard\":{\"keys\":[39]},\"gamepad\":{\"buttons\":[11],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[0]}},{\"screen\":[\"skins\"],\"action\":\"skin_up\",\"keyboard\":{\"keys\":[40]},\"gamepad\":{\"buttons\":[13],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"skins\"],\"action\":\"skin_down\",\"keyboard\":{\"keys\":[38]},\"gamepad\":{\"buttons\":[12],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"skins\"],\"action\":\"unlock_skin\",\"keyboard\":{\"keys\":[13,32]},\"gamepad\":{\"buttons\":[0],\"axes\":[]},\"joystick\":{\"buttons\":[0],\"axes\":[]}},{\"screen\":[\"skins\"],\"action\":\"skins_exit\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[2,8],\"axes\":[]},\"joystick\":{\"buttons\":[2],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"move_front\",\"title\":\"Move forward\",\"editable\":true,\"keyboard\":{\"keys\":[38]},\"gamepad\":{\"buttons\":[6],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"game\"],\"action\":\"move_back\",\"title\":\"Move backward\",\"editable\":true,\"keyboard\":{\"keys\":[40]},\"gamepad\":{\"buttons\":[7],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"game\"],\"action\":\"turn_left\",\"title\":\"Turn left\",\"editable\":true,\"keyboard\":{\"keys\":[37]},\"gamepad\":{\"buttons\":[],\"axes\":[0]},\"joystick\":{\"buttons\":[],\"axes\":[0]}},{\"screen\":[\"game\"],\"action\":\"turn_right\",\"title\":\"Turn right\",\"editable\":true,\"keyboard\":{\"keys\":[39]},\"gamepad\":{\"buttons\":[],\"axes\":[0]},\"joystick\":{\"buttons\":[],\"axes\":[0]}},{\"screen\":[\"game\"],\"action\":\"strafe_left\",\"title\":\"Strafe left\",\"editable\":true,\"keyboard\":{\"keys\":[90]},\"gamepad\":{\"buttons\":[4],\"axes\":[]},\"joystick\":{\"buttons\":[2],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"strafe_right\",\"title\":\"Strafe right\",\"editable\":true,\"keyboard\":{\"keys\":[88]},\"gamepad\":{\"buttons\":[5],\"axes\":[]},\"joystick\":{\"buttons\":[3],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"change_weapon\",\"title\":\"Fire mode\",\"editable\":true,\"keyboard\":{\"keys\":[9]},\"gamepad\":{\"buttons\":[3,8],\"axes\":[]},\"joystick\":{\"buttons\":[1],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"fire\",\"title\":\"Fire\",\"editable\":true,\"keyboard\":{\"keys\":[32]},\"gamepad\":{\"buttons\":[0],\"axes\":[]},\"joystick\":{\"buttons\":[0],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"moveZ\",\"title\":\"Take off / Land\",\"editable\":true,\"keyboard\":{\"keys\":[17]},\"gamepad\":{\"buttons\":[1,2],\"axes\":[]},\"joystick\":{\"buttons\":[6],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"open_modal\",\"title\":\"Menu\",\"editable\":false,\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[9,16],\"axes\":[]},\"joystick\":{\"buttons\":[7],\"axes\":[]}}]'),
                    (2, 1, 'mpg_2@hotmail.com', 'Player', '\$P33dM4n1982', 'skin13', '13', 114, 0, 1, 0, '[{\"screen\":[\"menu\",\"modal_menu\"],\"action\":\"strafe_up\",\"keyboard\":{\"keys\":[40]},\"gamepad\":{\"buttons\":[13],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"menu\",\"modal_menu\"],\"action\":\"strafe_down\",\"keyboard\":{\"keys\":[38]},\"gamepad\":{\"buttons\":[12],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"menu\",\"modal_menu\"],\"action\":\"fire_menu\",\"keyboard\":{\"keys\":[13,32]},\"gamepad\":{\"buttons\":[0],\"axes\":[]},\"joystick\":{\"buttons\":[0],\"axes\":[]}},{\"screen\":[\"modal_continue\"],\"action\":\"close_continue\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[9,16],\"axes\":[]},\"joystick\":{\"buttons\":[7],\"axes\":[]}},{\"screen\":[\"modal_exit\"],\"action\":\"close_exit\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[9,16],\"axes\":[]},\"joystick\":{\"buttons\":[7],\"axes\":[]}},{\"screen\":[\"modal_menu\"],\"action\":\"close_modal\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[9,16],\"axes\":[]},\"joystick\":{\"buttons\":[7],\"axes\":[]}},{\"screen\":[\"confirm\"],\"action\":\"confirm_yes\",\"keyboard\":{\"keys\":[89]},\"gamepad\":{\"buttons\":[9],\"axes\":[]},\"joystick\":{\"buttons\":[1],\"axes\":[]}},{\"screen\":[\"confirm\"],\"action\":\"confirm_no\",\"keyboard\":{\"keys\":[78]},\"gamepad\":{\"buttons\":[8],\"axes\":[]},\"joystick\":{\"buttons\":[0],\"axes\":[]}},{\"screen\":[\"input\"],\"action\":\"input_change\",\"keyboard\":{\"keys\":[9]},\"gamepad\":{\"buttons\":[],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[]}},{\"screen\":[\"input\"],\"action\":\"input_exit\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[2,8],\"axes\":[]},\"joystick\":{\"buttons\":[2],\"axes\":[]}},{\"screen\":[\"skins\"],\"action\":\"skin_left\",\"keyboard\":{\"keys\":[37]},\"gamepad\":{\"buttons\":[10],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[0]}},{\"screen\":[\"skins\"],\"action\":\"skin_right\",\"keyboard\":{\"keys\":[39]},\"gamepad\":{\"buttons\":[11],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[0]}},{\"screen\":[\"skins\"],\"action\":\"skin_up\",\"keyboard\":{\"keys\":[40]},\"gamepad\":{\"buttons\":[13],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"skins\"],\"action\":\"skin_down\",\"keyboard\":{\"keys\":[38]},\"gamepad\":{\"buttons\":[12],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"skins\"],\"action\":\"unlock_skin\",\"keyboard\":{\"keys\":[13,32]},\"gamepad\":{\"buttons\":[0],\"axes\":[]},\"joystick\":{\"buttons\":[0],\"axes\":[]}},{\"screen\":[\"skins\"],\"action\":\"skins_exit\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[2,8],\"axes\":[]},\"joystick\":{\"buttons\":[2],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"move_front\",\"title\":\"Move forward\",\"editable\":true,\"keyboard\":{\"keys\":[38]},\"gamepad\":{\"buttons\":[6],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"game\"],\"action\":\"move_back\",\"title\":\"Move backward\",\"editable\":true,\"keyboard\":{\"keys\":[40]},\"gamepad\":{\"buttons\":[7],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"game\"],\"action\":\"turn_left\",\"title\":\"Turn left\",\"editable\":true,\"keyboard\":{\"keys\":[37]},\"gamepad\":{\"buttons\":[],\"axes\":[0]},\"joystick\":{\"buttons\":[],\"axes\":[0]}},{\"screen\":[\"game\"],\"action\":\"turn_right\",\"title\":\"Turn right\",\"editable\":true,\"keyboard\":{\"keys\":[39]},\"gamepad\":{\"buttons\":[],\"axes\":[0]},\"joystick\":{\"buttons\":[],\"axes\":[0]}},{\"screen\":[\"game\"],\"action\":\"strafe_left\",\"title\":\"Strafe left\",\"editable\":true,\"keyboard\":{\"keys\":[90]},\"gamepad\":{\"buttons\":[4],\"axes\":[]},\"joystick\":{\"buttons\":[2],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"strafe_right\",\"title\":\"Strafe right\",\"editable\":true,\"keyboard\":{\"keys\":[88]},\"gamepad\":{\"buttons\":[5],\"axes\":[]},\"joystick\":{\"buttons\":[3],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"change_weapon\",\"title\":\"Fire mode\",\"editable\":true,\"keyboard\":{\"keys\":[9]},\"gamepad\":{\"buttons\":[3,8],\"axes\":[]},\"joystick\":{\"buttons\":[1],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"fire\",\"title\":\"Fire\",\"editable\":true,\"keyboard\":{\"keys\":[32]},\"gamepad\":{\"buttons\":[0],\"axes\":[]},\"joystick\":{\"buttons\":[0],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"moveZ\",\"title\":\"Take off / Land\",\"editable\":true,\"keyboard\":{\"keys\":[17]},\"gamepad\":{\"buttons\":[1,2],\"axes\":[]},\"joystick\":{\"buttons\":[6],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"open_modal\",\"title\":\"Menu\",\"editable\":false,\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[9,16],\"axes\":[]},\"joystick\":{\"buttons\":[7],\"axes\":[]}}]'),
                    (3, 1, 'nyot1982@gmail.com', 'zorron', 'puta', '#ffffff', '', 0, 0, 0, 0, '[{\"screen\":[\"menu\",\"modal_menu\"],\"action\":\"strafe_up\",\"keyboard\":{\"keys\":[40]},\"gamepad\":{\"buttons\":[13],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"menu\",\"modal_menu\"],\"action\":\"strafe_down\",\"keyboard\":{\"keys\":[38]},\"gamepad\":{\"buttons\":[12],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"menu\",\"modal_menu\"],\"action\":\"fire_menu\",\"keyboard\":{\"keys\":[13,32]},\"gamepad\":{\"buttons\":[0],\"axes\":[]},\"joystick\":{\"buttons\":[0],\"axes\":[]}},{\"screen\":[\"modal_continue\"],\"action\":\"close_continue\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[9,16],\"axes\":[]},\"joystick\":{\"buttons\":[7],\"axes\":[]}},{\"screen\":[\"modal_exit\"],\"action\":\"close_exit\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[9,16],\"axes\":[]},\"joystick\":{\"buttons\":[7],\"axes\":[]}},{\"screen\":[\"modal_menu\"],\"action\":\"close_modal\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[9,16],\"axes\":[]},\"joystick\":{\"buttons\":[7],\"axes\":[]}},{\"screen\":[\"confirm\"],\"action\":\"confirm_yes\",\"keyboard\":{\"keys\":[89]},\"gamepad\":{\"buttons\":[9],\"axes\":[]},\"joystick\":{\"buttons\":[1],\"axes\":[]}},{\"screen\":[\"confirm\"],\"action\":\"confirm_no\",\"keyboard\":{\"keys\":[78]},\"gamepad\":{\"buttons\":[8],\"axes\":[]},\"joystick\":{\"buttons\":[0],\"axes\":[]}},{\"screen\":[\"input\"],\"action\":\"input_change\",\"keyboard\":{\"keys\":[9]},\"gamepad\":{\"buttons\":[],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[]}},{\"screen\":[\"input\"],\"action\":\"input_exit\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[2,8],\"axes\":[]},\"joystick\":{\"buttons\":[2],\"axes\":[]}},{\"screen\":[\"skins\"],\"action\":\"skin_left\",\"keyboard\":{\"keys\":[37]},\"gamepad\":{\"buttons\":[14],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[0]}},{\"screen\":[\"skins\"],\"action\":\"skin_right\",\"keyboard\":{\"keys\":[39]},\"gamepad\":{\"buttons\":[15],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[0]}},{\"screen\":[\"skins\"],\"action\":\"skin_up\",\"keyboard\":{\"keys\":[40]},\"gamepad\":{\"buttons\":[13],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"skins\"],\"action\":\"skin_down\",\"keyboard\":{\"keys\":[38]},\"gamepad\":{\"buttons\":[12],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"skins\"],\"action\":\"unlock_skin\",\"keyboard\":{\"keys\":[13,32]},\"gamepad\":{\"buttons\":[0],\"axes\":[]},\"joystick\":{\"buttons\":[0],\"axes\":[]}},{\"screen\":[\"skins\"],\"action\":\"skins_exit\",\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[2,8],\"axes\":[]},\"joystick\":{\"buttons\":[2],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"move_front\",\"title\":\"Move forward\",\"editable\":true,\"keyboard\":{\"keys\":[38]},\"gamepad\":{\"buttons\":[7],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"game\"],\"action\":\"move_back\",\"title\":\"Move backward\",\"editable\":true,\"keyboard\":{\"keys\":[40]},\"gamepad\":{\"buttons\":[6],\"axes\":[]},\"joystick\":{\"buttons\":[],\"axes\":[1]}},{\"screen\":[\"game\"],\"action\":\"turn_left\",\"title\":\"Turn left\",\"editable\":true,\"keyboard\":{\"keys\":[37]},\"gamepad\":{\"buttons\":[],\"axes\":[0,2]},\"joystick\":{\"buttons\":[],\"axes\":[0]}},{\"screen\":[\"game\"],\"action\":\"turn_right\",\"title\":\"Turn right\",\"editable\":true,\"keyboard\":{\"keys\":[39]},\"gamepad\":{\"buttons\":[],\"axes\":[0,2]},\"joystick\":{\"buttons\":[],\"axes\":[0]}},{\"screen\":[\"game\"],\"action\":\"strafe_left\",\"title\":\"Strafe left\",\"editable\":true,\"keyboard\":{\"keys\":[90]},\"gamepad\":{\"buttons\":[4],\"axes\":[]},\"joystick\":{\"buttons\":[2],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"strafe_right\",\"title\":\"Strafe right\",\"editable\":true,\"keyboard\":{\"keys\":[88]},\"gamepad\":{\"buttons\":[5],\"axes\":[]},\"joystick\":{\"buttons\":[3],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"change_weapon\",\"title\":\"Fire mode\",\"editable\":true,\"keyboard\":{\"keys\":[9]},\"gamepad\":{\"buttons\":[3,8],\"axes\":[]},\"joystick\":{\"buttons\":[1],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"fire\",\"title\":\"Fire\",\"editable\":true,\"keyboard\":{\"keys\":[32]},\"gamepad\":{\"buttons\":[0],\"axes\":[]},\"joystick\":{\"buttons\":[0],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"moveZ\",\"title\":\"Take off / Land\",\"editable\":true,\"keyboard\":{\"keys\":[17]},\"gamepad\":{\"buttons\":[1,2],\"axes\":[]},\"joystick\":{\"buttons\":[6],\"axes\":[]}},{\"screen\":[\"game\"],\"action\":\"open_modal\",\"title\":\"Menu\",\"editable\":false,\"keyboard\":{\"keys\":[27]},\"gamepad\":{\"buttons\":[9,16],\"axes\":[]},\"joystick\":{\"buttons\":[7],\"axes\":[]}}]')"
                );
                if ($mysqli->errno)
                {
                    echo 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                    exit ();
                }
            }
            if (!in_array ('skins', $db_tables))
            {  
                $mysqli->query (
                    'CREATE TABLE `skins`
                    (
                        `id` int(11) NOT NULL,
                        `name` varchar(999) NOT NULL,
                        `ship_fill` varchar(999) DEFAULT NULL,
                        `gun_fill` varchar(999) DEFAULT NULL,
                        `hook1_fill` varchar(999) DEFAULT NULL,
                        `hook2_fill` varchar(999) DEFAULT NULL,
                        `wing1_fill` varchar(999) DEFAULT NULL,
                        `wing2_fill` varchar(999) DEFAULT NULL,
                        `engine1_fill` varchar(999) DEFAULT NULL,
                        `engine2_fill` varchar(999) DEFAULT NULL,
                        `ship_stroke` varchar(999) DEFAULT NULL,
                        `engine1_stroke` varchar(999) DEFAULT NULL,
                        `engine2_stroke` varchar(999) DEFAULT NULL,
                        `light_stroke` varchar(999) DEFAULT NULL,
                        PRIMARY KEY (`id`)
                    )
                    ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
                );
                if ($mysqli->errno)
                {
                    echo 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                    exit ();
                }
                $mysqli->query (
                    "INSERT INTO `skins` (`id`, `name`, `ship_fill`, `gun_fill`, `hook1_fill`, `hook2_fill`, `wing1_fill`, `wing2_fill`, `engine1_fill`, `engine2_fill`, `ship_stroke`, `engine1_stroke`, `engine2_stroke`, `light_stroke`) VALUES
                    (0, 'Rambo', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (1, 'Jungle', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (2, 'Blood', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (3, 'Water', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (4, 'Urban', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (5, 'Arctic', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (6, 'Desert', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (7, 'Rude Boy', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (8, 'Tiger', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (9, 'Leopard', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (10, 'Cow', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (11, 'Zebra', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (12, 'Giraffe', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (13, 'Bricks', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (14, 'Catalunya', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (15, 'Cuba', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (16, 'Puerto Rico', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (17, 'Jamaica', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (18, 'Spain', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (19, 'USA', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (20, 'Brazil', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#302681'),
                    (21, 'United Kingdom ', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (22, 'France', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#FFFFFF'),
                    (23, 'Colombia', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (24, 'Germany', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (25, 'Euskadi', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (26, 'Switzerland', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#FFFFFF'),
                    (27, 'Argentina', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#DFCAA9'),
                    (28, 'Macedonia', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#FFFF00'),
                    (29, 'Japan', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#BE0834'),
                    (30, 'Nazi', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (31, 'FC Barcelona', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (32, 'Real Madrid', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (33, 'Atlético Madrid', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (34, 'RCD Espanyol', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (35, 'Girona FC', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (36, 'CA Boca Juniors', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (37, 'CA River Plate', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (38, 'América de Cali', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#D81B21'),
                    (39, 'Paris Saint-Germain', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (40, 'Liverpool FC', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (41, 'Manchester City', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (42, 'FC Bayern München', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (43, 'Borussia Dortmund', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (44, 'AC Milan', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (45, 'FC Inter Milan', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (46, 'SSC Napoli', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (47, 'Paint', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (48, 'Rainbow', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (49, 'Rainbow 2', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (50, 'J Spade', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, '#FF0000', '#FF0000', '#FFFFFF', NULL, NULL, NULL),
                    (51, 'Q Heart', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, '#000000', '#000000', '#FFFFFF', NULL, NULL, NULL),
                    (52, 'K Diamond', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, '#000000', '#000000', '#FFFFFF', NULL, NULL, NULL),
                    (53, 'A Club', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, '#FF0000', '#FF0000', '#FFFFFF', NULL, NULL, NULL),
                    (54, 'Pool Ball 1', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (55, 'Pool Ball 2', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (56, 'Pool Ball 3', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (57, 'Pool Ball 4', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (58, 'Pool Ball 5', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (59, 'Pool Ball 6', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (60, 'Pool Ball 7', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (61, 'Pool Ball 8', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (62, 'Pool Ball 9', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#FFFFFF66'),
                    (63, 'Pool Ball 10', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#FFFFFF66'),
                    (64, 'Pool Ball 11', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#FFFFFF66'),
                    (65, 'Pool Ball 12', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#FFFFFF66'),
                    (66, 'Pool Ball 13', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#FFFFFF66'),
                    (67, 'Pool Ball 14', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#FFFFFF66'),
                    (68, 'Pool Ball 15', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#FFFFFF66'),
                    (69, 'X-Wing', '#CCC9B6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (70, 'Joan Miró', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (71, 'Joan Miró 2', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (72, '5 €', '#4E6253', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#4E6253', NULL, NULL, NULL),
                    (73, '10 €', '#BB3022', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#BB3022', NULL, NULL, NULL),
                    (74, '20 €', '#3673AA', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#3673AA', NULL, NULL, NULL),
                    (75, '50 €', '#6C524D', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#6C524D', NULL, NULL, NULL),
                    (76, '100 €', '#526346', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#526346', NULL, NULL, NULL),
                    (77, '200 €', '#94703F', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#94703F', NULL, NULL, NULL),
                    (78, '500 €', '#523764', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#523764', NULL, NULL, NULL),
                    (79, 'Pirate', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
                    (80, 'Templar', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, '#000000', '#000000', NULL, NULL, NULL, '#F70E02'),
                    (81, 'Saint George', '#FFFFFF', NULL, NULL, NULL, NULL, NULL, '#000000', '#000000', NULL, NULL, NULL, '#FA241C'),
                    (82, 'Batman', '#000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#000000'),
                    (83, 'Joker', '#A6F23A', '#9555CB', NULL, NULL, '#9555CB', '#9555CB', '#A6F23A', '#A6F23A', NULL, NULL, NULL, NULL),
                    (84, 'Ironman', '#8A1C23', '#BF9B53', '#BF9B53', '#BF9B53', '#8A1C23', '#8A1C23', '#BF9B53', '#BF9B53', '#BF9B53', '#8A1C23', '#8A1C23', NULL),
                    (85, 'Optimus Prime', '#D60018', '#B5BECF', '#B5BECF', '#B5BECF', '#0849A8', '#0849A8', '#B5BECF', '#B5BECF', '#000000', '#0849A8', '#0849A8', '#82BBDE'),
                    (86, 'The A Team', '#000000', '#000000', '#E73035', '#E73035', '#000000', '#000000', '#E73035', '#E73035', NULL, NULL, NULL, '#000000'),
                    (87, 'Taxi', '#000000', '#FFFF00', '#FFFF00', '#FFFF00', '#000000', '#000000', '#FFFF00', '#FFFF00', NULL, NULL, NULL, NULL),
                    (88, 'Mosso', '#084B96', '#FFFFFF', '#E7091F', '#E7091F', '#084B96', '#084B96', '#FFFFFF', '#FFFFFF', '#000000', NULL, NULL, NULL),
                    (89, 'Picoleto', '#007A51', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#007A51', '#007A51', '#FFFFFF', '#FFFFFF', '#000000', NULL, NULL, NULL),
                    (90, 'Fluor Mix', '#FFBB00', '#FF3333', '#FF00CC', '#CC00FF', '#00FF33', '#CCFF00', '#0033FF', '#00CCFF', NULL, NULL, NULL, '#FFFFFF'),
                    (91, 'Red Velvet', '#9A3942', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#DB3043', '#DB3043', '#FFFFFF', '#FFFFFF', '#000000', NULL, NULL, '#FFFFFF'),
                    (92, 'Cheese Cake', '#FFFFAA', '#D29D6B', '#B14649', '#B14649', '#FFFFAA', '#FFFFAA', '#B14649', '#B14649', '#000000', NULL, NULL, '#D29D6B'),
                    (93, 'Ducati MotoGP', '#FF0000', '#800000', '#0000FF', '#0000FF', '#800000', '#800000', '#000000', '#000000', '#FFFFFF', NULL, NULL, '#800000'),
                    (94, 'Mario', '#135FAA', '#E6221D', '#FCEE00', '#FCEE00', '#E6221D', '#E6221D', '#C23D1C', '#C23D1C', '#FFFFFF', NULL, NULL, '#FFFFFF'),
                    (95, 'Luigi', '#005794', '#5CA82C', '#FCEE00', '#FCEE00', '#5CA82C', '#5CA82C', '#C23D1C', '#C23D1C', '#FFFFFF', NULL, NULL, '#FFFFFF'),
                    (96, 'Peach', '#FF99C4', '#FFEA2D', NULL, NULL, '#FFFFFF', '#FFFFFF', '#FF6290', '#FF6290', '#FFFFFF', NULL, NULL, '#42B7FB'),
                    (97, 'Yoshi', '#FFFFFF', '#5FD549', '#5FD549', '#5FD549', '#5FD549', '#5FD549', '#FD874D', '#FD874D', '#FFFFFF', NULL, NULL, '#EB4635'),
                    (98, 'Wario', '#BD46AC', '#FFFC35', '#FFFFFF', '#FFFFFF', '#FFFC35', '#FFFC35', '#2F993A', '#2F993A', '#FFFFFF', NULL, NULL, '#5759F3'),
                    (99, 'Toad', '#FFFFFF', '#FA3231', '#1B19F9', '#1B19F9', '#FDDEAD', '#FDDEAD', '#8E4A36', '#8E4A36', '#FFFFFF', NULL, NULL, '#FFE327')"
                );
                if ($mysqli->errno)
                {
                    echo 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                    exit ();
                }
            }
            if (!in_array ('vars', $db_tables))
            {  
                $mysqli->query (
                    'CREATE TABLE `vars`
                    (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `name` varchar(999) NOT NULL,
                        `value` varchar(999) NOT NULL,
                        PRIMARY KEY (`id`)
                    )
                    ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci'
                );
                if ($mysqli->errno)
                {
                    echo 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                    exit ();
                }
                $mysqli->query ("INSERT INTO `vars` VALUES (1, 'refresh_token', '0123456789abcdef')");
                if ($mysqli->errno)
                {
                    echo 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                    exit ();
                }
            }
            $resultado = $mysqli->query ('SELECT * FROM `skins` ORDER BY `id` ASC');
            if ($mysqli->errno)
            {
                echo 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                exit ();
            }
            echo '<script type="text/javascript">';
                while ($skin = $resultado->fetch_assoc ())
                {
                    echo 'skins.push ({
                        name: '.($skin ['name'] != null ? '"'.$skin ['name'].'"' : 'null').',
                        shipFill: '.($skin ['ship_fill'] != null ? '"'.$skin ['ship_fill'].'"' : 'null').',
                        gunFill: '.($skin ['gun_fill'] != null ? '"'.$skin ['gun_fill'].'"' : 'null').',
                        hook1Fill: '.($skin ['hook1_fill'] != null ? '"'.$skin ['hook1_fill'].'"' : 'null').',
                        hook2Fill: '.($skin ['hook2_fill'] != null ? '"'.$skin ['hook2_fill'].'"' : 'null').',
                        wing1Fill: '.($skin ['wing1_fill'] != null ? '"'.$skin ['wing1_fill'].'"' : 'null').',
                        wing2Fill: '.($skin ['wing2_fill'] != null ? '"'.$skin ['wing2_fill'].'"' : 'null').',
                        engine1Fill: '.($skin ['engine1_fill'] != null ? '"'.$skin ['engine1_fill'].'"' : 'null').',
                        engine2Fill: '.($skin ['engine2_fill'] != null ? '"'.$skin ['engine2_fill'].'"' : 'null').',
                        lightFill: "#7B797B",
                        shipStroke: '.($skin ['ship_stroke'] != null ? '"'.$skin ['ship_stroke'].'"' : 'null').',
                        engine1Stroke: '.($skin ['engine1_stroke'] != null ? '"'.$skin ['engine1_stroke'].'"' : 'null').',
                        engine2Stroke: '.($skin ['engine2_stroke'] != null ? '"'.$skin ['engine2_stroke'].'"' : 'null').',
                        lightStroke: '.($skin ['light_stroke'] != null ? '"'.$skin ['light_stroke'].'"' : 'null').'
                    });
                    ';
                    if (file_exists ('skins/'.$skin ['id'].'.png')) echo 'skins [skins.length - 1].image = new Image (); skins [skins.length - 1].image.src = "skins/'.$skin ['id'].'.png"; ';
                    else echo 'skins [skins.length - 1].image = null; ';
                }
                $resultado->free ();
            echo '</script>';
            if (isset ($mysqli)) $mysqli->close ();
        ?>
        <main>
            <article>
                <form id="players" name="players" action="javascript: void (0);" onsubmit="javascript: submitForm (this);" method="POST">
                    <div style="margin-left: -40px;">>>> Enter your ship name:</div>
                    <input id="99" name="name" type="text" autocomplete="name" maxlength="11" required oninput="javascript: this.setCustomValidity ('');"> <a title="Mouse interaction" class="fa fa-mouse fa-beat interaction"></a>
                    <input type="submit" value="Start game"> <a title="Mouse interaction" class="fa fa-mouse fa-beat interaction"></a>
                </form>
                <form id="player" name="player" action="javascript: void (0);" onsubmit="javascript: fetchLoad ('player', 'name=' + this.name.value + '&color=' + this.color.value + '&skin=' + this.skin.value);" method="POST">
                    <div style="margin-left: -40px;">>>> Enter your ship name:</div>
                    <input id="name" name="name" type="text" autocomplete="name" maxlength="11" required oninput="javascript: this.setCustomValidity ('');"> <a title="Mouse interaction" class="fa fa-mouse fa-beat interaction"></a>
                    <div style="margin-top: 10px;">Select your ship color:</div>
                    <input id="color" name="color" type="color" maxlength="11" required onchange="javascript: changeColor (this.value);"> <a title="Mouse interaction" class="fa fa-mouse fa-beat interaction"></a>
                    <div style="margin-top: 10px;">Select your ship skin:</div>
                    <select id="skin" name="skin" onchange="javascript: changeSkin (this.value);">
                        <option value="-1"></option>
                    </select> <input type="button" value="Skins" onClick="javascript: $('#blackScreen').fadeIn (1000); setTimeout (() => { gameLoadScreen ('skins'); }, 1000);"> <a title="Mouse interaction" class="fa fa-mouse fa-beat interaction"></a>
                    <input id="xp" name="xp" type="hidden">
                    <input type="submit" value="Start game"> <input type="button" value="Save config" onClick="javascript: fetchLoad ('config_save');"> <a title="Mouse interaction" class="fa fa-mouse fa-beat interaction"></a>
                </form>
                <form id="sign" name="sign" action="javascript: void (0);" onsubmit="javascript: fetchLoad (this.action.value, 'email=' + this.email.value + '&password=' + this.password.value + (this.action.value == 'sign_up' ? '&color=' + playerColors [0] : ''));" method="POST">
                    <div style="margin-left: -40px;">>>> Enter your e.mail:</div>
                    <input id="email" name="email" type="email" autocomplete="email" maxlength="999" required oninput="javascript: this.setCustomValidity ('');"> <a title="Mouse interaction" class="fa fa-mouse fa-beat interaction"></a>
                    <div style="margin-top: 10px;">Enter your password:</div>
                    <input id="password" name="password" type="password" autocomplete="current-password" maxlength="12" required oninput="javascript: this.setCustomValidity ('');"> <a title="Mouse interaction" class="fa fa-mouse fa-beat interaction"></a>
                    <input id="action" name="action" type="hidden" value=""><br>
                    <input type="submit" value="Sign in" onclick="javascript: if (parent.action.value == 'sign_up') { parent.email.setCustomValidity (''); parent.password.setCustomValidity (''); } parent.action.value='sign_in';"> <input type="submit" value="Sign up" onclick="javascript: if (parent.action.value == 'sign_in') { parent.email.setCustomValidity (''); parent.password.setCustomValidity (''); } parent.action.value='sign_up';"> <a title="Mouse interaction" class="fa fa-mouse fa-beat interaction"></a>
                </form>
                <div id="scoreHud" class="floatHuds"></div>
                <div id="highScoreHud" class="floatHuds"></div>
                <div id="lifesHud" class="floatHuds" onclick="javascript: if (usersPlayingDetails != 1 && usersPlayingDetails != 2) usersPlayingDetails = 1; else usersPlayingDetails = -1;"></div>
                <div class="cont-cols huds">
                    <div class="col center">
                        <div id="hudSpeedAltitude">
                            <p><b>SPEED</b></p>
                            <?php include_once "svgs/speed.svg"; ?>
                            <p>&nbsp;</p>
                            <p><b>ALTITUDE</b></p>
                            <div id="zHud" class="blackHud">0 m</div>
                        </div>
                        <div id="hudsMulti"></div>
                    </div>
                    <div class="col center">
                        <div id="hudWeapons">
                            <p><b>WEAPON SYSTEM</b></p>
                            <div class="blackHud">
                                <div class="cont-cols no-margin">
                                    <div class="col center">
                                        <div id="fire0power" class="fa fa-fw fa-burst weaponExtra fire0"></div><div id="fire0rate" class="fa fa-fw fa-clock weaponExtra fire0"></div>
                                        <div id="fire0" class="weaponsHud fire0 active">LASER</div>
                                    </div>
                                    <div class="col center">
                                        <div id="fire1power" class="fa fa-fw fa-burst weaponExtra fire1"></div><div id="fire1rate" class="fa fa-fw fa-clock weaponExtra fire1"></div>
                                        <div id="fire1" class="weaponsHud fire1">PULS</div>
                                    </div>
                                    <div class="col center">
                                        <div id="fire2power" class="fa fa-fw fa-burst weaponExtra fire2"></div><div id="fire2rate" class="fa fa-fw fa-clock weaponExtra fire2"></div>
                                        <div id="fire2" class="weaponsHud fire2">K-CAN</div>
                                    </div>
                                    <div class="col center">
                                        <div id="fire3power" class="fa fa-fw fa-burst weaponExtra fire3"></div><div id="fire3rate" class="fa fa-fw fa-clock weaponExtra fire3"></div>
                                        <div id="fire3" class="weaponsHud fire3">HYPER</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="hudEnemy">
                            <p>&nbsp;</p>
                            <p><b>ENEMY</b></p>
                            <div id="enemiesHud"><div id="enemiesHud2"></div></div>
                        </div>
                    </div>
                    <div class="col center">
                        <div id="hudVitals">
                            <p><b>VITALS</b></p>
                            <div class="blackHud">
                                <div class="fa fa-fw fa-heart levelIcon" title="Life"></div><div class="levelHud" id="lifeHud" title="Life" style="width: 0px;"></div><br>
                                <div class="fa fa-fw fa-gas-pump levelIcon" title="Fuel"></div><div class="levelHud" id="fuelHud" title="Fuel" style="width: 0px;"></div><br>
                                <div class="fa fa-fw fa-crosshairs levelIcon" title="Ammo"></div><div class="levelHud" id="ammoHud" title="Ammo" style="width: 0px;"></div><br>
                                <div class="fa fa-fw fa-shield-halved levelIcon" title="Shield"></div><div class="levelHud" id="shieldHud" title="Shield" style="width: 0px;"></div><br>
                                <div class="level2Hud"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col center">
                        <div id="hudHeading">
                            <p><b>HEADING</b></p>
                            <div class="turnHud">
                                <div id="headingHud">
                                    <div class="e5">W</div><div>|</div><div class="e5">NW</div><div>|</div><div class="e1">N</div><div>|</div><div class="e5">NE</div><div>|</div><div class="e1">E</div><div>|</div><div class="e5">SE</div><div>|</div><div class="e1">S</div><div>|</div><div class="e5">SW</div><div>|</div><div class="e1">W</div><div>|</div><div class="e5">NW</div><div>|</div><div class="e1">N</div><div>|</div><div class="e5">NE</div><div>|</div><div class="e1">E</div><div>|</div><div class="e5">SE</div><div>|</div><div class="e1">S</div><div>|</div><div class="e5">SW</div><div>|</div><div class="e1">W</div><div>|</div><div class="e5">NW</div><div>|</div><div class="e1">N</div><div>|</div><div class="e5">NE</div><div>|</div><div class="e1">E</div>
                                </div>
                            </div>
                        </div>
                        <p><b>MAP</b></p>
                        <div class="blackHud" id="mapHud">
                            <table cellspacing="0"><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr></table>
                        </div>
                    </div>
                    <div class="col no-margin center" style="width: 154px;">
                        <p><b>OPTIONS</b></p>
                        <div class="blackHud">
                            <p><span id="mode" class="fa fa-fw fa-times optionsIcon" title="No game mode selected"></span> <span class="fa fa-caret-left e1"></span> Mode</p>
                            <p><span class="fa fa-fw fa-volume optionsIcon" title="Sound"></span> <span class="fa fa-caret-right e1"></span> <span id="sound">On</span></p>
                            <p><span class="fa fa-fw fa-music optionsIcon" title="Music"></span> <span class="fa fa-caret-right e1"></span> <span id="music">On</span></p>
                        </div>
                        <div id="fps_monitor">
                            frame rate: <span id="frame_rate">0</span> <span title="Frames per second" style="cursor: default;">fps</span><br>
                            frame time: <span id="frame_time">0</span> <span title="Milliseconds" style="cursor: default;">ms</span>
                        </div>
                    </div>
                </div>
                <div class="keys">
                    <div class="keysContent">
                        <div class="tabs">
                            <a id="menu" href="javascript: changeTab ('menu');" class="tab active">MENU</a><a id="alert" href="javascript: changeTab ('alert');" class="tab">ALERT</a><a id="confirm" href="javascript: changeTab ('confirm');" class="tab">CONFIRM</a><a id="input" href="javascript: changeTab ('input');" class="tab">INPUT</a><a id="skins" href="javascript: changeTab ('skins');" class="tab">SKINS</a><a id="game" href="javascript: changeTab ('game');" class="tab">GAME</a><a title="Mouse interaction" class="fa fa-mouse fa-beat interaction" style="margin: 0 0 7px 4px;"></a>
                            <div class="tab fixed"><a id="keyboard" href="javascript: changeControl ('keyboard', null);" class="fa fa-keyboard active" title="Show keyboard controls"></a><a id="gamepad" href="javascript: changeControl ('gamepad', null);" class="fa fa-gamepad-modern" style="display: none;"title="Show gamepad controls"></a><a id="joystick" href="javascript: changeControl ('joystick', null);" class="fa fa-joystick" style="display: none;" title="Show joystick controls"></a></div><a title="Mouse interaction" class="fa fa-mouse fa-beat interaction" style="position: absolute; right: 6px; bottom: 7px;"></a>
                        </div>
                        <div id="menuTab-keyboard" class="tabContent cont-cols margin-1 active">
                            <div class="col">
                                <p><span class="fa fa-up key"></span> Move up</p>
                                <p><span class="fa fa-down key"></span> Move down</p>
                            </div>
                            <div class="col">
                                <p><span class="fa fa-turn-down-left key" style="width: 4em;"></span> / <span class="fa fa-horizontal-rule key" style="width: 9em;"></span> Select</p>
                                <p><span class="key2">Esc</span> Back / Game</p>
                            </div>
                        </div>
                        <div id="alertTab-keyboard" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p>&nbsp;</p>
                                <p><span class="key3">Any key</span> Continue</p>
                            </div>
                        </div>
                        <div id="confirmTab-keyboard" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p><span class="key">Y</span> Yes</p>
                                <p><span class="key">N</span> No</p>
                            </div>
                        </div>
                        <div id="inputTab-keyboard" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p><span class="key2">A-Z</span> Type</p>
                                <p><span class="fa fa-left-long key" style="width: 6em;"></span> Delete</p>
                            </div>
                            <div class="col">
                                <p><span class="fa fa-turn-down-left key" style="width: 4em;"></span> Accept</p>
                                <p><span class="key2">Esc</span> Cancel</p>
                            </div>
                            <div class="col">
                                <p><span class="key" style="width: 5em; padding: 0;"><span class="fa fa-left-long-to-line" style="display: block;"></span><span class="fa fa-right-long-to-line" style="display: block;"></span></span> Change input</p>
                                <p><span class="fa fa-left key"></span> / <span class="fa fa-right key"></span> / <span class="fa fa-down key"></span> / <span class="fa fa-up key"></span> Select</p>
                            </div>
                        </div>
                        <div id="skinsTab-keyboard" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p><span class="fa fa-left key"></span> / <span class="fa fa-right key"></span> / <span class="fa fa-down key"></span> / <span class="fa fa-up key"></span> Select</p>
                                <p><span class="fa fa-turn-down-left key" style="width: 4em;"></span> / <span class="fa fa-horizontal-rule key" style="width: 9em;"></span> Unlock</p>
                            </div>
                            <div class="col">
                                <p><span class="key2">Esc</span> Back</p>
                            </div>
                        </div>
                        <div id="gameTab-keyboard" class="tabContent cont-cols margin-1 toggle"></div>
                        <div id="menuTab-gamepad" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p><span class="button silver" style="padding: 0; line-height: 0; vertical-align: middle;"><span class="fa fa-square" style="display: block; color: red;"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square" style="display: block;"></span></span> Move up</p>
                                <p><span class="button silver" style="padding: 0; line-height: 0; vertical-align: middle;"><span class="fa fa-square" style="display: block;"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square" style="display: block; color: red;"></span></span> Move down</p>
                            </div>
                            <div class="col">
                                <p><span class="button green">A</span> Select</p>
                                <p><span class="button2">Start</span> Back / Game</p>
                            </div>
                        </div>

                        <div id="alertTab-gamepad" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p>&nbsp;</p>
                                <p><span class="button2 silver">Any button</span> Continue</p>
                            </div>
                        </div>
                        <div id="confirmTab-gamepad" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p><span class="button green">A</span> Yes</p>
                                <p><span class="button red">B</span> No</p>
                            </div>
                        </div>
                        <div id="inputTab-gamepad" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p><span class="key2">A-Z</span> Type</p>
                                <p><span class="fa fa-left-long key" style="width: 6em;"></span> Delete</p>
                            </div>
                            <div class="col">
                                <p><span class="button2">Start</span> Accept</p>
                                <p><span class="button green">A</span> Cancel</p>
                            </div>
                            <div class="col">
                                <p><span class="key" style="width: 5em; padding: 0;"><span class="fa fa-left-long-to-line" style="display: block;"></span><span class="fa fa-right-long-to-line" style="display: block;"></span></span> Change input</p>
                                <p><span class="button silver" style="padding: 0; line-height: 0; vertical-align: middle;"><span class="fa fa-square" style="display: block;"></span><span class="fa fa-square" style="color: red;"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square" style="display: block;"></span></span> / <span class="button silver" style="padding: 0; line-height: 0; vertical-align: middle;"><span class="fa fa-square" style="display: block;"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square" style="color: red;"></span><span class="fa fa-square" style="display: block;"></span></span> / <span class="button silver" style="padding: 0; line-height: 0; vertical-align: middle;"><span class="fa fa-square" style="display: block;"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square" style="display: block; color: red;"></span></span> / <span class="button silver" style="padding: 0; line-height: 0; vertical-align: middle;"><span class="fa fa-square" style="display: block; color: red;"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square" style="display: block;"></span></span> Select</p>
                            </div>
                        </div>
                        <div id="skinsTab-gamepad" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p><span class="button2">Start</span> Unlock</p>
                                <p><span class="button green">A</span> Back</p>
                            </div>
                            <div class="col">
                                <p><span class="button silver" style="padding: 0; line-height: 0; vertical-align: middle;"><span class="fa fa-square" style="display: block;"></span><span class="fa fa-square" style="color: red;"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square" style="display: block;"></span></span> / <span class="button silver" style="padding: 0; line-height: 0; vertical-align: middle;"><span class="fa fa-square" style="display: block;"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square" style="color: red;"></span><span class="fa fa-square" style="display: block;"></span></span> / <span class="button silver" style="padding: 0; line-height: 0; vertical-align: middle;"><span class="fa fa-square" style="display: block;"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square" style="display: block; color: red;"></span></span> / <span class="button silver" style="padding: 0; line-height: 0; vertical-align: middle;"><span class="fa fa-square" style="display: block; color: red;"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square" style="display: block;"></span></span> Select</p>
                            </div>
                        </div>
                        <div id="gameTab-gamepad" class="tabContent cont-cols margin-1 toggle"></div>
                        <div id="menuTab-joystick" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p><span class="button silver" style="padding: 0; line-height: 0; vertical-align: middle;"><span class="fa fa-square" style="display: block; color: red;"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square" style="display: block;"></span></span> Move up</p>
                                <p><span class="button silver" style="padding: 0; line-height: 0; vertical-align: middle;"><span class="fa fa-square" style="display: block;"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square"></span><span class="fa fa-square" style="display: block; color: red;"></span></span> Move down</p>
                            </div>
                            <div class="col">
                                <p><span class="button5">LT</span> / <span class="button6">RT</span> Select</p>
                                <p><span class="button2">Start</span> Back / Game</p>
                            </div>
                        </div>
                        <div id="alertTab-joystick" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p>&nbsp;</p>
                                <p><span class="button2 silver">Any button</span> Continue</p>
                            </div>
                        </div>
                        <div id="confirmTab-joystick" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p><span class="button green">A</span> Yes</p>
                                <p><span class="button red">B</span> No</p>
                            </div>
                        </div>
                        <div id="inputTab-joystick" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p><span class="key2">A-Z</span> Type</p>
                                <p><span class="fa fa-left-long key" style="width: 6em;"></span> Delete</p>
                            </div>
                            <div class="col">
                                <p><span class="fa fa-turn-down-left key" style="width: 4em;"></span> Accept</p>
                                <p><span class="key2">Esc</span> Cancel</p>
                            </div>
                            <div class="col">
                                <p><span class="fa fa-arrow-right-arrow-left key" style="width: 4em;"></span> Change input</p>
                                <p><span class="fa fa-left key"></span> / <span class="fa fa-right key"></span> / <span class="fa fa-down key"></span> / <span class="fa fa-up key"></span> Select</p>
                            </div>
                        </div>
                        <div id="skinsTab-joystick" class="tabContent cont-cols margin-1 toggle">
                            <div class="col">
                                <p><span class="fa fa-turn-down-left key" style="width: 4em;"></span> Unlock</p>
                                <p><span class="key2">Esc</span> Back</p>
                            </div>
                            <div class="col">
                                <p><span class="fa fa-left key"></span> / <span class="fa fa-right key"></span> / <span class="fa fa-down key"></span> / <span class="fa fa-up key"></span> Select</p>
                            </div>
                        </div>
                        <div id="gameTab-joystick" class="tabContent cont-cols margin-1 toggle"></div>
                    </div>
                </div>
                <div id="rollovers"></div>
                <div id="blackScreen"></div>
            </article>
        </main>
    </body>
</html>