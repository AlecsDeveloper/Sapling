import { world } from '@minecraft/server'
import { Core } from 'src/sapling.js'

const { NBT } = Core;


// TNT drops nbts
NBT.Create({
    name: 'tntDropAllBlocks',
    type: 'boolean'
});
NBT.Create({
    name: 'tntDropIce',
    type: 'boolean'
});
NBT.Create({
    name: 'tntDuping',
    type: 'boolean'
});
NBT.Create({
    name: 'tntNotExplodes',
    type: 'boolean'
});


// Entities nbts
NBT.Create({
    name: 'guardianDropSponges',
    type: 'boolean'
});
NBT.Create({
    name: 'ghastDropQuartz',
    type: 'boolean'
});
NBT.Create({
    name: 'huskDropSand',
    type: 'boolean'
});
NBT.Create({
    name: 'silverfishDropGravel',
    type: 'boolean'
});
NBT.Create({
    name: 'pigmansFarmWarts',
    type: 'boolean'
})


// World nbts
NBT.Create({
    name: 'endPortalGBD',
    type: 'boolean'
});
NBT.Create({
    name: 'anvilBedrockBreaker',
    type: 'boolean'
});
NBT.Create({
    name: 'renewableSoulSand',
    type: 'boolean'
});
NBT.Create({
    name: 'cauldronBedrockBreaker',
    type: 'boolean'
})


// Tweaks nbts
NBT.Create({
    name: 'autoCrafting',
    type: 'boolean'
});
NBT.Create({
    name: 'flippinCactus',
    type: 'boolean'
});
NBT.Create({
    name: 'toolChanger',
    type: 'boolean'
});

world.events.worldInitialize.subscribe(ev => NBT.Reader(ev));