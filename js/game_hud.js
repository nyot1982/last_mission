
function resetHuds ()
{
    if (document.getElementById ("hudsMulti").style.display == "block") changeHuds (false);
    menuShip.speedHud ();
    document.getElementById ("headingHud").style.left = "-371.25px";
    document.getElementById ("zHud").innerHTML = "0 m";
    document.getElementById ("enemiesHud2").style.width = "270px";
    var weaponElements = document.getElementsByClassName ("weaponsHud");
    for (var i = 0; i < weaponElements.length; i++)
    {
        if (i == 0) $(weaponElements [i]).addClass ("active");
        else $(weaponElements [i]).removeClass ("active");
        $(weaponElements [i]).removeClass ("enable");
        $("#fire" + i + "rate").removeClass ("active");
        $("#fire" + i + "power").removeClass ("active");
    }
    document.getElementById ("lifeHud").style.width = "0px";
    document.getElementById ("fuelHud").style.width = "0px";
    document.getElementById ("ammoHud").style.width = "0px";
    document.getElementById ("shieldHud").style.width = "0px";
    if (gameModes.findIndex (mode => mode.active == true) > -1) gameModeHud (-1);
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

function enemiesHud ()
{
    var element = document.getElementById ("enemiesHud2");
    if (enemies != parseInt (element.style.width))
    {
        element.style.width = enemies + "px";
        element.className = "change";
        setTimeout
        (
            () =>
            {
                element.className = "";
            },
            1000
        );
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
        document.getElementById ("hudHeading").innerHTML = '<p><b>ENEMY</b></p><div id="enemiesHud"><div id="enemiesHud2" style="width: 270px;"></div></div><p>&nbsp;</p>';
        document.getElementById ("hudsMulti").style.display = "block";
        document.getElementById ("hudsMulti").innerHTML = "";
    }
    else
    {
        document.getElementById ("hudSpeedAltitude").style.display = "block";
        document.getElementById ("hudWeapons").style.display = "block";
        document.getElementById ("hudEnemy").innerHTML = '<p>&nbsp;</p><p><b>ENEMY</b></p><div id="enemiesHud"><div id="enemiesHud2"></div></div>';
        document.getElementById ("hudVitals").style.display = "block";
        document.getElementById ("hudHeading").innerHTML = '<p><b>HEADING</b></p><div class="turnHud"><div id="headingHud"><div class="e5">W</div><div>|</div><div class="e5">NW</div><div>|</div><div class="e1">N</div><div>|</div><div class="e5">NE</div><div>|</div><div class="e1">E</div><div>|</div><div class="e5">SE</div><div>|</div><div class="e1">S</div><div>|</div><div class="e5">SW</div><div>|</div><div class="e1">W</div><div>|</div><div class="e5">NW</div><div>|</div><div class="e1">N</div><div>|</div><div class="e5">NE</div><div>|</div><div class="e1">E</div><div>|</div><div class="e5">SE</div><div>|</div><div class="e1">S</div><div>|</div><div class="e5">SW</div><div>|</div><div class="e1">W</div><div>|</div><div class="e5">NW</div><div>|</div><div class="e1">N</div><div>|</div><div class="e5">NE</div><div>|</div><div class="e1">E</div></div></div>';
        document.getElementById ("hudsMulti").style.display = "none";
    }
}