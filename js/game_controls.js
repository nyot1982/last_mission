window.addEventListener ('keydown', keyDown);
window.addEventListener ('keyup', keyUp);
window.addEventListener ('gamepaddisconnected', gamepadDisconnected);
window.addEventListener ('gamepadconnected', gamepadConnected);

function controls ()
{
    var player = 2;
    for (const gamepad of navigator.getGamepads ())
    {
        if (!gamepad) continue;
        if (gameScreen == "menu" && (gameModes.findIndex (mode => mode.active == true) == 1 || gameModes.findIndex (mode => mode.active == true) == 2) && gameInput.findIndex (input => input.control == gamepad.index * 1) == -1 && gameInput.length > 0) gameInput.push (new component ("input", (storedPlayers [gameInput.length] && storedPlayers [gameInput.length].name) ? storedPlayers [gameInput.length].name : "Player " + player, "black", 750, 270 + 25 * (player - 2), "left", 10, 16, gamepad.index * 1));
        for (const [index, axis] of gamepad.axes.entries ())
        {
            if (axis.toFixed (2) * 1 != 0) axisStart (gamepad.index * 1, (gamepad.mapping == "standard" ? "gamepad" : gamepad.id.toLowerCase ().includes ("joystick") ? "joystick" : ""), index, axis.toFixed (2) * 1);
            else axisStop (gamepad.index * 1, (gamepad.mapping == "standard" ? "gamepad" : gamepad.id.toLowerCase ().includes ("joystick") ? "joystick" : ""), index);
        }
        for (const [index, button] of gamepad.buttons.entries ())
        {
            if (button.pressed || button.touched) buttonDown (gamepad.index * 1, (gamepad.mapping == "standard" ? "gamepad" : gamepad.id.toLowerCase ().includes ("joystick") ? "joystick" : ""), index, button.value.toFixed (2) * 1);
            else buttonUp (gamepad.index * 1, (gamepad.mapping == "standard" ? "gamepad" : gamepad.id.toLowerCase ().includes ("joystick") ? "joystick" : ""), index);
        }
        player++;
    }
}

function stopUserInteractions (player)
{
    var gameShip = gameShips.findIndex (ship => ship.name == players [player].name);
    if (gameModes.findIndex (mode => mode.active == true) == 0 || player == null)
    {
        keysPressed = [];
        buttonsPressed = [];
        axesPressed = [];
    }
    else
    {
        if (player == 0 || gameModes.findIndex (mode => mode.active == true) == 3) keysPressed = [];
        buttonsPressed [players [player].control] = [];
        axesPressed [players [player].control] = [];
    }
    gameShips [gameShip].firing (false);
    gameShips [gameShip].moving (0);
    gameShips [gameShip].movingZ (0);
    gameShips [gameShip].strafing (0);
    gameShips [gameShip].turning (0);
}

function gamepadDisconnected (e)
{
    var oldControl = gameControls [e.gamepad.index * 1];
    gameControls.splice (e.gamepad.index * 1, 1);
    if (gameScreen == "menu" && gameModes.findIndex (mode => mode.active == true) != 0 && gameModes.findIndex (mode => mode.active == true) != 3 && gameInput.length > 1) gameInput = gameInput.slice (e.gamepad.index * 1, 1);
    var controlFinded = null;
    for (const gamepad of navigator.getGamepads ())
    {
        if (!gamepad) continue;
        if (gamepad.mapping == "standard" && oldControl == "gamepad" || gamepad.id.toLowerCase ().includes ("joystick") && oldControl == "joystick") controlFinded = gamepad.index * 1;
    }
    buttonsPressed.splice (buttonsPressed.indexOf (e.gamepad.index * 1), 1);
    axesPressed.splice (axesPressed.indexOf (e.gamepad.index * 1), 1);
    if (controlFinded == null) changeControl ("keyboard", -1);
    else if (gameScreen == "game" && gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) players [0].control = controlFinded;
}

function gamepadConnected (e)
{
    if (e.gamepad.mapping == "standard") var newControl = "gamepad";
    else if (e.gamepad.id.toLowerCase ().includes ("joystick")) var newControl = "joystick";
    gameControls [e.gamepad.index * 1] = newControl;
    if (newControl && document.getElementById (newControl).style.display == 'none') $('#' + newControl).fadeIn (1000);
    buttonsPressed [e.gamepad.index * 1] = [];
    axesPressed [e.gamepad.index * 1] = [];
    if ((gameScreen == "menu" || gameScreen == "game" && gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) && controlTab != newControl) changeControl (newControl, e.gamepad.index * 1);
    if (gameAlert.length > 0)
    {
        gameAlert = [];
        if (gameInput.length > 0) changeTab ("input");
        else changeTab ("menu");
    }
}

function buttonDown (id_control, control, button)
{
    if (!buttonsPressed [id_control].includes (button))
    {
        buttonsPressed [id_control].push (button);
        if ((gameScreen == "menu" || gameScreen == "game" && gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) && controlTab != control) changeControl (control, id_control);
        if (gameScreen == "game" && gameShips.length > 0 && gameModal == null && gameConfirm.length == 0 && gameInput.length == 0)
        {
            if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) var gameShip = gameShips.findIndex (ship => ship.name == players [0].name);
            else
            {
                var player = players.findIndex (player => player.control == id_control);
                var gameShip = gameShips.findIndex (ship => ship.name == players [player].name);
            }
        }
        userActionStart (control, "buttons", button, 1, gameShip);
    }
}

function buttonUp (id_control, control, button)
{
    if (buttonsPressed [id_control].includes (button))
    {
        buttonsPressed [id_control].splice (buttonsPressed [id_control].indexOf (button), 1);
        if (gameScreen == "game" && gameShips.length > 0 && gameModal == null && gameConfirm.length == 0 && gameInput.length == 0)
        {
            if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) var gameShip = gameShips.findIndex (ship => ship.name == players [0].name);
            else
            {
                var player = players.findIndex (player => player.control == id_control);
                var gameShip = gameShips.findIndex (ship => ship.name == players [player].name);
            }
            userActionStop (control, "buttons", button, gameShip);
        }
    }
}

function axisStart (id_control, control, axis, value)
{
    if (!axesPressed [id_control].includes (axis)) axesPressed [id_control].push (axis);
    if ((gameScreen == "menu" || gameScreen == "game" && gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) && controlTab != control) changeControl (control, id_control);
    if (gameScreen == "game" && gameShips.length > 0 && gameModal == null && gameConfirm.length == 0 && gameInput.length == 0)
    {
        if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) var gameShip = gameShips.findIndex (ship => ship.name == players [0].name);
        else
        {
            var player = players.findIndex (player => player.control == id_control);
            var gameShip = gameShips.findIndex (ship => ship.name == players [player].name);
        }
    }
    if (axis == 0) userActionStart (control, "axes", axis, -value, gameShip);
    else userActionStart (control, "axes", axis, value, gameShip);
}

function axisStop (id_control, control, axis)
{
    if (axesPressed [id_control].includes (axis))
    {
        axesPressed [id_control].splice (axesPressed [id_control].indexOf (axis), 1);
        if (gameScreen == "game" && gameShips.length > 0 && gameModal == null && gameConfirm.length == 0 && gameInput.length == 0)
        {
            if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) var gameShip = gameShips.findIndex (ship => ship.name == players [0].name);
            else
            {
                var player = players.findIndex (player => player.control == id_control);
                var gameShip = gameShips.findIndex (ship => ship.name == players [player].name);
            }
            userActionStop (control, "axes", axis, gameShip);
        }
    }
}

function keyDown (e)
{
    e.preventDefault ();
    if (gameScreen == "menu" && gameInput.length > 0 && ((gameInput [idInputAct].type == "input" && e.keyCode != 9 && e.keyCode != 13 && e.keyCode != 27) || (gameInput [idInputAct].type == "skin" && e.keyCode > 36 && e.keyCode < 41)))
    {
        if (!keysPressed.includes (e.keyCode)) keysPressed.push (e.keyCode);
        if (gameInput [idInputAct].type == "input") userActionStart ("keyboard", null, (e.keyCode == 8 ? 8 : -1), e.key, gameShip);
        else if (gameInput [idInputAct].type == "skin") userActionStart ("keyboard", null, e.keyCode, null, gameShip);
    }
    else if (!keysPressed.includes (e.keyCode))
    {
        keysPressed.push (e.keyCode);
        if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2 && controlTab != "keyboard") changeControl ("keyboard", -1);
        if (gameScreen == "game" && gameShips.length > 0 && gameModal == null && gameConfirm.length == 0 && gameInput.length == 0) var gameShip = gameShips.findIndex (ship => ship.name == players [0].name);
        userActionStart ("keyboard", null, e.keyCode, 1, gameShip);
    }
}

function keyUp (e)
{
    if (keysPressed.includes (e.keyCode))
    {
        keysPressed.splice (keysPressed.indexOf (e.keyCode), 1);
        if (gameScreen == "game" && gameShips.length > 0 && gameModal == null && gameConfirm.length == 0 && gameInput.length == 0)
        {
            var gameShip = gameShips.findIndex (ship => ship.name == players [0].name);
            userActionStop ("keyboard", null, e.keyCode, gameShip);
        }
    }
}

function userActionStart (control, bt_type, bt_code, bt_value, gameShip)
{
    if (gameScreen == "start" && control == "keyboard")
    {
        gameSound.sounds =
        {
            type: new audio ("sound/type.wav", true),
            shot0: new audio ("sound/shot0.wav", false),
            shot1: new audio ("sound/shot1.wav", false),
            shot2: new audio ("sound/shot2.wav", false),
            shot3: new audio ("sound/shot3.wav", false),
            hit0: new audio ("sound/hit0.wav", false),
            hit1: new audio ("sound/hit1.wav", false),
            hit2: new audio ("sound/hit2.wav", false)
        };
        gameMusic.musics =
        {
            menu: new audio ("music/menu.mp3", true),
            game: new audio ("music/game.mp3", true),
            boss: new audio ("music/boss.mp3", true)
        };
    }
    else if (gameScreen == "intro")
    {
        if (!blackScreen)
        {
            blackScreen = true;
            $("#blackScreen").fadeIn (1000);
            setTimeout
            (
                () =>
                {
                    gameSound.sounds ["type"].stop ();
                    gameLoadScreen ("game");
                },
                1000
            );
        }
    }
    else if (gameScreen == "high_scores")
    {
        if (!blackScreen)
        {
            blackScreen = true;
            $("#blackScreen").fadeIn (1000);
            setTimeout
            (
                () =>
                {
                    gameLoadScreen ("menu");
                },
                1000
            );
        }
    }
    else if (gameScreen == "game_over" || gameScreen == "game_completed")
    {
        if (!blackScreen)
        {
            blackScreen = true;
            $("#blackScreen").fadeIn (1000);
            setTimeout
            (
                () =>
                {
                    gameSound.sounds ["type"].stop ();
                    gameLoadScreen ("high_scores");
                },
                1000
            );
        }
    }
    else if (gameAlert.length > 0)
    {
        gameAlert = [];
        if (gameInput.length > 0) changeTab ("input");
        else changeTab ("menu");
    }
    else
    {
        if (gameConfirm.length > 0) var screen = "confirm";
        else if (gameInput.length > 0 && gameAlert.length == 0) var screen = gameInput [idInputAct].type;
        else if (gameScreen == "menu" && menuShip != null && gameModal == null) var screen = "menu";
        else if (gameScreen == "game" && gameShips.length > 0 && gameModal == null) var screen = "game";
        else if (gameModal != null) var screen = "modal_" + gameModal;

        if (bt_type == null) var userAction = userActions.findIndex (action => action.screen.includes (screen) && action [control].includes (bt_code));
        else var userAction = userActions.findIndex (action => action.screen.includes (screen) && action [control][bt_type].includes (bt_code));

        if (userAction > -1)
        {
            switch (userActions [userAction].action)
            {
                case 'confirm_no':
                    gameConfirm = [];
                    changeTab ("menu");
                break;
                case 'confirm_yes':
                    if (!blackScreen)
                    {
                        if (gameModes.findIndex (mode => mode.active == true) == 3)
                        {
                            const data =
                            {
                                action: "start",
                                player_id: playerId,
                            };
                            wss.send (JSON.stringify (data));    
                        }
                        else
                        {
                            blackScreen = true;
                            $("#blackScreen").fadeIn (1000);
                            setTimeout
                            (
                                () =>
                                {
                                    gameLoadScreen ("menu");
                                },
                                1000
                            );
                        }
                    }
                break;
                case 'input_back':
                    gameInput [idInputAct].src = gameInput [idInputAct].src.slice (0, -1);
                break;
                case 'input_change':
                    idInputAct++;
                    if (idInputAct == gameInput.length) idInputAct = 0;
                    for (var i = idInputAct; i < gameInput.length; i++)
                    {
                        if (gameInput [i].type == "input" || gameInput [i].type == "color" || gameInput [i].type == "skin")
                        {
                            idInputAct = i;
                            break;
                        }
                    }
                break;
                case 'input_check':
                    if ((gameModes.findIndex (mode => mode.active == true) == 1 || gameModes.findIndex (mode => mode.active == true) == 2) && gameInput.length < 2)
                    {
                        gameAlert.push (new component ("text", "Connect other controllers", "red", 745, 270, "left", 10));
                        gameAlert.push (new component ("text", "to add more players.", "red", 745, 295, "left", 10));
                        changeTab ("alert");
                    }           
                    else
                    {
                        players = [];
                        gameAlert = [];
                        for (var input in gameInput)
                        {
                            if (gameInput [input].type == "input")
                            {
                                players [input] =
                                {
                                    name: gameInput [input].src || "Player" + (input > 0 ? (" " + (input * 1 + 1)) : ""),
                                    color: playerColors [input],
                                    skin: input - 1,
                                    control: (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2 ? menuControl : gameInput [input].control)
                                };
                            }
                            else if (gameInput [input].type == "color")
                            {
                                players [0].color = colorPickerInput.value || playerColors [0];
                                if (players [0].color.trim () == "") players [0].color = playerColors [0];
                            }
                            else if (gameInput [input].type == "skin")
                            {
                                gameInput [input].src = gameInput [input].src * 1;
                                players [0].skin = gameInput [input].src;
                                if (gameInput [input].src > -1)
                                {
                                    gameInput [input - 1].src = "skin" + gameInput [input].src;
                                    players [0].color = "skin" + gameInput [input].src;
                                }
                            }
                        }
                        if (gameModes.findIndex (mode => mode.active == true) == 3)
                        {
                            if (colorPickerInput && colorPicker && colorPicker.style && colorPicker.style.display == "block")
                            {
                                colorPickerInput.blur ();
                                colorPicker.style.display = "none";
                                colorPicker = null;
                                colorPickerInput = null;
                            }
                            const data =
                            {
                                action: "ship",
                                player_id: playerId,
                                name: players [0].name,
                                color: players [0].color
                            };
                            wss.send (JSON.stringify (data));    
                        }
                        else if (!blackScreen)
                        {
                            blackScreen = true;
                            $("#blackScreen").fadeIn (1000);
                            setTimeout
                            (
                                () =>
                                {
                                    if (wss != null && wss.readyState === 1) wss.close (3000);
                                    if (gameModes.findIndex (mode => mode.active == true) == 2) gameLoadScreen ("game");
                                    else gameLoadScreen ("intro");
                                },
                                1000
                            );
                        }
                    }
                break;
                case 'input_exit':
                    if (colorPickerInput && colorPicker && colorPicker.style && colorPicker.style.display == "block")
                    {
                        colorPickerInput.blur ();
                        colorPicker.style.display = "none";
                    }
                    if (gameModes.findIndex (mode => mode.active == true) == 3)
                    {
                        const data =
                        {
                            action: "start",
                            player_id: playerId,
                        };
                        wss.send (JSON.stringify (data));    
                    }
                    else gameLoadScreen ("menu");
                break;
                case 'skin_prev':
                    if (gameInput [idInputAct].type == "skin")
                    {
                        gameInput [idInputAct].src = gameInput [idInputAct].src * 1 - 1;
                        if (gameInput [idInputAct].src < -1) gameInput [idInputAct].src = skins.length - 1;
                        if (gameInput [idInputAct].src > -1) menuShip.changeColor ("skin" + gameInput [idInputAct].src);
                        else menuShip.changeColor (colorPickerInput.value);
                    }
                break;
                case 'skin_next':
                    if (gameInput [idInputAct].type == "skin")
                    {
                        gameInput [idInputAct].src = gameInput [idInputAct].src * 1 + 1;
                        if (gameInput [idInputAct].src >= skins.length) gameInput [idInputAct].src = -1;
                        if (gameInput [idInputAct].src > -1) menuShip.changeColor ("skin" + gameInput [idInputAct].src);
                        else menuShip.changeColor (colorPickerInput.value);
                    }
                break;
                case 'fire_menu':
                    menuShip.firing (true);
                break;
                case 'strafe_down':
                    menuShip.strafing (-bt_value);
                break;
                case 'strafe_up':
                    menuShip.strafing (bt_value);
                break;
                case 'change_weapon':
                    gameShips [gameShip].changeWeapon ();
                break;
                case 'moveZ':
                    gameShips [gameShip].movingZ ();    
                break;
                case 'fire':
                    gameShips [gameShip].firing (true);
                break;
                case 'turn_left':
                    gameShips [gameShip].turning (-bt_value);
                break;
                case 'turn_right':
                    gameShips [gameShip].turning (bt_value);
                break;
                case 'move_back':
                    gameShips [gameShip].moving (bt_value);
                break;
                case 'move_front':
                    gameShips [gameShip].moving (-bt_value);
                break;
                case 'strafe_right':
                    gameShips [gameShip].strafing (bt_value);
                break;
                case 'strafe_left':
                    gameShips [gameShip].strafing (-bt_value);
                break;
                case 'open_modal':
                    gameOpenModal ("menu");
                break;
                case 'close_exit':
                    $("#blackScreen").fadeIn (1000);
                    setTimeout
                    (
                        () =>
                        {
                            gameLoadScreen ("menu");
                        },
                        1000
                    );
                break;
                case 'close_continue':
                    gameOpenModal ("menu");
                    gameArea.play ();
                break;
                case 'close_modal':
                    gameCloseModal ();
                break;
                default:
                    if (gameInput [idInputAct].type == "input" && bt_value.length == 1 && gameInput [idInputAct].src.length < gameInput [idInputAct].max) gameInput [idInputAct].src += bt_value;
                break;
            }
        }
    }
}

function userActionStop (control, bt_type, bt_code, gameShip)
{
    if ((gameScreen == "menu" || gameModal == "menu") && menuShip != null && gameConfirm.length == 0 && gameInput.length == 0) var screen = "modal";
    else if (gameScreen == "game" && gameShips.length > 0 && gameModal == null && gameConfirm.length == 0 && gameInput.length == 0) var screen = "game";
    
    if (bt_type == null) var userAction = userActions.findIndex (action => action.screen.includes (screen) && action [control].includes (bt_code));
    else var userAction = userActions.findIndex (action => action.screen.includes (screen) && action [control][bt_type].includes (bt_code));

    if (userAction > -1)
    {
        switch (userActions [userAction].action)
        {
            case 'fire_menu':
                menuShip.firing (false);
            break;
            case 'fire':
                gameShips [gameShip].firing (false);
            break;
            case 'turn':
            case 'turn_left':
            case 'turn_right':
                gameShips [gameShip].turning (0);
            break;
            case 'move_back':
            case 'move_front':
                gameShips [gameShip].moving (0);
            break;
            case 'strafe_right':
            case 'strafe_left':
                gameShips [gameShip].strafing (0);  
            break;
        }
    }
}

function mouseMove (e)
{
    e.preventDefault ();
    mouse.x = e.clientX - 2;
    mouse.y = e.clientY - 2;
}

function mouseDown (e)
{
    e.preventDefault ();
    if (!mouse.pressed.includes (e.button)) mouse.pressed.push (e.button);
}

function mouseUp (e)
{
    if (mouse.pressed.includes (e.button)) mouse.pressed.splice (mouse.pressed.indexOf (e.button), 1);
}

function mouseWheel (e)
{
    mouse.wheelX = e.deltaX;
    mouse.wheelY = e.deltaY;
    mouse.wheelZ = e.deltaZ;
}

function vibrate (duration, id_control)
{
    for (i = navigator.getGamepads ().length; i > 0; i--)
    {
        if (id_control == null || id_control == i - 1)
        {
            const gamepad = navigator.getGamepads ()[i - 1];
            if (!gamepad) continue;
            if (gamepad.mapping == "standard")
            {
                gamepad.vibrationActuator.playEffect
                (
                    "dual-rumble",
                    {
                        startDelay: 0,
                        duration: duration,
                        weakMagnitude: 1,
                        strongMagnitude: 1
                    }
                );
                break;
            }
        }
    }
}

function changeControl (newControl, idControl)
{
    if (controlTab != newControl)
    {
        $('#' + controlTab).removeClass ("active");
        $('#' + newControl).addClass ("active");
        $('#' + gameTab + 'Tab-' + controlTab).removeClass ("active");
        $('#' + gameTab + 'Tab-' + controlTab).addClass ("unactive");
        if ($('#' + gameTab + 'Tab-' + newControl).hasClass ("toggle")) $('#' + gameTab + 'Tab-' + newControl).removeClass ("toggle");
        else if ($('#' + gameTab + 'Tab-' + newControl).hasClass ("unactive")) $('#' + gameTab + 'Tab-' + newControl).removeClass ("unactive");
        $('#' + gameTab + 'Tab-' + newControl).addClass ("active");
        controlTab = newControl;
    }
    if (idControl != null)
    {
        if (gameScreen == "menu" || gameModal == "menu") menuControl = idControl;
        else if (gameScreen == "game" && gameModal == null) players [0].control = idControl;
    }
}