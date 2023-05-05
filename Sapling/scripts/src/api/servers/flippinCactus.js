import { world, Vector } from '@minecraft/server'
import { Core } from 'src/sapling.js'

const { getData } = Core.NBT;

world.events.beforeItemUseOn.subscribe(cactus => {
    const { item } = cactus;
    if (item.typeId != 'minecraft:cactus' || !getData('flippinCactus')) return;
    cactus.cancel = true;
    input(cactus)
})

function input (cactus) {
    // Set Config Values
    const block = cactus.source.getBlockFromViewDirection(), data = block.typeId.replace('minecraft:','');
    const LIST = [
        'piston','sticky_piston','observer',
        'dropper','dispenser','hopper',
        'unpowered_repeater','powered_repeater',
        'unpowered_comparator','powered_comparator'
    ], LIST2 = [
        'piston','sticky_piston',
        'observer','dropper','dispenser'
    ]
    if (!LIST.includes(data)) return;
    // Replace Function
    if (LIST2.includes(data)) return replace(block,data);
    else if (['unpowered_repeater','powered_repeater'].includes(data)) {
        const GETS = {
            dir: block.permutation.getProperty('direction'),
            bit: block.permutation.getProperty('repeater_delay')
        }
        const { x, y, z } = block;
        if (GETS.dir == 0) return block.dimension.runCommandAsync(`structure load repeater:bit${GETS.bit} ${x} ${y} ${z} 90_degrees`);
        else if (GETS.dir == 1) return block.dimension.runCommandAsync(`structure load repeater:bit${GETS.bit} ${x} ${y} ${z} 180_degrees`);
        else if (GETS.dir == 2) return block.dimension.runCommandAsync(`structure load repeater:bit${GETS.bit} ${x} ${y} ${z} 270_degrees`);
        else if (GETS.dir == 3) return block.dimension.runCommandAsync(`structure load repeater:bit${GETS.bit} ${x} ${y} ${z} 0_degrees`);
    } else if (['unpowered_comparator','powered_comparator'].includes(data)) {
        const GETS = {
            dir: block.permutation.getProperty('direction'),
            bit: block.permutation.getProperty('output_subtract_bit')
        }
        const { x, y, z } = block;
        if (GETS.dir == 0) return block.dimension.runCommandAsync(`structure load comparator:${GETS.bit} ${x} ${y} ${z} 90_degrees`);
        else if (GETS.dir == 1) return block.dimension.runCommandAsync(`structure load comparator:${GETS.bit} ${x} ${y} ${z} 180_degrees`);
        else if (GETS.dir == 2) return block.dimension.runCommandAsync(`structure load comparator:${GETS.bit} ${x} ${y} ${z} 270_degrees`);
        else if (GETS.dir == 3) return block.dimension.runCommandAsync(`structure load comparator:${GETS.bit} ${x} ${y} ${z} 0_degrees`);
    } else if (data == 'hopper') {
        const { x, y, z } = block;
        const direction = block.permutation.getProperty('facing_direction');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        if (direction == 0) return block.dimension.runCommandAsync(`structure load ${data}:north ${x} ${y} ${z}`);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            else if (direction == 2) return block.dimension.runCommandAsync(`structure load ${data}:south ${x} ${y} ${z}`);
        else if (direction == 3) return block.dimension.runCommandAsync(`structure load ${data}:weast ${x} ${y} ${z}`);
        else if (direction == 4) return block.dimension.runCommandAsync(`structure load ${data}:east ${x} ${y} ${z}`);
        else if (direction == 5) return block.dimension.runCommandAsync(`structure load ${data}:down ${x} ${y} ${z}`);
    }
}

function replace(block,data) {
    const { x, y, z } = block;
    const direction = block.permutation.getProperty('facing_direction');
    if (direction == 2) return block.dimension.runCommandAsync(`structure load ${data}:up ${x} ${y} ${z}`);
    else if (direction == 0) return block.dimension.runCommandAsync(`structure load ${data}:north ${x} ${y} ${z}`);
    else if (direction == 1) return block.dimension.runCommandAsync(`structure load ${data}:weast ${x} ${y} ${z}`);
    else if (direction == 4) return block.dimension.runCommandAsync(`structure load ${data}:south ${x} ${y} ${z}`);
    else if (direction == 3) return block.dimension.runCommandAsync(`structure load ${data}:east ${x} ${y} ${z}`);
    else if (direction == 5) return block.dimension.runCommandAsync(`structure load ${data}:down ${x} ${y} ${z}`);
}