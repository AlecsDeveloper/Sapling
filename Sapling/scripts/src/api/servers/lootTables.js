import { world } from '@minecraft/server'
import { Core, API } from 'src/sapling.js'

const { NBT } = Core;
const { Item } = API

const TABLES = {
    'guardian': ev => {
        if (!NBT.getData('guardianDropSponges')) return;
        else if (Math.floor(Math.random()*2) == 0) return;
        // Drop
        const mob = ev.deadEntity;
        Item.Spawn({
            dimension: mob.dimension,
            item: 'minecraft:sponge',
            amount: 1,
            location: mob.location
        })
    },
    'ghast': ev => {
        if (!NBT.getData('ghastDropQuartz')) return;
        else if (Math.floor(Math.random()*2) == 0) return;
        // Drop
        const mob = ev.deadEntity, drops = Math.floor(Math.random()*6);
        Item.Spawn({
            dimension: mob.dimension,
            item: 'minecraft:quartz',
            amount: drops == 0 ? 1 : drops,
            location: mob.location
        })
    },
    'husk': ev => {
        if (!NBT.getData('huskDropSand')) return;
        else if (Math.floor(Math.random()*2) == 0) return;
        // Drop
        const mob = ev.deadEntity, drops = Math.floor(Math.random()*4);
        Item.Spawn({
            dimension: mob.dimension,
            item: 'minecraft:sand',
            amount: drops == 0 ? 1 : drops,
            location: mob.location
        })
    },
    'silverfish': ev => {
        if (!NBT.getData('silverfishDropGravel')) return;
        else if (Math.floor(Math.random()*2) == 0) return;
        // Drop
        const mob = ev.deadEntity;
        Item.Spawn({
            dimension: mob.dimension,
            item: 'minecraft:gravel',
            amount: 1,
            location: mob.location
        })
    }
}

world.events.entityDie.subscribe(ev => {
    const id = ev.deadEntity.typeId.replace('minecraft:','')
    if (![
        'guardian','ghast','husk','silverfish'
    ].includes(id)) return;
    TABLES[id](ev)
})