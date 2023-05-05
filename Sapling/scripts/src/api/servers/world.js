import { 
    system, world, MinecraftBlockTypes,
    ItemStack, ItemTypes
} from '@minecraft/server'
import { Core } from 'src/sapling.js'

const { NBT, World } = Core

system.runInterval(() => {
    World.runCmd('function Sapling/database');
    // features
    NBT.PropIs({
        property: 'endPortalGBD',
        value: true,
        callback: () => World.runCmd('function Sapling/gbd')
    });
    NBT.PropIs({
        property: 'anvilBedrockBreaker',
        value: true,
        callback: () => World.runCmd('function Sapling/bedrock/anvil')
    });
    NBT.PropIs({
        property: 'pigmansFarmWarts',
        value: true,
        callback: () => World.runCmd('execute at @e[type=zombie_pigman] if block ~~1~ nether_wart ["age":3] run setblock ~~1~ nether_wart [] destroy')
    });
},3)

world.events.entityDie.subscribe(ev => {
    const { deadEntity, damageSource } = ev;
    // features
    NBT.PropIs({
        property: 'renewableSoulSand',
        value: true,
        callback: () => {
            if (!['minecraft:zombie','minecraft:skeleton'].includes(deadEntity.typeId)) return World.print(deadEntity.typeId)
            else if (damageSource.cause != 'fireTick') return World.print(damageSource.cause)
            // function
            deadEntity.runCommandAsync('execute if block ~~-1~ sand run setblock ~~-1~ soul_sand [] replace');
        }
    })
});

world.events.beforeItemUseOn.subscribe(ev => {
    const { item, source } = ev;
    // features
    NBT.PropIs({
        property: 'cauldronBedrockBreaker',
        value: true,
        callback: () => {
            const block = source.getBlockFromViewDirection();
            if (item.typeId != 'minecraft:powder_snow_bucket') return;
            else if (block.typeId != 'minecraft:cauldron') return
            // function
            ev.cancel = true;
            source.runCommandAsync(`execute positioned ${block.x} ${block.y} ${block.z} run function Sapling/bedrock/cauldron`)
            const inv = source.getComponent('inventory').container;
            inv.setItem(source.selectedSlot,new ItemStack(ItemTypes.get('minecraft:bucket'),1));
        }
    });
});