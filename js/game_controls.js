window.addEventListener ('keydown', keyDown);
window.addEventListener ('keyup', keyUp);
window.addEventListener ('gamepaddisconnected', gamepadDisconnected);
window.addEventListener ('gamepadconnected', gamepadConnected);

function stopUserInteractions (player)
{
    var gameShip = gameShips.findIndex (ship => ship.name == players [player].name);
    if (gameModes.findIndex (mode => mode.active == true) == 0 || player == null)
    {
        keysPressed = [];
        buttonsPressed = [];
    }
    else
    {
        if (player == 0 || gameModes.findIndex (mode => mode.active == true) == 3) keysPressed = [];
        buttonsPressed [players [player].control] = [];
    }
    gameShips [gameShip].firing (false);
    gameShips [gameShip].moving (0);
    gameShips [gameShip].movingX (0);
    gameShips [gameShip].movingY (0);
    gameShips [gameShip].movingZ (0);
    gameShips [gameShip].strafing (0);
    gameShips [gameShip].speeding (0);
    gameShips [gameShip].turning (0);
    gameShips [gameShip].turningZ (0)    
}

function gamepadDisconnected (e)
{
    if (e.gamepad.mapping == "standard") var oldControl = "gamepad";
    else if (e.gamepad.id.toLowerCase ().includes ("joystick")) var oldControl = "joystick";
    if (gameScreen == "menu" && (gameModes.findIndex (mode => mode.active == true) == 1 || gameModes.findIndex (mode => mode.active == true) == 2) && gameInput.length > 1) gameInput = gameInput.slice (e.gamepad.index * 1, 1);
    var controlFinded = null;
    for (const gamepad of navigator.getGamepads ())
    {
        if (!gamepad) continue;
        if (gamepad.mapping == "standard" && oldControl == "gamepad" || gamepad.id.toLowerCase ().includes ("joystick") && oldControl == "joystick") controlFinded = gamepad.index * 1;
    }
    buttonsPressed.splice (buttonsPressed.indexOf (e.gamepad.index * 1), 1);
    if (controlFinded == null)
    {
        if (gameScreen == "game") players [0].control = -1;
        changeControl ("keyboard");
        $('#' + oldControl).fadeOut (1000);
    }
    else if (gameScreen == "game") players [0].control = controlFinded;
}

function gamepadConnected (e)
{
    if (e.gamepad.mapping == "standard") var newControl = "gamepad";
    else if (e.gamepad.id.toLowerCase ().includes ("joystick")) var newControl = "joystick";
    if (document.getElementById (newControl).style.display == 'none') $('#' + newControl).fadeIn (1000);
    buttonsPressed [e.gamepad.index * 1] = [];
    if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2 && gameControl != newControl || gameScreen != "game") changeControl (newControl);
    if (gameAlert.length > 0)
    {
        gameAlert = [];
        if (gameInput.length > 0) changeTab ("input");
        else changeTab ("menu");
    }
}

function controls ()
{
    gameControls = navigator.getGamepads ().filter (control => control != null);
    var player = 2;
    for (const gamepad of navigator.getGamepads ())
    {
        if (!gamepad) continue;
        if (gameScreen == "menu" && (gameModes.findIndex (mode => mode.active == true) == 1 || gameModes.findIndex (mode => mode.active == true) == 2) && gameInput.findIndex (input => input.control == gamepad.index) == -1 && gameInput.length > 0) gameInput.push (new component ("input", (storedPlayers [gameInput.length] && storedPlayers [gameInput.length].name) ? storedPlayers [gameInput.length].name : "Player " + player, "black", 750, 270 + 25 * (player - 2), "left", 10, 16, gamepad.index * 1));
        for (const [index, axis] of gamepad.axes.entries ()) axisControl (gamepad.index * 1, (gamepad.mapping == "standard") ? "gamepad" : (gamepad.id.toLowerCase ().includes ("joystick")) ? "joystick" : "", index, axis.toFixed (2) * 1);
        for (const [index, button] of gamepad.buttons.entries ())
        {
            if (button.pressed || button.touched) buttonDown (gamepad.index * 1, (gamepad.mapping == "standard") ? "gamepad" : (gamepad.id.toLowerCase ().includes ("joystick")) ? "joystick" : "", index);
            else buttonUp (gamepad.index * 1, (gamepad.mapping == "standard") ? "gamepad" : (gamepad.id.toLowerCase ().includes ("joystick")) ? "joystick" : "", index);
        }
        player++;
    }
}

function axisControl (id_control, control, index, value)
{
    if (value > 0 && gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2 && gameControl != control) changeControl (control);
    if (gameScreen == "game" && gameModal == null)
    {
        if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) var gameShip = 0;
        else
        {
            var player = players.findIndex (player => player.control == id_control);
            var gameShip = gameShips.findIndex (ship => ship.name == players [player].name);
        }
        if (control == "gamepad")
        {
            if (index == 0) gameShips [gameShip].movingX (value);
            if (index == 1) gameShips [gameShip].movingY (value);
            if (index == 2) gameShips [gameShip].turningZ (value);
        }
        else if (control == "joystick")
        {
            if (index == 0) gameShips [gameShip].turning (value);
            if (index == 1) gameShips [gameShip].moving (value);
        }
    }
}

function buttonDown (id_control, control, button)
{
    if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2 && gameControl != control || gameScreen != "game") changeControl (control);
    if (buttonsPressed [id_control] && !buttonsPressed [id_control].includes (button))
    {
        buttonsPressed [id_control].push (button);
        var button_down = button;
        if (gameScreen == "start")
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
            gameText [1].src = "Loading audio: 0/" + (Object.keys (gameSound.sounds).length + Object.keys (gameMusic.musics).length) + " Files.";
            gameText [1].color = "yellow";
        }
        else if (gameScreen == "intro")
        {
            gameSound.sounds ["type"].stop ();
            $("#blackScreen").fadeIn (1000);
            setTimeout
            (
                function ()
                {
                    gameLoadScreen ("game");
                },
                1000
            );
        }
        else if (gameScreen == "high_scores")
        {
            $("#blackScreen").fadeIn (1000);
            setTimeout
            (
                function ()
                {
                    gameLoadScreen ("menu");
                },
                1000
            );
        }
        else if (gameScreen == "game_over" || gameScreen == "game_completed")
        {
            $("#blackScreen").fadeIn (1000);
            setTimeout
            (
                function ()
                {
                    gameLoadScreen ("high_scores");
                },
                1000
            );
        }
        else if (gameAlert.length > 0)
        {
            gameAlert = [];
            if (gameInput.length > 0) changeTab ("input");
            else changeTab ("menu");
        }
        else if (gameConfirm.length > 0)
        {
            if (control == "gamepad" && button_down == 8 || control == "joystick" && button_down == 0) // Select
            {
                gameConfirm = [];
                changeTab ("menu");
            }
            else if (control == "gamepad" && button_down == 9 || control == "joystick" && button_down == 1) // Start
            {
                $("#blackScreen").fadeIn (1000);
                setTimeout
                (
                    function ()
                    {
                        gameLoadScreen ("menu");
                    },
                    1000
                );
                if (gameModes.findIndex (mode => mode.active == true) == 3)
                {
                    const data =
                    {
                        action: "start",
                        player_id: playerId,
                    };
                    wss.send (JSON.stringify (data));    
                }
            }
        }
        else if (gameInput.length > 0)
        {
            switch (button_down)
            {
                case 0: // A
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
                case 1: // B
                case 9: // Start
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
                                    name: gameInput [input].src || "Player" + (input > 0 ? (" " + (input + 2)) : ""),
                                    color: playerColors [input],
                                    skin: input - 1,
                                    control: gameInput [input].control
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
                        else
                        {
                            if (wss != null) wss.close (3000);
                            if (gameModes.findIndex (mode => mode.active == true) == 2)
                            {
                                $("#blackScreen").fadeIn (1000);
                                setTimeout
                                (
                                    function ()
                                    {
                                        gameLoadScreen ("game");
                                    },
                                    1000
                                );
                            }
                            else
                            {
                                $("#blackScreen").fadeIn (1000);
                                setTimeout
                                (
                                    function ()
                                    {
                                        gameLoadScreen ("intro");
                                    },
                                    1000
                                );
                            }
                        }
                    }
                break;
                case 2: // X
                case 8: // Select
                    if (colorPickerInput && colorPicker && colorPicker.style && colorPicker.style.display == "block")
                    {
                        colorPickerInput.blur ();
                        colorPicker.style.display = "none";
                    }
                    gameLoadScreen ("menu");    
                    if (gameModes.findIndex (mode => mode.active == true) == 3)
                    {
                        const data =
                        {
                            action: "start",
                            player_id: playerId,
                        };
                        wss.send (JSON.stringify (data));    
                    }
                break;
                case 12: // Down
                case 14: // Left
                    if (gameInput [idInputAct].type == "skin")
                    {
                        gameInput [idInputAct].src = gameInput [idInputAct].src * 1 - 1;
                        if (gameInput [idInputAct].src < -1) gameInput [idInputAct].src = playerSkins.length - 1;
                        if (gameInput [idInputAct].src > -1) menuShip.changeColor ("skin" + gameInput [idInputAct].src);
                        else menuShip.changeColor (colorPickerInput.value);
                    }
                break;
                case 13: // Up
                case 15: // Right
                    if (gameInput [idInputAct].type == "skin")
                    {
                        gameInput [idInputAct].src = gameInput [idInputAct].src * 1 + 1;
                        if (gameInput [idInputAct].src >= playerSkins.length) gameInput [idInputAct].src = -1;
                        if (gameInput [idInputAct].src > -1) menuShip.changeColor ("skin" + gameInput [idInputAct].src);
                        else menuShip.changeColor (colorPickerInput.value);
                    }
                break;
            }
        }
        else if (gameModal == "menu" || gameScreen == "menu")
        {
            if (control == "gamepad")
            {
                if (button_down == 6 || button_down == 7) menuShip.firing (true);
                if ((button_down == 9 || button_down == 16) && gameModal != null) gameCloseModal ();
                if (button_down == 12) menuShip.moving (1);
                if (button_down == 13) menuShip.moving (-1);
            }
            else if (control == "joystick")
            {
                if (button_down == 0) menuShip.firing (true);
                if (button_down == 7 && gameModal != null) gameCloseModal ();
            }
        }
        else if (gameScreen == "game" && gameModal == null)
        {
            if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) var gameShip = 0;
            else
            {
                var player = players.findIndex (player => player.control == id_control);
                var gameShip = gameShips.findIndex (ship => ship.name == players [player].name);
            }
            if (control == "gamepad")
            {
                switch (button_down)
                {   
                    case 0: // A
                        gameShips [gameShip].movingZ ();
                    break;
                    case 1: // B
                        gameShips [gameShip].movingZ ();
                    break;
                    case 2: // X
                        gameShips [gameShip].movingZ ();
                    break;
                    case 3: // Y
                    case 8: // Select
                        gameShips [gameShip].changeWeapon ();
                    break;
                    case 4: // L1
                        gameShips [gameShip].speeding (-1);
                    break;
                    case 5: // R1
                        gameShips [gameShip].speeding (1);
                    break;
                    case 6: // L2
                    case 7: // R2
                        gameShips [gameShip].firing (true);
                    break;
                    case 9: // Start
                    case 16: // Home
                        gameOpenModal ("menu");
                    break;
                    case 12: // Down
                        gameShips [gameShip].moving (1);
                    break;
                    case 13: // Up
                        gameShips [gameShip].moving (-1);
                    break;
                    case 14: // Left
                        gameShips [gameShip].turning (-1);
                    break;
                    case 15: // Right
                        gameShips [gameShip].turning (1);
                    break;
                }
            }
            else if (control == "joystick")
            {
                switch (button_down)
                {   
                    case 0:
                        gameShips [gameShip].firing (true);
                    break;
                    case 1:
                        gameShips [gameShip].changeWeapon ();
                    break;
                    case 2:
                        gameShips [gameShip].strafing (1);
                    break;
                    case 3:
                        gameShips [gameShip].strafing (-1);
                    break;
                    case 4:
                        gameShips [gameShip].speeding (-1);
                    break;
                    case 5:
                        gameShips [gameShip].speeding (1);
                    break;
                    case 6:
                        gameShips [gameShip].movingZ ();
                    break;
                    case 7:
                        gameOpenModal ("menu");
                    break;
                }
            }
        }
        else if (control == "gamepad" && button_down == 9 || control == "joystick" && button_down == 1) // Start
        {
            if (gameModal == "exit")
            {
                $("#blackScreen").fadeIn (1000);
                setTimeout
                (
                    function ()
                    {
                        gameLoadScreen ("menu");
                    },
                    1000
                );
            }
            else if (gameModal == "continue") 
            {
                gameOpenModal ("menu");
                gameArea.play ();
            }
            else if (gameModal != null) gameCloseModal ();
        }
    }
}

function buttonUp (id_control, control, button)
{
    if (buttonsPressed [id_control] && buttonsPressed [id_control].includes (button))
    {
        buttonsPressed [id_control].splice (buttonsPressed [id_control].indexOf (button), 1);
        var button_up = button;
        if (gameScreen == "game" && gameShips.length > 0 && gameModal == null && gameConfirm.length == 0 && gameInput.length == 0)
        {
            var gameShip = gameShips.findIndex (ship => ship.name == players [0].name);
            if (control == "gamepad")
            {
                switch (button_up)
                {   
                    case 1: // B
                    case 2: // X
                        gameShips [gameShip].strafing (0);  
                    break;
                    case 6: // L2
                    case 7: // R2
                        gameShips [gameShip].firing (false);
                    break;
                    case 12: // Down
                    case 13: // Up
                        gameShips [gameShip].moving (0);
                    break;
                    case 14: // Left
                    case 15: // Right
                        gameShips [gameShip].turning (0);
                    break;
                }
            }
            else if (control == "joystick")
            {
                switch (button_up)
                {   
                    case 0:
                        gameShips [gameShip].firing (false);
                    break;
                    case 2:
                    case 3:
                        gameShips [gameShip].strafing (0);
                    break;
                }
            }
        }
    }
}

function vibrate (duration, id_control)
{
    for (i = navigator.getGamepads ().length; i > 0; i--)
    {
        if (id_control == null || id_control == i - 1 || (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2))
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

function keyDown (e)
{
    e.preventDefault ();
    if (!keysPressed.includes (e.keyCode))
    {
        keysPressed.push (e.keyCode);
        if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2 && gameControl != "keyboard" || gameScreen != "game") changeControl ("keyboard");
        if (gameScreen == "start")
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
            gameText [1].src = "Sound files loaded: 0/11";
        }
        else if (gameScreen == "intro")
        {
            gameSound.sounds ["type"].stop ();
            $("#blackScreen").fadeIn (1000);
            setTimeout
            (
                function ()
                {
                    gameLoadScreen ("game");
                },
                1000
            );
        }
        else if (gameScreen == "high_scores")
        {
            $("#blackScreen").fadeIn (1000);
            setTimeout
            (
                function ()
                {
                    gameLoadScreen ("menu");
                },
                1000
            );
        }
        else if (gameScreen == "game_over" || gameScreen == "game_completed")
        {
            gameSound.sounds ["type"].stop ();
            $("#blackScreen").fadeIn (1000);
            setTimeout
            (
                function ()
                {
                    gameLoadScreen ("high_scores");
                },
                1000
            );
        }
        else if (gameAlert.length > 0)
        {
            gameAlert = [];
            if (gameInput.length > 0) changeTab ("input");
            else changeTab ("menu");

        }
        else if (gameConfirm.length > 0)
        {
            switch (e.keyCode)
            {
                case 78: // N
                    gameConfirm = [];
                    changeTab ("menu");
                break;
                case 89: // Y
                    $("#blackScreen").fadeIn (1000);
                    setTimeout
                    (
                        function ()
                        {
                            gameLoadScreen ("menu");
                        },
                        1000
                    );
                    if (gameModes.findIndex (mode => mode.active == true) == 3)
                    {
                        const data =
                        {
                            action: "start",
                            player_id: playerId,
                        };
                        wss.send (JSON.stringify (data));    
                    }
                break;
            }
        }
        else if (gameInput.length > 0 && gameAlert.length == 0)
        {
            switch (e.keyCode)
            {
                case 8: // Backspace
                    gameInput [idInputAct].src = gameInput [idInputAct].src.slice (0, -1);
                break;
                case 9: // Tab
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
                case 13: // Enter
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
                                    control: gameInput [input].control
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
                        else
                        {
                            if (wss != null) wss.close (3000);
                            if (gameModes.findIndex (mode => mode.active == true) == 2)
                            {
                                $("#blackScreen").fadeIn (1000);
                                setTimeout
                                (
                                    function ()
                                    {
                                        gameLoadScreen ("game");
                                    },
                                    1000
                                );
                            }
                            else
                            {
                                $("#blackScreen").fadeIn (1000);
                                setTimeout
                                (
                                    function ()
                                    {
                                        gameLoadScreen ("intro");
                                    },
                                    1000
                                );
                            }
                        }
                    }
                break;
                case 27: // Scape
                    if (colorPickerInput && colorPicker && colorPicker.style && colorPicker.style.display == "block")
                    {
                        colorPickerInput.blur ();
                        colorPicker.style.display = "none";
                    }
                    gameLoadScreen ("menu");
                    if (gameModes.findIndex (mode => mode.active == true) == 3)
                    {
                        const data =
                        {
                            action: "start",
                            player_id: playerId,
                        };
                        wss.send (JSON.stringify (data));    
                    }
                break;
                case 37: // Left
                case 40: // Down
                    if (gameInput [idInputAct].type == "skin")
                    {
                        gameInput [idInputAct].src = gameInput [idInputAct].src * 1 - 1;
                        if (gameInput [idInputAct].src < -1) gameInput [idInputAct].src = playerSkins.length - 1;
                        if (gameInput [idInputAct].src > -1) menuShip.changeColor ("skin" + gameInput [idInputAct].src);
                        else menuShip.changeColor (colorPickerInput.value);
                    }
                break;
                case 38: // Right
                case 39: // Up
                    if (gameInput [idInputAct].type == "skin")
                    {
                        gameInput [idInputAct].src = gameInput [idInputAct].src * 1 + 1;
                        if (gameInput [idInputAct].src >= playerSkins.length) gameInput [idInputAct].src = -1;
                        if (gameInput [idInputAct].src > -1) menuShip.changeColor ("skin" + gameInput [idInputAct].src);
                        else menuShip.changeColor (colorPickerInput.value);
                    }
                break;
                default: // Keys
                    if (gameInput [idInputAct].type == "input" && e.key.length == 1 && gameInput [idInputAct].src.length < gameInput [idInputAct].max) gameInput [idInputAct].src += e.key;
                break;
            }
        }
        else if (gameModal == "menu" || gameScreen == "menu")
        {
            switch (e.keyCode)
            {
                case 27: // Scape
                    if (gameModal != null) gameCloseModal ();
                break;
                case 13: // Enter
                case 32: // Space
                    menuShip.firing (true);
                break;
                case 38: // Down
                    menuShip.strafing (-1);
                break;
                case 40: // Up
                    menuShip.strafing (1);
                break;
            }
        }
        else if (gameScreen == "game" && gameShips.length > 0 && gameModal == null)
        {
            var gameShip = gameShips.findIndex (ship => ship.name == players [0].name);
            switch (e.keyCode)
            {
                case 27: // Scape
                    gameOpenModal ("menu");
                break;
                case 9: // Tab
                    gameShips [gameShip].changeWeapon ();
                break;
                case 17: // Control
                    gameShips [gameShip].movingZ ();    
                break;
                case 65: // A
                    gameShips [gameShip].speeding (-1);  
                break;
                case 81: // Q
                    gameShips [gameShip].speeding (1);  
                break;
                case 32: // Space
                    gameShips [gameShip].firing (true);
                break;
                case 37: // Left
                    gameShips [gameShip].turning (-1);
                break;
                case 39: // Right
                    gameShips [gameShip].turning (1);
                break;
                case 38: // Down
                    gameShips [gameShip].moving (1);
                break;
                case 40: // Up
                    gameShips [gameShip].moving (-1);
                break;
                case 88: // X
                    gameShips [gameShip].strafing (1);
                break;
                case 90: // Z
                    gameShips [gameShip].strafing (-1);
                break;
            }
        }
        else switch (e.keyCode)
        {
            case 27: // Scape
                if (gameModal == "exit")
                {
                    $("#blackScreen").fadeIn (1000);
                    setTimeout
                    (
                        function ()
                        {
                            gameLoadScreen ("menu");
                        },
                        1000
                    );
                }
                else if (gameModal == "continue") 
                {
                    gameOpenModal ("menu");
                    gameArea.play ();
                }
                else if (gameModal != null) gameCloseModal ();
            break;
        }
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
            switch (e.keyCode)
            {   
                case 32: // Space
                    gameShips [gameShip].firing (false);
                break;
                case 37: // Left
                case 39: // Right
                    gameShips [gameShip].turning (0);
                break;
                case 38: // Down
                case 40: // Up
                    gameShips [gameShip].moving (0);
                break;
                case 88: // X
                case 90: // Z
                    gameShips [gameShip].strafing (0);  
                break;
            }
        }
    }
}

function changeControl (newControl)
{
    if (gameControl != newControl)
    {
        $('#' + gameControl).removeClass ("active");
        $('#' + newControl).addClass ("active");
        $('#' + gameTab + 'Tab-' + gameControl).removeClass ("active");
        $('#' + gameTab + 'Tab-' + gameControl).addClass ("unactive");
        if ($('#' + gameTab + 'Tab-' + newControl).hasClass ("toggle")) $('#' + gameTab + 'Tab-' + newControl).removeClass ("toggle");
        else if ($('#' + gameTab + 'Tab-' + newControl).hasClass ("unactive")) $('#' + gameTab + 'Tab-' + newControl).removeClass ("unactive");
        $('#' + gameTab + 'Tab-' + newControl).addClass ("active");
        gameControl = newControl;
    }
}