function ground (type, color, x, y, width, height)
{
    this.type = type;
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.update = function ()
    {
        ctx = gameArea.ctx;
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        if (this.type == "pattern")
        {
            this.image = new Image ();
            this.image.src = this.color;
            this.pattern = ctx.createPattern (this.image, "repeat");
            ctx.fillStyle = this.pattern;
            ctx.fillRect (this.x, this.y, this.width, this.height);
        }
        else if (this.type == "menu")
        {
            ctx.fillStyle = this.color;
            ctx.fillRect (this.x, this.y, this.width, this.height);
        }
        else if (this.type == "base")
        {
            ctx.beginPath ();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#00000033";
            ctx.fillStyle = this.color;
            ctx.rect (this.x, this.y, this.width, this.height);
            for (var gameShip in gameShips) if (ctx.isPointInPath (gameShips [gameShip].x, gameShips [gameShip].y)) gameShips [gameShip].ground = this.type;
            ctx.fill ();
            ctx.stroke ();
            squares ("black", "yellow", this.x + 7, this.y + 7, 15, 17, 2, 2, false);
            squares ("red", "white", this.x + 43, this.y + 7, 15, 17, 2, 2, false);
            squares ("black", "yellow", this.x + 7, this.y + 47, 15, 17, 2, 2, false);
            squares ("red", "white", this.x + 43, this.y + 47, 15, 17, 2, 2, false);
        }
        else
        {
            const patternCanvas = document.createElement ("canvas");
            const patternContext = patternCanvas.getContext ("2d");
            if (this.type == "grass")
            {
                patternCanvas.width = 18;
                patternCanvas.height = 18;
            }
            else
            {
                patternCanvas.width = 32;
                patternCanvas.height = 32;
            }
            patternContext.fillStyle = this.color;
            patternContext.fillRect (0, 0, patternCanvas.width, patternCanvas.height);
            patternContext.strokeStyle = "transparent";
            patternContext.lineWidth = 0;
            if (this.type == "water")
            {
                patternContext.globalAlpha = 0.25;
                this.path = new Path2D ("m8 3c0 0.5 0.7 1 1.5 1 0.8 0 1.5-0.5 1.5-1 0-0.5-0.7-1-1.5-1-0.8 0-1.5 0.5-1.5 1zm-8 2c0 0.5 0.9 1 2 1 1.1 0 2-0.5 2-1 0-0.5-0.9-1-2-1-1.1 0-2 0.5-2 1zm0 8c0 0.6 0.9 1 2 1 1.1 0 2-0.4 2-1 0-0.6-0.9-1-2-1-1.1 0-2 0.4-2 1zm15 16c0 0.6 0.9 1 2 1 1.1 0 2-0.4 2-1 0-0.6-0.9-1-2-1-1.1 0-2 0.4-2 1zm11 0c0 0.6 0.9 1 2 1 1.1 0 2-0.4 2-1 0-0.6-0.9-1-2-1-1.1 0-2 0.4-2 1zm-19-20c0 0.6 0.7 1 1.5 1 0.8 0 1.5-0.4 1.5-1 0-0.6-0.7-1-1.5-1-0.8 0-1.5 0.4-1.5 1zm15 0c0 0.6 0.7 1 1.5 1 0.8 0 1.5-0.4 1.5-1 0-0.6-0.7-1-1.5-1-0.8 0-1.5 0.4-1.5 1zm-8 10c0 0.6 0.9 1 2 1 1.1 0 2-0.4 2-1 0-0.6-0.9-1-2-1-1.1 0-2 0.4-2 1zm8 2c0 0.6 0.7 1 1.5 1 0.8 0 1.5-0.4 1.5-1 0-0.6-0.7-1-1.5-1-0.8 0-1.5 0.4-1.5 1zm-20 2c0 0.6 0.9 1 2 1 1.1 0 2-0.4 2-1 0-0.6-0.9-1-2-1-1.1 0-2 0.4-2 1zm7 2c0 0.6 0.9 1 2 1 1.1 0 2-0.4 2-1 0-0.6-0.9-1-2-1-1.1 0-2 0.4-2 1z");
                patternContext.fillStyle = "white";
                patternContext.fill (this.path);
                this.pattern = ctx.createPattern (patternCanvas, "repeat");
                ctx.fillStyle = this.pattern;
                ctx.fillRect (this.x, this.y, this.width, this.height);
                for (var gameShip in gameShips) gameShips [gameShip].ground = "water";
            }
            else
            {
                if (this.type == "sand")
                {
                    patternContext.fillStyle = "#88000044";
                    patternContext.fillRect (5, 5, 3, 2);
                    patternContext.fillRect (22, 5, 3, 2);
                    patternContext.fillRect (25, 10, 2, 3);
                    patternContext.fillRect (12, 28, 2, 3);
                    patternContext.fillRect (10, 2, 3, 2);
                    patternContext.fillRect (10, 20, 3, 2);
                    patternContext.fillRect (11, 12, 2, 3);
                    patternContext.fillRect (16, 15, 3, 2);
                    patternContext.fillRect (22, 22, 2, 3);
                    patternContext.fillRect (15, 10, 2, 3);
                    patternContext.fillRect (26, 26, 3, 2);
                    patternContext.fillRect (28, 17, 3, 2);
                }
                else if (this.type == "grass")
                {
                    patternContext.fillStyle = this.color;
                    patternContext.fillRect (0, 0, 18, 18);
                    patternContext.lineWidth = 1;
                    patternContext.strokeStyle = "#00000044";
                    patternContext.arc (0, 0, 12, 0, 0.5 * Math.PI);
                    patternContext.fillStyle = this.color;
                    patternContext.fill ();
                    patternContext.stroke ();
                }
                else if (this.type == "concrete")
                {
                    patternContext.fillStyle = "#00000022";
                    patternContext.fillRect (5, 5, 8, 8);
                    patternContext.fillRect (22, 5, 8, 8);
                    patternContext.fillRect (8, 10, 8, 8);
                    patternContext.fillRect (12, 23, 8, 8);
                    patternContext.fillRect (10, 2, 8, 8);
                    patternContext.fillRect (10, 20, 8, 8);
                    patternContext.fillRect (11, 12, 8, 8);
                    patternContext.fillRect (16, 15, 8, 8);
                    patternContext.fillRect (9, 23, 8, 8);
                    patternContext.fillRect (15, 10, 8, 8);
                    patternContext.fillRect (18, 23, 8, 8);
                    patternContext.fillRect (23, 17, 8, 8);
                }
                else if (this.type == "snow")
                {
                    patternContext.fillStyle = "#00000022";
                    patternContext.fillRect (10, 5, 2, 10);
                    patternContext.fillRect (15, 21, 2, 10);
                    patternContext.fillRect (25, 15, 2, 10);
                }
                this.pattern = ctx.createPattern (patternCanvas, "repeat");
                ctx.beginPath ();
                ctx.moveTo (x, y);
                for (var vertex in width) ctx.lineTo (width [vertex], height [vertex]);
                for (var gameShip in gameShips) if (ctx.isPointInPath (gameShips [gameShip].x, gameShips [gameShip].y)) gameShips [gameShip].ground = this.type;
                ctx.fillStyle = this.pattern;
                ctx.fill ();
            }  
        }
    }
}

function squares (color1, color2, x, y, width, height, squareWidth, squareHeight, fill)
{
    ctx.shadowColor = "transparent";
    for (var i = 0, j = 0; j < height; i++)
    {
        if (i == width)
        {
            i = -1;
            j++;
        }
        else if (fill || i == 0 || j == 0 || i + 1 == width || j + 1 == height)
        {
            if (j % 2 == 0 && i % 2 == 0 || j % 2 != 0 && i % 2 != 0) ctx.fillStyle = color1;
            else ctx.fillStyle = color2;
            ctx.fillRect (x + squareWidth * i, y + squareHeight * j, squareWidth, squareHeight);
        }
    }
}

function digital (text, color1, color2, x, y, lineWidth, scale)
{
    this.text = text;
    this.color1 = color1;
    this.color2 = color2;
    this.x = x;
    this.y = y;
    this.lineWidth = lineWidth;
    this.scale = scale;

    this.update = function ()
    {
        var digital = new Path2D ();
        var m = new DOMMatrix ();
        m.a = this.scale;
        m.b = 0;
        m.c = 0;
        m.d = this.scale;
        m.e = this.x;
        m.f = this.y;
    
        ctx = gameArea.ctx;
        if (this.text == "0" || this.text == "2" || this.text == "3" || this.text == "5" || this.text == "6" || this.text == "7" || this.text == "8" || this.text == "9")
        {
            var digital2 = new Path2D ("m20 17.5l17.5 17.5h83l34.9-35h-152.9z");
            digital.addPath (digital2, m);
        }
        if (this.text == "0" || this.text == "4" || this.text == "5" || this.text == "6" || this.text == "8" || this.text == "9")
        {
            var digital2 = new Path2D ("m0 55.5v53l17.5 17.5 17.5-17.5v-71l-35-35z");
            digital.addPath (digital2, m);
        }
        if (this.text == "0" || this.text == "1" || this.text == "2" || this.text == "3" || this.text == "4" || this.text == "7" || this.text == "8" || this.text == "9")
        {
            var digital2 = new Path2D ("m140 20l-17.5 17.5 0.5 71 17.5 17.5 17.5-17.5-0.5-106z");
            digital.addPath (digital2, m);
        }
        if (this.text == "2" || this.text == "3" || this.text == "4" || this.text == "5" || this.text == "6" || this.text == "8" || this.text == "9")
        {
            var digital2 = new Path2D ("m28.7 118.8l-8.7 8.7 17.5 17.5h83l17.5-17.5-17.5-17.5h-83z");
            digital.addPath (digital2, m);
        }
        if (this.text == "0" || this.text == "2" || this.text == "6" || this.text == "8")
        {
            var digital2 = new Path2D ("m8.5 137.8l-9 8.7 0.5 106 35-35v-71l-17.5-17.5z");
            digital.addPath (digital2, m);
        }
        if (this.text == "0" || this.text == "1" || this.text == "3" || this.text == "4" || this.text == "5" || this.text == "6" || this.text == "7" || this.text == "8" || this.text == "9")
        {
            var digital2 = new Path2D ("m131.5 137.8l-9 8.7 0.5 71 35 35v-106l-17.5-17.5z");
            digital.addPath (digital2, m);
        }
        if (this.text == "0" || this.text == "2" || this.text == "3" || this.text == "5" || this.text == "6" || this.text == "8" || this.text == "9")
        {
            var digital2 = new Path2D ("m20 237.5l-17.5 17.5h153l-35-35h-83z");
            digital.addPath (digital2, m);
        }
        if (color1 && lineWidth > 0)
        {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.color1;
            ctx.stroke (digital);
        }
        if (color2)
        {
            ctx.fillStyle = this.color2;
            ctx.fill (digital);
        }
    }
}