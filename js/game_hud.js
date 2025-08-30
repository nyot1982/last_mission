function resetHuds (enemies, vitals)
{
    if (document.getElementById ("hudsMulti").style.display == "block") changeHuds (false);
    weaponHud (enemies);
    document.getElementById ("headingHud").style.left = "-371.25px";
    document.getElementById ("zHud").innerHTML = "0 m";
    if (enemies) document.getElementById ("enemyHud2").style.width = "270px";
    if (vitals == 0) var color = "red";
    else var color = "blue";
    vitalsHud ("life", vitals, color);
    vitalsHud ("fuel", vitals, color);
    vitalsHud ("ammo", vitals, color);
    vitalsHud ("shield", 0, "red");
    if (vitals == 0 && gameModes.findIndex (mode => mode.active == true) > -1) gameModeHud (-1);
}

function scoreHud (gameShip)
{
    if (!document.getElementById ("score-" + gameShips [gameShip].name)) 
    {
        if (gameModes.findIndex (mode => mode.active == true) == 0)
        {
            document.getElementById ("scoreHud").style.lineHeight = "23px";
            document.getElementById ("scoreHud").innerHTML = '<span id="score-' + gameShips [gameShip].name + '">0</span>';
        }
        else
        {
            document.getElementById ("scoreHud").style.lineHeight = null;
            if (gameShips [gameShip].colors.skin)
            {
                if (skins [gameShips [gameShip].colors.skin].image != null)
                {
                    var skin = '<defs><pattern id="skin' + gameShips [gameShip].colors.skin + '-score" patternUnits="userSpaceOnUse" width="27" height="30"><image href="skins/' + gameShips [gameShip].colors.skin + '.png" x="0" y="0" width="27" height="30" /></pattern></defs>';
                    var shipFill = 'url(#skin' + gameShips [gameShip].colors.skin + '-score)';
                }
                else
                {
                    var skin = "";
                    var shipFill = null;
                }
            }
            else
            {
                var skin = "";
                var shipFill = gameShips [gameShip].colors.shipFill;
            }
            if (shipFill != null) skin += '<g><path fill="' + shipFill + '" d="m12 3c0 1.7-0.5 3-1 3-0.6 0-1 1.2-1 2.8 0 1.6-0.8 3.3-2 4.2-1.1 0.8-2 2.3-2 3.3 0 0.9-0.4 1.7-1 1.7-0.6 0-1-2.3-1-5 0-2.8-0.4-5-1-5-0.6 0-1 0.9-1 2 0 1.1-0.4 2-1 2-0.6 0-1 3.7-1 9 0 5 0.3 9 0.8 9 0.4 0 1.4-0.9 2.2-2 0.8-1.1 1.8-2 2.3-2 0.4 0 0.7 0.9 0.7 2q0 2 2 2c1.1 0 2-0.5 2-1 0-0.5 1.6-1 3.5-1 1.9 0 3.5 0.5 3.5 1 0 0.5 0.9 1 2 1q2 0 2-2c0-1.1 0.3-2 0.8-2 0.4 0 1.4 0.9 2.2 2 0.8 1.1 1.8 2 2.3 2 0.4 0 0.7-4 0.7-9 0-5.3-0.4-9-1-9-0.5 0-1-0.9-1-2 0-1.1-0.5-2-1-2-0.5 0-1 2.3-1 5 0 2.8-0.5 5-1 5-0.5 0-1-0.8-1-1.7 0-1-0.9-2.5-2-3.3-1.2-0.9-2-2.6-2-4.3 0-1.5-0.5-2.7-1-2.7-0.5 0-1-1.3-1-3q0-3-1.5-3-1.5 0-1.5 3 z"/>';
            else skin = '<g><path fill="' + skins [gameShips [gameShip].colors.skin].engine1Fill + '" d="m 6 28 q 0 2 2 2 c 1.1 0 2 -0.5 2 -2 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].engine2Fill + '" d="m 17 28 c 0 1.5 1 2 2 2 q 2 0 2 -2 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].hook1Fill + '" d="m 6 16.3 c 0 0.9 -0.4 1.7 -1 1.7 c -0.6 0 -1 -2.3 -1 -5 l 0 13.8 c 0 0 0.8 -0.8 1.3 -0.8 c 0.4 0 0.7 0.9 0.7 2 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].hook2Fill + '" d="m 21 28 c 0 -1.1 0.3 -2 0.8 -2 c 0.4 0 1.2 0.7 1.2 0.7 l 0 -13.7 c 0 2.8 -0.5 5 -1 5 c -0.5 0 -1 -0.8 -1 -1.7 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].gunFill + '" d="m 12 3 c 0 1.7 -0.5 3 -1 3 c -0.6 0 -1 1.2 -1 2.8 c 0 1.6 -0.8 3.3 -2 4.2 L 19 13 c -1.2 -0.9 -2 -2.6 -2 -4.3 c 0 -1.5 -0.5 -2.7 -1 -2.7 c -0.5 0 -1 -1.3 -1 -3 q 0 -3 -1.5 -3 q -1.5 0 -1.5 3 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].shipFill + '" d="m 8 13 c -1.1 0.8 -2 2.3 -2 3.3 l 0 11.7 l 15 0 l 0 -11.7 c 0 -1 -0.9 -2.5 -2 -3.3 l -11 0 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].wing1Fill + '" d="m 4 13 c 0 -2.8 -0.4 -5 -1 -5 c -0.6 0 -1 0.9 -1 2 c 0 1.1 -0.4 2 -1 2 c -0.6 0 -1 3.7 -1 9 c 0 5 0.3 9 0.8 9 c 0.4 0 1.4 -0.9 2.2 -2 l 1 -1.2 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].wing2Fill + '" d="m 23 26.8 l 1 1.3 c 0.8 1.1 1.8 2 2.3 2 c 0.4 0 0.7 -4 0.7 -9 c 0 -5.3 -0.4 -9 -1 -9 c -0.5 0 -1 -0.9 -1 -2 c 0 -1.1 -0.5 -2 -1 -2 c -0.5 0 -1 2.3 -1 5 z"/>';
            document.getElementById ("scoreHud").innerHTML += '<div id="score-' + gameShips [gameShip].name + '-div"><svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 30" style="background-color: ' + gameShips [gameShip].colors.negative + '; border: solid 2px ' + gameShips [gameShip].colors.negative + ';"><title>' + gameShips [gameShip].name + ' Score</title>' +
                                                              skin + '<path fill="#7b797b" d="m10.3 16.6c-1.3 1.3-2.3 2.8-2.3 3.4 0 0.5 1.1 2.1 2.5 3.5 1.4 1.4 2.7 2.5 3 2.5 0.3 0 1.7-1.1 3-2.5 1.4-1.4 2.5-3 2.5-3.5 0-0.6-1.1-2.1-2.5-3.5-1.4-1.4-2.8-2.5-3.3-2.4-0.4 0-1.7 1.1-3 2.5 z"/></g></svg> <span id="score-' + gameShips [gameShip].name + '">0</span></div>';
        }
    }
    else if (document.getElementById ("score-" + gameShips [gameShip].name).innerHTML != gameShips [gameShip].score)
    {
        var scoreHudElement = document.getElementById ("score-" + gameShips [gameShip].name);
        scoreHudElement.className = "change";
        scoreHudElement.innerHTML = gameShips [gameShip].score;
        setTimeout
        (
            () =>
            {
                scoreHudElement.className = "";
            },
            250
        );
    }
} 

function lifesHud (gameShip)
{
    if (!document.getElementById ("life0-" + gameShips [gameShip].name)) 
    {
        if (gameModes.findIndex (mode => mode.active == true) == 0)
        {
            document.getElementById ("lifesHud").innerHTML = '<img id="life0-' + gameShips [gameShip].name + '" title="' + gameShips [gameShip].name + ' Life 1" src="svgs/ship.svg"/>' +
                                                             '<img id="life1-' + gameShips [gameShip].name + '" title="' + gameShips [gameShip].name + ' Life 2" src="svgs/ship.svg"/>' +
                                                             '<img id="life2-' + gameShips [gameShip].name + '" title="' + gameShips [gameShip].name + ' Life 3" src="svgs/ship.svg"/>' +
                                                             '<img id="life3-' + gameShips [gameShip].name + '" title="' + gameShips [gameShip].name + ' Life 4" src="svgs/ship.svg"/>' +
                                                             '<img id="life4-' + gameShips [gameShip].name + '" title="' + gameShips [gameShip].name + ' Life 5" src="svgs/ship.svg"/>';
        }
        else
        {
            document.getElementById ("lifesHud").innerHTML += '<div id="lifes-' + gameShips [gameShip].name + '"></div>';
            for (var i = 0; i < 5; i++)
            {
                if (gameShips [gameShip].colors.skin)
                {
                    if (skins [gameShips [gameShip].colors.skin].image != null)
                    {
                        var skin = '<defs><pattern id="skin' + gameShips [gameShip].colors.skin + '-life' + i + '" patternUnits="userSpaceOnUse" width="27" height="30"><image href="skins/' + gameShips [gameShip].colors.skin + '.png" x="0" y="0" width="27" height="30" /></pattern></defs>';
                        var shipFill = 'url(#skin' + gameShips [gameShip].colors.skin + '-life' + i + ')';
                    }
                    else
                    {
                        var skin = "";
                        var shipFill = null;
                    }
                }
                else
                {
                    var skin = "";
                    var shipFill = gameShips [gameShip].colors.shipFill;
                }
                if (shipFill != null) skin += '<g><path fill="' + shipFill + '" d="m12 3c0 1.7-0.5 3-1 3-0.6 0-1 1.2-1 2.8 0 1.6-0.8 3.3-2 4.2-1.1 0.8-2 2.3-2 3.3 0 0.9-0.4 1.7-1 1.7-0.6 0-1-2.3-1-5 0-2.8-0.4-5-1-5-0.6 0-1 0.9-1 2 0 1.1-0.4 2-1 2-0.6 0-1 3.7-1 9 0 5 0.3 9 0.8 9 0.4 0 1.4-0.9 2.2-2 0.8-1.1 1.8-2 2.3-2 0.4 0 0.7 0.9 0.7 2q0 2 2 2c1.1 0 2-0.5 2-1 0-0.5 1.6-1 3.5-1 1.9 0 3.5 0.5 3.5 1 0 0.5 0.9 1 2 1q2 0 2-2c0-1.1 0.3-2 0.8-2 0.4 0 1.4 0.9 2.2 2 0.8 1.1 1.8 2 2.3 2 0.4 0 0.7-4 0.7-9 0-5.3-0.4-9-1-9-0.5 0-1-0.9-1-2 0-1.1-0.5-2-1-2-0.5 0-1 2.3-1 5 0 2.8-0.5 5-1 5-0.5 0-1-0.8-1-1.7 0-1-0.9-2.5-2-3.3-1.2-0.9-2-2.6-2-4.3 0-1.5-0.5-2.7-1-2.7-0.5 0-1-1.3-1-3q0-3-1.5-3-1.5 0-1.5 3 z"/>';
                else skin = '<g><path fill="' + skins [gameShips [gameShip].colors.skin].engine1Fill + '" d="m 6 28 q 0 2 2 2 c 1.1 0 2 -0.5 2 -2 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].engine2Fill + '" d="m 17 28 c 0 1.5 1 2 2 2 q 2 0 2 -2 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].hook1Fill + '" d="m 6 16.3 c 0 0.9 -0.4 1.7 -1 1.7 c -0.6 0 -1 -2.3 -1 -5 l 0 13.8 c 0 0 0.8 -0.8 1.3 -0.8 c 0.4 0 0.7 0.9 0.7 2 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].hook2Fill + '" d="m 21 28 c 0 -1.1 0.3 -2 0.8 -2 c 0.4 0 1.2 0.7 1.2 0.7 l 0 -13.7 c 0 2.8 -0.5 5 -1 5 c -0.5 0 -1 -0.8 -1 -1.7 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].gunFill + '" d="m 12 3 c 0 1.7 -0.5 3 -1 3 c -0.6 0 -1 1.2 -1 2.8 c 0 1.6 -0.8 3.3 -2 4.2 L 19 13 c -1.2 -0.9 -2 -2.6 -2 -4.3 c 0 -1.5 -0.5 -2.7 -1 -2.7 c -0.5 0 -1 -1.3 -1 -3 q 0 -3 -1.5 -3 q -1.5 0 -1.5 3 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].shipFill + '" d="m 8 13 c -1.1 0.8 -2 2.3 -2 3.3 l 0 11.7 l 15 0 l 0 -11.7 c 0 -1 -0.9 -2.5 -2 -3.3 l -11 0 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].wing1Fill + '" d="m 4 13 c 0 -2.8 -0.4 -5 -1 -5 c -0.6 0 -1 0.9 -1 2 c 0 1.1 -0.4 2 -1 2 c -0.6 0 -1 3.7 -1 9 c 0 5 0.3 9 0.8 9 c 0.4 0 1.4 -0.9 2.2 -2 l 1 -1.2 z"/>' +
                        '<path fill="' + skins [gameShips [gameShip].colors.skin].wing2Fill + '" d="m 23 26.8 l 1 1.3 c 0.8 1.1 1.8 2 2.3 2 c 0.4 0 0.7 -4 0.7 -9 c 0 -5.3 -0.4 -9 -1 -9 c -0.5 0 -1 -0.9 -1 -2 c 0 -1.1 -0.5 -2 -1 -2 c -0.5 0 -1 2.3 -1 5 z"/>';
                document.getElementById ("lifes-" + gameShips [gameShip].name).innerHTML += '<svg id="life' + i + '-' + gameShips [gameShip].name + '" version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 30" style="background-color: ' + gameShips [gameShip].colors.negative + '; border: solid 2px ' + gameShips [gameShip].colors.negative + ';"><title>' + gameShips [gameShip].name + ' Life ' + (i + 1) + '</title>' +
                                                    skin + '<path fill="#7b797b" d="m10.3 16.6c-1.3 1.3-2.3 2.8-2.3 3.4 0 0.5 1.1 2.1 2.5 3.5 1.4 1.4 2.7 2.5 3 2.5 0.3 0 1.7-1.1 3-2.5 1.4-1.4 2.5-3 2.5-3.5 0-0.6-1.1-2.1-2.5-3.5-1.4-1.4-2.8-2.5-3.3-2.4-0.4 0-1.7 1.1-3 2.5 z"/></g></svg>';
            }
        }
    }
    else if (gameShips [gameShip].lifes < 5 && !document.getElementById ("life" + gameShips [gameShip].lifes + "-" + gameShips [gameShip].name).style.display && !document.getElementById ("life" + gameShips [gameShip].lifes + "-" + gameShips [gameShip].name).style.opacity)
    {
        $(document.getElementById ("life" + gameShips [gameShip].lifes + "-" + gameShips [gameShip].name)).fadeOut (1000);
        if (gameShips [gameShip].lifes == 0 && gameModes.findIndex (mode => mode.active == true) > 0)
        {
            var name = gameShips [gameShip].name;
            setTimeout
            (
                () =>
                {
                    document.getElementById ("score-" + name + "-div").remove ();
                    document.getElementById ("lifes-" + name).remove ();
                    document.getElementById ("scoreHud").style.height = (23 * gameShips.length) + "px";
                    if (gameShips.length > 2) document.getElementById ("lifesHud").style.height = (23 * Math.round ((gameShips.length - 1) / 2)) + "px";
                    else if (gameScreen == "game")
                    {
                        if (gameShips.length == 0) document.getElementById ("lifesHud").style.height = "0px";
                        else document.getElementById ("lifesHud").style.height = "23px";
                    }
                },
                1000
            );
        }
    }
}

function speedHud ()
{
    var gameShip = gameShips.findIndex (ship => ship.name == players [0].name),
        speedHud = document.getElementById ("speedHud"),
        speedElements = speedHud.getElementsByClassName ("speed"),
        meterHud = speedHud.getElementById ("meterHud"),
        kphElement = speedHud.getElementById ("kph"),
        speed = ["moveSpeed", 0];

    if (gameShip > -1)
    {
        if (Math.abs (gameShips [gameShip].strafeSpeed) > Math.abs (gameShips [gameShip].moveSpeed)) speed [0] = "strafeSpeed";
        speed [1] = Math.abs (gameShips [gameShip][speed [0]]) * 300;
    }
    for (var i = 0; i < speedElements.length; i++)
    {
        if (gameShip > -1 && i <= Math.abs (gameShips [gameShip][speed [0]])) speedElements [i].setAttribute ("class", "speed active");
        else speedElements [i].setAttribute ("class", "speed");
    }
    meterHud.setAttribute ("style", "transform: rotate(" + (gameShip > -1 ? Math.abs (gameShips [gameShip][speed [0]]) * 30 : 0) + "deg);");
    kphElement.setAttribute ("class", "kph" + Math.floor (gameShip > -1 ? Math.abs (gameShips [gameShip][speed [0]]) : 0));
    speed = speed [1].toString ();
    if (speed.length == 4)
    {
        speedDigits (3, speed.at (0));
        speedDigits (2, speed.at (1));
        speedDigits (1, speed.at (2));
        speedDigits (0, speed.at (3));
    }
    else if (speed.length == 3)
    {
        speedDigits (3, null);
        speedDigits (2, speed.at (0));
        speedDigits (1, speed.at (1));
        speedDigits (0, speed.at (2));
    }
    else if (speed.length == 2)
    {
        speedDigits (3, null);
        speedDigits (2, null);
        speedDigits (1, speed.at (0));
        speedDigits (0, speed.at (1));
    }
    else if (speed.length == 1)
    {
        speedDigits (3, null);
        speedDigits (2, null);
        speedDigits (1, null);
        speedDigits (0, speed);
    }
    else
    {
        speedDigits (3, null);
        speedDigits (2, null);
        speedDigits (1, null);
        speedDigits (0, null);
    }
}

function speedDigits (digit, number)
{
    var d0 = document.getElementById ("d" + digit + "l0"),
        d1 = document.getElementById ("d" + digit + "l1"),
        d2 = document.getElementById ("d" + digit + "l2"),
        d3 = document.getElementById ("d" + digit + "l3"),
        d4 = document.getElementById ("d" + digit + "l4"),
        d5 = document.getElementById ("d" + digit + "l5"),
        d6 = document.getElementById ("d" + digit + "l6");

    if (number == 0 || number == 2 || number == 3 || number == 5 || number == 6 || number == 7 || number == 8 || number == 9) d0.setAttribute ("class", "on");
    else d0.removeAttribute ("class");
    if (number == 0 || number == 4 || number == 5 || number == 6 || number == 8 || number == 9) d1.setAttribute ("class", "on");
    else d1.removeAttribute ("class");
    if (number == 0 || number == 1 || number == 2 || number == 3 || number == 4 || number == 7 || number == 8 || number == 9) d2.setAttribute ("class", "on");
    else d2.removeAttribute ("class");
    if (number == 2 || number == 3 || number == 4 || number == 5 || number == 6 || number == 8 || number == 9) d3.setAttribute ("class", "on");
    else d3.removeAttribute ("class");
    if (number == 0 || number == 2 || number == 6 || number == 8) d4.setAttribute ("class", "on");
    else d4.removeAttribute ("class");
    if (number == 0 || number == 1 || number == 3 || number == 4 || number == 5 || number == 6 || number == 7 || number == 8 || number == 9) d5.setAttribute ("class", "on");
    else d5.removeAttribute ("class");
    if (number == 0 || number == 2 || number == 3 || number == 5 || number == 6 || number == 8 || number == 9) d6.setAttribute ("class", "on");
    else d6.removeAttribute ("class");
}

function weaponHud (reset)
{
    var weaponElements = document.getElementsByClassName ("weaponHud");
    var gameShip = gameShips.findIndex (ship => ship.name == players [0].name);
    
    for (var i = 0; i < weaponElements.length; i++)
    {
        if (reset)
        {
            if (i == 0) $(weaponElements [i]).addClass ("active");
            else $(weaponElements [i]).removeClass ("active");
            $(weaponElements [i]).removeClass ("enable");
            $("#fire" + i + "rate").removeClass ("active");
            $("#fire" + i + "power").removeClass ("active");
            $("#fire" + i + "special").removeClass ("active");
        }
        else if (gameScreen == "game")
        {
            if (i == gameShips [gameShip].weapon)
            {
                if ($(weaponElements [i]).hasClass ("enable")) $(weaponElements [i]).removeClass ("enable");
                if (!$(weaponElements [i]).hasClass ("active")) $(weaponElements [i]).addClass ("active");
            }
            else 
            {
                if ($(weaponElements [i]).hasClass ("active")) $(weaponElements [i]).removeClass ("active");
                if (gameShips [gameShip].weapons [i].power == 0 && $(weaponElements [i]).hasClass ("enable")) $(weaponElements [i]).removeClass ("enable");
                else if (gameShips [gameShip].weapons [i].power > 0 && !$(weaponElements [i]).hasClass ("enable")) $(weaponElements [i]).addClass ("enable");
            }
            if (gameShips [gameShip].weapons [i].power > 0)
            {
                if (gameShips [gameShip].weapons [i].rate == 2) $("#fire" + i + "rate").addClass ("active");
                else $("#fire" + i + "rate").removeClass ("active");
                if (gameShips [gameShip].weapons [i].power > 1) $("#fire" + i + "power").addClass ("active");
                else $("#fire" + i + "power").removeClass ("active");
                if (gameShips [gameShip].weapons [i].power == 3) $("#fire" + i + "special").addClass ("active");
                else $("#fire" + i + "special").removeClass ("active");
            }
        }
    }
}

function vitalsHud (hud, width, color)
{
    document.getElementById (hud + "Hud").style.width = width + "px";
    document.getElementById (hud + "Hud").style.backgroundColor = color;
    setTimeout
    (
        () =>
        {
            document.getElementById (hud + "Hud").style.backgroundColor = "#52AE4A";
        },
        250
    );
}

function mapHud (itemClass, x, y, heading)
{
    var mapHud = document.getElementById ("mapHud"),
    mapItem = document.createElement ('div'),
    offSetX = 5,
    offSetY = 5;
    
    if (itemClass == "mapItem") offSetX = 5.5;
    else if (itemClass == "enemyItem") offSetX = 5.65;
    else if (itemClass == "enemyItem2" || itemClass == "bossItem")
    {
        offSetX = 5.45;
        offSetY = 5.5;
        mapItem.setAttribute ('class', itemClass);
    }
    if (itemClass != "enemyItem2" && itemClass != "bossItem")
    {
        mapItem.setAttribute ('class', 'fa fa-location-arrow ' + itemClass);
        mapItem.style.transform = 'rotate(' + (heading - 45) + 'deg)';
    }
    mapItem.style.left = (x / (gameMap.width / (canvasWidth * 4 / 29)) + offSetX) + "px";
    mapItem.style.top = (y / (gameMap.height / (canvasHeight * 4 / 29)) + offSetY) + "px";
    mapHud.appendChild (mapItem, mapHud.childNodes [0]);
}

function gameModeHud (gameMode)
{
    $("#mode").addClass ("change");
    var activeMode = gameModes.findIndex (mode => mode.active == true);
    setTimeout
    (
        () =>
        {
            if (gameMode == -1)
            {
                document.getElementById ("mode").className = "fa fa-fw fa-times optionsIcon";
                document.getElementById ("mode").title = "No game mode selected";
                gameModes [activeMode].active = false;
            }
            else
            {
                document.getElementById ("mode").className = "fa fa-fw fa-" + gameModes [gameMode].icon + " optionsIcon";
                document.getElementById ("mode").title = gameModes [gameMode].title;
                gameModes [gameMode].active = true;
            }
            $("#mode").removeClass ("change");
        },
        300
    );
}

function fpsHud (action)
{
    if (action == "toggle")
    {
        if ($("#fps_monitor").hasClass ("active"))
        {
            $("#fps_monitor").removeClass ("active");
            action = 0;
            fpsMonitor.timer = 0;
            fpsMonitor.frame = 0;
            fpsMonitor.fps = 0;
            fpsMonitor.ms = 0;
            document.getElementById ("frame_rate").innerHTML = 0;
            document.getElementById ("frame_time").innerHTML = 0;
        }
        else
        {
            $("#fps_monitor").addClass ("active");
            action = 1;
            fpsMonitor.timer = Date.now ();
            fpsMonitor.frame = gameArea.frame || 0;
        }
        if (typeof (Storage) === "undefined") alert ("This browser does not support local web storage.");
        else localStorage.fpsMonitor = action;
    }
    else if (action == "update" && Date.now () - fpsMonitor.timer >= 1000)
    {
        fpsMonitor.fps = gameArea.frame - fpsMonitor.frame;
        fpsMonitor.ms = Math.round (1000 / fpsMonitor.fps);
        document.getElementById ("frame_rate").innerHTML = fpsMonitor.fps;
        document.getElementById ("frame_time").innerHTML = fpsMonitor.ms;
        fpsMonitor.frame = gameArea.frame;
        fpsMonitor.timer = Date.now ();
    }
}

function changeTab (newTab)
{
    if (gameTab != newTab)
    {
        $('#' + gameTab).removeClass ("active");
        $('#' + newTab).addClass ("active");
        $('#' + gameTab + 'Tab-' + controlTab).removeClass ("active");
        $('#' + gameTab + 'Tab-' + controlTab).addClass ("unactive");
        if ($('#' + newTab + 'Tab-' + controlTab).hasClass ("toggle")) $('#' + newTab + 'Tab-' + controlTab).removeClass ("toggle");
        else if ($('#' + newTab + 'Tab-' + controlTab).hasClass ("unactive")) $('#' + newTab + 'Tab-' + controlTab).removeClass ("unactive");
        $('#' + newTab + 'Tab-' + controlTab).addClass ("active");
        gameTab = newTab;
    }
}

function changeHuds (multi)
{
    if (multi)
    {
        document.getElementById ("hudSpeedAltitude").style.display = "none";
        document.getElementById ("hudWeapons").style.display = "none";
        document.getElementById ("hudEnemy").innerHTML = "";
        document.getElementById ("hudVitals").style.display = "none";
        document.getElementById ("hudHeading").innerHTML = '<p><b>ENEMY</b></p><div id="enemyHud"><div id="enemyHud2" style="width: 270px;"></div></div><p>&nbsp;</p>';
        document.getElementById ("hudsMulti").style.display = "block";
    }
    else
    {
        document.getElementById ("hudSpeedAltitude").style.display = "block";
        document.getElementById ("hudWeapons").style.display = "block";
        document.getElementById ("hudEnemy").innerHTML = '<p>&nbsp;</p><p><b>ENEMY</b></p><div id="enemyHud"><div id="enemyHud2"></div></div>';
        document.getElementById ("hudVitals").style.display = "block";
        document.getElementById ("hudHeading").innerHTML = '<p><b>HEADING</b></p><div class="turnHud"><div id="headingHud"><div class="e5">W</div><div>|</div><div class="e5">NW</div><div>|</div><div class="e1">N</div><div>|</div><div class="e5">NE</div><div>|</div><div class="e1">E</div><div>|</div><div class="e5">SE</div><div>|</div><div class="e1">S</div><div>|</div><div class="e5">SW</div><div>|</div><div class="e1">W</div><div>|</div><div class="e5">NW</div><div>|</div><div class="e1">N</div><div>|</div><div class="e5">NE</div><div>|</div><div class="e1">E</div><div>|</div><div class="e5">SE</div><div>|</div><div class="e1">S</div><div>|</div><div class="e5">SW</div><div>|</div><div class="e1">W</div><div>|</div><div class="e5">NW</div><div>|</div><div class="e1">N</div><div>|</div><div class="e5">NE</div><div>|</div><div class="e1">E</div></div></div>';
        document.getElementById ("hudsMulti").style.display = "none";
    }
}

function updateHuds (gameShip)
{
    var speed = Math.max (Math.abs (gameShips [gameShip].moveSpeed), Math.abs (gameShips [gameShip].strafeSpeed)),
        speedIcon = "",
        z = gameShips [gameShip].z,
        zIcon = "",
        heading = gameShips [gameShip].heading < 0 ? 360 + gameShips [gameShip].heading : gameShips [gameShip].heading,
        headingIcon = "";

    if (speed < 1.5) speedIcon = "gauge-min";
    else if (speed < 3) speedIcon = "gauge-low";
    else if (speed < 4.5) speedIcon = "gauge";
    else if (speed < 6) speedIcon = "gauge-high";
    else if (speed == 6) speedIcon = "gauge-max";
    if (z == 0) zIcon = "down";
    else zIcon = "up"
    if (heading < 22.5) headingIcon = "N";
    else if (heading < 67.5) headingIcon = "NE";
    else if (heading < 112.5) headingIcon = "E";
    else if (heading < 157.5) headingIcon = "SE";
    else if (heading < 202.5) headingIcon = "S";
    else if (heading < 247.5) headingIcon = "SW";
    else if (heading < 292.5) headingIcon = "W";
    else if (heading < 337.5) headingIcon = "NW";
    else if (heading <= 360) headingIcon = "N";
    document.getElementById ("hudsMulti").innerHTML += '<div class="multiHuds"><div class="lifeHud"><div class="lifeHud2" style="width: ' + (gameShips [gameShip].life * 16 / 100) + 'px; background-color: ' + gameShips [gameShip].colors.near + ';"></div></div> <div class="fuelHud"><div class="fuelHud2" style="width: ' + (gameShips [gameShip].fuel * 16 / 100) + 'px; background-color: ' + gameShips [gameShip].colors.near + ';"></div></div> <div class="ammoHud"><div class="ammoHud2" style="width: ' + (gameShips [gameShip].ammo * 16 / 100) + 'px; background-color: ' + gameShips [gameShip].colors.near + ';"></div></div> <div class="shieldHud"><div class="shieldHud2" style="width: ' + (gameShips [gameShip].shield * 16 / 100) + 'px; background-color: ' + gameShips [gameShip].colors.near + ';"></div></div> <div class="fa fa-' + speedIcon + ' multiHud" style="color: ' + gameShips [gameShip].colors.near + ';"></div> <div class="fa fa-' + zIcon + ' multiHud" style="color: ' + gameShips [gameShip].colors.near + ';"></div> <div class="multiHud2" style="color: ' + gameShips [gameShip].colors.near + ';">' + headingIcon + '</div></div>';
}