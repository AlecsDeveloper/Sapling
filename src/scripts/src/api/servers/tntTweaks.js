import { world, system, ItemStack, ItemTypes, MinecraftBlockTypes  } from '@minecraft/server'
import { Core } from 'src/sapling.js'

const { NBT, World } = Core;
const DROPS = {
    'stone': 'minecraft:cobblestone',
    'grass': 'minecraft:dirt',
    'grass_path': 'minecraft:dirt',
    'farmland': 'minecraft:dirt',
    'snow_layer': 'minecraft:snowball',
    'snow': 'minecraft:snowball'
}


let globals = {
    dim: {},
    blocks: [],
    datas: []
};

// TNT Drops
world.events.beforeExplosion.subscribe(ev => {
    // tntNotExplode
    if (NBT.getData('tntNotExplodes')) return ev.cancel = true;
    // tntDropAllBlocks
    let blocks = ev.getImpactedBlocks(), tnts = [], locals = [], locals2 = [];
    blocks.forEach(tnt => {
        // Location 
        const loc = {
            x: Math.floor(tnt.x),
            y: Math.floor(tnt.y),
            z: Math.floor(tnt.z)
        }, block = ev.dimension.getBlock(loc);
        ///////////////////////////////////////
        // TNT normal 
        if (block.typeId == 'minecraft:tnt') return tnts.push(loc);
        // TNT Ice
        const ice = NBT.getData('tntDropIce');
        if (['minecraft:ice','minecraft:packed_ice','minecraft:blue_ice'].includes(block.typeId) && !ice) return tnts.push(loc);
        else if (['minecraft:ice','minecraft:packed_ice','minecraft:blue_ice'].includes(block.typeId) && ice) {
            const item = new ItemStack(ItemTypes.get(block.typeId),1);
            tnts.push(loc);
            return ev.dimension.spawnItem(item,loc);
        }
        // TNT Drops
        if (!NBT.getData('tntDropAllBlocks')) return tnts.push(loc);
        else if (NBT.getData('tntDropAllBlocks')) {
            // Data blocks
            if (
                block.hasTag('wood') ||
                ['minecraft:concrete','minecraft:concrete_powder','minecraft:wool','minecraft:stained_hardened_clay'].includes(block.typeId)
            ) return locals2.push(loc)
            // Air blocks
            if ([
                'stained_glass','leaves','leaves2',
                'azalea_leaves','azalea_leaves_flowered',
                'mangrove_leaves','tallgrass','glass',
                'fire','soul_fire'
            ].includes(block.typeId.replace('minecraft:',''))) return tnts.push(loc)
            // Other blocks 
            const drop = DROPS[block.typeId.replace('minecraft:','')] || block.typeId;
            const item = new ItemStack(ItemTypes.get(drop),1);
            locals.push(loc);
            return ev.dimension.spawnItem(item,loc);
        }

    });
    globals.dim = ev.dimension;
    globals.blocks = locals;
    globals.datas = locals2;
    ev.setImpactedBlocks(tnts);
});

system.runInterval(tnt => {
    globals.datas.forEach(loc => {
        const { x, y, z } = loc;
        globals.dim.runCommandAsync(`setblock ${x} ${y} ${z} air [] destroy`);
    }); globals.datas = [];
    globals.blocks.forEach(block => {
        globals.dim.getBlock(block).setType(MinecraftBlockTypes.air);
    }); globals.blocks = [];
},1)