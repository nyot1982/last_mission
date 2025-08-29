function gameHighScores (max_high_scores, high_scores)
{
    gameText.pop ();
    if (!high_scores) gameText.push (new component ("text", "No results.", "red", 400, 255, "left", 10));
    else for (var i = 0; i < high_scores.length; i++)
    {
        if (i == 9) var pos = "10   ";
        else var pos = " " + (i + 1) + "   ";
        if (high_scores [i].score < 10) var pre = "00000";
        else if (high_scores [i].score < 100) var pre = "0000";
        else if (high_scores [i].score < 1000) var pre = "000";
        else if (high_scores [i].score < 10000) var pre = "00";
        else if (high_scores [i].score < 100000) var pre = "0";
        else var pre = "";
        gameText.push (new component ("text", pos + high_scores [i].name, "white", 400, 255 + i * 20, "left", 10));
        gameText.push (new component ("text", pre + high_scores [i].score, "white", 400 + ((max_high_scores + 8) * 10), 255 + i * 20, "left", 10));
        if (highScoreSave == high_scores [i].id)
        {
            gameText.push (new component ("text", ">>> New high score!", "#0C0", 400 + ((max_high_scores + 17) * 10), 255 + i * 20, "left", 10));
            highScoreSave = 0;
        }
    }
}

function gameLoadScreen (screen)
{
    gameTitle = null;
    gameXP = null;
    gameGround = [];
    modalGround = null;
    menuShip = null;
    gameBoss = null;
    menuShots = [];
    menuHits = [];
    gameShips = [];
    gameEnemies = [];
    gameShots = [];
    gameHits = [];
    gameItems = [];
    gameText = [];
    gameAlert = [];
    gameConfirm = [];
    idTypeAct = 0;
    gameModal = null;
    document.getElementById ("rollover").style.display = "none";
    document.getElementById ("players").style.display = "none";
    document.getElementById ("player").style.display = "none";
    document.getElementById ("sign").style.display = "none";

    if (gameScreen == "game" && (screen == "menu" || screen == "game_over" || screen == "game_completed"))
    {
        ctx.translate (gameArea.centerPoint.x - canvasWidth / 2, gameArea.centerPoint.y - canvasHeight / 2);
        gameArea.centerPoint =
        {
            x: canvasWidth / 2,
            y: canvasHeight / 2,
        };
        if (gameMusic.active)
        {
            if (enemies == 0) gameMusic.musics.boss.stop ();
            else if (enemies > 0) gameMusic.musics.game.stop ();
        }
    }
    if (gameScreen == "menu" && screen == "intro" && gameMusic.active) gameMusic.musics.menu.stop ();
    gameScreen = screen;
    if (gameScreen == "start")
    {
        gameGround.push (new ground ("menu", "black", 0, 0, canvasWidth, canvasHeight));
        gameTitle = new component ("image", "svgs/title.svg", "", canvasWidth / 2, 100, 203, 92);
        gameText.push (new component ("text", "Welcome to Last Mission.", "white", canvasWidth / 2, 275, "center", 10));
        gameText.push (new component ("text", "Press any key to start...", "white", canvasWidth / 2, gameText [0].y + 30, "center", 10));
        gameText.push (new component ("text", "Remake by Marc Pinyot Gascón  1986-2024", "white", canvasWidth / 2, 445, "center", 10));
    }
    else if (gameScreen == "menu" || gameScreen == "player")
    {
        if (gameScreen == "menu" && gameMusic.active && !gameMusic.musics.menu.source) gameMusic.musics.menu.play ();
        gameGround.push (new ground ("menu", "black", 0, 0, canvasWidth, canvasHeight));
        gameTitle = new component ("image", "svgs/title.svg", "", canvasWidth / 2, 100, 203, 92);
        gameText.push (new component ("text", "Options:", "white", 310, gameTitle.y + 105, "left", 10));
        gameText.push (new component ("text", "One Player", "white", 575, gameText [0].y + 15, "left", 10));
        gameText.push (new component ("text", "Cooperative", "white", 575, gameText [1].y + 25, "left", 10));
        gameText.push (new component ("text", "Versus", "white", 575, gameText [2].y + 25, "left", 10));
        gameText.push (new component ("text", "Online", "white", 575, gameText [3].y + 25, "left", 10));
        gameText.push (new component ("text", "Sound", "white", 575, gameText [4].y + 25, "left", 10));
        gameText.push (new component ("text", "Music", "white", 575, gameText [5].y + 25, "left", 10));
        gameText.push (new component ("text", "FPS Monitor", "white", 575, gameText [6].y + 25, "left", 10));
        gameText.push (new component ("text", "High Scores", "white", 575, gameText [7].y + 25, "left", 10));
        gameText.push (new component ("text", "Remake by Marc Pinyot Gascón  1986-2024", "white", canvasWidth / 2, 445, "center", 10));
        gameText.push (new component ("traffic", "", "", 645, 295, 12, 28));
        menuShip = new ship (null, playerColors [0], 450, gameText [0].y + 15, 50, 90);
        if (gameScreen == "menu")
        {
            changeTab ("menu");
            resetHuds (true, 0);
            if (wss == null || wss == 1000 || wss == 3000) wssOpen ();
        }
        else gameScreen = "menu";
    }
    else if (gameScreen == "high_scores")
    {
        gameGround.push (new ground ("menu", "black", 0, 0, canvasWidth, canvasHeight));
        gameTitle = new component ("image", "svgs/title.svg", "", canvasWidth / 2, 100, 203, 92);
        gameText.push (new component ("text", "High Scores:", "white", 310, gameTitle.y + 105, "left", 10));
        fetchLoad ("high_scores");
        changeTab ("alert");
    }
    else if (gameScreen == "skins")
    {
        var x = 60, y = 42, color = null;
        gameGround.push (new ground ("menu", "black", 0, 0, canvasWidth, canvasHeight));
        for (var skin in skins)
        {
            gameShips.push (new ship (null, "skin" + skin, x, y - 23, 50));
            if (skin == skinSel)
            {
                gameShips [gameShips.length - 1].turning (-1);
                if (players [0].skins.findIndex (skin2 => skin2 == skin) > -1) color = "#0C0";
                else color = "red";
            }
            else
            {
                if (players [0].skins.findIndex (skin2 => skin2 == skin) > -1) color = "white";
                else color = "yellow";
            }
            gameText.push (new component ("text", skins [skin].name, color, x, y, "center", 8, 80));
            x += 100;
            if (x % 1060 == 0)
            {
                x = 60;
                y += 50;
            }
        }
        changeTab ("skins");
    }
    else if (gameScreen == "intro" || gameScreen == "game_over" || gameScreen == "game_completed")
    {
        gameGround.push (new ground ("menu", "black", 0, 0, canvasWidth, canvasHeight));
        var textMeasure = ctx.measureText (" ");
        document.getElementById ("scoreHud").style.height = "0px";
        document.getElementById ("highScoreHud").style.height = "0px";
        document.getElementById ("lifesHud").style.height = "0px";
        if (gameScreen == "intro")
        {
            gameText.push (new component ("type", "YOU ARE AN OUTCAST ......", "white", 385, 150, "left", 10));
            gameText.push (new component ("type", "RESTORE YOUR HONOR ......", "white", 385, 210, "left", 10));
            gameText.push (new component ("type", "INVADE THE HOSTILE FORCES", "white", 385, 240, "left", 10));
            gameText.push (new component ("type", "WHO TORMENT YOUR PEOPLE .", "white", 385, 270, "left", 10));
            gameText.push (new component ("type", "YOUR QUEST FOR", "white", 385 + textMeasure.width, 330, "left", 10));
            gameText.push (new component ("type", "HONOR IS YOUR .....", "white", 385 + textMeasure.width * 6, 360, "left", 10));
            gameText.push (new component ("type", "LAST MISSION .", "white", 385 + textMeasure.width * 11, 390, "left", 10));
        }
        else if (gameScreen == "game_over")
        {
            gameText.push (new component ("type", "LAST MISSION", "white", canvasWidth / 2, 150, "center", 10));
            gameText.push (new component ("type", "HARD LUCK!", "white", canvasWidth / 2, 210, "center", 10));
            gameText.push (new component ("type", "YOUR MISSION HAS FAILED.", "white", canvasWidth / 2, 240, "center", 10));
        }
        else if (gameScreen == "game_completed")
        {
            gameText.push (new component ("type", "LAST MISSION", "white", canvasWidth / 2, 150, "center", 10));
            gameText.push (new component ("type", "WELL DONE!", "white", canvasWidth / 2, 210, "center", 10));
            gameText.push (new component ("type", "YOUR MISSION HAS", "white", canvasWidth / 2, 240, "center", 10));
            gameText.push (new component ("type", "SUCCEEDED.", "white", canvasWidth / 2, 270, "center", 10));
        }
        if (gameSound.active) gameSound.sounds ["type"].play ();
        changeTab ("alert");
    }
    else if (gameScreen == "game")
    {
        if (gameModes.findIndex (mode => mode.active == true) < 2) generateGameMap ("level1");
        else generateGameMap ("mode" + gameModes.findIndex (mode => mode.active == true));
        fetchLoad ("highScoreHud");
        document.getElementById ("highScoreHud").style.height = "23px";
        document.getElementById ("scoreHud").innerHTML = '';
        document.getElementById ("lifesHud").innerHTML = '';
        if (gameModes.findIndex (mode => mode.active == true) < 3)
        {
            for (var i = players.length - 1; i >= 0; i--)
            {
                gameShips.push (new ship (players [i].name, players [i].color, startPoints [i].x, startPoints [i].y, startPoints [i].z));
                startPoints [i].ship = players [i].name;
            }
            document.getElementById ("scoreHud").style.height = (23 * gameShips.length) + "px";
            if (gameShips.length > 2) document.getElementById ("lifesHud").style.height = (23 * Math.round ((gameShips.length - 1) / 2)) + "px";
            else document.getElementById ("lifesHud").style.height = "23px";
        }
        if (typeof (Storage) === "undefined") alert ("This browser does not support local web storage.");
        else
        {
            if (gameModes.findIndex (mode => mode.active == true) == 0)
            {
                storedPlayers =
                [
                    {
                        name: players [0].name,
                    }
                ];
                localStorage.players0 = JSON.stringify (storedPlayers);
            }
            else if (gameModes.findIndex (mode => mode.active == true) == 1)
            {
                storedPlayers = [];
                for (var player in players)
                {
                    storedPlayers [player] =
                    {
                        name: players [player].name
                    };
                }
                localStorage.players1 = JSON.stringify (storedPlayers);
            }
            else if (gameModes.findIndex (mode => mode.active == true) == 2)
            {
                storedPlayers = [];
                for (var player in players)
                {
                    storedPlayers [player] =
                    {
                        name: players [player].name
                    };
                }
                localStorage.players2 = JSON.stringify (storedPlayers);
            }
        }
        if (gameMusic.active)
        {
            gameMusic.musics.menu.stop ();
            gameMusic.musics.game.play ();
        }
        changeTab ("game");
        resetHuds (true, 100);
    }
    if (document.getElementById ("blackScreen").style.display == 'block')
    {
        $("#blackScreen").fadeOut (1000);
        setTimeout
        (
            () =>
            {
                blackScreen = false;
            },
            1000
        );
    }
}

function gameOpenModal (modal, text)
{
    menuShip = null;
    gameTitle = null;
    gameText = [];
    gameAlert = [];
    gameConfirm = [];
    startPoint =
    {
        x: gameArea.centerPoint.x - canvasWidth / 2,
        y: gameArea.centerPoint.y - canvasHeight / 2
    }
    if (gameModal == null)
    {
        document.getElementById ("scoreHud").style.height = "0px";
        document.getElementById ("highScoreHud").style.height = "0px";
        document.getElementById ("lifesHud").style.height = "0px";
        modalGround = new ground ("menu", "#000000DD", startPoint.x, startPoint.y, canvasWidth, canvasHeight);
        changeTab ("menu");
    }
    gameModal = modal;

    if (gameModal == "menu")
    {
        gameTitle = new component ("image", "svgs/title.svg", "", gameArea.centerPoint.x, startPoint.y + 100, 203, 92);
        gameText.push (new component ("text", "Options:", "white", startPoint.x + 310, gameTitle.y + 105, "left", 10));
        var startMenu = startPoint.y + 255;
        if (gameModes.findIndex (mode => mode.active == true) < 3)
        {
            gameText.push (new component ("text", "Pause", "white", startPoint.x + 575, startMenu, "left", 10));
            startMenu += 25;
        }
        gameText.push (new component ("text", "Sound", "white", startPoint.x + 575, startMenu, "left", 10));
        gameText.push (new component ("text", "Music", "white", startPoint.x + 575, gameText [gameText.length - 1].y + 25, "left", 10));
        gameText.push (new component ("text", "FPS Monitor", "white", startPoint.x + 575, gameText [gameText.length - 1].y + 25, "left", 10));
        gameText.push (new component ("text", "Exit", "white", startPoint.x + 575, gameText [gameText.length - 1].y + 25, "left", 10));
        gameText.push (new component ("text", "Remake by Marc Pinyot Gascón  1986-2024", "white", gameArea.centerPoint.x, startPoint.y + 445, "center", 10));
        menuShip = new ship (null, playerColors [0], startPoint.x + 450, startPoint.y + 255, 50, 90);
    }
    else
    {
        gameText.push (new component ("text", text, "white", gameArea.centerPoint.x, gameArea.centerPoint.y, "center", 32));
        gameText.push (new component ("text", "Press 'Esc' to " + gameModal + "...", "white", gameArea.centerPoint.x, gameText [0].y + 30, "center", 10));
    }
}

function gameCloseModal ()
{
    modalGround = null;
    gameTitle = null;
    gameText = [];
    menuShip = null;
    menuShots = [];
    menuHits = [];
    gameModal = null;
    if (gameModes.findIndex (mode => mode.active == true) == 3 && document.getElementById ("playersConnecting").innerHTML.length > 0) document.getElementById ("highScoreHud").style.height = "46px";
    else document.getElementById ("highScoreHud").style.height = "23px";
    document.getElementById ("scoreHud").style.height = (23 * gameShips.length) + "px";
    if (gameShips.length > 2) document.getElementById ("lifesHud").style.height = (23 * Math.round ((gameShips.length - 1) / 2)) + "px";
    else document.getElementById ("lifesHud").style.height = "23px";
    changeTab ("game");
}

function generateGameMap (map)
{
    switch (map)
    {
        case "level1":
            gameMap =
            {
                name: map,
                width: 4080,
                height: 2000
            };
            gameGround.push (new ground ("water", "#292C9C", 0, 0, gameMap.width, gameMap.height));
            gameGround.push (new ground ("sand", "sandybrown", 250, 165, [380, 600, 900, 750, 650], [600, 950, 700, 500, 100]));
            gameGround.push (new ground ("grass", "green", 350, 175, [425, 575, 850, 675, 625], [550, 850, 700, 550, 150]));
            gameGround.push (new ground ("lava", "#FF2200", 470, 310, [530, 650, 750, 765, 645, 525, 420, 430], [450, 500, 500, 520, 520, 470, 380, 330]));
            gameGround.push (new ground ("base", "#B5B2B5", 488, 186, 80, 88));
            gameGround.push (new digital ("1", "red", "white", 503, 240, 1, 0.075));
            gameGround.push (new digital ("2", "red", "white", 503, 200, 1, 0.075));
            gameGround.push (new digital ("3", "black", "yellow", 539, 200, 1, 0.075));
            gameGround.push (new digital ("4", "black", "yellow", 539, 240, 1, 0.075));
            gameGround.push (new ground ("snow", "white", 1650, 100, [2200, 2500, 2100, 1700, 1500, 1400, 1200], [200, 550, 700, 500, 600, 300, 200]));
            gameGround.push (new ground ("snow", "white", 3150, 25, [3400, 3850, 3600, 3200, 3100, 2940, 2890], [200, 400, 600, 550, 700, 550, 200]));
            gameGround.push (new ground ("sand", "sandybrown", 3310, 1165, [3240, 3600, 3960, 3810, 3710], [1600, 1950, 1700, 1500, 1100]));
            gameGround.push (new ground ("grass", "green", 3410, 1175, [3285, 3550, 3910, 3735, 3685], [1550, 1850, 1700, 1550, 1150]));
            gameGround.push (new ground ("concrete", "#939093", 3500, 1150, [3500, 3350, 3350, 3400, 3500, 3550, 3550, 3495, 3395, 3330, 3330, 3480, 3480], [1400, 1450, 1550, 1600, 1650, 1650, 1670, 1670, 1620, 1555, 1435, 1385, 1150]));
            gameGround.push (new ground ("base", "#B5B2B5", 3548, 1686, 80, 88));
            gameGround.push (new digital ("5", "red", "white", 3563, 1740, 1, 0.075));
            gameGround.push (new digital ("6", "red", "white", 3563, 1700, 1, 0.075));
            gameGround.push (new digital ("7", "black", "yellow", 3599, 1700, 1, 0.075));
            gameGround.push (new digital ("8", "black", "yellow", 3599, 1740, 1, 0.075));
            enemies = 270;
            gameEnemies.push (new enemy (3, 150, 100, 0));
            gameEnemies.push (new enemy (3, 900, 200, 0));
            gameEnemies.push (new enemy (3, 200, 400, 0));
            gameEnemies.push (new enemy (4, 800, 400, 0));
            gameEnemies.push (new enemy (5, 1300, 350, 0));
            gameEnemies.push (new enemy (4, 1700, 250, 0));
            gameEnemies.push (new enemy (6, 2500, 250, 0));
            gameEnemies.push (new enemy (5, 3500, 150, 0));
            gameEnemies.push (new enemy (3, 3850, 350, 0));
            gameEnemies.push (new enemy (6, 2500, 650, 0));
            gameEnemies.push (new enemy (6, 2700, 750, 0));
            gameEnemies.push (new enemy (6, 2500, 1200, 0));
            gameEnemies.push (new enemy (6, 3400, 1200, 0));
            gameEnemies.push (new enemy (5, 400, 1800, 0));
            gameEnemies.push (new enemy (5, 1500, 1600, 0));
            gameEnemies.push (new enemy (5, 2300, 1700, 0));
            gameEnemies.push (new enemy (5, 3900, 1900, 0));
            for (var y = 195; y < 2000; y += 410)
            {
                for (var x = 195; x < 4080; x += 410)
                {
                    gameEnemies.push (new enemy (Math.floor (Math.random () * 3), x, y, Math.floor (Math.random () * 720) - 360));
                }
            }
        break;
        case "mode2":
            gameMap =
            {
                name: map,
                width: 1020,
                height: 500
            };
            gameGround.push (new ground ("water", "#292C9C", 0, 0, gameMap.width, gameMap.height));
            gameGround.push (new ground ("sand", "sandybrown", 250, 165, [380, 400, 900, 750, 650], [300, 450, 400, 350, 100]));
            gameGround.push (new ground ("grass", "green", 350, 175, [400, 425, 850, 675, 625], [250, 385, 400, 350, 150]));
            gameGround.push (new ground ("base", "#B5B2B5", 488, 186, 80, 88));
            gameGround.push (new digital ("1", "red", "white", 503, 240, 1, 0.075));
            gameGround.push (new digital ("2", "red", "white", 503, 200, 1, 0.075));
            gameGround.push (new digital ("3", "black", "yellow", 539, 200, 1, 0.075));
            gameGround.push (new digital ("4", "black", "yellow", 539, 240, 1, 0.075));
            gameGround.push (new ground ("base", "#B5B2B5", 488, 281, 80, 88));
            gameGround.push (new digital ("5", "red", "white", 503, 335, 1, 0.075));
            gameGround.push (new digital ("6", "red", "white", 503, 295, 1, 0.075));
            gameGround.push (new digital ("7", "black", "yellow", 539, 295, 1, 0.075));
            gameGround.push (new digital ("8", "black", "yellow", 539, 335, 1, 0.075));
        break;
        case "mode3":
            gameMap =
            {
                name: map,
                width: 4080,
                height: 2000
            };
            gameGround.push (new ground ("water", "#292C9C", 0, 0, gameMap.width, gameMap.height));
            gameGround.push (new ground ("sand", "sandybrown", 250, 165, [380, 600, 900, 750, 650], [600, 950, 700, 500, 100]));
            gameGround.push (new ground ("grass", "green", 350, 175, [425, 575, 850, 675, 625], [550, 850, 700, 550, 150]));
            gameGround.push (new ground ("lava", "#FF2200", 470, 310, [530, 650, 750, 765, 645, 525, 420, 430], [450, 500, 500, 520, 520, 470, 380, 330]));
            gameGround.push (new ground ("base", "#B5B2B5", 488, 186, 80, 88));
            gameGround.push (new digital ("1", "red", "white", 503, 240, 1, 0.075));
            gameGround.push (new digital ("2", "red", "white", 503, 200, 1, 0.075));
            gameGround.push (new digital ("3", "black", "yellow", 539, 200, 1, 0.075));
            gameGround.push (new digital ("4", "black", "yellow", 539, 240, 1, 0.075));
            gameGround.push (new ground ("snow", "white", 1650, 100, [2200, 2500, 2100, 1700, 1500, 1400, 1200], [200, 550, 700, 500, 600, 300, 200]));
            gameGround.push (new ground ("snow", "white", 3150, 25, [3400, 3850, 3600, 3200, 3100, 2940, 2890], [200, 400, 600, 550, 700, 550, 200]));
            gameGround.push (new ground ("sand", "sandybrown", 3310, 1165, [3240, 3600, 3960, 3810, 3710], [1600, 1950, 1700, 1500, 1100]));
            gameGround.push (new ground ("grass", "green", 3410, 1175, [3285, 3550, 3910, 3735, 3685], [1550, 1850, 1700, 1550, 1150]));
            gameGround.push (new ground ("concrete", "#939093", 3500, 1150, [3500, 3350, 3350, 3400, 3500, 3550, 3550, 3495, 3395, 3330, 3330, 3480, 3480], [1400, 1450, 1550, 1600, 1650, 1650, 1670, 1670, 1620, 1555, 1435, 1385, 1150]));
            gameGround.push (new ground ("base", "#B5B2B5", 3548, 1686, 80, 88));
            gameGround.push (new digital ("5", "red", "white", 3563, 1740, 1, 0.075));
            gameGround.push (new digital ("6", "red", "white", 3563, 1700, 1, 0.075));
            gameGround.push (new digital ("7", "black", "yellow", 3599, 1700, 1, 0.075));
            gameGround.push (new digital ("8", "black", "yellow", 3599, 1740, 1, 0.075));
        break;
    }
}

function toggleFullScreen ()
{
    const canvasElement = document.getElementsByTagName ("canvas")[0];
    canvasElement.requestFullscreen ();
}