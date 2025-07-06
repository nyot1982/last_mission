var fpsMonitor = false,
    gameWidth = 1020,
    gameHeight = 500,
    enemies = 0,
    idTypeAct = 0,
    idInputAct = null,
    blackScreen = false,
    gameScreen = null,
    gameModal = null,
    gameTitle = null,
    modalGround = null,
    menuShip = null,
    gameBoss = null,
    gameTab = "menu",
    controlTab = "keyboard",
    gameControls = [],
    menuControl = 99,
    colorPicker = null,
    colorPickerInput = null,
    pressed =
    {
        keys:
        {
            99: []
        },
        buttons: [],
        axes: []
    },
    mouse =
    {
        x: 0,
        y: 0,
        wheelX: 0,
        wheelY: 0,
        wheelZ: 0,
        pressed: [],
        rollover: null
    },
    menuShots = [],
    menuHits = [],
    gameObjects = [],
    gameGround = [],
    gameShips = [],
    gameEnemies = [],
    gameItems = [],
    gameText = [],
    gameAlert = [],
    gameConfirm = [],
    gameInput = [],
    gameShots = [],
    gameHits = [],
    highScores = [],
    highScoreSave = 0,
    playerId = null,
    players = [],
    storedPlayers = [],
    playerColors = ["#A5FF9A", "skin0", "skin1", "skin2", "skin3", "skin4", "skin5", "skin6", "skin7"],
    skins = [],
    userActions =
    [
        {
            screen: ["input"],
            action: "input_key",
            keyboard:
            {
                keys: [-1] // Alpha numeric
            },
            gamepad:
            {
                buttons: [],
                axes: []
            },
            joystick:
            {
                buttons: [],
                axes: []
            }
        },
        {
            screen: ["input"],
            action: "input_back",
            keyboard:
            {
                keys: [8] // Backspace
            },
            gamepad:
            {
                buttons: [],
                axes: []
            },
            joystick:
            {
                buttons: [],
                axes: []
            }
        },
        {
            screen: ["input", "color", "skin"],
            action: "input_change",
            keyboard:
            {
                keys: [9] // Tabulator
            },
            gamepad:
            {
                buttons: [0], // A
                axes: []
            },
            joystick:
            {
                buttons: [0],
                axes: []
            }
        },
        {
            screen: ["input"],
            action: "input_check",
            keyboard:
            {
                keys: [13] // Enter
            },
            gamepad:
            {
                buttons: [1, 9], // B, Start
                axes: []
            },
            joystick:
            {
                buttons: [1],
                axes: []
            }
        },
        {
            screen: ["input", "color", "skin"],
            action: "input_exit",
            keyboard:
            {
                keys: [27] // Scape
            },
            gamepad:
            {
                buttons: [2, 8], // X, Select
                axes: []
            },
            joystick:
            {
                buttons: [2],
                axes: []
            }
        },
        {
            screen: ["skin"],
            action: "skin_prev",
            keyboard:
            {
                keys: [37, 40] // Left, Dowmn
            },
            gamepad:
            {
                buttons: [13, 14], // Down, Left
                axes: []
            },
            joystick:
            {
                buttons: [],
                axes: [0, 1]
            }
        },
        {
            screen: ["skin"],
            action: "skin_next",
            keyboard:
            {
                keys: [38, 39] // Right, Up
            },
            gamepad:
            {
                buttons: [12, 15], // Up, Right
                axes: []
            },
            joystick:
            {
                buttons: [],
                axes: [0, 1]
            }
        },
        {
            screen: ["menu", "modal_menu"],
            action: "strafe_up",
            keyboard:
            {
                keys: [40] // Up
            },
            gamepad:
            {
                buttons: [13], // Up
                axes: []
            },
            joystick:
            {
                buttons: [],
                axes: [1]
            }
        },
        {
            screen: ["menu", "modal_menu"],
            action: "strafe_down",
            keyboard:
            {
                keys: [38] // Down
            },
            gamepad:
            {
                buttons: [12], // Down
                axes: []
            },
            joystick:
            {
                buttons: [],
                axes: [1]
            }
        },
        {
            screen: ["menu", "modal_menu"],
            action: "fire_menu",
            keyboard:
            {
                keys: [13, 32] // Enter, Space
            },
            gamepad:
            {
                buttons: [0], // A
                axes: []
            },
            joystick:
            {
                buttons: [0],
                axes: []
            }
        },
        {
            screen: ["modal_continue"],
            action: "close_continue",
            keyboard:
            {
                keys: [27] // Scape
            },
            gamepad:
            {
                buttons: [9, 16], // Start, Home
                axes: []
            },
            joystick:
            {
                buttons: [7],
                axes: []
            }
        },
        {
            screen: ["modal_exit"],
            action: "close_exit",
            keyboard:
            {
                keys: [27] // Scape
            },
            gamepad:
            {
                buttons: [9, 16], // Start, Home
                axes: []
            },
            joystick:
            {
                buttons: [7],
                axes: []
            }
        },
        {
            screen: ["modal_menu"],
            action: "close_modal",
            keyboard:
            {
                keys: [27] // Scape
            },
            gamepad:
            {
                buttons: [9, 16], // Start, Home
                axes: []
            },
            joystick:
            {
                buttons: [7],
                axes: []
            }
        },
        {
            screen: ["confirm"],
            action: "confirm_no",
            keyboard:
            {
                keys: [78] // N
            },
            gamepad:
            {
                buttons: [8], // Select
                axes: []
            },
            joystick:
            {
                buttons: [0],
                axes: []
            }
        },
        {
            screen: ["confirm"],
            action: "confirm_yes",
            keyboard:
            {
                keys: [89] // Y
            },
            gamepad:
            {
                buttons: [9], // Start
                axes: []
            },
            joystick:
            {
                buttons: [1],
                axes: []
            }
        },
        {
            screen: ["game"],
            action: "fire",
            keyboard:
            {
                keys: [32] // Space
            },
            gamepad:
            {
                buttons: [0], // A
                axes: []
            },
            joystick:
            {
                buttons: [0],
                axes: []
            }
        },
        {
            screen: ["game"],
            action: "change_weapon",
            keyboard:
            {
                keys: [9] // Tabulator
            },
            gamepad:
            {
                buttons: [3, 8], // Y, Select
                axes: []
            },
            joystick:
            {
                buttons: [1],
                axes: []
            }
        },
        {
            screen: ["game"],
            action: "moveZ",
            keyboard:
            {
                keys: [17] // Control
            },
            gamepad:
            {
                buttons: [1, 2], // B, X
                axes: []
            },
            joystick:
            {
                buttons: [6],
                axes: []
            }
        },
        {
            screen: ["game"],
            action: "turn",
            keyboard:
            {
                keys: [37, 39] // Left, Right
            },
            gamepad:
            {
                buttons: [],
                axes: [0] // L0
            },
            joystick:
            {
                buttons: [],
                axes: [0]
            }
        },
        {
            screen: ["game"],
            action: "strafe_left",
            keyboard:
            {
                keys: [90] // Z
            },
            gamepad:
            {
                buttons: [4], // L1
                axes: []
            },
            joystick:
            {
                buttons: [2],
                axes: []
            }
        },
        {
            screen: ["game"],
            action: "strafe_right",
            keyboard:
            {
                keys: [88] // X
            },
            gamepad:
            {
                buttons: [5], // R1
                axes: []
            },
            joystick:
            {
                buttons: [3],
                axes: []
            }
        },
        {
            screen: ["game"],
            action: "move_front",
            keyboard:
            {
                keys: [40] // Up
            },
            gamepad:
            {
                buttons: [6], // L2
                axes: []
            },
            joystick:
            {
                buttons: [],
                axes: [1]
            }
        },
        {
            screen: ["game"],
            action: "move_back",
            keyboard:
            {
                keys: [38] // Down
            },
            gamepad:
            {
                buttons: [7], // R2
                axes: []
            },
            joystick:
            {
                buttons: [],
                axes: [1]
            }
        },
        {
            screen: ["game"],
            action: "open_modal",
            keyboard:
            {
                keys: [27] // Scape
            },
            gamepad:
            {
                buttons: [9, 16], // Start, Home
                axes: []
            },
            joystick:
            {
                buttons: [7],
                axes: []
            }
        }
    ],
    startPoints =
    [
        {
            ship: null,
            x: 510,
            y: 250,
            z: 0
        },
        {
            ship: null,
            x: 510,
            y: 210,
            z: 0
        },
        {
            ship: null,
            x: 546,
            y: 210,
            z: 0
        },
        {
            ship: null,
            x: 546,
            y: 250,
            z: 0
        },
        {
            ship: null,
            x: 3570,
            y: 1750,
            z: 0
        },
        {
            ship: null,
            x: 3570,
            y: 1710,
            z: 0
        },
        {
            ship: null,
            x: 3606,
            y: 1710,
            z: 0
        },
        {
            ship: null,
            x: 3606,
            y: 1750,
            z: 0
        }
    ],
    gameModes =
    [
        {
            title: "One Player",
            icon: "user",
            active: false
        },
        {
            title: "Local Multiplayer (Cooperative)",
            icon: "user-group",
            active: false
        },
        {
            title: "Local Mltiplayer (Versus)",
            icon: "regular fa-user-group",
            active: false
        },
        {
            title: "Online Multiplayer",
            icon: "users",
            active: false
        }
    ],
    gameSound =
    {
        active: true,
        sounds: []
    },
    gameMusic =
    {
        active: true,
        musics: []
    },
    gameArea =
    {
        canvas: document.createElement ("canvas"),
        start: function ()
        {
            this.canvas.id = "lastMission";
            this.canvas.width = gameWidth;
            this.canvas.height = gameHeight;
            this.canvas.innerText = "Este navegador no soporta la etiqueta de canvas.";
            this.ctx = this.canvas.getContext ("2d");
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.imageSmoothingQuality = "high";
            document.getElementsByTagName ("article")[0].insertBefore (this.canvas, document.getElementsByTagName ("article")[0].childNodes [0]);
            this.canvas.setAttribute ("onmousemove", "javascript: mouseMove (event);");
            this.canvas.setAttribute ("onmousedown", "javascript: mouseDown (event);");
            this.canvas.setAttribute ("onmouseup", "javascript: mouseUp (event);");
            document.addEventListener
            (
                "wheel",
                function (e)
                {
                    mouseWheel (e);
                },
                {
                    passive: true
                }
            );
            this.frame = 0;
            this.fps = 0;
            this.timer = Date.now ();
            this.centerPoint = 
            {
                x: gameWidth / 2,
                y: gameHeight / 2,
            };
            this.play ();
        },
        play: function ()
        {
            if (gameScreen == "game" && gameMusic.active) gameMusic.musics.game.play ();
            this.animation = window.requestAnimationFrame (updateGameArea);
        },
        pause: function ()
        {
            if (gameScreen == "game" && gameMusic.active) gameMusic.musics.game.pause ();
            window.cancelAnimationFrame (this.animation);
        },
        stop: function ()
        {
            stopUserInteractions ();
            window.cancelAnimationFrame (this.animation);
            this.frame = null;
            this.ctx = null;
            this.canvas = null;
        },
        clear: function ()
        {
            this.ctx.clearRect (0, 0, this.canvas.width, this.canvas.height);
        }
    },
    usersPlaying = 0,
    playersConnecting = 0,
    wss = null;

$(document).ready (function ()
{
    $("preloader").fadeOut (1000);
    if (typeof (Storage) === "undefined") alert ("This browser does not support local web storage.");
    else
    {
        if (typeof (localStorage.gameSound) !== "undefined" && localStorage.gameSound != "")
        {
            gameSound.active = localStorage.gameSound == 1 ? true : false;
            document.getElementById ("sound").innerHTML = gameSound.active ? "On" : "Off";
        }
        if (typeof (localStorage.gameMusic) !== "undefined" && localStorage.gameMusic != "")
        {
            gameMusic.active = localStorage.gameMusic == 1 ? true : false;
            document.getElementById ("music").innerHTML = gameMusic.active ? "On" : "Off";
        }
        if (typeof (localStorage.fpsMonitor) !== "undefined" && localStorage.fpsMonitor != "")
        {
            fpsMonitor = localStorage.fpsMonitor == 1 ? true : false;
            if (fpsMonitor) $("#fps_monitor").addClass ("active");
            else $("#fps_monitor").removeClass ("active");
        }
    }
    gameLoadScreen ("start");
    gameArea.start ();
});

function fetchLoad (cont, param)
{
    if (cont == "highScoreHud") document.getElementById (cont).innerHTML = '<preloader><div class="spinner"></div></preloader>';
    else if (cont == "high_scores") gameText.push (new component ("text", "Loading...", "yellow", 400, 255, "left", 10));
  
    var cadParam = "fetch_call=fetch_origin";
    if (param) cadParam += "&" + param;
    
    const options =
    {
        method: "POST",
        headers:
        {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: cadParam
    };

    const isResponseOk = response =>
    {
        if (!response.ok) throw new Error (response.status);
        return response.json ();
    }
      
    fetch ("fetch/" + cont + ".php", options)
    .then (response => isResponseOk (response))
    .then
    (
        responseJSON =>
        {
            if (responseJSON ["error"]) console.error ("Error! ", responseJSON ["error"]);
            else if (cont == "highScoreHud")
            {
                document.getElementById (cont).innerHTML = "High Score: " + responseJSON [cont];
                if (gameModes.findIndex (mode => mode.active == true) == 3) document.getElementById (cont).innerHTML += '<div id="playersConnecting"></div>';
            }
            else if (cont == "high_scores") gameHighScores (responseJSON ["max_high_scores"], responseJSON ["high_scores"]);
            else if (cont == "high_score_save")
            {
                if (responseJSON ["high_score_save"] > 0) highScoreSave = responseJSON ["high_score_save"];
            }
            else document.getElementById (cont).innerHTML += responseJSON [cont];
        }
    )
    .catch (error => console.error ("Error! ", error.message));
}

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
    gameInput = [];
    idInputAct = null;
    idTypeAct = 0;
    gameModal = null;
    mouse.rollover = null;

    if (gameScreen == "game" && (screen == "menu" || screen == "game_over" || screen == "game_completed"))
    {
        ctx.translate (gameArea.centerPoint.x - gameWidth / 2, gameArea.centerPoint.y - gameHeight / 2);
        gameArea.centerPoint =
        {
            x: gameWidth / 2,
            y: gameHeight / 2,
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
        gameGround.push (new ground ("menu", "black", 0, 0, gameWidth, gameHeight));
        gameTitle = new component ("image", "svgs/title.svg", "", gameWidth / 2, 100, 203, 92);
        gameText.push (new component ("text", "Welcome to Last Mission.", "white", gameWidth / 2, 275, "center", 10));
        gameText.push (new component ("text", "Press any key to start...", "white", gameWidth / 2, gameText [0].y + 30, "center", 10));
        gameText.push (new component ("text", "Remake by Marc Pinyot Gascón  1986-2024", "white", gameWidth / 2, 445, "center", 10));
    }
    else if (gameScreen == "menu")
    {
        if (gameMusic.active && !gameMusic.musics.menu.source) gameMusic.musics.menu.play ();
        gameGround.push (new ground ("menu", "black", 0, 0, gameWidth, gameHeight));
        gameTitle = new component ("image", "svgs/title.svg", "", gameWidth / 2, 100, 203, 92);
        gameText.push (new component ("text", "Options:", "white", 310, gameTitle.y + 105, "left", 10));
        gameText.push (new component ("text", "One Player", "white", 575, gameText [0].y + 15, "left", 10));
        gameText.push (new component ("text", "Cooperative", "white", 575, gameText [1].y + 25, "left", 10));
        gameText.push (new component ("text", "Versus", "white", 575, gameText [2].y + 25, "left", 10));
        gameText.push (new component ("text", "Online", "white", 575, gameText [3].y + 25, "left", 10));
        gameText.push (new component ("text", "Sound", "white", 575, gameText [4].y + 25, "left", 10));
        gameText.push (new component ("text", "Music", "white", 575, gameText [5].y + 25, "left", 10));
        gameText.push (new component ("text", "FPS Monitor", "white", 575, gameText [6].y + 25, "left", 10));
        gameText.push (new component ("text", "High Scores", "white", 575, gameText [7].y + 25, "left", 10));
        gameText.push (new component ("text", "Remake by Marc Pinyot Gascón  1986-2024", "white", gameWidth / 2, 445, "center", 10));
        gameText.push (new component ("traffic", "", "", 645, 295, 12, 28));
        menuShip = new ship (null, playerColors [0], 450, gameText [0].y + 15, 50, 90);
        changeTab ("menu");
        resetHuds (true, 0);
        if (wss == null || wss == 1000 || wss == 3000) wssOpen ();
    }
    else if (gameScreen == "high_scores")
    {
        gameGround.push (new ground ("menu", "black", 0, 0, gameWidth, gameHeight));
        gameTitle = new component ("image", "svgs/title.svg", "", gameWidth / 2, 100, 203, 92);
        gameText.push (new component ("text", "High Scores:", "white", 310, gameTitle.y + 105, "left", 10));
        fetchLoad ("high_scores");
        changeTab ("alert");
    }
    else if (gameScreen == "intro" || gameScreen == "game_over" || gameScreen == "game_completed")
    {
        gameGround.push (new ground ("menu", "black", 0, 0, gameWidth, gameHeight));
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
            gameText.push (new component ("type", "LAST MISSION", "white", gameWidth / 2, 150, "center", 10));
            gameText.push (new component ("type", "HARD LUCK!", "white", gameWidth / 2, 210, "center", 10));
            gameText.push (new component ("type", "YOUR MISSION HAS FAILED.", "white", gameWidth / 2, 240, "center", 10));
        }
        else if (gameScreen == "game_completed")
        {
            gameText.push (new component ("type", "LAST MISSION", "white", gameWidth / 2, 150, "center", 10));
            gameText.push (new component ("type", "WELL DONE!", "white", gameWidth / 2, 210, "center", 10));
            gameText.push (new component ("type", "YOUR MISSION HAS", "white", gameWidth / 2, 240, "center", 10));
            gameText.push (new component ("type", "SUCCEEDED.", "white", gameWidth / 2, 270, "center", 10));
        }
        if (gameSound.active) gameSound.sounds ["type"].play ();
        changeTab ("alert");
    }
    else if (gameScreen == "game")
    {
        gameGround.push (new ground ("water", "#292C9C", 0, 0, gameWidth * 4, gameHeight * 4));
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
        if (gameModes.findIndex (mode => mode.active == true) < 2)
        {
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
        }
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
            else if (gameModes.findIndex (mode => mode.active == true) == 3)
            {
                storedPlayers =
                [
                    {
                        name: players [0].name,
                        color: players [0].color,
                        skin: players [0].skin
                    }
                ];
                localStorage.players3 = JSON.stringify (storedPlayers);
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
    gameInput = [];
    gameAlert = [];
    gameConfirm = [];
    startPoint =
    {
        x: gameArea.centerPoint.x - gameWidth / 2,
        y: gameArea.centerPoint.y - gameHeight / 2
    }
    if (gameModal == null)
    {
        document.getElementById ("scoreHud").style.height = "0px";
        document.getElementById ("highScoreHud").style.height = "0px";
        document.getElementById ("lifesHud").style.height = "0px";
        modalGround = new ground ("menu", "#000000DD", startPoint.x, startPoint.y, gameWidth, gameHeight);
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

function updateGameArea ()
{
    if (fpsMonitor)
    {
        var timer = Date.now () - gameArea.timer;
        if (timer >= 1000)
        {
            document.getElementById ("frame_rate").innerHTML = (gameArea.frame - gameArea.fps) + " fps";
            var ms = Math.round (1000 / (gameArea.frame - gameArea.fps));
            document.getElementById ("frame_time").innerHTML = (ms == Infinity || isNaN (ms) ? 0 : ms) + " ms";
            gameArea.fps = gameArea.frame;
            gameArea.timer = Date.now ();
        }
    }
    controls ();
    var mapHud = document.getElementById ("mapHud");
    mapHud.innerHTML = '<table cellspacing="0"><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr></table>';
    gameArea.clear ();
    for (var ground in gameGround) gameGround [ground].update ();
    if (gameScreen == "start")
    {
        if (Object.keys (gameSound.sounds).length > 0 && Object.keys (gameMusic.musics).length > 0)
        {
            var loadedAudio = 0;
            for (var sound in gameSound.sounds) if (gameSound.sounds [sound].duration > 0) loadedAudio++;
            for (var music in gameMusic.musics) if (gameMusic.musics [music].duration > 0) loadedAudio++;
            gameText [1].src = "Loading audio: " + loadedAudio + "/" + (Object.keys (gameSound.sounds).length + Object.keys (gameMusic.musics).length) + " Files.";
            gameText [1].color = "green";
            if (loadedAudio == Object.keys (gameSound.sounds).length + Object.keys (gameMusic.musics).length)
            {
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
    }
    if (gameScreen == "game")
    {
        gameItems = gameItems.filter (item => !item.taken || item.z > 0);
        gameShots = gameShots.filter (shot => !shot.hit && shot.x > 0 && shot.x < gameWidth * 4 && shot.y > 0 && shot.y < gameHeight * 4);
        gameHits = gameHits.filter (hit => !hit.reverse || hit.r > 0);
        gameEnemies = gameEnemies.filter (enemy => enemy.life > 0);
        if (gameModes.findIndex (mode => mode.active == true) == 3 && wss != null && wss.readyState == WebSocket.OPEN) wssSend ();
        else
        {
            gameShips = gameShips.filter (ship => ship.lifes > 0);
            gameObjects = gameShips.concat (gameEnemies).concat (gameItems).concat (gameShots);
            gameObjects.sort ((object1, object2) => object1.z - object2.z);
        }
        if (enemies == 0 && gameModes.findIndex (mode => mode.active == true) < 2)
        {
            if (!gameBoss) gameBoss = new boss (0, gameWidth * 2, gameHeight * 2);
            gameBoss.update ();
        }
        for (var object in gameObjects)
        {
            gameObjects [object].update ();
            if (gameHits.findIndex (hit => hit.name == gameObjects [object].name) > -1) for (var hit in gameHits.filter (hit => hit.name == gameObjects [object].name)) gameHits [hit].update ();
        }
        for (var hit in gameHits.filter (hit => hit.name == "hit0")) gameHits [hit].update ();
        speedHud ();
    }
    if (gameModal != null || gameScreen != "game")
    {
        if (gameScreen == "menu" && wss != null && wss.readyState == WebSocket.OPEN) wssSend ();
        if (modalGround) modalGround.update ();
        menuShots = menuShots.filter (shot => !shot.hit && shot.x > 0 && shot.x < gameWidth * 4 && shot.y > 0 && shot.y < gameHeight * 4);
        for (var shot in menuShots) menuShots [shot].update ();
        menuHits = menuHits.filter (hit => !hit.reverse || hit.r > 0);
        if (gameTitle) gameTitle.update ();
        for (var text in gameText)
        {
            if (gameText [text]) gameText [text].update (text);
            if (menuHits.findIndex (hit => hit.name == gameText [text].src) > -1) for (var hit in menuHits.filter (hit => hit.name == gameText [text].src)) menuHits [hit].update ();
        }
        for (var input in gameInput) gameInput [input].update (input);
        for (var confirm in gameConfirm) gameConfirm [confirm].update ();
        for (var alert in gameAlert) gameAlert [alert].update ();
        if (menuShip) menuShip.update ();
    }
    if (mouse.rollover != null) mouse.rollover.update ();
    gameArea.frame++;
    gameArea.animation = window.requestAnimationFrame (updateGameArea);
}

function openFullscreen ()
{
    var elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen ();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen ();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen ();
}

function closeFullscreen ()
{
    if (document.exitFullscreen) document.exitFullscreen ();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen ();
    else if (document.msExitFullscreen) document.msExitFullscreen ();
}