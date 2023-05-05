import {
    world, system,
    ItemStack, ItemTypes
} from '@minecraft/server'
import { Core } from 'src/sapling.js'
const { NBT, World } = Core;


system.runInterval(() => {
    if (!NBT.getData('autoCrafting')) return;
    const minecarts = world.getDimension('overworld').getEntities({ type: 'hopper_minecart' });
    // evaluation
    for (let cart of minecarts) CRAFTING(cart);
});

function CRAFTING(minecart) {
    const inv = minecart.getComponent('inventory').container,
        loc = minecart.location;
    // returns  
    if (
        minecart.dimension.getBlock({ x: loc.x, y: loc.y-1, z: loc.z }).typeId != 'minecraft:crafting_table' ||
        minecart.dimension.getBlock({ x: loc.x, y: loc.y-2, z: loc.z }).typeId != 'minecraft:hopper'
    ) return;
    // evaluation
    let names = [], items = { count: 0, data: {} }, txt = '';
    for (let x = 0; x < 5; x++) {
        let slot = inv.getItem(x);
        if (slot == undefined);
        else if (!names.includes(slot.typeId)) {
            names.push(slot.typeId);
            items.data[slot.typeId] = slot.amount;
            items.count++;
        }
        else items.data[slot.typeId] += slot.amount;
    }
    // parser
    const output = minecart.dimension.getBlock({ x: loc.x, y: loc.y-2, z: loc.z });
    PARSER(items,output,minecart);
}

function PARSER (items,output,minecart) {
    const { count, data } = items;
    const recipe = (item,count) => {
        output.getComponent('inventory').container.addItem(new ItemStack(ItemTypes.get(item),count));
        minecart.getComponent('inventory').container.clearAll();
    }
    if (count == 0) return;
    // Recipe Setter
    if (count == 1) {
        // 1 item recipes
        if (data['minecraft:slime'] == 1) return recipe('minecraft:slime_ball',9);
        else if (data['minecraft:slime_ball'] == 9) return recipe('minecraft:slime',1);
        else if (data['minecraft:gold_nugget'] == 9) return recipe('minecraft:gold_ingot',1);
        else if (data['minecraft:gold_ingot'] == 9) return recipe('minecraft:gold_block',1);
        else if (data['minecraft:iron_nugget'] == 9) return recipe('minecraft:iron_ingot',1);
        else if (data['minecraft:iron_ingot'] == 9) return recipe('minecraft:iron_block',1);
        else if (data['minecraft:redstone'] == 9) return recipe('minecraft:redstone_block',1);
        else if (data['minecraft:emerald'] == 9) return recipe('minecraft:emerald_block',1);
        else if (data['minecraft:planks'] == 8) return recipe('minecraft:chest',1);
        else if (data['minecraft:ice'] == 9) return recipe('minecraft:packed_ice',1);
        else if (data['minecraft:packed_ice'] == 9) return recipe('minecraft:blue_ice',1);
    } else if (count == 2) {
        // 2 items recipes
        if (
            data['minecraft:piston'] == 1 &&
            data['minecraft:slime_ball'] == 1
        ) return recipe('minecraft:sticky_piston',1);
        else if (
            data['minecraft:chest'] == 1 &&
            data['minecraft:iron_ingot'] == 5 
        ) return recipe('minecraft:hopper',1);
        else if (
            data['minecraft:sand'] == 5 &&
            data['minecraft:gunpowder'] == 4 
        ) return recipe('minecraft:tnt',1);
        else if (
            data['minecraft:cobblestone'] == 7 &&
            data['minecraft:redstone'] == 1
        ) return recipe('minecraft:dropper',1);
        else if (
            data['minecraft:shulker_shell'] == 2 &&
            data['minecraft:chest'] == 1
        ) return recipe('minecraft:undyed_shulker_box',1);
    } else if (count == 3) {
        // 3 items recipes
        if (
            data['minecraft:cobblestone'] == 6 && 
            data['minecraft:redstone'] == 2 && 
            data['minecraft:quartz'] == 1
        ) return recipe('minecraft:observer',1);
        else if (
            data['minecraft:stone'] == 3 && 
            data['minecraft:redstone_torch'] == 2 && 
            data['minecraft:redstone'] == 1
        ) return recipe('minecraft:repeater',1);
        else if (
            data['minecraft:stone'] == 3 && 
            data['minecraft:redstone_torch'] == 3 && 
            data['minecraft:quartz'] == 1
        ) return recipe('minecraft:comparator',1);
        else if (
            data['minecraft:cobblestone'] == 7 && 
            data['minecraft:redstone'] == 1 && 
            data['minecraft:bow'] == 1
        ) return recipe('minecraft:dispenser',1);
        
    } else if (count == 4) {
        // 4 items recipes
        if (
            data['minecraft:cobblestone'] == 4 && 
            data['minecraft:planks'] == 3 && 
            data['minecraft:redstone'] == 1 && 
            data['minecraft:iron_ingot'] == 1
        ) return recipe('minecraft:piston',1);
    }
}