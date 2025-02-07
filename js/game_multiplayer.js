function wssOpen ()
{
    wss = new WebSocket (wssServer);

    /*wss.onopen = function ()
    {
        if (wss.readyState === 1)
        {
            gameText [10].color = "#0C0";
            gameText [11].color = "";
            gameText [12].src = "0";
        }
    };*/

    wss.onmessage = function (event)
    {
        const data = JSON.parse (event.data);
        if (gameScreen == "game" && playersConnecting != data.players_connecting && document.getElementById ("playersConnecting"))
        {
            if (data.players_connecting > 0)
            {
                if (gameModal == null) document.getElementById ("highScoreHud").style.height = "46px";
                document.getElementById ("playersConnecting").innerHTML = data.players_connecting + " player" + (data.players_connecting > 1 ? "s" : "") + " connecting...";
            }
            else
            {
                if (gameModal == null) document.getElementById ("highScoreHud").style.height = "23px";
                document.getElementById ("playersConnecting").innerHTML = "";
            }
            playersConnecting = data.players_connecting;
        }
        if (data.action == "start")
        {
            if (gameScreen == "menu") gameLoadScreen ("menu");
            else
            {
                usersPlaying = data.game_ships.length;
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
        else if (data.action == "open") playerId = data.player_id;
        else if (data.action == "players") usersPlaying = data.game_ships.length;
        else if (data.action == "connected")
        {
            gameText.push (new component ("text", ">>> Enter your ship name:", "orange", 705, 220, "left", 10));
            gameInput.push (new component ("input", (storedPlayers [0] && storedPlayers [0].name) ? storedPlayers [0].name : "Player", "black", 750, 245, "left", 10, 16, 99));
            gameText.push (new component ("text", "Enter your ship color:", "orange", 745, 270, "left", 10));
            gameInput.push (new component ("color", null, null, 750, 295, null, 10, 16));
            gameText.push (new component ("text", "Select your ship skin:", "orange", 745, 320, "left", 10));
            gameInput.push (new component ("skin", (storedPlayers [0] && storedPlayers [0].skin > -1) ? storedPlayers [0].skin : -1, "black", 750, 345, "center", 10, 16, -1));
            colorPickerInput.value = (storedPlayers [0] && storedPlayers [0].color) ? storedPlayers [0].color : playerColors [0];
            menuShip.changeColor ((storedPlayers [0] && storedPlayers [0].color) ? storedPlayers [0].color : playerColors [0]);
            idInputAct = 0;
            changeTab ("input");
            menuShip.turning (-1);
        }
        else if (data.error)
        {
            if (data.action == "ship")
            {
                gameAlert.push (new component ("text", "This " + data.error + " is in use.", "red", 745, 370, "left", 10));
                gameAlert.push (new component ("text", "Try another one.", "red", 745, 395, "left", 10));
            }
            changeTab ("alert");
        }
        else
        {
            startPoints = data.start_points;
            for (var gameShip in gameShips) if (data.game_ships.findIndex (game_ship => game_ship.name == gameShips [gameShip].name) == -1) gameShips.splice (gameShip, 1);
            for (var game_ship in data.game_ships)
            {
                if (gameShips.findIndex (gameShip => gameShip.name == data.game_ships [game_ship].name) == -1)
                {
                    gameShips.push
                    (
                        new ship
                        (
                            data.game_ships [game_ship].name,
                            data.game_ships [game_ship].color,
                            data.game_ships [game_ship].x,
                            data.game_ships [game_ship].y,
                            data.game_ships [game_ship].z,
                            data.game_ships [game_ship].heading,
                            data.game_ships [game_ship].moveSpeed,
                            data.game_ships [game_ship].strafeSpeed,
                            data.game_ships [game_ship].fire,
                            data.game_ships [game_ship].weapon,
                            data.game_ships [game_ship].weapons,
                            data.game_ships [game_ship].engine1,
                            data.game_ships [game_ship].engine2,
                            data.game_ships [game_ship].engine1inc,
                            data.game_ships [game_ship].engine2inc,
                            data.game_ships [game_ship].shadowOffset,
                            data.game_ships [game_ship].nameOffset,
                            data.game_ships [game_ship].lifes,
                            data.game_ships [game_ship].life,
                            data.game_ships [game_ship].fuel,
                            data.game_ships [game_ship].ammo,
                            data.game_ships [game_ship].shield,
                            data.game_ships [game_ship].score,
                            data.game_ships [game_ship].gunStatus,
                            data.game_ships [game_ship].wing1Status,
                            data.game_ships [game_ship].wing2Status,
                            data.game_ships [game_ship].engine1Status,
                            data.game_ships [game_ship].engine2Status,
                            data.game_ships [game_ship].time
                        )
                    );
                }
                else
                {
                    var gameShip = gameShips.findIndex (ship => ship.name == data.game_ships [game_ship].name);
                    gameShips [gameShip].time = data.game_ships [game_ship].time;
                    if (players [0].name != data.game_ships [game_ship].name)
                    {
                        gameShips [gameShip].name = data.game_ships [game_ship].name;
                        gameShips [gameShip].color = data.game_ships [game_ship].color;
                        gameShips [gameShip].x = data.game_ships [game_ship].x;
                        gameShips [gameShip].y = data.game_ships [game_ship].y;
                        gameShips [gameShip].z = data.game_ships [game_ship].z;
                        gameShips [gameShip].heading = data.game_ships [game_ship].heading;
                        gameShips [gameShip].moveSpeed = data.game_ships [game_ship].moveSpeed;
                        gameShips [gameShip].strafeSpeed = data.game_ships [game_ship].strafeSpeed;
                        gameShips [gameShip].fire = data.game_ships [game_ship].fire;
                        gameShips [gameShip].weapon = data.game_ships [game_ship].weapon;
                        gameShips [gameShip].weapons = data.game_ships [game_ship].weapons;
                        gameShips [gameShip].engine1 = data.game_ships [game_ship].engine1;
                        gameShips [gameShip].engine2 = data.game_ships [game_ship].engine2;
                        gameShips [gameShip].engine1inc = data.game_ships [game_ship].engine1inc;
                        gameShips [gameShip].engine2inc = data.game_ships [game_ship].engine2inc;
                        gameShips [gameShip].shadowOffset = data.game_ships [game_ship].shadowOffset;
                        gameShips [gameShip].nameOffset = data.game_ships [game_ship].nameOffset;
                        gameShips [gameShip].lifes = data.game_ships [game_ship].lifes,
                        gameShips [gameShip].life = data.game_ships [game_ship].life,
                        gameShips [gameShip].fuel = data.game_ships [game_ship].fuel,
                        gameShips [gameShip].ammo = data.game_ships [game_ship].ammo,
                        gameShips [gameShip].shield = data.game_ships [game_ship].shield,
                        gameShips [gameShip].score = data.game_ships [game_ship].score, 
                        gameShips [gameShip].gunStatus = data.game_ships [game_ship].gunStatus;
                        gameShips [gameShip].wing1Status = data.game_ships [game_ship].wing1Status;
                        gameShips [gameShip].wing2Status = data.game_ships [game_ship].wing2Status;
                        gameShips [gameShip].engine1Status = data.game_ships [game_ship].engine1Status;
                        gameShips [gameShip].engine2Status = data.game_ships [game_ship].engine2Status;
                    }
                }
            }
            if (gameScreen != "game" || gameModal != null)
            {
                document.getElementById ("scoreHud").style.height = "0px";
                document.getElementById ("lifesHud").style.height = "0px";
            }
            else
            {
                document.getElementById ("scoreHud").style.height = (23 * gameShips.length) + "px";
                if (gameShips.length > 2) document.getElementById ("lifesHud").style.height = (23 * Math.round ((gameShips.length - 1) / 2)) + "px";
                else if (gameScreen == "game") document.getElementById ("lifesHud").style.height = "23px";
            }
            gameObjects = gameShips.concat (gameItems).concat (gameShots);
            gameObjects.sort ((ship1, ship2) => ship1.z - ship2.z);
            if (data.action == "ship")
            {
                $("#blackScreen").fadeIn (1000);
                setTimeout
                (
                    () =>
                    {
                        gameLoadScreen ("game");
                    },
                    1000
                );
            }
        }
    };

    /*wss.onerror = function (error)
    {
        console.error ("WebSocket error:", error);
    };*/
    
    wss.onclose = function (event)
    {
        wss = event.code;
        if (wss != 3000)
        {
            if (gameModes.findIndex (mode => mode.active == true) == 3 && gameScreen == "game" && gameConfirm.length == 0) gameOpenModal ("exit", "Server disconnected");
            else if (gameScreen == "menu")
            {   
                if (gameModes.findIndex (mode => mode.active == true) == 3 && gameInput.length > 0) gameLoadScreen ("menu");
                setTimeout
                (
                    () =>
                    {
                        wssOpen ();
                    },
                    3000
                );
            }
        }
    };
}

function wssSend ()
{
    if (gameShips.length == 0)
    {
        wss.send (JSON.stringify
        (
            {
                action: "ships"
            }
        ));
    }
    else if (gameScreen == "menu" && gameText.length > 12)
    {
        wss.send (JSON.stringify
        (
            {
                action: "players"
            }
        ));
    }
    else if (gameScreen == "game")
    {
        var gameShip = gameShips.findIndex (ship => ship.name == players [0].name);
        wss.send (JSON.stringify
        (
            {
                action: "ship_ships",
                name: players [0].name,
                color: gameShips [gameShip].color,
                x: gameShips [gameShip].x,
                y: gameShips [gameShip].y,
                z: gameShips [gameShip].z,
                heading: gameShips [gameShip].heading,
                moveSpeed: gameShips [gameShip].moveSpeed,
                strafeSpeed: gameShips [gameShip].strafeSpeed,
                fire: gameShips [gameShip].fire,
                weapon: gameShips [gameShip].weapon,
                weapons: gameShips [gameShip].weapons,
                engine1: gameShips [gameShip].engine1,
                engine2: gameShips [gameShip].engine2,
                engine1inc: gameShips [gameShip].engine1inc,
                engine2inc: gameShips [gameShip].engine2inc,
                shadowOffset: gameShips [gameShip].shadowOffset,
                nameOffset: gameShips [gameShip].nameOffset,
                lifes: gameShips [gameShip].lifes,
                life: gameShips [gameShip].life,
                fuel: gameShips [gameShip].fuel,
                ammo: gameShips [gameShip].ammo,
                shield: gameShips [gameShip].shield,
                score: gameShips [gameShip].score,
                gunStatus: gameShips [gameShip].status.gun,
                wing1Status: gameShips [gameShip].status.wing1,
                wing2Status: gameShips [gameShip].status.wing2,
                engine1Status: gameShips [gameShip].status.engine1,
                engine2Status: gameShips [gameShip].status.engine2,
                time: gameShips [gameShip].time
            }
        ));
    }
}

function clearUnactive ()
{
    gameShips = gameShips.filter (ship => ship.lifes > 0 && Date.now () - ship.time <= 1000);
}