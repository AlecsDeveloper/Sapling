import { system } from '@minecraft/server'
import { Core } from 'src/sapling.js'

const { CommandPackage } = Core;
CommandPackage.Register({ name: 'player' });
const { player } = CommandPackage.Collection;

////////////////* fakeplayer *////////////////
import { Client } from 'src/api/players.js'
let PLAYERS = [];


// Basics
player.Builder({
    name: 'spawn',
    server: true,
    usage: ' optional? <creative/survival>',
    run: (client, ev, event) => Client.Connect(PLAYERS,ev[0],client,event,ev[1])
});

player.Builder({
    name: 'kill',
    server: true,
    usage:'',
    run: (client, ev, event) => Client.Disconnect(PLAYERS,ev[0],client,event)
});

player.Builder({
    name: 'respawn',
    server: true,
    usage: '',
    run: (client, ev, event) => Client.Actions(PLAYERS,ev[0],client,'respawn')
});

player.Builder({
    name: 'tp',
    server: true,
    usage: '',
    run: (client, ev, event) => Client.Actions(PLAYERS,ev[0],client,'tp')
});

player.Builder({
    name: 'rotate',
    server: true,
    usage: 'optional? <0-360>',
    run: (client, ev, event) => Client.Actions(PLAYERS,ev[0],client,'rotate',ev[1])
});



// Actions
player.Builder({
    name: 'attack',
    server: true,
    usage: '',
    run: (client, ev, event) => Client.Actions(PLAYERS,ev[0],client,'attack')
});

player.Builder({
    name: 'jump',
    server: true,
    usage: '',
    run: (client, ev, event) => Client.Actions(PLAYERS,ev[0],client,'jump')
});

player.Builder({
    name: 'shift',
    server: true,
    usage: '',
    run: (client, ev, event) => Client.Actions(PLAYERS,ev[0],client,'shift')
});

player.Builder({
    name: 'use',
    server: true,
    usage: '<0-9>',
    run: (client, ev, event) => Client.Actions(PLAYERS,ev[0],client,'use',ev[2])
});

player.Builder({
    name: 'interact',
    server: true,
    usage: '',
    run: (client, ev, event) => Client.Actions(PLAYERS,ev[0],client,'interact')
});

// Repeat
player.Builder({
    name: 'repeat',
    server: true,
    usage: '<jump/attack/interact/use>',
    run: (client, ev, event) => Client.Actions(PLAYERS,ev[0],client,'repeat',ev[2])
});

player.Builder({
    name: 'stop',
    server: true,
    usage: '',
    run: (client, ev, event) => Client.Actions(PLAYERS,ev[0],client,'stop')
});

system.runInterval(() => {
    if (PLAYERS.length == 0) return;
    PLAYERS.forEach(x => x.Actions.forEach(z => {
        Client.Actions(PLAYERS,x.Player.name,Core.World.overworld,z)
    }));
},2)