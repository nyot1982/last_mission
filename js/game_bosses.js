function boss (type, x, y)
{
    if (gameMusic.active)
    {
        gameMusic.musics.game.stop ();
        gameMusic.musics.boss.play ();
    }
    this.type = type;
    this.x = x;
    this.y = y;
    this.z = 50;
    this.fire = false;
    this.weapon = 0;
    this.weapons =
    [
        {
            fireRate: 50
        },
        {
            fireRate: 10
        },
        {
            fireRate: 10
        }
    ];
    this.lastShotFrame = -this.weapons [this.weapon].fireRate;
    this.shotDegrees = 0;

    if (this.type == 0)
    {
        this.width = 70;
        this.height = 70;
        this.engine1 = 0;
        this.engine2 = 0;
        this.engine3 = 0;
        this.engine4 = 0;
        this.engine1inc = true;
        this.engine2inc = true;
        this.engine3inc = true;
        this.engine4inc = true;
        this.engine1Life = 100;
        this.engine2Life = 100;
        this.engine3Life = 100;
        this.engine4Life = 100;
        this.life = 500;    
        this.speed = 2;
        this.moveX = 0;
        this.moveY = 0;
    }

    this.changeWeapon = function (weapon)
    {
        if (this.z == 50) this.weapon = weapon;
    }

    this.firing = function (active)
    {
        if (this.z == 50) this.fire = active;
    }

    this.movingX = function (direction)
    {   
        if (this.z > 0)
        {
            this.engine1 = 0;
            this.engine3 = 0;
            this.engine1inc = true;
            this.engine3inc = true;
            if (direction == 0 || (this.engine1Life == 0 && this.engine3Life == 0) || (direction == -1 && this.engine3Life == 0) || (direction == 1 && this.engine1Life == 0)) this.moveX = 0;
            else this.moveX = this.speed * direction;
        }
    }

    this.movingY = function (direction)
    {   
        if (this.z > 0)
        {
            this.engine2 = 0;
            this.engine4 = 0;
            this.engine2inc = true;
            this.engine4inc = true;
            if (direction == 0 || (this.engine4Life == 0 && this.engine2Life == 0) || (direction == -1 && this.engine2Life == 0) || (direction == 1 && this.engine4Life == 0)) this.moveY = 0;
            else this.moveY = this.speed * -direction;
        }
    }

    this.speeding = function (increment)
    {
        if ((this.speed > 2 && increment < 0) || (this.speed < 8 && increment > 0))
        {
            this.speed += increment;
            if (this.moveX < 0)
            {
                this.engine3 = 0;
                this.engine3inc = true;
                this.moveX = -this.speed;
            }
            else if (this.moveX > 0)
            {
                this.engine1 = 0;
                this.engine1inc = true;
                this.moveX = this.speed;
            }
            if (this.moveY < 0)
            {
                this.engine4 = 0;
                this.engine4inc = true;
                this.moveY = -this.speed;
            }
            else if (this.moveY > 0)
            {
                this.engine2 = 0;
                this.engine2inc = true;
                this.moveY = this.speed;
            }
        }
    }

    this.update = function ()
    {
        if (this.life > 0)
        {
            if (this.type == 0)
            {
                if (gameArea.frame % 10 == 0)
                {
                    this.action = Math.floor (Math.random () * 8);
                    switch (this.action)
                    {
                        case 0:
                            if (this.x < 70) this.movingX (1);
                            else this.movingX (-1);
                            break;
                        case 1:
                            if (this.x > gameWidth * 4 - 70) this.movingX (-1);
                            else this.movingX (1);
                            break;
                        case 2:
                            if (this.y < 70) this.movingY (1);
                            else this.movingY (-1);
                            break;
                        case 3:
                            if (this.y > gameHeight * 4 - 70) this.movingY (-1);
                            else this.movingY (1);
                            break;
                        case 4:
                            this.speeding (-2);
                            break;
                        case 5:
                            this.speeding (2);
                            break;
                        case 6:
                            this.firing (true);
                            break;
                        case 7:
                            this.firing (false);
                            break;
                        case 8:
                            this.changeWeapon (0);
                            break;
                        case 9:
                            this.changeWeapon (1);
                            break;
                        case 10:
                            this.changeWeapon (2);
                            break;
                    }
                }
                this.engine1max = 8
                this.engine2max = 8
                this.engine3max = 8
                this.engine4max = 8
                if (this.moveX != 0)
                {
                    if (this.moveX < 0) this.engine3max = 40;
                    else if (this.moveX > 0) this.engine1max = 40;
                    if (this.x + this.moveX < 70) this.x = 70;
                    else if (this.x + this.moveX > gameWidth * 4 - 70) this.x = gameWidth * 4 - 70;
                    else this.x += this.moveX;
                }
                if (this.moveY != 0)
                {
                    if (this.moveY < 0) this.engine4max = 40;
                    else if (this.moveY > 0) this.engine2max = 40;
                    if (this.y + this.moveY < 70) this.y = 70;
                    else if (this.y + this.moveY > gameHeight * 4 - 70) this.y = gameHeight * 4 - 70;
                    else this.y += this.moveY;
                }
                if (gameScreen == "game" && gameModal == null) mapHud ('bossItem', this.x, this.y);
                ctx = gameArea.ctx;
                ctx.shadowColor = "transparent";
                ctx.shadowBlur = 3;
                ctx.shadowOffsetX = 18;
                ctx.shadowOffsetY = 18;
                ctx.save ();
                ctx.translate (this.x, this.y);
                ctx.translate (-(this.width / 2), -(this.height / 2));
                ctx.lineWidth = 0;
                this.bossPath = new Path2D ();
                this.bossPath.rect (15, 15, 40, 40);
                this.engine1Path = new Path2D ();
                this.engine1Path.rect (8, 21, 7, 28);
                this.engine2Path = new Path2D ();
                this.engine2Path.rect (21, 8, 28, 7);
                this.engine3Path = new Path2D ();
                this.engine3Path.rect (55, 21, 7, 28);
                this.engine4Path = new Path2D ();
                this.engine4Path.rect (21, 55, 28, 7);
                ctx.shadowColor = "#00000066";
                if (this.engine1Life > 0) ctx.fillStyle = "#4A4A4A";
                else ctx.fillStyle = "#000";
                ctx.fill (this.engine1Path);
                if (this.engine2Life > 0) ctx.fillStyle = "#4A4A4A";
                else ctx.fillStyle = "#000";
                ctx.fill (this.engine2Path);
                ctx.fillStyle = "#8C3C94";
                ctx.fill (this.bossPath);
                if (this.engine3Life > 0) ctx.fillStyle = "#4A4A4A";
                else ctx.fillStyle = "#000";
                ctx.fill (this.engine3Path);
                if (this.engine4Life > 0) ctx.fillStyle = "#4A4A4A";
                else ctx.fillStyle = "#000";
                ctx.fill (this.engine4Path);
                ctx.shadowColor = "transparent";
                ctx.fillStyle = "#000";
                if (this.engine1Life > 0) ctx.fillRect (8, 28, 7, 14);
                if (this.engine2Life > 0) ctx.fillRect (28, 8, 14, 7);
                if (this.engine3Life > 0) ctx.fillRect (55, 28, 7, 14);
                if (this.engine4Life > 0) ctx.fillRect (28, 55, 14, 7);
                ctx.fillStyle = "#4A4A4A";
                ctx.fillRect (22, 22, 26, 26);
                ctx.lineWidth = 6;
                ctx.beginPath ();
                ctx.moveTo (0, 0);
                ctx.lineTo (35, 35);
                ctx.strokeStyle = "#000";
                ctx.stroke ();
                ctx.beginPath ();
                ctx.moveTo (35, 35);
                ctx.lineTo (53, 53);
                ctx.strokeStyle = "#4A4A4A";
                ctx.stroke ();
                ctx.beginPath ();
                ctx.strokeStyle = "#8C3C94";
                ctx.moveTo (53, 17);
                ctx.lineTo (17, 53);
                ctx.strokeStyle = "#8C3C94";
                ctx.stroke ();
                ctx.beginPath ();
                ctx.shadowColor = "#00000066";
                ctx.moveTo (53, 17);
                ctx.lineTo (70, 0);
                ctx.moveTo (17, 53);
                ctx.lineTo (0, 70);
                ctx.moveTo (53, 53);
                ctx.lineTo (70, 70);
                ctx.stroke ();
                ctx.beginPath ();
                ctx.shadowColor = "transparent";
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 3;
                ctx.moveTo (69, -1);
                ctx.lineTo (-1, 69);
                ctx.stroke ();
                if (this.engine1Life > 0)
                {
                    ctx.beginPath ();
                    ctx.fillStyle = "#D88F95EE";
                    ctx.ellipse (7, 35, 7, this.engine1, Math.PI * 0.50, 0, Math.PI);
                    ctx.fill ();
                    if (this.engine1inc)
                    {
                        this.engine1 += this.engine1max / 8;
                        if (this.engine1 == this.engine1max) this.engine1inc = false;
                    }
                    else
                    {
                        this.engine1 -= this.engine1max / 8;
                        if (this.engine1 == 0) this.engine1inc = true;
                    }
                }
                if (this.engine2Life > 0)
                {
                    ctx.beginPath ();
                    ctx.fillStyle = "#D88F95EE";
                    ctx.ellipse (35, 7, 7, this.engine2, 0, Math.PI, 0);
                    ctx.fill ();
                    if (this.engine2inc)
                    {
                        this.engine2 += this.engine2max / 8;
                        if (this.engine2 == this.engine2max) this.engine2inc = false;
                    }
                    else
                    {
                        this.engine2 -= this.engine2max / 8;
                        if (this.engine2 == 0) this.engine2inc = true;
                    }
                }
                ctx.shadowColor = "#00000044";
                if (this.engine3Life > 0)
                {
                    ctx.beginPath ();
                    ctx.fillStyle = "#D88F95EE";
                    ctx.ellipse (63, 35, 7, this.engine3, Math.PI * 0.50, 0, Math.PI, true);
                    ctx.fill ();
                    if (this.engine3inc)
                    {
                        this.engine3 += this.engine3max / 8;
                        if (this.engine3 == this.engine3max) this.engine3inc = false;
                    }
                    else
                    {
                        this.engine3 -= this.engine3max / 8;
                        if (this.engine3 == 0) this.engine3inc = true;
                    }
                }
                if (this.engine4Life > 0)
                {
                    ctx.beginPath ();
                    ctx.fillStyle = "#D88F95EE";
                    ctx.ellipse (35, 63, 7, this.engine4, 0, 0, Math.PI);
                    ctx.fill ();
                    if (this.engine4inc)
                    {
                        this.engine4 += this.engine4max / 8;
                        if (this.engine4 == this.engine4max) this.engine4inc = false;
                    }
                    else
                    {
                        this.engine4 -= this.engine4max / 8;
                        if (this.engine4 == 0) this.engine4inc = true;
                    }
                }
            }
            ctx.restore ();
            /*ctx.fillStyle = "#FF0000CC";
            ctx.fillRect (this.x - 20, this.y - 20, 40, 40);
            ctx.fillStyle = "#0000FFCC";
            ctx.fillRect (this.x - 27, this.y - 14, 7, 28);
            ctx.fillRect (this.x - 14, this.y - 27, 28, 7);
            ctx.fillRect (this.x + 20, this.y - 14, 7, 28);
            ctx.fillRect (this.x - 14, this.y + 20, 28, 7);*/
            for (var gameShot in gameShots)
            {
                if (gameShots [gameShot].name.substring (0, 5) != "enemy" && gameShots [gameShot].name != "boss")
                {
                    if (gameShots [gameShot].x >= this.x - 27 && gameShots [gameShot].x <= this.x - 20 + gameShots [gameShot].speed / 2 && gameShots [gameShot].y >= this.y - 14 && gameShots [gameShot].y <= this.y + 14 && this.z == 50) bossHit (gameShot, 1);
                    else if (gameShots [gameShot].x >= this.x - 14 && gameShots [gameShot].x <= this.x + 14 && gameShots [gameShot].y >= this.y - 27 && gameShots [gameShot].y <= this.y - 20 + gameShots [gameShot].speed / 2 && this.z == 50) bossHit (gameShot, 2);
                    else if (gameShots [gameShot].x >= this.x + 20 - gameShots [gameShot].speed / 2 && gameShots [gameShot].x <= this.x + 27 && gameShots [gameShot].y >= this.y - 14 && gameShots [gameShot].y <= this.y + 14 && this.z == 50) bossHit (gameShot, 3);
                    else if (gameShots [gameShot].x >= this.x - 14 && gameShots [gameShot].x <= this.x + 14 && gameShots [gameShot].y >= this.y + 20 - gameShots [gameShot].speed / 2 && gameShots [gameShot].y <= this.y + 27 && this.z == 50) bossHit (gameShot, 4);
                    else if (gameShots [gameShot].x >= this.x - 20 && gameShots [gameShot].x <= this.x + 20 && gameShots [gameShot].y >= this.y - 20 && gameShots [gameShot].y <= this.y + 20 && this.z == 50) bossHit (gameShot, 0);
                }
            }
            if (this.fire)
            {
                if (this.weapon == 0 && (gameArea.frame - this.lastShotFrame) >= this.weapons [this.weapon].fireRate)
                {

                    gameShots.push (new shot ("boss", 4, "black", this.x - this.width, this.y, 28, 3, 10, 0));
                    gameShots.push (new shot ("boss", 4, "black", this.x - this.width + 28, this.y, 28, 3, 10, 0));
                    gameShots.push (new shot ("boss", 4, "black", this.x, this.y - this.height, 28, 3, 10, 90));
                    gameShots.push (new shot ("boss", 4, "black", this.x, this.y - this.height + 28, 28, 3, 10, 90));
                    gameShots.push (new shot ("boss", 4, "black", this.x + this.width - 28, this.y, 28, 3, 10, 180));
                    gameShots.push (new shot ("boss", 4, "black", this.x + this.width, this.y, 28, 3, 10, 180));
                    gameShots.push (new shot ("boss", 4, "black", this.x, this.y + this.height - 28, 28, 3, 10, 270));
                    gameShots.push (new shot ("boss", 4, "black", this.x, this.y + this.height, 28, 3, 10, 270));
                }
                else if (this.weapon == 1)
                {
                    if (this.shotDegrees == 360) this.shotDegrees = 0;
                    if (this.shotDegrees % 10 == 0)
                    {
                        gameShots.push (new shot ("boss", 5, "#B2B2B2", this.x + 32 * Math.sin (this.shotDegrees * Math.PI / 180), this.y - 32 * Math.cos (this.shotDegrees * Math.PI / 180), 4, 4, 8, this.shotDegrees));
                        gameShots.push (new shot ("boss", 5, "#B2B2B2", this.x + 48 * Math.sin ((this.shotDegrees + 5) * Math.PI / 180), this.y - 48 * Math.cos ((this.shotDegrees + 5) * Math.PI / 180), 4, 4, 8, (this.shotDegrees + 5)));
                        gameShots.push (new shot ("boss", 5, "#B2B2B2", this.x + 64 * Math.sin ((this.shotDegrees + 10) * Math.PI / 180), this.y - 64 * Math.cos ((this.shotDegrees + 10) * Math.PI / 180), 4, 4, 8, (this.shotDegrees + 10)));
                    }
                    this.shotDegrees++;
                }
                else if (this.weapon == 2 && (gameArea.frame - this.lastShotFrame) >= this.weapons [this.weapon].fireRate)
                {
                    gameShots.push (new shot ("boss", 0, "black", this.x, this.y, 24, 3, 12, -45));
                    gameShots.push (new shot ("boss", 0, "black", this.x, this.y, 24, 3, 12, 0));
                    gameShots.push (new shot ("boss", 0, "black", this.x, this.y, 24, 3, 12, 45));
                    gameShots.push (new shot ("boss", 0, "black", this.x, this.y, 24, 3, 12, -135));
                    gameShots.push (new shot ("boss", 0, "black", this.x, this.y, 24, 3, 12, 180));
                    gameShots.push (new shot ("boss", 0, "black", this.x, this.y, 24, 3, 12, 135));
                    gameShots.push (new shot ("boss", 0, "black", this.x, this.y, 24, 3, 12, -90));
                    gameShots.push (new shot ("boss", 0, "black", this.x, this.y, 24, 3, 12, 90));
                }
                this.lastShotFrame = gameArea.frame;
            }
        }
    }
}

function bossHit (gameShot, engine)
{
    var gameShip = gameShips.findIndex (ship => ship.name == gameShots [gameShot].name);
    gameShots [gameShot].hit = true;
    gameBoss.life -= 10;
    if (gameBoss.life == 0)
    {
        gameHits.push (new hit ("hit0", gameBoss.x, gameBoss.y, 80, 4));
        if (gameSound.active)
        {
            gameSound.sounds ["hit0"].stop ();
            gameSound.sounds ["hit0"].play ();
        }
        gameShips [gameShip].score += 5000;
        if (gameModal != null) gameCloseModal ();
        if (gameMusic.active) gameMusic.musics.boss.stop ();
        setTimeout
        (
            function ()
            {
                blackScreen = true
                $("#blackScreen").fadeIn (1000);
                setTimeout
                (
                    function ()
                    {
                        gameLoadScreen ("game_completed");
                    },
                    1000
                );
            },
            1000
        );
    }
    else
    {
        if (engine == 1)
        {
            if (gameBoss.engine1Life > 0) gameBoss.engine1Life -= 10;
            gameShots [gameShot].x = gameBoss.x - 23.5;
        }
        else if (engine == 2)
        {
            if (gameBoss.engine2Life > 0) gameBoss.engine2Life -= 10;
            gameShots [gameShot].y = gameBoss.y - 23.5;
        }
        else if (engine == 3)
        {
            if (gameBoss.engine3Life > 0) gameBoss.engine3Life -= 10;
            gameShots [gameShot].x = gameBoss.x + 23.5;
        }
        else if (engine == 4)
        {
            if (gameBoss.engine4Life > 0) gameBoss.engine4Life -= 10;
            gameShots [gameShot].y = gameBoss.y + 23.5;
        }
        gameHits.push (new hit (gameShots [gameShot].name, gameShots [gameShot].x, gameShots [gameShot].y, 20, 1));
        if (gameSound.active)
        {
            gameSound.sounds ["hit1"].stop ();
            gameSound.sounds ["hit1"].play ();
        }
        gameShips [gameShip].score += 100;
    }
    if (gameShips.length > 1) document.getElementById ("score" + gameShots [gameShot].name).innerHTML = gameShips [gameShip].score;
    else document.getElementById ("scoreHud").innerHTML = gameShips [gameShip].score;
}