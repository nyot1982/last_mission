function ship (name, color, x, y, z, degrees, speed, maxSpeed, fire, weapon, weapons, engine1, engine2, engine1inc, engine2inc, shadowOffset, nameOffset, lifes, life, fuel, ammo, shield, score, gunStatus, wing1Status, wing2Status, engine1Status, engine2Status, time)
{
    this.name = name || null;
    this.x = x || gameWidth / 2;
    this.y = y || gameHeight / 2;
    this.z = z || 0;
    this.degrees = degrees || 0;
    this.speed = speed || 0;
    this.maxSpeed = maxSpeed || 1;
    this.fire = fire || false;
    this.weapon = weapon || 0;
    if (this.name == null)
    {
        this.weapons =
        [
            {
                power: 1,
                rate: 1,
                fireRate: 50
            }
        ];
    }
    else
    {
        this.weapons = weapons ||
        [
            {
                power: 1,
                rate: 1,
                fireRate: 30
            },
            {
                power: 0,
                rate: 1,
                fireRate: 54
            },
            {
                power: 0,
                rate: 1,
                fireRate: 70
            },
            {
                power: 0,
                rate: 1,
                fireRate: 24
            }
        ];
    }
    this.engine1 = engine1 || 0;
    this.engine2 = engine2 || 0;
    this.engine1inc = engine1inc || true;
    this.engine2inc = engine2inc || true;
    this.shadowOffset = shadowOffset || (this.z == 50 ? 18 : 1);
    this.nameOffset = nameOffset || (this.z == 50 ? 16 : 5);
    this.lifes = lifes || 5;
    this.life = life || 100;
    this.fuel = fuel || 100;
    this.ammo = ammo || 100;
    this.shield = shield || 0;
    this.score = score || 0;
    this.gunStatus = gunStatus || true;
    this.wing1Status = wing1Status || true;
    this.wing2Status = wing2Status || true;
    this.engine1Status = engine1Status || true;
    this.engine2Status = engine2Status || true;
    this.time = time || null;
    this.width = 28;
    this.height = 32;
    this.move = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.moveZ = 0;
    this.strafe = 0;
    this.turn = 0;
    this.turnZ = 0;
    this.lastShotFrame = -this.weapons [this.weapon].fireRate / this.weapons [this.weapon].rate;
    this.weaponColors = ["#c66d73", "#52ae4a", "#eff373", "#73cfce", "#A53C9A"];
    this.lightColor = "#7b797b";
    this.shieldColors = ["#813338", "#8E3C97", "#56AC4D"];
    this.shieldColor = 0;

    this.changeColor = function (color)
    {
        this.shipColor = color || null;
        this.gunColor = null;
        this.hook1Color = null;
        this.hook2Color = null;
        this.wing1Color = null;
        this.wing2Color = null;
        this.engine1Color = null;
        this.engine2Color = null;
        this.lightStroke = null;
        this.skin = null;
        this.pattern = null;

        if (this.shipColor.substring (0, 4) == "skin")
        {
            this.skin = this.shipColor.substring (4, this.shipColor.length);
            this.shipColor = playerSkins [this.skin].shipColor;
            if (playerSkins [this.skin].image != null) this.pattern = ctx.createPattern (playerSkins [this.skin].image, "repeat");
            else
            {
                this.gunColor = playerSkins [this.skin].gunColor;
                this.hook1Color = playerSkins [this.skin].hook1Color;
                this.hook2Color = playerSkins [this.skin].hook2Color;
                this.wing1Color = playerSkins [this.skin].wing1Color;
                this.wing2Color = playerSkins [this.skin].wing2Color;
                this.engine1Color = playerSkins [this.skin].engine1Color;
                this.engine2Color = playerSkins [this.skin].engine2Color;
                this.lightStroke = playerSkins [this.skin].lightStroke;
            }
        }
        if (tinycolor (this.shipColor).isDark ()) this.varColor = tinycolor (this.shipColor).lighten (15).toHexString ();
        else this.varColor = tinycolor (this.shipColor).darken (15).toHexString ();
        this.invColor = tinycolor (this.shipColor).toRgb ();
        this.invColor.r = 255 - this.invColor.r;
        this.invColor.g = 255 - this.invColor.g;
        this.invColor.b = 255 - this.invColor.b;
        this.invColor = tinycolor (this.invColor).toHexString ();
    }
    this.changeColor (color);

    this.changeWeapon = function ()
    {
        if (this.z == 50) 
        {
            this.weapon++;
            if (this.weapon == this.weapons.length) this.weapon = 0;
            while (this.weapons [this.weapon].power == 0)
            {
                this.weapon++;
                if (this.weapon == this.weapons.length) this.weapon = 0;
            }
            weaponHud ();
        }
    }

    this.firing = function (active)
    {
        if (gameModal == "menu" || gameScreen == "menu") this.fire = true;
        else if (gameScreen == "game" && this.z == 50) this.fire = active
    }

    this.turning = function (turn)
    {
        if (gameScreen == "menu")
        {
            if (turn == 0) this.turn = 0;
            else if (this.turn == 0) this.turn = turn;
        }
        else if (gameScreen == "game" && this.z > 0)
        {
            if (turn == 0 || turn < 0 && !this.wing1Status || turn > 0 && !this.wing2Status) this.turn = 0;
            else if (turn < 0 && this.turn > -10)
            {
                if (this.turn == 0) this.turn = -5;
                this.turn += turn;
                if (this.turn < -10) this.turn = -10;
            }
            else if (turn > 0 && this.turn < 10)
            {
                if (this.turn == 0) this.turn = 5;
                this.turn += turn;
                if (this.turn > 10) this.turn = 10;
            }
        }
    }

    this.turningZ = function (turn)
    {
        if (gameScreen == "game" && this.z > 0)
        {
            if (turn == 0 || turn < 0 && !this.wing1Status || turn > 0 && !this.wing2Status) this.turnZ = 0;
            else if (turn < 0 && this.turnZ > -10)
            {
                if (this.turnZ == 0) this.turnZ = -5;
                this.turnZ += turn;
                if (this.turnZ < -10) this.turnZ = -10;
            }
            else if (turn > 0 && this.turnZ < 10)
            {
                if (this.turnZ == 0) this.turnZ = 5;
                this.turnZ += turn;
                if (this.turnZ > 10) this.turnZ = 10;
            }
        }
    }

    this.moving = function (direction)
    {
        if (gameScreen == "game" && this.z > 0)
        {
            this.engine1 = 0;
            this.engine2 = 0;
            this.engine1inc = true;
            this.engine2inc = true;
            if (direction == 0 || (!this.engine1Status && !this.engine2Status)) this.move = 0;
            else if (!this.engine1Status || !this.engine2Status) this.move = (this.speed / 2) * direction;
            else this.move = this.speed * direction;
        }
    }

    this.movingX = function (move)
    {
        if (gameScreen == "game" && this.z > 0)
        {
            this.engine1 = 0;
            this.engine2 = 0;
            this.engine1inc = true;
            this.engine2inc = true;
            if (move == 0 || (!this.engine1Status && !this.engine2Status)) this.moveX = 0;
            else if (!this.engine1Status || !this.engine2Status) this.moveX = (this.speed / 2) * move;
            else this.moveX = this.speed * move;
        }
    }

    this.movingY = function (move)
    {
        if (gameScreen == "game" && this.z > 0)
        {
            this.engine1 = 0;
            this.engine2 = 0;
            this.engine1inc = true;
            this.engine2inc = true;
            if (move == 0 || (!this.engine1Status && !this.engine2Status)) this.moveY = 0;
            else if (!this.engine1Status || !this.engine2Status) this.moveY = -(this.speed / 2 * move);
            else this.moveY = -(this.speed * move);
        }
    }

    this.movingZ = function ()
    {
        if (this.moveZ == 0 && this.life > 0)
        {
            if (this.z == 0 && this.fuel > 0) this.moveZ = 1;
            else if (this.z == 50)
            {
                this.fire = false;
                this.moveZ = -1;
            }
        }
    }

    this.strafing = function (direction)
    {
        if (this.z > 0)
        {
            this.engine1 = 0;
            this.engine2 = 0;
            this.engine1inc = true;
            this.engine2inc = true;
            if (gameModal == "menu" || gameScreen == "menu")
            {
                if (gameScreen == "menu") this.menuItems = 8;
                else if (gameModal == "menu" && gameModes.findIndex (mode => mode.active == true) < 3) this.menuItems = 5;
                else if (gameModal == "menu" && gameModes.findIndex (mode => mode.active == true) == 3) this.menuItems = 4;
                if (direction == 0) this.strafe = 0;
                else if (this.strafe == 0)
                {
                    if (this.menuItem === undefined) this.menuItem = 0;
                    if (direction < 0 && this.menuItem > 0 || direction > 0 && this.menuItem < this.menuItems - 1)
                    {
                        this.endStrafe = this.y + 25 * direction;
                        this.strafe = this.speed * direction;
                        this.menuItem += direction;
                    }
                    else
                    {
                        this.endStrafe = this.y + (this.menuItems - 1) * 25 * direction * -1;
                        this.strafe = this.speed * 4 * direction * -1;
                        if (this.menuItem == 0) this.menuItem = this.menuItems - 1;
                        else if (this.menuItem == this.menuItems - 1) this.menuItem = 0;
                    }
                }
            }
            else
            {
                if (direction == 0 || (!this.engine1Status && !this.engine2Status)) this.strafe = 0;
                else if (!this.engine1Status || !this.engine2Status) this.strafe = (this.speed / 2) * direction;
                else this.strafe = this.speed * direction;
            }
        }
    }

    this.speeding = function (increment)
    {
        if ((this.maxSpeed > 1 && increment < 0) || (this.maxSpeed < 6 && increment > 0))
        {
            this.maxSpeed += increment;
            //if (this.move > 0) this.move = this.speed;
            //else if (this.move < 0) this.move = -this.speed;
            maxSpeedHud (this.maxSpeed);
            if (this.move != 0)
            {
                this.engine1 = 0;
                this.engine2 = 0;
                this.engine1inc = true;
                this.engine2inc = true;
            }
        }
    }

    this.update = function ()
    {
        if (this.life > 0)
        {
            this.engine1max = 4;
            this.engine2max = 4;
            if (this.turn != 0 || this.turnZ != 0)
            {
                if (this.turn != 0) this.degrees = (this.degrees + this.turn) % 360;
                if (this.turnZ != 0) this.degrees = (this.degrees + this.turnZ) % 360;
                if (gameScreen == "game" && this.name == players [0].name) document.getElementById ("degreesHud").style = "left: " + (-371.25 - this.degrees) + "px;";
            }
            this.radians = this.degrees * Math.PI / 180;
            if (this.moveX != 0 || this.moveY != 0 || this.move != 0 || this.strafe != 0)
            {
                if (this.moveX != 0) this.x += this.moveX;
                if (this.moveY != 0) this.y -= this.moveY;
                if (this.move != 0)
                {
                    this.x += this.move * Math.sin (this.radians);
                    this.y -= this.move * Math.cos (this.radians);
                }
                if (this.strafe != 0)
                {
                    this.x += this.strafe * Math.sin ((this.degrees + 90) * Math.PI / 180);
                    this.y -= this.strafe * Math.cos ((this.degrees + 90) * Math.PI / 180);
                    if (gameModal == "menu" || gameScreen == "menu")
                    {
                        if (this.y > this.endStrafe && this.strafe > 0 || this.y < this.endStrafe && this.strafe < 0)
                        {
                            this.y = this.endStrafe;
                            if (this.y > this.endStrafe && this.menuItem < 0) this.menuItem = 0;
                            else if (this.y < this.endStrafe && this.menuItem >= this.menuItems) this.menuItem = this.menuItems - 1;
                            this.endStrafe = null;
                            this.strafe = 0;
                            if (keysPressed.includes (38)) this.strafing (-1);
                            else if (keysPressed.includes (40)) this.strafing (1);
                        }
                    }
                }
                if (this.x < 0) this.x = 0;
                else if (this.x > gameWidth * 4) this.x = gameWidth * 4;
                if (this.y < 0) this.y = 0;
                else if (this.y > gameHeight * 4) this.y = gameHeight * 4;
                this.engine1max = this.maxSpeed * 8;
                this.engine2max = this.maxSpeed * 8;
            }
            if (gameScreen == "game" && gameModal == null)
            {
                if (this.name == players [0].name) mapHud ("mapItemPlayer", this.x, this.y, this.degrees);
                else mapHud ("mapItem", this.x, this.y, this.degrees);
            }
            ctx = gameArea.ctx;
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = this.shadowOffset;
            ctx.shadowOffsetY = this.shadowOffset;
            ctx.save ();
            ctx.translate (this.x, this.y);
            ctx.rotate (this.radians);
            ctx.translate (-(this.width / 2), -(this.height / 2));
            ctx.transform ((this.z + 50) / 100, 0, 0, (this.z + 50) / 100, (this.width / 2) - (this.width * (this.z + 50) / 100 / 2), (this.height / 2) - (this.height * (this.z + 50) / 100 / 2));
            this.cockpitPath = new Path2D ();
            this.cockpitPath.rect (9, 13, 10, 1);
            this.cockpitPath.rect (8, 14, 12, 1);
            this.cockpitPath.rect (7, 15, 14, 14);
            this.hook1Path = new Path2D ();
            this.hook1Path.rect (5, 19, 2, 8);
            this.hook2Path = new Path2D ();
            this.hook2Path.rect (21, 19, 2, 8);
            if (this.hook1Color == null || this.hook1Color == this.shipColor) this.cockpitPath.addPath (this.hook1Path);
            if (this.hook2Color == null || this.hook2Color == this.shipColor) this.cockpitPath.addPath (this.hook2Path);            
            this.shipPath = new Path2D ();
            this.shipPath.addPath (this.cockpitPath);
            if (this.gunStatus)
            {
                this.gunPath = new Path2D ();
                this.gunPath.roundRect (13, 1, 2, 7, 1);
                this.gunPath.roundRect (11, 7, 6, 7, 2);
                this.shipPath.addPath (this.gunPath);
            }
            if (this.wing1Status)
            {
                this.wing1Path = new Path2D ();
                this.wing1Path.roundRect (3, 9, 2, 6, 2);
                this.wing1Path.roundRect (1, 13, 4, 16, 2);
                this.wing1Path.roundRect (1, 26, 2, 5, 2);
                this.shipPath.addPath (this.wing1Path);
            }
            if (this.wing2Status)
            {
                this.wing2Path = new Path2D ();
                this.wing2Path.roundRect (23, 9, 2, 6, 2);
                this.wing2Path.roundRect (23, 13, 4, 16, 2);
                this.wing2Path.roundRect (25, 26, 2, 5, 2);
                this.shipPath.addPath (this.wing2Path);
            }
            if (this.engine1Status)
            {
                this.engine1Path = new Path2D ();
                this.engine1Path.roundRect (7, 29, 4, 2, 1);
                this.shipPath.addPath (this.engine1Path);
            }
            if (this.engine2Status)
            {
                this.engine2Path = new Path2D ();
                this.engine2Path.roundRect (17, 29, 4, 2, 1);
                this.shipPath.addPath (this.engine2Path);
            }
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.invColor + "CC";
            ctx.stroke (this.shipPath);
            ctx.strokeStyle = this.shipColor + "CC";
            if (this.engine1Status && this.engine1Color == null && this.skin == null) ctx.stroke (this.engine1Path);
            if (this.engine2Status && this.engine2Color == null && this.skin == null) ctx.stroke (this.engine2Path);
            if (this.z > 0)
            {
                if (gameScreen == "game" && gameModal == null) ctx.shadowColor = "#00000044";
                else ctx.shadowColor = "transparent";
                if (this.engine1Status)
                {
                    ctx.beginPath ();
                    ctx.fillStyle = "#D88F95EE";
                    ctx.ellipse (9, 33, 2, this.engine1, 0, 0, Math.PI);
                    ctx.fill ();
                    if (this.engine1inc)
                    {
                        if (this.engine1 < this.engine1max) this.engine1 += 0.25 * this.engine1max;
                        else this.engine1inc = false;
                    }
                    else
                    {
                        if (this.engine1 > 0) this.engine1 -= 0.25 * this.engine1max;
                        else this.engine1inc = true;
                    }
                }
                if (this.engine2Status)
                {
                    ctx.beginPath ();
                    ctx.fillStyle = "#D88F95EE";
                    ctx.ellipse (19, 33, 2, this.engine2, 0, 0, Math.PI);
                    ctx.fill ();
                    if (this.engine2inc)
                    {
                        if (this.engine2 < this.engine2max) this.engine2 += 0.25 * this.engine2max;
                        else this.engine2inc = false;
                    }
                    else
                    {
                        if (this.engine2 > 0) this.engine2 -= 0.25 * this.engine2max;
                        else this.engine2inc = true;
                    }
                }
            }
            else if (gameScreen == "game" && this.name == players [0].name) maxSpeedHud (0);
            if (gameScreen == "game" && gameModal == null) ctx.shadowColor = "#00000066";
            else ctx.shadowColor = "transparent";            
            if (this.engine1Status)
            {
                if (this.pattern) ctx.fillStyle = this.shipColor;
                else if (this.engine1Color != null) ctx.fillStyle = this.engine1Color;
                else ctx.fillStyle = this.invColor;
                ctx.fill (this.engine1Path);
            }
            if (this.engine2Status)
            {   
                if (this.pattern) ctx.fillStyle = this.shipColor;
                else if (this.engine2Color != null) ctx.fillStyle = this.engine2Color;
                else ctx.fillStyle = this.invColor;
                ctx.fill (this.engine2Path);
            }
            if (this.gunStatus)
            {
                if (this.pattern) ctx.fillStyle = this.pattern;
                else if (this.gunColor != null) ctx.fillStyle = this.gunColor;
                else ctx.fillStyle = this.varColor;
                ctx.fill (this.gunPath);
            }
            if (this.hook1Color != null && this.hook1Color != this.shipColor)
            {
                ctx.fillStyle = this.hook1Color;
                ctx.fill (this.hook1Path);
            }
            if (this.hook2Color != null && this.hook2Color != this.shipColor)
            {
                ctx.fillStyle = this.hook2Color;
                ctx.fill (this.hook2Path);
            }
            ctx.fillStyle = this.pattern || this.shipColor;
            ctx.fill (this.cockpitPath);
            if (this.wing1Status)
            {
                if (this.pattern) ctx.fillStyle = this.pattern;
                else if (this.wing1Color != null) ctx.fillStyle = this.wing1Color;
                else ctx.fillStyle = this.varColor;
                ctx.fill (this.wing1Path);
            }
            if (this.wing2Status)
            {
                if (this.pattern) ctx.fillStyle = this.pattern;
                else if (this.wing2Color != null) ctx.fillStyle = this.wing2Color;
                else ctx.fillStyle = this.varColor;
                ctx.fill (this.wing2Path);
            }
            this.lightPath = new Path2D ();
            this.lightPath.roundRect (21, 1, 8, 8, 2);
            ctx.fillStyle = this.lightColor;
            ctx.rotate (45 * Math.PI / 180);
            ctx.shadowColor = "transparent";
            ctx.lineWidth = 1;
            if (this.pattern) ctx.strokeStyle = this.invColor + "66";
            else if (this.lightStroke != null) ctx.strokeStyle = this.lightStroke;
            else ctx.strokeStyle = this.varColor;
            ctx.fill (this.lightPath);
            ctx.stroke (this.lightPath);
            ctx.rotate (-45 * Math.PI / 180);
            if (this.shield > 0 && this.z == 50)
            {
                ctx.shadowColor = "#00000022";
                ctx.beginPath ();
                ctx.lineWidth = 4;
                ctx.arc (14, 19, 30, 0, 2 * Math.PI);
                ctx.strokeStyle = this.shieldColors [this.shieldColor] + "FF";
                ctx.fillStyle = this.shieldColors [this.shieldColor] + "66";
                ctx.stroke ();
                ctx.fill ();
                if (gameArea.frame % 5 == 0)
                {
                    this.shieldColor++;
                    if (this.shieldColor == this.shieldColors.length) this.shieldColor = 0;
                }
            }
            if (this.name)
            {
                var idShip = gameShips.findIndex (ship => ship.name == this.name);
                ctx.translate (-this.x, -this.y);
                ctx.translate (this.width / 2, this.height / 2);
                for (var gameShot in gameShots)
                {
                    if (this.name != gameShots [gameShot].name)
                    {
                        var dx = this.x - gameShots [gameShot].x;
                        var dy = this.y - gameShots [gameShot].y;
                        if (this.shield > 0 && Math.sqrt (dx * dx + dy * dy) < 30 && this.z == 50)
                        {
                            gameShots [gameShot].hit = true;
                            gameHits.push (new hit (this.name, gameShots [gameShot].x, gameShots [gameShot].y, 20, 1));
                            if (gameSound.active)
                            {
                                gameSound.sounds ["hit1"].stop ();
                                gameSound.sounds ["hit1"].play ();
                            }
                            vibrate (300, players [players.findIndex (player => player.name == this.name)].control);
                            this.shield--;
                            if (this.name == players [0].name) vitalsHud ("shield", this.shield, "red");
                        }
                        else
                        {
                            if (this.gunStatus && gameShots [gameShot].x >= this.x - 4 && gameShots [gameShot].x <= this.x + 4 && gameShots [gameShot].y >= this.y - 16 && gameShots [gameShot].y <= this.y - 4 && this.z == 50)
                            {
                                this.gunStatus = false;
                                shipHit (idShip, gameShot);
                            }
                            else if (this.wing1Status && gameShots [gameShot].x >= this.x - 14 && gameShots [gameShot].x <= this.x - 8 && gameShots [gameShot].y >= this.y - 8 && gameShots [gameShot].y <= this.y + 16 && this.z == 50)
                            {
                                this.wing1Status = false;
                                shipHit (idShip, gameShot);
                            }
                            else if (this.wing2Status && gameShots [gameShot].x >= this.x + 8 && gameShots [gameShot].x <= this.x + 14 && gameShots [gameShot].y >= this.y - 8 && gameShots [gameShot].y <= this.y + 16 && this.z == 50)
                            {
                                this.wing2Status = false;
                                shipHit (idShip, gameShot);
                            }
                            else if (this.engine1Status && gameShots [gameShot].x >= this.x - 8 && gameShots [gameShot].x <= this.x - 2 && gameShots [gameShot].y >= this.y + 14 && gameShots [gameShot].y <= this.y + 16 && this.z == 50)
                            {
                                this.engine1Status = false;
                                shipHit (idShip, gameShot);
                            }
                            else if (this.engine2Status && gameShots [gameShot].x >= this.x + 2 && gameShots [gameShot].x <= this.x + 8 && gameShots [gameShot].y >= this.y + 14 && gameShots [gameShot].y <= this.y + 16 && this.z == 50)
                            {
                                this.engine2Status = false;
                                shipHit (idShip, gameShot);
                            }
                            else if (gameShots [gameShot].x >= this.x - 8 && gameShots [gameShot].x <= this.x + 8 && gameShots [gameShot].y >= this.y - 4 && gameShots [gameShot].y <= this.y + 14 && this.z == 50) shipHit (idShip, gameShot);
                        }
                    }
                }
            }
            ctx.restore ();
            if (gameArea.frame % 50 == 0 && this.z > 0)
            {
                if (this.lightColor == "#7b797b")
                {
                    if (gameModal == "menu" || gameScreen == "menu") this.lightColor = this.weaponColors [4];
                    else this.lightColor = this.weaponColors [this.weapon];
                }
                else this.lightColor = "#7b797b";
            }
            else if (this.z == 0) this.lightColor = "#7b797b";
            if (this.name)
            {
                ctx.shadowColor = "transparent";
                ctx.beginPath ();
                ctx.font = "6px PressStart2P";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                var textMeasure = ctx.measureText (this.name);
                ctx.rect (this.x - textMeasure.width / 2 - 2, this.y - this.height / 2 - this.nameOffset, textMeasure.width + 4, 10);
                ctx.fillStyle = this.invColor;
                ctx.fill ();
                ctx.fillStyle = this.shipColor;
                ctx.fillText (this.name, this.x, this.y - this.height / 2 - (this.nameOffset - 6));
                if (this.name == players [0].name)
                {
                    if (this.x > gameWidth / 2 && this.x < gameWidth * 3 + gameWidth / 2)
                    {
                        ctx.translate (-(this.x - gameArea.centerPoint.x), 0);
                        gameArea.centerPoint.x = this.x;
                    }
                    if (this.y > gameHeight / 2 && this.y < gameHeight * 3 + gameHeight / 2)
                    {
                        ctx.translate (0, -(this.y - gameArea.centerPoint.y));
                        gameArea.centerPoint.y = this.y;
                    }
                }
                this.z += this.moveZ;
                if (this.moveZ != 0 && this.name == players [0].name) document.getElementById ("zHud").innerHTML = (this.z * 10) + " m";
                if (this.z == 0)
                {
                    this.turn = 0;
                    this.turnZ = 0;
                    this.move = 0;
                    this.moveX = 0;
                    this.moveY = 0;
                    this.moveZ = 0;
                    this.strafe = 0;
                    for (var ground in gameGround) if (gameGround [ground].type == "base" && this.x >= gameGround [ground].x && this.x <= gameGround [ground].x + gameGround [ground].width && this.y >= gameGround [ground].y && this.y <= gameGround [ground].y + gameGround [ground].height)
                    {
                        this.gunStatus = true;
                        this.wing1Status = true;
                        this.wing2Status = true;
                        this.engine1Status = true;
                        this.engine2Status = true;
                        break;
                    }
                }
                else if (this.z == 50)
                {
                    this.moveZ = 0;
                    if (this.fuel == 0 || !this.engine1Status && !this.engine2Status)
                    {
                        if (this.name == players [0].name) stopUserInteractions (0);
                        this.moveZ = -1;
                    }
                    else if (this.fuel > 0)
                    {
                        ctx.shadowOffsetX = this.shadowOffset;
                        ctx.shadowOffsetY = this.shadowOffset;
                        if (gameArea.frame % (50 - Math.abs (this.move) * 5) == 0)
                        {
                            this.fuel--;
                            if (this.name == players [0].name) vitalsHud ("fuel", this.fuel, "red");
                        }
                    }
                }
                else if (this.z < 50 && this.moveZ > 0)
                {
                    this.shadowOffset += (18 / 50);
                    this.nameOffset += (16 / 50);
                }
                else if (this.z > 0 && this.moveZ < 0)
                {
                    this.shadowOffset -= (18 / 50);
                    this.nameOffset -= (16 / 50);
                }
                if (this.z == 0 && (this.fuel == 0 || !this.engine1Status && !this.engine2Status))
                {
                    gameHits.push (new hit ("hit0", this.x, this.y, 20, 1));
                    if (gameSound.active)
                    {
                        gameSound.sounds ["hit0"].stop ();
                        gameSound.sounds ["hit0"].play ();
                    }
                    if (this.name == players [0].name) vitalsHud ("life", this.life, "red");
                    this.life = 0;
                    playerDead (idShip);
                    return;
                }
                else
                {
                    if (gameModes.findIndex (mode => mode.active == true) > 0)
                    {
                        for (var gameShip in gameShips)
                        {
                            if (this.name != gameShips [gameShip].name && this.z == gameShips [gameShip].z)
                            {
                                var dx = this.x - gameShips [gameShip].x;
                                var dy = this.y - gameShips [gameShip].y;
                                if (Math.sqrt (dx * dx + dy * dy) < 44)
                                {
                                    if (this.shield > 0 && gameShips [gameShip].shield == 0)
                                    {
                                        this.shield -= 10;
                                        if (this.shield < 0) this.shield = 0;
                                        this.score += 1000;
                                        gameShips [gameShip].life = 0;
                                        gameHits.push (new hit ("hit0", gameShips [gameShip].x, gameShips [gameShip].y, 40, 2));
                                        if (gameSound.active)
                                        {
                                            gameSound.sounds ["hit0"].stop ();
                                            gameSound.sounds ["hit0"].play ();
                                        }
                                        playerDead (gameShip);
                                        document.getElementById ("score" + this.name).innerHTML = this.score;
                                        if (this.name == players [0].name) vitalsHud ("shield", this.shield, "red");
                                    }
                                    else if (gameShips [gameShip].shield > 0 && this.shield == 0)
                                    {
                                        this.life = 0;
                                        gameHits.push (new hit ("hit0", this.x, this.y, 40, 2));
                                        if (gameSound.active)
                                        {
                                            gameSound.sounds ["hit0"].stop ();
                                            gameSound.sounds ["hit0"].play ();
                                        }
                                        if (gameModes.findIndex (mode => mode.active == true) == 1 || gameModes.findIndex (mode => mode.active == true) == 2)
                                        {
                                            gameShips [gameShip].shield -= 10;
                                            if (gameShips [gameShip].shield < 0) gameShips [gameShip].shield = 0;
                                            gameShips [gameShip].score += 1000;
                                        }
                                        if (this.name == players [0].name) vitalsHud ("life", this.life, "red");
                                        playerDead (idShip);
                                        return;
                                    }
                                }
                                if (this.shield == 0 && gameShips [gameShip].shield == 0 && Math.sqrt (dx * dx + dy * dy) < 30)
                                {
                                    this.life = 0;
                                    this.score += 500;
                                    gameHits.push (new hit ("hit0", this.x, this.y, 40, 2));
                                    if (gameSound.active)
                                    {
                                        gameSound.sounds ["hit0"].stop ();
                                        gameSound.sounds ["hit0"].play ();
                                    }
                                    if (gameModes.findIndex (mode => mode.active == true) == 1 || gameModes.findIndex (mode => mode.active == true) == 2)
                                    {
                                        gameShips [gameShip].life = 0;
                                        gameShips [gameShip].score += 500;
                                        gameHits.push (new hit ("hit0", gameShips [gameShip].x, gameShips [gameShip].y, 40, 2));
                                        if (gameSound.active)
                                        {
                                            gameSound.sounds ["hit0"].stop ();
                                            gameSound.sounds ["hit0"].play ();
                                        }
                                    }
                                    if (gameShips.length > 1) document.getElementById ("score" + gameShips [idShip].name).innerHTML = gameShips [idShip].score;
                                    else document.getElementById ("scoreHud").innerHTML = gameShips [idShip].score;
                                    if (this.name == players [0].name) vitalsHud ("life", this.life, "red");
                                    playerDead (idShip);
                                    return;
                                }
                            }
                        }
                    }
                    if (enemies == 0 && gameBoss)
                    {
                        var dx = this.x - gameBoss.x;
                        var dy = this.y - gameBoss.y;
                        if (this.shield > 0 && Math.sqrt (dx * dx + dy * dy) < 45 && this.z == gameBoss.z)
                        {
                            if (gameSound.active)
                            {
                                gameSound.sounds ["hit1"].stop ();
                                gameSound.sounds ["hit1"].play ();
                            }
                            this.shield -= 5;
                            if (this.shield < 0) this.shield = 0;
                            if (this.name == players [0].name) vitalsHud ("shield", this.shield, "red");
                        }
                        else if (Math.sqrt (dx * dx + dy * dy) < 31 && this.z == gameBoss.z)
                        {
                            if (gameModes.findIndex (mode => mode.active == true) < 2 || this.name == players [0].name) this.life = 0;
                            gameHits.push (new hit ("hit0", this.x, this.y, 40, 2));
                            if (gameSound.active)
                            {
                                gameSound.sounds ["hit0"].stop ();
                                gameSound.sounds ["hit0"].play ();
                            }
                            if (this.name == players [0].name) vitalsHud ("life", this.life, "red");
                            playerDead (idShip);
                        }
                    }
                    else for (var gameEnemy in gameEnemies)
                    {
                        var dx = this.x - gameEnemies [gameEnemy].x;
                        var dy = this.y - gameEnemies [gameEnemy].y;
                        if (this.shield > 0 && Math.sqrt (dx * dx + dy * dy) < 45 && this.z == gameEnemies [gameEnemy].z)
                        {
                            gameEnemies [gameEnemy].life = 0;
                            gameHits.push (new hit ("hit0", gameEnemies [gameEnemy].x, gameEnemies [gameEnemy].y, 40, 2));
                            gameItems.push (new item (null, gameEnemies [gameEnemy].x, gameEnemies [gameEnemy].y));
                            if (gameSound.active)
                            {
                                gameSound.sounds ["hit0"].stop ();
                                gameSound.sounds ["hit0"].play ();
                            }
                            vibrate (300, players [players.findIndex (player => player.name == this.name)].control);
                            if (enemies > 0) enemies--;
                            document.getElementById ("enemyHud2").style.width = enemies + "px";
                            this.shield -= 5;
                            if (this.shield < 0) this.shield = 0;
                            this.score += 500;
                            if (gameShips.length > 1) document.getElementById ("score" + this.name).innerHTML = this.score;
                            else document.getElementById ("scoreHud").innerHTML = this.score;
                            if (this.name == players [0].name) vitalsHud ("shield", this.shield, "red");
                            if (gameEnemies [gameEnemy].type < 3) gameEnemies.push (new enemy (Math.floor (Math.random () * 3), Math.floor (Math.random () * gameWidth * 4), Math.floor (Math.random () * gameHeight * 4), Math.floor (Math.random () * 720) - 360));
                        }
                        else if (Math.sqrt (dx * dx + dy * dy) < 31 && this.z == gameEnemies [gameEnemy].z)
                        {
                            this.life = 0;
                            gameEnemies [gameEnemy].life = 0;
                            gameHits.push (new hit ("hit0", this.x, this.y, 40, 2));
                            gameHits.push (new hit ("hit0", gameEnemies [gameEnemy].x, gameEnemies [gameEnemy].y, 40, 2));
                            gameItems.push (new item (null, gameEnemies [gameEnemy].x, gameEnemies [gameEnemy].y));
                            if (gameSound.active)
                            {
                                gameSound.sounds ["hit0"].stop ();
                                gameSound.sounds ["hit0"].play ();
                            }
                            vibrate (600, players [players.findIndex (player => player.name == this.name)].control);
                            if (enemies > 0) enemies--;
                            document.getElementById ("enemyHud2").style.width = enemies + "px";
                            gameShips [idShip].score += 250;
                            if (gameShips.length > 1) document.getElementById ("score" + this.name).innerHTML = this.score;
                            else document.getElementById ("scoreHud").innerHTML = this.score;
                            if (this.name == players [0].name) vitalsHud ("life", this.life, "red");
                            if (gameEnemies [gameEnemy].type < 3) gameEnemies.push (new enemy (Math.floor (Math.random () * 3), Math.floor (Math.random () * gameWidth * 4), Math.floor (Math.random () * gameHeight * 4), Math.floor (Math.random () * 720) - 360));
                            playerDead (idShip);
                        }
                    }
                }
            }
            if (this.gunStatus && this.fire && (gameArea.frame - this.lastShotFrame) >= this.weapons [this.weapon].fireRate / this.weapons [this.weapon].rate)
            {
                if (gameModal == "menu" || gameScreen == "menu")
                {
                    menuShots.push (new shot (this.name, 0, "#c66d73", this.x + (this.height / 2) * Math.sin (this.degrees * Math.PI / 180), this.y - (this.height / 2) * Math.cos (this.degrees * Math.PI / 180), 24, 3, 16, this.degrees));
                    this.fire = false;
                }
                else if (gameScreen == "game" && gameModal == null && this.ammo > 0)
                {
                    if (this.weapon == 0)
                    {
                        gameShots.push (new shot (this.name, this.weapon, "black", this.x + (this.height / 2 + 24) * Math.sin (this.degrees * Math.PI / 180), this.y - (this.height / 2 + 24) * Math.cos (this.degrees * Math.PI / 180), 24, 3 * (this.weapons [this.weapon].power < 3 ? this.weapons [this.weapon].power : 1), 12, this.degrees));
                    }
                    else if (this.weapon == 1)
                    {
                        gameShots.push (new shot (this.name, this.weapon, "#BBB", this.x, this.y, 12, 3, 8, this.degrees - 90));
                        gameShots.push (new shot (this.name, this.weapon, "#BBB", this.x, this.y, 12, 3, 8, this.degrees));
                        gameShots.push (new shot (this.name, this.weapon, "#BBB", this.x, this.y, 12, 3, 8, this.degrees + 90));
                    }
                    else if (this.weapon == 2)
                    {
                        gameShots.push (new shot (this.name, this.weapon, "#292C9C", this.x + 48 * Math.sin ((this.degrees - 90) * Math.PI / 180), this.y - 48 * Math.cos ((this.degrees - 90) * Math.PI / 180), 16, 0, 10, this.degrees));
                        gameShots.push (new shot (this.name, this.weapon, "#292C9C", this.x, this.y, 16, 0, 10, this.degrees));
                        gameShots.push (new shot (this.name, this.weapon, "#292C9C", this.x + 48 * Math.sin ((this.degrees + 90) * Math.PI / 180), this.y - 48 * Math.cos ((this.degrees + 90) * Math.PI / 180), 16, 0, 10, this.degrees));
                        if (this.weapons [this.weapon].power > 1)
                        {
                            gameShots.push (new shot (this.name, this.weapon, "#292C9C", this.x + 96 * Math.sin ((this.degrees - 90) * Math.PI / 180), this.y - 96 * Math.cos ((this.degrees - 90) * Math.PI / 180), 16, 0, 10, this.degrees));
                            gameShots.push (new shot (this.name, this.weapon, "#292C9C", this.x + 96 * Math.sin ((this.degrees + 90) * Math.PI / 180), this.y - 96 * Math.cos ((this.degrees + 90) * Math.PI / 180), 16, 0, 10, this.degrees));
                        }
                    }
                    else if (this.weapon == 3)
                    {
                        gameShots.push (new shot (this.name, this.weapon, "black", this.x, this.y, 14, 3, 11, this.degrees - 45));
                        gameShots.push (new shot (this.name, this.weapon, "black", this.x, this.y, 14, 3, 11, this.degrees));
                        gameShots.push (new shot (this.name, this.weapon, "black", this.x, this.y, 14, 3, 11, this.degrees + 45));
                        gameShots.push (new shot (this.name, this.weapon, "black", this.x, this.y, 14, 3, 11, this.degrees - 135));
                        gameShots.push (new shot (this.name, this.weapon, "black", this.x, this.y, 14, 3, 11, this.degrees + 180));
                        gameShots.push (new shot (this.name, this.weapon, "black", this.x, this.y, 14, 3, 11, this.degrees + 135));
                        if (this.weapons [this.weapon].power > 1)
                        {
                            gameShots.push (new shot (this.name, this.weapon, "black", this.x, this.y, 14, 3, 11, this.degrees - 90));
                            gameShots.push (new shot (this.name, this.weapon, "black", this.x, this.y, 14, 3, 11, this.degrees + 90));
                        }
                    }
                    this.ammo--;
                    if (this.name == players [0].name) vitalsHud ("ammo", this.ammo, "red");
                }
                this.lastShotFrame = gameArea.frame;
                if (gameSound.active && this.ammo > 0)
                {
                    gameSound.sounds ["shot" + this.weapon].stop ();
                    gameSound.sounds ["shot" + this.weapon].play ();
                }
                if (gameControl == "gamepad" && (gameModal == "menu" || gameScreen == "menu" || this.name == players [0].name)) vibrate (150);
            }
        }
    }
}

function shipHit (gameShip, gameShot)
{
    gameShots [gameShot].hit = true;
    gameShips [gameShip].life -= 10;
    if (gameShips [gameShip].name == players [0].name) vitalsHud ("life", gameShips [gameShip].life, "red");
    if (gameShips [gameShip].life > 0)
    {
        gameHits.push (new hit (gameShips [gameShip].name, gameShots [gameShot].x, gameShots [gameShot].y, 20, 1));
        if (gameSound.active)
        {
            gameSound.sounds ["hit1"].stop ();
            gameSound.sounds ["hit1"].play ();
        }
        if (gameModes.findIndex (mode => mode.active == true) != 1 && gameModes.findIndex (mode => mode.active == true) != 2 && players [0].name == gameShips [gameShip].name)
        {
            if (gameControl == "gamepad") vibrate (300, players [players.findIndex (player => player.name == gameShips [gameShip].name)].control);
            gameShips [gameShip].score += 100;
            if (gameShips.length > 1) fetchLoad ("scoreHud", "player=" + gameShips [gameShip].name + "&shipColor=" + gameShips [gameShip].shipColor + "&invColor=" + invColor + (gameShips [gameShip].skin ? "&skin=" + gameShips [gameShip].skin : ""));
            //document.getElementById ("score" + gameShips [gameShip].name).innerHTML = gameShips [gameShip].score;
            else document.getElementById ("scoreHud").innerHTML = gameShips [gameShip].score;
        }
    }
    else
    {
        gameHits.push (new hit ("hit0", gameShips [gameShip].x, gameShips [gameShip].y, 40, 2));
        if (gameSound.active)
        {
            gameSound.sounds ["hit0"].stop ();
            gameSound.sounds ["hit0"].play ();
        }
        if (players [0].name == gameShots [gameShot].name)
        {
            gameShips [gameShip].score += 1000;
            if (gameShips.length > 1) document.getElementById ("score" + gameShips [gameShip].name).innerHTML = gameShips [gameShip].score;
            else document.getElementById ("scoreHud").innerHTML = gameShips [gameShip].score;
        }
        playerDead (gameShip);
    }
}

function playerDead (gameShip)
{
    vibrate (600, players [players.findIndex (player => player.name == gameShips [gameShip].name)].control);
    if (gameShips [gameShip].lifes > 0)
    {    
        gameShips [gameShip].lifes--;
        if (gameShips.length > 1) $("#life" + gameShips [gameShip].name + gameShips [gameShip].lifes).fadeOut (1000);
        else $("#life" + gameShips [gameShip].lifes).fadeOut (1000);
    }
    if (gameShips [gameShip].lifes == 0 && gameModes.findIndex (mode => mode.active == true) < 2 && gameShips [gameShip].name == players [0].name) fetchLoad ("high_score_save", "name=" + gameShips [gameShip].name + "&score=" + gameShips [gameShip].score);
    setTimeout
    (
        function ()
        {
            if ((gameModes.findIndex (mode => mode.active == true) == 2 && gameShips.length == 0) || (gameModes.findIndex (mode => mode.active == true) == 3 && gameShips [gameShip].name == players [0].name)) gameOpenModal ("exit", "Game over");
            else if (gameShips.length == 0 && gameModes.findIndex (mode => mode.active == true) < 2)
            {
                $("#blackScreen").fadeIn (1000);
                setTimeout
                (
                    function ()
                    {
                        gameLoadScreen ("game_over");
                    },
                    1000
                );
            }
            else if (gameShips [gameShip].lifes > 0)
            {
                if (gameModal != null) gameCloseModal ();
                gameShips [gameShip].x = startPoints [startPoints.findIndex (startPoint => startPoint.ship == gameShips [gameShip].name)].x;
                gameShips [gameShip].y = startPoints [startPoints.findIndex (startPoint => startPoint.ship == gameShips [gameShip].name)].y;
                gameShips [gameShip].z = startPoints [startPoints.findIndex (startPoint => startPoint.ship == gameShips [gameShip].name)].z;
                gameShips [gameShip].degrees = 0;
                gameShips [gameShip].speed = 0;
                gameShips [gameShip].maxSpeed = 1;
                gameShips [gameShip].fire = false;
                gameShips [gameShip].weapon = 0;
                gameShips [gameShip].engine1 = 0;
                gameShips [gameShip].engine2 = 0;
                gameShips [gameShip].engine1inc = true;
                gameShips [gameShip].engine2inc = true;
                gameShips [gameShip].shadowOffset = 1;
                gameShips [gameShip].nameOffset = 5;  
                gameShips [gameShip].life = 100;
                gameShips [gameShip].fuel = 100;
                gameShips [gameShip].ammo = 100;
                gameShips [gameShip].shield = 0;
                gameShips [gameShip].gunStatus = true;
                gameShips [gameShip].wing1Status = true;
                gameShips [gameShip].wing2Status = true;
                gameShips [gameShip].engine1Status = true;
                gameShips [gameShip].engine2Status = true;
                if (gameShips [gameShip].name == players [0].name)
                {
                    var newPoint = gameShips [gameShip].x;
                    if (newPoint < gameWidth / 2) newPoint = gameWidth / 2;
                    else if (newPoint > gameWidth * 3 + gameWidth / 2) newPoint = gameWidth * 3 + gameWidth / 2;
                    if (newPoint < gameArea.centerPoint.x) ctx.translate (gameArea.centerPoint.x - newPoint, 0);
                    else if (newPoint > gameArea.centerPoint.x) ctx.translate (-(newPoint - gameArea.centerPoint.x), 0);
                    gameArea.centerPoint.x = newPoint;
                    newPoint = gameShips [gameShip].y;
                    if (newPoint < gameHeight / 2) newPoint = gameHeight / 2;
                    else if (newPoint > gameHeight * 3 + gameHeight / 2) newPoint = gameHeight * 3 + gameHeight / 2;
                    if (newPoint < gameArea.centerPoint.y) ctx.translate (0, gameArea.centerPoint.y - newPoint);
                    else if (newPoint > gameArea.centerPoint.y) ctx.translate (0, -(newPoint - gameArea.centerPoint.y));
                    gameArea.centerPoint.y = newPoint;
                    resetHuds (1, false, 100);
                }
                if (gameMusic.active)
                {
                    if (enemies == 0)
                    {
                        gameMusic.musics.boss.stop ();
                        gameMusic.musics.boss.play ();
                    }
                    else if (enemies > 0)
                    {
                        gameMusic.musics.game.stop ();
                        gameMusic.musics.game.play ();
                    }
                }
            }
        },
        1000
    );
}