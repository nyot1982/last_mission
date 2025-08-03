window.addEventListener ("keydown", (e) => { if (document.activeElement.tagName != "INPUT" || e.keyCode == 9 || e.keyCode == 13 || e.keyCode == 27) { e.preventDefault (); startControl (99, "keyboard", "keys", e.keyCode, e.key); }});
window.addEventListener ("keyup", (e) => { if (document.activeElement.tagName != "INPUT" || e.keyCode == 9 || e.keyCode == 13 || e.keyCode == 27) { stopControl (99, "keyboard", "keys", e.keyCode); }});
window.addEventListener ('gamepaddisconnected', gamepadDisconnected);
window.addEventListener ('gamepadconnected', gamepadConnected);

function controls ()
{
    var player = 2;
    for (const gamepad of navigator.getGamepads ())
    {
        if (!gamepad || gamepad.mapping == "" && !gamepad.id.toLowerCase ().includes ("joystick")) continue;
        var form = document.getElementById ("players");
        if (gameScreen == "menu" && (gameModes.findIndex (mode => mode.active == true) == 1 || gameModes.findIndex (mode => mode.active == true) == 2) && form.style.display == "block" && !document.getElementById (gamepad.index))
        {
            var input = document.createElement ("input");
            input.type = "text";
            input.id = gamepad.index * 1;
            input.value = (storedPlayers [form.length - 1] && storedPlayers [form.length - 1].name ? storedPlayers [form.length - 1].name : "Player " + player);
            form.insertBefore (input, form.elements [form.length - 1]);
        }
        for (const [index, axis] of gamepad.axes.entries ())
        {
            if (axis.toFixed (2) * 1 != 0) startControl (gamepad.index * 1, (gamepad.mapping == "standard" ? "gamepad" : gamepad.id.toLowerCase ().includes ("joystick") ? "joystick" : ""), "axes", index, axis.toFixed (2) * 1);
            else stopControl (gamepad.index * 1, (gamepad.mapping == "standard" ? "gamepad" : gamepad.id.toLowerCase ().includes ("joystick") ? "joystick" : ""), "axes", index);
        }
        for (const [index, button] of gamepad.buttons.entries ())
        {
            if (button.pressed || button.touched) startControl (gamepad.index * 1, (gamepad.mapping == "standard" ? "gamepad" : gamepad.id.toLowerCase ().includes ("joystick") ? "joystick" : ""), "buttons", index, button.value.toFixed (2) * 1);
            else stopControl (gamepad.index * 1, (gamepad.mapping == "standard" ? "gamepad" : gamepad.id.toLowerCase ().includes ("joystick") ? "joystick" : ""), "buttons", index);
        }
        player++;
    }
}

function gamepadConnected (e)
{
    if (e.gamepad.mapping == "standard") var newControl = "gamepad";
    else if (e.gamepad.id.toLowerCase ().includes ("joystick")) var newControl = "joystick";
    else return;
    gameControls [e.gamepad.index * 1] = newControl;
    if (newControl && document.getElementById (newControl).style.display == 'none') $('#' + newControl).fadeIn (1000);
    pressed.buttons [e.gamepad.index * 1] = [];
    pressed.axes [e.gamepad.index * 1] = [];
    if (gameScreen == "game" && gameModes.findIndex (mode => mode.active == true) != 0 && gameModes.findIndex (mode => mode.active == true) != 3)
    {
        for (var player in players)
        {
            if (players [player].control == null) players [player].control = e.gamepad.index * 1;
        }
    }
    else
    {
        changeControl (newControl, e.gamepad.index * 1);
        if (gameAlert.length > 0)
        {
            gameAlert = [];
            if (document.getElementById ("players").style.display == "block" || document.getElementById ("player").style.display == "block" || document.getElementById ("sign").style.display == "block") changeTab ("input");
            else changeTab ("menu");
        }
    }
}

function gamepadDisconnected (e)
{
    if (e.gamepad.mapping == "" && !e.gamepad.id.toLowerCase ().includes ("joystick")) return;
    var oldControl = gameControls [e.gamepad.index * 1],
        form = document.getElementById ("players");
    gameControls.splice (e.gamepad.index * 1, 1);
    pressed.buttons.splice (pressed.buttons.indexOf (e.gamepad.index * 1), 1);
    pressed.axes.splice (pressed.axes.indexOf (e.gamepad.index * 1), 1);

    if (gameScreen == "menu" && gameModes.findIndex (mode => mode.active == true) != 0 && gameModes.findIndex (mode => mode.active == true) != 3 && form.length > 2) form.elements [e.gamepad.index * 1].remove ();
    var controlFinded = null;
    for (const gamepad of navigator.getGamepads ())
    {
        if (!gamepad) continue;
        if (gamepad.mapping == "standard" && oldControl == "gamepad" || gamepad.id.toLowerCase ().includes ("joystick") && oldControl == "joystick") controlFinded = gamepad.index * 1;
    }
    if (controlFinded == null)
    {
        changeControl ("keyboard", 99);
        $('#' + oldControl).fadeOut (1000);
    }
    else if (gameScreen == "game" && gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) players [0].control = controlFinded;
}

function startControl (id_control, control, bt_type, bt_code, bt_value)
{
    if (!pressed [bt_type][id_control].includes (bt_code) || bt_type == "axes" && Math.abs (bt_value) > 0.25)
    {
        if (!pressed [bt_type][id_control].includes (bt_code)) pressed [bt_type][id_control].push (bt_code);
        changeControl (control, id_control);
        var gameShip = null;
        if (gameScreen == "game" && gameShips.length > 0 && gameConfirm.length == 0)
        {
            if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) var player = 0;
            else var player = players.findIndex (player => player.control == id_control);
            gameShip = gameShips.findIndex (ship => ship.name == players [player].name);
            if (control == "keyboard")
            {
                if (bt_code == 37) bt_value = -1;
                else bt_value = 1;
            }
        }
        else if (control == "keyboard") bt_value = 1;
        userActionStart (control, bt_type, bt_code, bt_value, gameShip);
    }
}

function stopControl (id_control, control, bt_type, bt_code)
{
    if (pressed [bt_type][id_control].includes (bt_code))
    {
        pressed [bt_type][id_control].splice (pressed [bt_type][id_control].indexOf (bt_code), 1);
        if (gameScreen == "game" && gameShips.length > 0 && gameConfirm.length == 0)
        {
            if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) var gameShip = gameShips.findIndex (ship => ship.name == players [0].name);
            else
            {
                var player = players.findIndex (player => player.control == id_control);
                var gameShip = gameShips.findIndex (ship => ship.name == players [player].name);
            }
            userActionStop (control, bt_type, bt_code, gameShip);
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
        if (document.getElementById ("players").style.display == "block" || document.getElementById ("player").style.display == "block" || document.getElementById ("sign").style.display == "block") changeTab ("input");
        else changeTab ("menu");
    }
    else
    {
        if (gameConfirm.length > 0) var screen = "confirm";
        else if (gameScreen == "menu")
        {
            if (document.getElementById ("players").style.display == "block" || document.getElementById ("player").style.display == "block" || document.getElementById ("sign").style.display == "block") var screen = "input";
            else if (menuShip != null && gameModal == null) var screen = "menu";
        }
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
                                action: "menu",
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
                case 'input_exit':
                    if (gameModes.findIndex (mode => mode.active == true) == 3)
                    {
                        const data =
                        {
                            action: "menu",
                            player_id: playerId
                        };
                        wss.send (JSON.stringify (data));    
                    }
                    else gameLoadScreen ("menu");
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
                case 'turn':
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
            }
        }
    }
}

function userActionStop (control, bt_type, bt_code, gameShip)
{
    if ((gameScreen == "menu" || gameModal == "menu") && menuShip != null && gameConfirm.length == 0) var screen = "modal";
    else if (gameScreen == "game" && gameModal == null && gameShips.length > 0 && gameConfirm.length == 0) var screen = "game";
    
    var userAction = userActions.findIndex (action => action.screen.includes (screen) && action [control][bt_type].includes (bt_code));

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

function stopUserInteractions (player)
{
    var gameShip = gameShips.findIndex (ship => ship.name == players [player].name);
    if (gameModes.findIndex (mode => mode.active == true) == 0 || player == null)
    {
        pressed =
        {
            keys: [],
            buttons: [],
            axes: []
        }
    }
    else
    {
        if (player == 0 || gameModes.findIndex (mode => mode.active == true) == 3) pressed.keys [players [player].control] = [];
        pressed.buttons [players [player].control] = [];
        pressed.axes [players [player].control] = [];
    }
    gameShips [gameShip].firing (false);
    gameShips [gameShip].moving (0);
    gameShips [gameShip].movingZ (0);
    gameShips [gameShip].strafing (0);
    gameShips [gameShip].turning (0);
}

function mouseMove (e)
{
    e.preventDefault ();
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
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

function vibrate (id_control, duration)
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
    if (gameScreen != "start")
    {
        if (idControl != null)
        {
            menuControl = idControl;
            if (gameScreen == "game" && gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2) players [0].control = idControl;
        }
        if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2 && controlTab != newControl)
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
    }
}