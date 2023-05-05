import {
    world, DynamicPropertiesDefinition,
    ItemStack, ItemTypes
} from '@minecraft/server'
import * as GameTest from '@minecraft/server-gametest'


const Core = {
    CommandPackage: {
        Packages: [],
        Collection: {},
        Register: options => {
            Core.CommandPackage.Collection[options.name] = {
                Prefix: './' + options.name,
                Collection: { Commands: [], Names: [] },
                Builder: command => {  
                    const { Commands, Names } = Core.CommandPackage.Collection[options.name].Collection;
                    Commands.push(command);
                    Names.push(command.name);
                }
            }; Core.CommandPackage.Packages.push(options.name);
        },
        Reader: (test, event) => {
            // Get Data
            let msg = test.message.split(' '), { sender } = test;
            const pack = msg[0].replace('./','');
            if (!Core.CommandPackage.Packages.includes(pack)) return;
            test.cancel = true; msg.shift();
            // Invalid Command
            if (!sender.isOp() && pack == 'sapling') return ephemeral('§cYou don\'t have operator permissions§r', sender);
            const { Commands, Names } = Core.CommandPackage.Collection[pack].Collection;
            // Fakeplayer sintaxis
            if (pack == 'player') {
                if (!Names.includes(msg[1]) || [undefined,'',' '].includes(msg[1])) return Core.World.ephemeral('§cInvalid Command§r',sender);
                Commands.forEach(x => {
                    if (x.name != msg[1]) return;
                    msg.slice(1,1);
                    if (x.server) return x.run(sender, msg, event);
                    x.run(sender, msg);
                }); return;
            }
            // Normal Commands
            if (!Names.includes(msg[0]) || [undefined,'',' '].includes(msg[0])) return Core.World.ephemeral('§cInvalid Command§r',sender);
            Commands.forEach(x => {
                if (x.name != msg[0]) return;
                msg.shift();
                if (x.server) return x.run(sender, msg, event);
                x.run(sender, msg);
            })
        }
    },
    World: {
        overworld: world.getDimension('overworld'),
        nether: world.getDimension('nether'),
        theEnd: world.getDimension('the_end'),
        print: msg => Core.World.overworld.runCommandAsync(`tellraw @a {"rawtext":[{"text":"${msg}"}]}`),
        ephemeral: (msg,sender) => sender.runCommandAsync(`tellraw @s {"rawtext":[{"text":"${msg}"}]}`),
        server: server => Core.World.overworld.runCommandAsync(`execute positioned 999999999 200 999999999 run gametest run sapling:${server}`),
        runCmd: cmd => Core.World.overworld.runCommandAsync(cmd)
    },
    NBT: {
        Collection: [],
        Create: options => {
            let { name, type } = options;
            if (name == undefined || !['boolean','number','string'].includes(type)) return;
            Core.NBT.Collection.push(options);
        },
        Reader: event => Core.NBT.Collection.forEach(property => {
            const { name, type } = property;
            const prop = new DynamicPropertiesDefinition();
            if (type == 'boolean') prop.defineBoolean(name);
            else if (type == 'numbef') prop.defineNumber(name);
            else if (type == 'string') prop.defineString(name);
            event.propertyRegistry.registerWorldDynamicProperties(prop);
        }),
        getData: name => world.getDynamicProperty(name),
        setData: (name,value) => world.setDynamicProperty(name,value),
        RunScore: options => Core.World.runCmd(`execute if score "${options.score}" SaplingDB = "true" SaplingCF run ${options.run}`),
        LoadScore: options => {
            const { name, score, sender } = options;
            Core.World.runCmd(`scoreboard players set "${name}" SaplingDB ${score == 'true' ? 1 : 0}`)
            Core.World.ephemeral(score == 'true' ? `§7${name} enabled...` : `§8${name} disabled...`, sender)
        },
        PropIs: options => { if (Core.NBT.getData(options.property) == options.value) options.callback() }
    }
}, API = {
    Item: {
        Spawn: options => options.dimension.spawnItem(new ItemStack(ItemTypes.get(options.item),options.amount),options.location)
    }
}; export { Core, API }

GameTest.registerAsync('Sapling', 'Core', test => {
    Core.World.print('§7Sapling server loaded...§r');
    Core.World.print('§7Fakeplayer server loaded...§r')
    world.events.beforeChat.subscribe(ev => Core.CommandPackage.Reader(ev, test));
})
    .maxTicks(999999999)
    .structureName('SP:Server')
    .maxAttempts(255);

Core.World.server('core');