import { world, ItemStack } from '@minecraft/server'
import { Core } from 'src/sapling.js'
const { NBT, World } = Core;


function toolChanger(player,tool) {
    try {
        const inv = player.getComponent('inventory').container;
        for (let x = 0; x < 9; x++) {
            const item = inv.getItem(x);
            if (item.typeId.includes(tool)) return player.selectedSlot = x;
        }
    } catch {}
}


world.events.entityHit.subscribe(ev => {
    if (!NBT.getData('toolChanger')) return;
    const { entity, hitBlock } = ev;
    if (entity.typeId != 'minecraft:player' || !hitBlock) return;
    // Conditions
    const tags = hitBlock.getTags();
    if (tags.includes('dirt')) return toolChanger(entity,'_shovel');
    else if (tags.includes('stone')) return toolChanger(entity,'_pickaxe');
    else if (tags.includes('wood')) return toolChanger(entity,'_axe');
});