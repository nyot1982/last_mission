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
        <?php
            locale_set_default ('en-ES');
            ini_set ('date.timezone', 'Europe/Madrid');
            date_default_timezone_set ('Europe/Madrid');
            $mysqli = new mysqli ('localhost', 'nyot', '$P33dM4n1982', 'last_mission');
            $mysqli->query ("SET NAMES 'utf8'");
            if ($mysqli->connect_errno) $return ["error"] = 'Error! Conexion has failed: ('.$mysqli->connect_errno.') '.$mysqli->connect_error;
            else
            {
                $resultado = $mysqli->query ('SELECT * FROM skins ORDER BY id ASC');
                if ($mysqli->errno) $return ["error"] = 'Error! Query has failed: ('.$mysqli->errno.') '.$mysqli->error;
                else
                {
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
                }
            }
            if (isset ($mysqli)) $mysqli->close ();
        ?>
    </head>
    <body>
        <preloader><div class="spinner"></div></preloader>
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
                <div id="lifesHud" class="floatHuds"></div>
                <div id="rollover"></div>
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
                                        <div id="fire0" class="weaponHud fire0 active">LASER</div>
                                    </div>
                                    <div class="col center">
                                        <div id="fire1power" class="fa fa-fw fa-burst weaponExtra fire1"></div><div id="fire1rate" class="fa fa-fw fa-clock weaponExtra fire1"></div>
                                        <div id="fire1" class="weaponHud fire1">PULS</div>
                                    </div>
                                    <div class="col center">
                                        <div id="fire2power" class="fa fa-fw fa-burst weaponExtra fire2"></div><div id="fire2rate" class="fa fa-fw fa-clock weaponExtra fire2"></div>
                                        <div id="fire2" class="weaponHud fire2">K-CAN</div>
                                    </div>
                                    <div class="col center">
                                        <div id="fire3power" class="fa fa-fw fa-burst weaponExtra fire3"></div><div id="fire3rate" class="fa fa-fw fa-clock weaponExtra fire3"></div>
                                        <div id="fire3" class="weaponHud fire3">HYPER</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="hudEnemy">
                            <p>&nbsp;</p>
                            <p><b>ENEMY</b></p>
                            <div id="enemyHud"><div id="enemyHud2"></div></div>
                        </div>
                    </div>
                    <div class="col center">
                        <div id="hudVitals">
                            <p><b>VITALS</b></p>
                            <div class="blackHud">
                                <div class="fa fa-fw fa-heart levelIcon" title="Life"></div><div class="levelHud" id="lifeHud" title="Life"></div><br>
                                <div class="fa fa-fw fa-gas-pump levelIcon" title="Fuel"></div><div class="levelHud" id="fuelHud" title="Fuel"></div><br>
                                <div class="fa fa-fw fa-crosshairs levelIcon" title="Ammo"></div><div class="levelHud" id="ammoHud" title="Ammo"></div><br>
                                <div class="fa fa-fw fa-shield-halved levelIcon" title="Shield"></div><div class="levelHud" id="shieldHud" title="Shield"></div><br>
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
                    <div class="col center no-margin" style="width: 154px;">
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
                <div id="blackScreen"></div>
            </article>
        </main>
    </body>
</html>