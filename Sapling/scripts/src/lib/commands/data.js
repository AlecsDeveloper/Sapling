import { world, system } from '@minecraft/server'
import { Core } from 'src/sapling.js'
const { CommandPackage, World } = Core;
const counter = {
    spawn: false,
    spawnData: {},
    death: false,
    deathData: {},
    item: false,
    itemData: {}
}
CommandPackage.Register({ name: 'data' });
const { data } = CommandPackage.Collection;


// prof
data.Builder({
    name: 'prof',
    usage: '',
    modules: ['world'],
    run: (client, ev) => {
        World.print('§7Evaluating world data...§r')
        const DATA = {
            tps: 20,
            lastTick: Date.now(),
            timeArray: [],
            entities: 0,
        }
        const runTime = system.runInterval(() => {
            if (DATA.timeArray.length == 20) DATA.timeArray.shift();
            DATA.timeArray.push(Math.round(1000 / (Date.now() - DATA.lastTick) * 100) / 100);
            DATA.tps = DATA.timeArray.reduce((a,b) => a + b) / DATA.timeArray.length;
            DATA.lastTick = Date.now();
        }); system.runTimeout(() => {
            system.clearRun(runTime);
            DATA.tps = Math.floor(DATA.tps);
            for (let x of World.overworld.getEntities()) DATA.entities++;
            World.print(`TPS: §${DATA.tps < 20 ? 'c' : 'a'}${DATA.tps > 20 ? 20 : DATA.tps}§r Entities: §a${DATA.entities}`)
        },100);
    }
});

// counters
data.Builder({
    name: 'spawnCounter',
    modules: ['counter'],
    usage: '<run/stop/get/clear>',
    run: (client, ev) => {
        // returns
        if (!['run','stop','get','clear'].includes(ev[0])) return World.ephemeral('§cInvalid method§r',client);
        else if (ev[0] == 'run' && counter.spawn) return World.ephemeral('§7spawnCounter is already enabled§r',client);
        else if (['stop','get','clear'].includes(ev[0]) && !counter.spawn) return World.ephemeral('§8spawnCounter is not enabled§r',client);
        // scripts
        if (ev[0] == 'run') {
            counter.spawn = true;
            World.ephemeral('§7Mob spawn count enabled...§r',client)
        } else if (ev[0] == 'stop') {
            counter.spawn = false;
            counter.spawnData = {};
            World.ephemeral('§8Mob spawn count disabled...§r',client)
        }
        else if (ev[0] == 'get') {
            let txt = '§2Spawn counter logs:§r';
            for (let x in counter.spawnData) txt += `\n§r - ${x}: §a${counter.spawnData[x]}§r`;
            if (!txt.includes('\n')) return World.ephemeral('§bNo stored data found§r',client);
            World.ephemeral(txt.trim(),client);
        }
        else if (ev[0] == 'clear') {
            counter.spawnData = {};
            World.ephemeral('§dSpawn counter erased§r',client)
        }
    }
});
data.Builder({
    name: 'deathCounter',
    modules: ['counter'],
    usage: '<run/stop/get/clear>',
    run: (client, ev) => {
        // returns
        if (!['run','stop','get','clear'].includes(ev[0])) return World.ephemeral('§cInvalid method§r',client);
        else if (ev[0] == 'run' && counter.death) return World.ephemeral('§7deathCounter is already enabled§r',client);
        else if (['stop','get','clear'].includes(ev[0]) && !counter.death) return World.ephemeral('§8deathCounter is not enabled§r',client);
        // scripts
        if (ev[0] == 'run') {
            counter.death = true;
            World.ephemeral('§7Mob death count enabled...§r',client)
        } else if (ev[0] == 'stop') {
            counter.death = false;
            counter.deathData = {};
            World.ephemeral('§8Mob death count disabled...§r',client)
        }
        else if (ev[0] == 'get') {
            let txt = '§2Death counter logs:§r';
            for (let x in counter.deathData) txt += `\n§r - ${x}: §a${counter.deathData[x]}§r`;
            if (!txt.includes('\n')) return World.ephemeral('§bNo stored data found§r',client);
            World.ephemeral(txt.trim(),client);
        }
        else if (ev[0] == 'clear') {
            counter.deathData = {};
            World.ephemeral('§dDeath counter erased§r',client)
        }
    }
});
data.Builder({
    name: 'itemCounter',
    modules: ['counter'],
    usage: '<run/stop/get/clear>',
    run: (client, ev) => {
        // returns
        if (!['run','stop','get','clear'].includes(ev[0])) return World.ephemeral('§cInvalid method§r',client);
        else if (ev[0] == 'run' && counter.item) return World.ephemeral('§7itemCounter is already enabled§r',client);
        else if (['stop','get','clear'].includes(ev[0]) && !counter.item) return World.ephemeral('§8itemCounter is not enabled§r',client);
        // scripts
        if (ev[0] == 'run') {
            counter.item = true;
            World.ephemeral('§7item counter enabled...§r',client)
        } else if (ev[0] == 'stop') {
            counter.item = false;
            counter.itemData = {};
            World.ephemeral('§8item counter disabled...§r',client)
        }
        else if (ev[0] == 'get') {
            let txt = '§2Item counter logs:§r';
            for (let x in counter.itemData) txt += `\n§r - ${x}: §a${counter.itemData[x]}§r`;
            if (!txt.includes('\n')) return World.ephemeral('§bNo stored data found§r',client);
            World.ephemeral(txt.trim(),client);
        }
        else if (ev[0] == 'clear') {
            counter.itemData = {};
            World.ephemeral('§dItem counter erased§r',client)
        }
    }
});


///////////////////////////////////////////////////////
world.events.entitySpawn.subscribe(ev => {
    // action
    const id = ev.entity.typeId;
    const item = ev.entity;
    if (
        id == 'minecraft:tnt' ||
        id.includes('minecart') 
    ) return;
    else if (id == 'minecraft:item' && counter.item) {
        const test = item.getComponent('item').itemStack
        if (counter.itemData[test.typeId] == undefined) return counter.itemData[test.typeId] = test.amount;
        else return counter.itemData[test.typeId] += test.amount;
    }
    // sets
    if (!counter.spawn) return;
    else if (counter.spawnData[id] == undefined) counter.spawnData[id] = 1;
    else counter.spawnData[id]++;
});
world.events.entityDie.subscribe(ev => {
    if (!counter.death) return;
    // action
    const id = ev.deadEntity.typeId;
    if (
        id == 'minecraft:tnt' ||
        id.includes('minecart') 
    ) return;
    // sets
    else if (counter.deathData[id] == undefined) counter.deathData[id] = 1;
    else counter.deathData[id]++;
})


///////////////////////////////////////////////////////

system.events.beforeWatchdogTerminate.subscribe(eventData=>eventData.cancel = true);


let modules = [];
data.Builder({
    name: 'help',
    modules: [],
    usage: '<module>',
    modules: [],
    run: (client, ev) => {
        let mods = [], txt = '', cmds = {};
        const { Commands } = data.Collection;
        Commands.forEach(cmd => {
            for (let x of cmd.modules) {
                if (!mods.includes(x)) {
                    mods.push(x);
                    cmds[x] = [];
                    cmds[x].push(`§7 - ${cmd.name} §b${cmd.usage}\n§r`);
                }
                else cmds[x].push(`§7 - ${cmd.name} §b${cmd.usage}\n§r`);
            }
        });
        if ([undefined,'',' '].includes(ev[0])) {
            txt = '§cData modules\n§r'
            mods.forEach(x => txt += `§7 - ${x}\n`);
            World.ephemeral(txt.trim(),client);
       } else if (mods.includes(ev[0])) {
           txt = `§3${ev[0]} commands\n§r`;
           cmds[ev[0]].forEach(x => txt += x);
           World.ephemeral(txt.trim(),client);
       } else World.ephemeral('§cInvalid module§r',client);
    }
});