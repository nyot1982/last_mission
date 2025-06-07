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
                    // Varios destinatarios
                    $para  = 'marcpinyot@gmail.com'.', '; // atención a la coma
                    $para .= 'marcpinyot@hotmail.com';

                    // título
                    $título = 'Creación de cuenta online multiplayer';

                    // mensaje
                    $mensaje = '<html><head><title>Creación de cuenta</title></head><body><p>¡Datos del registro!</p><table><tr><th>Quien</th><th>Día</th><th>Mes</th><th>Año</th></tr><tr><td>Marc</td><td>3</td><td>Agosto</td><td>1970</td></tr><tr><td>Marc</td><td>17</td><td>Agosto</td><td>1973</td></tr></table></body></html>';

                    // Para enviar un correo HTML, debe establecerse la cabecera Content-type
                    $cabeceras  = 'MIME-Version: 1.0'."\r\n";
                    $cabeceras .= 'Content-type: text/html; charset=utf-8'."\r\n";

                    // Cabeceras adicionales
                    $cabeceras .= 'To: Marc Pinyot Gascón <marcpinyot@gmail.com>, Marc Pinyot Gascón <marcpinyot@hotmail.com>'."\r\n";
                    $cabeceras .= 'From: Marc Pinyot Gascón <marcpinyot@gmail.com>'."\r\n";

                    // Enviarlo
                    mail ($para, $título, $mensaje, $cabeceras);
                    //mb_send_mail ($para, $titulo, $mensaje, $cabeceras);
                ?>
            </article>
        </main>
    </body>
</html>