function resetHuds (speed, meter, enemies, vitals)
{
    speedHud (speed);
    meterHud (meter);
    weaponHud (enemies);
    document.getElementById ("degreesHud").style.left = "-371.25px";
    document.getElementById ("zHud").innerHTML = "0 m";
    if (enemies) document.getElementById ("enemyHud2").style.width = "270px";
    if (vitals == 0) var color = "red";
    else var color = "blue";
    vitalsHud ("life", vitals, color);
    vitalsHud ("fuel", vitals, color);
    vitalsHud ("ammo", vitals, color);
    vitalsHud ("shield", 0, "red");
    if (speed == 0 && vitals == 0 && gameModes.findIndex (mode => mode.active == true) > -1) gameModeHud (-1);
}

function scoreHud (gameShip, modColor)
{
    if (gameShips [gameShip].skin)
    {
        var skin = '<defs><pattern id="skin" patternUnits="userSpaceOnUse" width="27" height="30"><image href="skins/' + gameShips [gameShip].skin + '.png" x="0" y="0" width="27" height="30" /></pattern></defs>';
        var shipColor = 'url(#skin)';
    }
    else
    {
        var skin = "";
        var shipColor = gameShips [gameShip].shipColor;
    }
    document.getElementById ("scoreHud").innerHTML += '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 30" style="background-color: ' + modColor + '; border: solid 2px ' + modColor + ';"><title>' + gameShips [gameShip].name + '</title>' +
                                                      skin +
                                                      '<g><path fill="' + shipColor + '" d="m12 3c0 1.7-0.5 3-1 3-0.6 0-1 1.2-1 2.8 0 1.6-0.8 3.3-2 4.2-1.1 0.8-2 2.3-2 3.3 0 0.9-0.4 1.7-1 1.7-0.6 0-1-2.3-1-5 0-2.8-0.4-5-1-5-0.6 0-1 0.9-1 2 0 1.1-0.4 2-1 2-0.6 0-1 3.7-1 9 0 5 0.3 9 0.8 9 0.4 0 1.4-0.9 2.2-2 0.8-1.1 1.8-2 2.3-2 0.4 0 0.7 0.9 0.7 2q0 2 2 2c1.1 0 2-0.5 2-1 0-0.5 1.6-1 3.5-1 1.9 0 3.5 0.5 3.5 1 0 0.5 0.9 1 2 1q2 0 2-2c0-1.1 0.3-2 0.8-2 0.4 0 1.4 0.9 2.2 2 0.8 1.1 1.8 2 2.3 2 0.4 0 0.7-4 0.7-9 0-5.3-0.4-9-1-9-0.5 0-1-0.9-1-2 0-1.1-0.5-2-1-2-0.5 0-1 2.3-1 5 0 2.8-0.5 5-1 5-0.5 0-1-0.8-1-1.7 0-1-0.9-2.5-2-3.3-1.2-0.9-2-2.6-2-4.3 0-1.5-0.5-2.7-1-2.7-0.5 0-1-1.3-1-3q0-3-1.5-3-1.5 0-1.5 3z"/>' +
                                                      '<path fill="#7b797b" d="m10.3 16.6c-1.3 1.3-2.3 2.8-2.3 3.4 0 0.5 1.1 2.1 2.5 3.5 1.4 1.4 2.7 2.5 3 2.5 0.3 0 1.7-1.1 3-2.5 1.4-1.4 2.5-3 2.5-3.5 0-0.6-1.1-2.1-2.5-3.5-1.4-1.4-2.8-2.5-3.3-2.4-0.4 0-1.7 1.1-3 2.5z"/></g></svg> ' +
                                                      '<span id="score' + gameShips [gameShip].name + '">0</span><br>';
}

function lifesHud (gameShip, modColor, ships)
{
    if (gameShips [gameShip].skin)
    {
        var skin = '<defs><pattern id="skin" patternUnits="userSpaceOnUse" width="27" height="30"><image href="skins/' + gameShips [gameShip].skin + '.png" x="0" y="0" width="27" height="30" /></pattern></defs>';
        var shipColor = 'url(#skin)';
    }
    else
    {
        var skin = "";
        var shipColor = gameShips [gameShip].shipColor;
    }
    for (var i = 0; i < ships; i++)
    {
        document.getElementById ("lifesHud").innerHTML += '<svg id="life' + gameShips [gameShip].name + i + '" version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 30" style="background-color: ' + modColor + '; border: solid 2px ' + modColor + ';"><title>' + gameShips [gameShip].name + ' Life ' + (i + 1) + '</title>' +
                                                          skin +
                                                          '<g><path fill="' + shipColor + '" d="m12 3c0 1.7-0.5 3-1 3-0.6 0-1 1.2-1 2.8 0 1.6-0.8 3.3-2 4.2-1.1 0.8-2 2.3-2 3.3 0 0.9-0.4 1.7-1 1.7-0.6 0-1-2.3-1-5 0-2.8-0.4-5-1-5-0.6 0-1 0.9-1 2 0 1.1-0.4 2-1 2-0.6 0-1 3.7-1 9 0 5 0.3 9 0.8 9 0.4 0 1.4-0.9 2.2-2 0.8-1.1 1.8-2 2.3-2 0.4 0 0.7 0.9 0.7 2q0 2 2 2c1.1 0 2-0.5 2-1 0-0.5 1.6-1 3.5-1 1.9 0 3.5 0.5 3.5 1 0 0.5 0.9 1 2 1q2 0 2-2c0-1.1 0.3-2 0.8-2 0.4 0 1.4 0.9 2.2 2 0.8 1.1 1.8 2 2.3 2 0.4 0 0.7-4 0.7-9 0-5.3-0.4-9-1-9-0.5 0-1-0.9-1-2 0-1.1-0.5-2-1-2-0.5 0-1 2.3-1 5 0 2.8-0.5 5-1 5-0.5 0-1-0.8-1-1.7 0-1-0.9-2.5-2-3.3-1.2-0.9-2-2.6-2-4.3 0-1.5-0.5-2.7-1-2.7-0.5 0-1-1.3-1-3q0-3-1.5-3-1.5 0-1.5 3z"/>' +
                                                          '<path fill="#7b797b" d="m10.3 16.6c-1.3 1.3-2.3 2.8-2.3 3.4 0 0.5 1.1 2.1 2.5 3.5 1.4 1.4 2.7 2.5 3 2.5 0.3 0 1.7-1.1 3-2.5 1.4-1.4 2.5-3 2.5-3.5 0-0.6-1.1-2.1-2.5-3.5-1.4-1.4-2.8-2.5-3.3-2.4-0.4 0-1.7 1.1-3 2.5z"/></g></svg>';
    }
    document.getElementById ("lifesHud").innerHTML += ' ';
}

function speedHud (speed)
{
    var speedHud = document.getElementById ("speedHud"),
        speedElements = speedHud.getElementsByClassName ("speed");

    for (var i = 0; i < speedElements.length; i++)
    {
        if (i <= speed) speedElements [i].setAttribute ("class", "speed active");
        else speedElements [i].setAttribute ("class", "speed");
    }
}

function meterHud (speed)
{
    var speedHud = document.getElementById ("speedHud"),
        meterHud = speedHud.getElementById ("meterHud"),
        kphElements = speedHud.getElementsByClassName ("kph");

    meterHud.setAttribute ("class", "speed" + speed);
    for (var i = 0; i < kphElements.length; i++)
    {
        if (i == speed) kphElements [i].setAttribute ("class", "kph active");
        else kphElements [i].setAttribute ("class", "kph");
    }
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
        function ()
        {
            document.getElementById (hud + "Hud").style.backgroundColor = "#52AE4A";
        },
        250
    );
}

function mapHud (itemClass, x, y, degrees)
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
        mapItem.style.transform = 'rotate(' + (degrees - 45) + 'deg)';
    }
    mapItem.style.left = (x / 29 + offSetX) + "px";
    mapItem.style.top = (y / 29 + offSetY) + "px";
    mapHud.appendChild (mapItem, mapHud.childNodes [0]);
}

function gameModeHud (gameMode)
{
    $("#mode").addClass ("change");
    var activeMode = gameModes.findIndex (mode => mode.active == true);
    setTimeout
    (
        function ()
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

function changeTab (newTab)
{
    if (gameTab != newTab)
    {
        $('#' + gameTab).removeClass ("active");
        $('#' + newTab).addClass ("active");
        $('#' + gameTab + 'Tab-' + gameControl).removeClass ("active");
        $('#' + gameTab + 'Tab-' + gameControl).addClass ("unactive");
        if ($('#' + newTab + 'Tab-' + gameControl).hasClass ("toggle")) $('#' + newTab + 'Tab-' + gameControl).removeClass ("toggle");
        else if ($('#' + newTab + 'Tab-' + gameControl).hasClass ("unactive")) $('#' + newTab + 'Tab-' + gameControl).removeClass ("unactive");
        $('#' + newTab + 'Tab-' + gameControl).addClass ("active");
        gameTab = newTab;
    }
}