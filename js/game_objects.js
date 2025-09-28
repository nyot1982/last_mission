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
    if (enemy == 0) this.type = Math.floor (Math.random () * 9);
    else if (enemy < 3) this.type = Math.floor (Math.random () * 4);
    else this.type = Math.floor (Math.random () * 5) + 4;
    this.x = x;
    this.y = y;
    this.z = 500;
    this.taken = false;
    this.radius = 16;
    this.shadowOffset = 18;
    this.icons = ['heart', 'gas-pump', 'crosshairs', 'shield-halved', 'clock', 'burst', 'P', 'K', 'H'];

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
                    if (gameShips [gameShip].life > 0)
                    {
                        if (this.type == 0) var vital = "life";
                        else if (this.type == 1) var vital = "fuel";
                        else if (this.type == 2) var vital = "ammo";
                        else if (this.type == 3) var vital = "shield";
                        else if (this.type == 4 && gameShips [gameShip].weapons [gameShips [gameShip].weapon].rate == 1) gameShips [gameShip].weapons [gameShips [gameShip].weapon].rate = 1.5;
                        else if (this.type == 5 && gameShips [gameShip].weapons [gameShips [gameShip].weapon].power == 1) gameShips [gameShip].weapons [gameShips [gameShip].weapon].power++;
                        else if (this.type > 5 && gameShips [gameShip].weapon != this.type - 5)
                        {
                            gameShips [gameShip].weapons [gameShips [gameShip].weapon].active = false;
                            gameShips [gameShip].weapon = this.type - 5;
                            gameShips [gameShip].weapons [gameShips [gameShip].weapon].active = true;
                            gameShips [gameShip].weapons [gameShips [gameShip].weapon].power = 1;
                        }
                        if (this.type < 4)
                        {
                            gameShips [gameShip][vital] += 10;
                            if (gameShips [gameShip][vital] > 100) gameShips [gameShip][vital] = 100;        
                        }
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

function component (type, src, color, x, y, width, height, max, backColor, rollover, rolloverColor)
{
    this.type = type;
    this.src = src;
    this.color = color;
    if (this.type == "image")
    {
        this.image = new Image ();
        this.image.src = this.src;
    }
    else if (this.type == "type") this.typeFrame = 1;
    else if (this.type == "traffic") this.traffic = [];
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.max = max;
    this.backColor = backColor;
    this.rollover = rollover || "";
    this.rolloverColor = rolloverColor || "";

    this.update = function (idComponent)
    {
        ctx = gameArea.ctx;
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        if (this.type == "image") ctx.drawImage (this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        else if (this.type == "rect")
        {
            ctx.beginPath ();
            ctx.rect (this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.color;
            ctx.fill ();
        }
        else if (this.type == "circle")
        {
            ctx.beginPath ();
            ctx.arc (this.x, this.y, this.height, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill ();
        }
        else if (this.type == "traffic")
        {
            this.path = new Path2D ();
            this.path.roundRect (this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, 2 * Math.PI);
            ctx.fillStyle = "#888";
            ctx.fill (this.path);

            if (wss != null && wss.readyState == WebSocket.OPEN)
            {
                this.traffic = ["#300", "#330", "#0C0"];
                this.rollover = "Server is up";
                this.rolloverColor = "#00CC00";
                if (gameText [gameText.length - 1].type == "traffic")
                {
                    gameText.push (new component ("image", "svgs/user.svg", "", 661, 295, 10, 10, null, null, "Players in game", "#FFA500"));
                    gameText.push (new component ("text", "usersPlaying", "orange", 670, 295, "left", 10, null, null, "Number of players", "#FFA500"));
                }
            }
            else
            {
                if (wss >= 1000)
                {
                    this.traffic = ["red", "#330", "#030"];
                    this.rollover = "Server is down";
                    this.rolloverColor = "#FF0000";
                }
                else
                {
                    if (this.traffic.length == 0) this.traffic = ["#300", "yellow", "#030"];
                    if (gameArea.frame % 20 == 0)
                    {
                        if (this.traffic [1] == "yellow") this.traffic = ["#300", "#330", "#030"];
                        else if (this.traffic [1] == "#330") this.traffic = ["#300", "yellow", "#030"];
                    }
                    this.rollover = "Starting server...";
                    this.rolloverColor = "#FFFF00";
                }
                if (gameText [gameText.length - 1].src == "usersPlaying")
                {
                    gameText.pop ();
                    gameText.pop ();
                }
            }
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#333";
            ctx.beginPath ();
            ctx.arc (this.x - this.width / 2 + 6, this.y - this.height / 2 + 6, 3, 0, 2 * Math.PI);
            ctx.fillStyle = this.traffic [0];
            ctx.fill ();
            ctx.stroke ();
            ctx.beginPath ();
            ctx.arc (this.x - this.width / 2 + 6, this.y - this.height / 2 + 14, 3, 0, 2 * Math.PI);
            ctx.fillStyle = this.traffic [1];
            ctx.fill ();
            ctx.stroke ();
            ctx.beginPath ();
            ctx.arc (this.x - this.width / 2 + 6, this.y - this.height / 2 + 22, 3, 0, 2 * Math.PI);
            ctx.fillStyle = this.traffic [2];
            ctx.fill ();
            ctx.stroke ();
        }
        else
        {
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
            else if (this.type != "type")
            {
                if (this.type == "text" && this.src == "usersPlaying")
                {
                    ctx.fillStyle = this.color;
                    ctx.fillText (usersPlaying, this.x, this.y + 1);
                    var textMeasure = ctx.measureText (usersPlaying);
                }
                else
                {
                    if (this.backColor != null)
                    {
                        ctx.beginPath ();
                        var textMeasure = ctx.measureText (this.src);
                        ctx.roundRect (this.x - textMeasure.width / 2 - (this.height < 10 ? 4 : 6), this.y - this.height / 2 - (this.height < 10 ? 2 : 4), textMeasure.width + (this.height < 10 ? 8 : 12), this.height + (this.height < 10 ? 4 : 8), 2 * Math.PI);
                        ctx.fillStyle = this.backColor;
                        ctx.fill ();
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = this.color + "CC";
                        ctx.stroke ();
                    }
                    ctx.fillStyle = this.color;
                    if (this.max != null) ctx.fillText (this.src, this.x, this.y + 1, this.max);
                    else ctx.fillText (this.src, this.x, this.y + 1);
                }
            }
        }
        if (this.rollover != "")
        {
            var mouseOver = false;
            if (this.type == "image" && mouse.x >= this.x - this.width / 2 && mouse.x <= this.x + this.width / 2 && mouse.y >= this.y - this.height / 2 && mouse.y <= this.y + this.height / 2) mouseOver = true;
            else if (this.type == "text" && mouse.x >= this.x && mouse.x <= this.x + textMeasure.width && mouse.y >= this.y - this.height / 2 && mouse.y <= this.y + this.height / 2) mouseOver = true;
            else if (this.type == "traffic" && (ctx.isPointInStroke (this.path, mouse.x, mouse.y) || ctx.isPointInPath (this.path, mouse.x, mouse.y))) mouseOver = true;
            if (mouseOver) rolloverLoad (this.rollover, this.rolloverColor);
            else
            {
                var rollover = document.getElementById ("rollover");
                if (rollover.style.display == "block" && rollover.innerText == this.rollover) rollover.style.display = "none";
            }
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
                            var form = document.getElementById ("players");
                            if (form.length > 2)
                            {
                                for (var i = 1; i < form.length - 1; i++)
                                {
                                    form.elements [i].remove ();
                                    form.getElementsByTagName ("a")[i].remove ();
                                }
                            }
                            form.style.display = "block";
                            form.elements [0].focus ();
                            form.elements [0].value = (storedPlayers [0] && storedPlayers [0].name ? storedPlayers [0].name : "Player");
                            changeTab ("input");
                        break;
                        case "Cooperative":
                            gameModeHud (1);
                            if (typeof (localStorage.players1) !== "undefined" && localStorage.players1.length > 0) storedPlayers = JSON.parse (localStorage.players1);
                            if (controlTab != "keyboard") changeControl ("keyboard", 99);
                            var form = document.getElementById ("players");
                            form.style.display = "block";
                            form.elements [0].focus ();
                            form.elements [0].value = (storedPlayers [0] && storedPlayers [0].name ? storedPlayers [0].name : "Player");
                            changeTab ("input");
                        break;
                        case "Versus":
                            gameModeHud (2);
                            if (typeof (localStorage.players2) !== "undefined" && localStorage.players2.length > 0) storedPlayers = JSON.parse (localStorage.players2);
                            if (controlTab != "keyboard") changeControl ("keyboard", 99);
                            var form = document.getElementById ("players");
                            form.style.display = "block";
                            form.elements [0].focus ();
                            form.elements [0].value = (storedPlayers [0] && storedPlayers [0].name ? storedPlayers [0].name : "Player");
                            changeTab ("input");
                        break;
                        case "Online":
                            if (wss != null && wss.readyState == WebSocket.OPEN)
                            {
                                gameModeHud (3);
                                if (controlTab != "keyboard") changeControl ("keyboard", 99);
                                var form = document.getElementById ("sign");
                                form.style.display = "block";
                                form.elements [0].focus ();
                                changeTab ("input");
                            }
                            else
                            {
                                gameAlert.push (new component ("text", ">>> Server is down.", "red", 705, 295, "left", 10));
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
                                () =>
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
                                () =>
                                {
                                    document.getElementById ("music").innerHTML = gameMusic.active ? "On" : "Off";
                                    $("#music").removeClass ("change");
                                },
                                300
                            );
                        break;
                        case "FPS Monitor":
                            fpsHud ("toggle");
                        break;
                        case "High Scores":
                            setTimeout
                            (
                                () =>
                                {
                                    $("#blackScreen").fadeIn (1000);
                                    setTimeout
                                    (
                                        () =>
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
                                () =>
                                {
                                    gameOpenModal ("continue", "Game paused");
                                },
                                600
                            );
                            setTimeout
                            (
                                () =>
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