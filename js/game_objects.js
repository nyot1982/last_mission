function audio (src, loop)
{
    this.src = src;
    this.loop = loop;
    this.audioCtx = new AudioContext ();
    this.buffer;
    this.source;
    this.duration = 0;
    
    this.load = async function ()
    {
        try
        {
            const response = await fetch (this.src);
            this.audioCtx.decodeAudioData
            (
                await response.arrayBuffer (), (buf) =>
                {
                    // executes when buffer has been decoded
                    this.buffer = buf;
                    this.duration = buf.duration.toFixed (2);
                }
            );
        }
        catch (err)
        {
            console.error (`Unable to fetch the audio file. Error: ${err.message}`);
        }
    }

    this.play = function ()
    {
        this.source = this.audioCtx.createBufferSource ();
        this.source.buffer = this.buffer;
        this.source.playbackRate.value = 1;
        this.source.connect (this.audioCtx.destination);
        this.source.loop = this.loop;
        this.source.loopStart = 0;
        this.source.loopEnd = 0;
        this.source.start ();
    }

    this.pause = function ()
    {
        if (this.source) this.source.stop ();
    }

    this.stop = function ()
    {
        if (this.source)
        {
            this.source.stop ();
            this.source = null;
        }
    }

    this.load ();
}

function shot (name, weapon, color, x, y, width, height, speed, heading)
{
    this.name = name;
    this.weapon = weapon;
    this.color = color;
    this.x = x;
    this.y = y;
    this.z = 50;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.heading = heading;
    this.radians = this.heading * Math.PI / 180;
    this.move = 0;
    this.turn = 0;
    this.hit = false;
    
    this.update = function ()
    {
        if (!this.hit)
        {
            this.move = this.speed;
            this.heading = (this.heading + this.turn) % 360;
            this.radians = this.heading * Math.PI / 180;
            this.x += this.move * Math.sin (this.radians);
            this.y -= this.move * Math.cos (this.radians);

            ctx = gameArea.ctx;
            if (gameModal != "menu" && gameScreen != "menu") ctx.shadowColor = "#00000022";
            else ctx.shadowColor = "transparent";
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 18;
            ctx.shadowOffsetY = 18;
            ctx.save ();
            ctx.translate (this.x, this.y);
            ctx.rotate (this.radians);
            if (this.weapon == 0 || this.weapon == 4)
            {
                ctx.lineWidth = 0;
                ctx.fillStyle = this.color;
                ctx.fillRect (-(this.height / 2), 0, this.height, this.width);
                if (this.weapon == 4) ctx.fillRect (-4.5, this.width - 7, 9, 3);
            }
            else if (this.weapon == 1)
            {
                ctx.lineWidth = this.height;
                ctx.beginPath ();
                ctx.moveTo (0, 0);
                ctx.lineTo (-this.width, this.width);
                ctx.moveTo (0, 0);
                ctx.lineTo (this.width, this.width);
                ctx.strokeStyle = "#4A4A4A";
                ctx.stroke ();
                ctx.beginPath ();
                ctx.moveTo (0, 3);
                ctx.lineTo (-(this.width - 3), this.width);
                ctx.moveTo (0, 3);
                ctx.lineTo (this.width - 3, this.width);
                ctx.strokeStyle = this.color;
                ctx.stroke ();
                ctx.beginPath ();
                ctx.moveTo (0, 6);
                ctx.lineTo (-(this.width - 6), this.width);
                ctx.moveTo (0, 6);
                ctx.lineTo (this.width - 6, this.width);
                ctx.strokeStyle = "black";
                ctx.stroke ();
            }
            else if (this.weapon == 2)
            {
                ctx.beginPath ();
                ctx.lineWidth = 0;
                ctx.arc (0, 0, this.width, 0, 2 * Math.PI);
                ctx.fillStyle = "#4A4A4A";
                ctx.fill ();
                ctx.shadowColor = "transparent";
                ctx.beginPath ();
                ctx.lineWidth = this.width / 2;
                ctx.arc (0, 0, this.width / 2, 0, 2 * Math.PI);
                ctx.strokeStyle = "black";
                ctx.stroke ();
                ctx.fillStyle = this.color;
                ctx.fill ();
            }
            else if (this.weapon == 3)
            {
                ctx.beginPath ();
                ctx.lineWidth = this.height;
                ctx.arc (0, 3, this.width, -Math.PI / 1.1, -0.3);
                ctx.strokeStyle = '#4A4A4A';
                ctx.stroke ();
                ctx.beginPath ();
                ctx.lineWidth = this.height;
                ctx.arc (0, 0, this.width, -Math.PI / 1.1, -0.3);
                ctx.strokeStyle = this.color;
                ctx.stroke ();
                ctx.beginPath ();
                ctx.lineWidth = this.height;
                ctx.arc (0, 7, this.width - 4, -Math.PI / 1.1, -0.3);
                ctx.strokeStyle = '#4A4A4A';
                ctx.stroke ();
                ctx.beginPath ();
                ctx.lineWidth = this.height;
                ctx.arc (0, 4, this.width - 4, -Math.PI / 1.1, -0.3);
                ctx.strokeStyle = this.color;
                ctx.stroke ();
                ctx.beginPath ();
                ctx.lineWidth = this.height;
                ctx.arc (0, 12, this.width - 8, -Math.PI / 1.1, -0.3);
                ctx.strokeStyle = '#4A4A4A';
                ctx.stroke ();
                ctx.beginPath ();
                ctx.lineWidth = this.height;
                ctx.arc (0, 9, this.width - 8, -Math.PI / 1.1, -0.3);
                ctx.strokeStyle = this.color;
                ctx.stroke ();
                ctx.beginPath ();
                ctx.lineWidth = this.height;
                ctx.arc (0, 14, this.width - 12, -Math.PI / 1.1, -0.3);
                ctx.strokeStyle = this.color;
                ctx.stroke ();
            }
            else if (this.weapon == 5)
            {
                ctx.beginPath ();
                ctx.lineWidth = this.height;
                ctx.arc (0, 0, this.width, 0, 2 * Math.PI);
                ctx.strokeStyle = "#4A4A4A";
                ctx.stroke ();
                ctx.fillStyle = this.color;
                ctx.fill ();
            }
            ctx.restore ();
        }
    }
}

function hit (name, x, y, radius, add)
{
    this.name = name;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.add = add;
    this.r = 0;
    this.reverse = false;
    this.colors = ['#813338', '#8E3C97', '#56AC4D'];
    this.color = 0;
    
    this.update = function ()
    {
        if (!this.reverse || this.r > 0)
        {
            if (this.reverse && this.r > 0) this.r -= this.add;
            else if (this.r < this.radius) this.r += this.add;
            else this.reverse = true;
            ctx = gameArea.ctx;
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.beginPath ();
            ctx.arc (this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.fillStyle = this.colors [this.color];
            if (this.r % 5 == 0)
            {
                this.color++
                if (this.color == this.colors.length) this.color = 0;
            }
            ctx.fill ();
        }
    }
}

function item (enemy, x, y)
{
    if (enemy < 3) this.type = Math.floor (Math.random () * 4);
    else this.type = Math.floor (Math.random () * 6) + 4;
    this.x = x;
    this.y = y;
    this.z = 500;
    this.taken = false;
    this.radius = 16;
    this.shadowOffset = 18;
    this.icons = ['heart', 'gas-pump', 'crosshairs', 'shield-halved', 'clock', 'burst', 'fire', 'P', 'K', 'H'];

    this.update = function ()
    {
        if (!this.taken && this.z > 0)
        {
            ctx = gameArea.ctx;
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000CC";
            if (gameModal != "menu" && gameScreen != "menu") ctx.shadowColor = "#00000066";
            else ctx.shadowColor = "transparent";
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = this.shadowOffset;
            ctx.shadowOffsetY = this.shadowOffset;
            ctx.beginPath ();
            ctx.arc (this.x, this.y, this.radius, 0, 2 * Math.PI);
            var grad = ctx.createRadialGradient (this.x, this.y, this.radius / 2, this.x, this.y, this.radius);
            grad.addColorStop (0, "#B2B2B2");
            grad.addColorStop (1, "#4A4A4A");
            ctx.fillStyle = grad;
            ctx.fill ();
            ctx.stroke ();
            ctx.shadowColor = "transparent";
            if (this.type < 7)
            {
                this.image = new Image ();
                this.image.src = "svgs/solid/" + this.icons [this.type] + ".svg";
                ctx.drawImage (this.image, this.x - this.radius / 2, this.y - this.radius / 2, this.radius, this.radius);
            }
            else
            {
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = this.radius + "px PressStart2P";
                ctx.fillStyle = "black";
                ctx.fillText (this.icons [this.type], this.x, this.y);
            }
            this.z--;
            this.radius -= (16 / 1000);
            this.shadowOffset -= (18 / 500);

            for (var gameShip in gameShips)
            {
                var dx = this.x - gameShips [gameShip].x;
                var dy = this.y - gameShips [gameShip].y;
                if (Math.sqrt (dx * dx + dy * dy) < 30)
                {
                    this.taken = true;
                    if (gameShips [gameShip].name == players [0].name && gameShips [gameShip].life > 0)
                    {
                        if (this.type == 0)
                        {
                            gameShips [gameShip].life += 10;
                            if (gameShips [gameShip].life > 100) gameShips [gameShip].life = 100;        
                            vitalsHud ("life", gameShips [gameShip].life, "blue");
                        }
                        else if (this.type == 1)
                        {
                            gameShips [gameShip].fuel += 10;
                            if (gameShips [gameShip].fuel > 100) gameShips [gameShip].fuel = 100;
                            vitalsHud ("fuel", gameShips [gameShip].fuel, "blue");
                        }
                        else if (this.type == 2)
                        {
                            gameShips [gameShip].ammo += 10;
                            if (gameShips [gameShip].ammo > 100) gameShips [gameShip].ammo = 100;
                            vitalsHud ("ammo", gameShips [gameShip].ammo, "blue");
                            
                        }
                        else if (this.type == 3)
                        {
                            gameShips [gameShip].shield += 10;
                            if (gameShips [gameShip].shield > 100) gameShips [gameShip].shield = 100;
                            vitalsHud ("shield", gameShips [gameShip].shield, "blue");
                        }
                        else if (this.type == 4 && gameShips [gameShip].weapons [gameShips [gameShip].weapon].rate == 1) gameShips [gameShip].weapons [gameShips [gameShip].weapon].rate++;
                        else if (this.type == 5 && gameShips [gameShip].weapons [gameShips [gameShip].weapon].power == 1) gameShips [gameShip].weapons [gameShips [gameShip].weapon].power++;
                        else if (this.type == 6 && gameShips [gameShip].weapons [gameShips [gameShip].weapon].power == 2) gameShips [gameShip].weapons [gameShips [gameShip].weapon].power++;
                        else if (this.type == 7)
                        {
                            gameShips [gameShip].weapon = 1;
                            if (gameShips [gameShip].weapons [gameShips [gameShip].weapon].power == 0) gameShips [gameShip].weapons [gameShips [gameShip].weapon].power = 1;
                        }
                        else if (this.type == 8)
                        {
                            gameShips [gameShip].weapon = 2;
                            if (gameShips [gameShip].weapons [gameShips [gameShip].weapon].power == 0) gameShips [gameShip].weapons [gameShips [gameShip].weapon].power = 1;
                        }
                        else if (this.type == 9)
                        {
                            gameShips [gameShip].weapon = 3;
                            if (gameShips [gameShip].weapons [gameShips [gameShip].weapon].power == 0) gameShips [gameShip].weapons [gameShips [gameShip].weapon].power = 1;
                            
                        }
                        if (this.type > 3) weaponHud ();
                    }
                }
            }
            if (this.z == 0)
            {
                gameHits.push (new hit ("hit0", this.x, this.y, 20, 1));
                if (gameSound.active)
                {
                    gameSound.sounds ["hit1"].stop ();
                    gameSound.sounds ["hit1"].play ();
                }
            }
        }
    }
}

function component (type, src, color, x, y, width, height, max, control)
{
    this.type = type;
    if (this.type == "color")
    {
        colorPicker = document.getElementById ("colorPicker");
        colorPickerInput = document.getElementById ("colorPickerInput");
        if (colorPicker.style.display == "block")
        {
            colorPickerInput.blur ();
            colorPicker.style.display = "none";
        }
    }
    this.src = src;
    if (this.type == "image")
    {
        this.image = new Image ();
        this.image.src = this.src;
        this.color = "";
        this.rollover = color;
    }
    else
    {
        this.color = color;
        this.rollover = "";
        if (this.type == "type") this.typeFrame = 1;
    }
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.max = max;
    this.control = control;
    this.cursor = "";

    this.update = function (idComponent)
    {
        ctx = gameArea.ctx;
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        if (this.type == "image")
        {
            if (!(gameScreen == "menu" && idComponent == 11 && (wss == null || wss.readyState !== 1)))
            {
                ctx.save ();
                ctx.translate (this.x, this.y);
                ctx.rotate (this.radians);
                ctx.drawImage (this.image, -(this.width / 2), -(this.height / 2), this.width, this.height);
                ctx.restore ();
            }
        }
        else if (this.type == "text" || this.type == "input" || this.type == "type" || this.type == "skin")
        {
            if (this.type == "input" || this.type == "skin")
            {
                if (idInputAct >= gameInput.length) idInputAct = gameInput.length - 1;
                if (idInputAct == idComponent)
                {
                    if (gameArea.frame % 30 == 0 && gameAlert.length == 0) this.cursor = "_";
                    else if (gameArea.frame % 30 == 15 || gameAlert.length > 0) this.cursor = "";  
                    ctx.fillStyle = "white";
                    ctx.fillRect (this.x - 5, this.y - 10, this.height * this.max + 15, this.height + 10);
                }
                else
                {
                    ctx.beginPath ();
                    ctx.rect (this.x - 4, this.y - 9, this.height * this.max + 13, this.height + 8);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "gray";
                    ctx.stroke ();
                }
            }
            ctx.textAlign = this.width;
            ctx.textBaseline = "middle";
            ctx.font = this.height + "px PressStart2P";
            if (this.type == "type" && idComponent <= idTypeAct)
            {
                ctx.fillStyle = this.color;
                if (idTypeAct == idComponent && gameArea.frame % 5 == 0) this.typeFrame++;
                if (this.typeFrame == this.src.length && idTypeAct == idComponent) 
                {
                    ctx.fillText (this.src, this.x, this.y);
                    idTypeAct++;
                }
                else ctx.fillText (this.src.substr (0, this.typeFrame), this.x, this.y);
                if (idTypeAct == gameText.length) gameSound.sounds ["type"].stop ();
            }
            else if ((this.type == "input" || this.type == "skin") && idInputAct != idComponent)
            {
                ctx.fillStyle = "white";
                if (this.type == "skin" && this.src * 1 > -1) ctx.fillText (skins [this.src * 1].name, this.x - 4 + ((this.height * this.max + 13) / 2), this.y + 1);
                else if (this.type != "skin") ctx.fillText (this.src, this.x, this.y + 1);
            }
            else if (this.type != "type")
            {
                ctx.fillStyle = this.color;
                if (gameScreen == "menu" && idComponent == 12 && wss != null && wss.readyState === 1) ctx.fillText (usersPlaying, this.x, this.y + 1);
                else if (this.type == "skin")
                {
                    if (this.src * 1 > -1) ctx.fillText (skins [this.src * 1].name, this.x - 4 + ((this.height * this.max + 13) / 2), this.y + 1);
                    ctx.fillStyle = "white";
                    ctx.fillText ("< " + (this.src * 1 + 1) + "/" + skins.length + " >", this.x - 4 + ((this.height * this.max + 13) / 2), this.y + 26);
                }
                else if (this.type != "skin") ctx.fillText (this.src + this.cursor, this.x, this.y + 1);
            }
        }
        else if (this.type == "circle")
        {
            ctx.beginPath ();
            ctx.arc (this.x, this.y, this.height, 0, 2 * Math.PI);
            if (wss != null && wss.readyState == WebSocket.OPEN)
            {
                this.color = "#0C0";
                this.rollover = "Connected!";
            }
            else if (wss >= 1000)
            {
                this.color = "red";
                this.rollover = "Disconnected";
            }
            else
            {
                if (gameArea.frame % 20 == 0)
                {
                    if (this.color != "black") this.color = "black";
                    else if (this.color != "yellow") this.color = "yellow";
                }
                this.rollover = "Connecting..."
            }
            ctx.fillStyle = this.color;
            ctx.fill ();
        }
        else if (this.type == "rollover")
        {
            ctx.font = "10px PressStart2P";
            var textMeasure = ctx.measureText (this.src);
            ctx.beginPath ();
            ctx.roundRect (mouse.x, mouse.y - 18, textMeasure.width + 8, 18, 5);
            ctx.fillStyle = "#FFFFFFBB";
            ctx.fill ();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "red";
            ctx.stroke ();
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            ctx.textBaseline = "bottom";
            ctx.fillText (this.src, mouse.x + 4, mouse.y - 4);
        }
        else if (this.type == "color")
        {
            if (idInputAct == idComponent)
            {
                colorPicker.style.display = "block";
                colorPickerInput.focus ();
                if (gameInput [idInputAct + 1].type == "skin" && gameInput [idInputAct + 1].src * 1 > -1) colorPickerInput.value = playerColors [0];
            }
            else
            {
                ctx.beginPath ();
                ctx.rect (this.x - 4, this.y - 9, this.height * this.max + 13, this.height + 8);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "gray";
                ctx.stroke ();
                if (gameInput [2].type == "skin" && gameInput [2].src * 1 == -1)
                {
                    ctx.fillStyle = colorPickerInput.value;
                    ctx.fill ();
                }
                if (colorPickerInput && colorPicker && colorPicker.style && colorPicker.style.display == "block")
                {
                    colorPickerInput.blur ();
                    colorPicker.style.display = "none";
                }
            }
        }
        if (this.rollover != "")
        {
            if (ctx.isPointInStroke (mouse.x, mouse.y) || ctx.isPointInPath (mouse.x, mouse.y)) mouse.rollover = new component ("rollover", this.rollover);
            else if (!ctx.isPointInStroke (mouse.x, mouse.y) && !ctx.isPointInPath (mouse.x, mouse.y) && mouse.rollover != null && mouse.rollover.src == this.rollover) mouse.rollover = null;
        }
        if (gameModal == "menu" || gameScreen == "menu")
        {
            for (var menuShot in menuShots)
            {
                var dx = this.x - menuShots [menuShot].x;
                var dy = this.y - menuShots [menuShot].y;
                if (Math.sqrt (dx * dx + dy * dy) < 12)
                {
                    menuShots [menuShot].hit = true;
                    menuHits.push (new hit (this.src, menuShots [menuShot].x, menuShots [menuShot].y, 20, 1));
                    if (gameSound.active)
                    {
                        gameSound.sounds ["hit1"].stop ();
                        gameSound.sounds ["hit1"].play ();
                    }
                    switch (this.src)
                    {
                        case "One Player":
                            gameModeHud (0);
                            if (typeof (localStorage.players0) !== "undefined" && localStorage.players0.length > 0) storedPlayers = JSON.parse (localStorage.players0);
                            gameText.push (new component ("text", ">>> Enter your ship name:", "orange", 705, 220, "left", 10));
                            gameInput.push (new component ("input", (storedPlayers [0] && storedPlayers [0].name) ? storedPlayers [0].name : "Player", "black", 750, 245, "left", 10, 16, -1));
                            idInputAct = 0;
                            changeTab ("input");
                        break;
                        case "Cooperative":
                            gameModeHud (1);
                            if (typeof (localStorage.players1) !== "undefined" && localStorage.players1.length > 0) storedPlayers = JSON.parse (localStorage.players1);
                            if (gameControl != "keyboard") changeControl ("keyboard");
                            gameText.push (new component ("text", ">>> Enter your ship name:", "orange", 705, 220, "left", 10));
                            gameInput.push (new component ("input", (storedPlayers [0] && storedPlayers [0].name) ? storedPlayers [0].name : "Player", "black", 750, 245, "left", 10, 16, -1));
                            idInputAct = 0;
                            changeTab ("input");
                        break;
                        case "Versus":
                            gameModeHud (2);
                            if (typeof (localStorage.players2) !== "undefined" && localStorage.players2.length > 0) storedPlayers = JSON.parse (localStorage.players2);
                            if (gameControl != "keyboard") changeControl ("keyboard");
                            gameText.push (new component ("text", ">>> Enter your ship name:", "orange", 705, 220, "left", 10));
                            gameInput.push (new component ("input", (storedPlayers [0] && storedPlayers [0].name) ? storedPlayers [0].name : "Player", "black", 750, 245, "left", 10, 16, -1));
                            idInputAct = 0;
                            changeTab ("input");
                        break;
                        case "Online":
                            if (wss != null && wss.readyState == WebSocket.OPEN)
                            {
                                gameModeHud (3);
                                if (typeof (localStorage.players3) !== "undefined" && localStorage.players3.length > 0) storedPlayers = JSON.parse (localStorage.players3);
                                const json =
                                {
                                    action: "connect",
                                    player_id: playerId
                                };
                                wss.send (JSON.stringify (json));
                            }
                            else
                            {
                                gameAlert.push (new component ("text", ">>> Server disconnected.", "red", 705, 295, "left", 10));
                                changeTab ("alert");
                            }
                        break;
                        case "Sound":
                            if (gameSound.active)
                            {
                                for (var sound in gameSound.sounds) gameSound.sounds [sound].stop ();
                                gameSound.active = false;
                            }
                            else gameSound.active = true;
                            if (typeof (Storage) === "undefined") alert ("This browser does not support local web storage.");
                            else localStorage.gameSound = gameSound.active ? 1 : 0;
                            $("#sound").addClass ("change");
                            setTimeout
                            (
                                function ()
                                {
                                    document.getElementById ("sound").innerHTML = gameSound.active ? "On" : "Off";
                                    $("#sound").removeClass ("change");
                                },
                                300
                            );
                        break;
                        case "Music":
                            if (gameMusic.active)
                            {
                                if (gameModal == "menu")
                                {
                                    if (enemies == 0) gameMusic.musics.boss.stop ();
                                    else gameMusic.musics.game.stop ();
                                }
                                else gameMusic.musics.menu.stop ();
                                gameMusic.active = false;
                            }
                            else
                            {
                                if (gameModal == "menu")
                                {
                                    if (enemies == 0) gameMusic.musics.boss.play ();
                                    else gameMusic.musics.game.play ();
                                }
                                else gameMusic.musics.menu.play ();
                                gameMusic.active = true;
                            }
                            if (typeof (Storage) === "undefined") alert ("This browser does not support local web storage.");
                            else localStorage.gameMusic = gameMusic.active ? 1 : 0;
                            $("#music").addClass ("change");
                            setTimeout
                            (
                                function ()
                                {
                                    document.getElementById ("music").innerHTML = gameMusic.active ? "On" : "Off";
                                    $("#music").removeClass ("change");
                                },
                                300
                            );
                        break;
                        case "FPS Monitor":
                            if (fpsMonitor)
                            {
                                $("#fps_monitor").removeClass ("active");
                                fpsMonitor = false;
                            }
                            else
                            {
                                $("#fps_monitor").addClass ("active");
                                fpsMonitor = true;
                            }
                            if (typeof (Storage) === "undefined") alert ("This browser does not support local web storage.");
                            else localStorage.fpsMonitor = fpsMonitor ? 1 : 0;
                        break;
                        case "High Scores":
                            setTimeout
                            (
                                function ()
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
                                },
                                600
                            );
                        break;
                        case "Pause":
                            setTimeout
                            (
                                function ()
                                {
                                    gameOpenModal ("continue", "Game paused");
                                },
                                600
                            );
                            setTimeout
                            (
                                function ()
                                {
                                    gameArea.pause ();
                                },
                                700
                            );
                        break;
                        case "Exit":
                            gameConfirm.push (new component ("text", ">>> Are you sure?", "yellow", startPoint.x + 705, gameText [gameText.length - 2].y, "left", 10));
                            changeTab ("confirm");
                        break;
                    }
                }
            }
        }
    }
}