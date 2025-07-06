var express = require ('express');
var fs = require ('fs');
const {createServer} = require ('https');
const {createServerFrom} = require ('wss');
const port = 4000;
var app = express ();
var debug = process.argv [2] == 'debug' ? true : false;
var players = [];
var gameShips = [];
var startPoints =
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
];

const https = createServer
(
    {
        cert: fs.readFileSync ('fullchain.pem'),
        key: fs.readFileSync ('privkey.pem')
    },
    app
);

const wss = createServerFrom
(
    https,
    function connectionListener (wss)
    {
        for (var playerId = 0; players.findIndex (player => player.id == playerId) > -1; playerId++);
        players.push
        (
            {
                id: playerId,
                name: null,
                status: 0
            }
        );
        const json =
        {
            action: 'open',
            player_id: playerId
        };
        wss.send (JSON.stringify (json));
        if (!debug) debugging ('WebSocket connection opened with client (Id: ' + playerId + ')');
        wss.on
        (
            'message',
            (response) =>
            {
                var data = JSON.parse (response), error = null;

                if (wss.readyState === 1)
                {
                    var playersId = players.findIndex (player => player.id == data.player_id);
                    if (data.action == 'menu')
                    {
                        if (players [playersId].status == 2)
                        {
                            setTimeout
                            (
                                () =>
                                {
                                    gameShips.splice (gameShips.findIndex (ship => ship.name == players [playersId].name), 1);
                                    startPoints [startPoints.findIndex (startPoint => startPoint.ship == players [playersId].name)].ship = null;
                                    players [playersId].name = null;
                                    players [playersId].status = 0;
                                },
                                1000
                            );
                        }
                        else players [playersId].status = 0;
                        if (!debug) debugging ('Client exit game (Id: ' + playersId + ')');
                    }
                    else if (data.action == 'connect')
                    {
                        players [playersId].status = 1;
                        if (!debug) debugging ('Client starting game (Id: ' + playersId + ')');
                        data.action = 'connected';
                    }
                    else if (data.action == 'ship')
                    {
                        if (gameShips.findIndex (ship => ship.name == data.name) > -1) error = "name";
                        else if (gameShips.findIndex (ship => ship.color == data.color) > -1)
                        {
                            if (data.color.substring (0, 4) == "skin") error = "skin";
                            else error = "color";
                        }
                        else
                        {
                            players [playersId].name = data.name;
                            players [playersId].status = 2;
                            startPoints [startPoints.findIndex (startPoint => startPoint.ship == null)].ship = data.name;
                            gameShips.push
                            (
                                {
                                    name: data.name,
                                    color: data.color,
                                    x: startPoints [startPoints.findIndex (startPoint => startPoint.ship == data.name)].x,
                                    y: startPoints [startPoints.findIndex (startPoint => startPoint.ship == data.name)].y,
                                    z: startPoints [startPoints.findIndex (startPoint => startPoint.ship == data.name)].z,
                                    heading: 0,
                                    moveSpeed: 0,
                                    strafeSpeed: 0,
                                    fire: false,
                                    weapon: 0,
                                    weapons:
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
                                    ],
                                    engine1: 0,
                                    engine2: 0,
                                    engine1inc: true,
                                    engine2inc: true,
                                    shadowOffset: 1,
                                    nameOffset: 5,
                                    lifes: 5,
                                    life: 100,
                                    fuel: 100,
                                    ammo: 100,
                                    shield: 0,
                                    score: 0,
                                    gunStatus: true,
                                    wing1Status: true,
                                    wing2Status: true,
                                    engine1Status: true,
                                    engine2Status: true,
                                    time: Date.now ()
                                }
                            );
                            if (!debug) debugging ('Client playing game (Id: ' + playersId + ')');
                        }
                    }
                    else if (data.action == 'ship_ships')
                    {
                        var gameShip = gameShips.findIndex (ship => ship.name == data.name);
                        if (gameShip > -1)
                        {
                            gameShips [gameShip].x = data.x;
                            gameShips [gameShip].y = data.y;
                            gameShips [gameShip].z = data.z;
                            gameShips [gameShip].heading = data.heading;
                            gameShips [gameShip].moveSpeed = data.moveSpeed;
                            gameShips [gameShip].strafeSpeed = data.strafeSpeed;
                            gameShips [gameShip].fire = data.fire;
                            gameShips [gameShip].weapon = data.weapon;
                            gameShips [gameShip].weapons = data.weapons;
                            gameShips [gameShip].engine1 = data.engine1;
                            gameShips [gameShip].engine2 = data.engine2;
                            gameShips [gameShip].engine1inc = data.engine1inc;
                            gameShips [gameShip].engine2inc = data.engine2inc;
                            gameShips [gameShip].shadowOffset = data.shadowOffset;
                            gameShips [gameShip].nameOffset = data.nameOffset;
                            gameShips [gameShip].lifes = data.lifes;
                            gameShips [gameShip].life = data.life;
                            gameShips [gameShip].fuel = data.fuel;
                            gameShips [gameShip].ammo = data.ammo;
                            gameShips [gameShip].shield = data.shield;
                            gameShips [gameShip].score = data.score;
                            gameShips [gameShip].gunStatus = data.gunStatus;
                            gameShips [gameShip].wing1Status = data.wing1Status;
                            gameShips [gameShip].wing2Status = data.wing2Status;
                            gameShips [gameShip].engine1Status = data.engine1Status;
                            gameShips [gameShip].engine2Status = data.engine2Status;
                            gameShips [gameShip].time = Date.now ();
                        }
                    }
                    const json =
                    {
                        action: data.action,
                        error: error,
                        start_points: startPoints,
                        game_ships: gameShips,
                        players_connecting: players.filter (player => player.status == 1).length
                    };
                    wss.send (JSON.stringify (json));
                }
            }
        );
    
        wss.on
        (
            'error',
            (response) =>
            {
                var playersId = players.findIndex (player => player.id == playerId);
                if (players [playersId].status == 2)
                {
                    gameShips.splice (gameShips.findIndex (ship => ship.name == players [playersId].name), 1);
                    startPoints [startPoints.findIndex (startPoint => startPoint.ship == players [playersId].name)].ship = null;
                }
                players.splice (playersId, 1);
                if (!debug) debugging (response);
            }
        );

        wss.on
        (
            'close',
            (response) =>
            {
                var playersId = players.findIndex (player => player.id == playerId);
                if (players [playersId].status == 2)
                {
                    gameShips.splice (gameShips.findIndex (ship => ship.name == players [playersId].name), 1);
                    startPoints [startPoints.findIndex (startPoint => startPoint.ship == players [playersId].name)].ship = null;
                }
                players.splice (playersId, 1);
                if (!debug) debugging ('WebSocket connection closed with client (Id: ' + playerId + ')');
            }
        );
    }
);

https.listen
(
    port,
    function ()
    {
        if (!debug) debugging ('Secure WebSocket server listening on port ' + port + '...');
        else setInterval (debugging, 100);
    }
);

function sendShips (sender)
{
    wss.clients.forEach (function (client)
    {
        if (client !== sender && client.readyState === 1)
        {
            const json =
            {
                action: "ships",
                game_ships: gameShips
            };
            client.send (JSON.stringify (json));
        }
    });
}

function clearUnactive ()
{
    for (var gameShip in gameShips)
    {
        if (gameShips [gameShip].lifes == 0 || Date.now () - gameShips [gameShip].time > 1000)
        {
            startPoints [startPoints.findIndex (startPoint => startPoint.ship == gameShips [gameShip].name)].ship = null;
            gameShips.splice (gameShip, 1);
        }
    }
}

function debugging (text)
{
    if (text !== undefined)
    {
        const date = new Date ();
        console.log (date.toLocaleString () + ': ' + text);
    }
    else
    {
        console.clear ();
        console.log ('startPoints (' + startPoints.length + ') =', startPoints);
        console.log ('players (' + players.length + ') =', players);
        gameShipObj = [];
        for (var gameShip in gameShips)
        {
            gameShipObj.push
            (
                {
                    name: gameShips [gameShip].name,
                    color: gameShips [gameShip].color,
                    lifes: gameShips [gameShip].lifes,
                    time: Date.now () - gameShips [gameShip].time
                }
            );
        }
        console.log ('gameShips (' + gameShips.length + ') =', gameShipObj);
    }
}