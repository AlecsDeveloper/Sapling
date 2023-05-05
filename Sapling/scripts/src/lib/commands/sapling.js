import { Core } from 'src/sapling.js'

const { CommandPackage, NBT } = Core;
const { ephemeral, print } = Core.World;

////////////////* sapling *////////////////
CommandPackage.Register({ name: 'sapling' });
const { sapling } = CommandPackage.Collection;

// TNT drops
sapling.Builder({
    name: 'tntDuping',
    usage: '<true/false>',
    modules: ['tnt'],
    run: (client, ev) => {
        print(ev[0])
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'tntDuping';
        NBT.setData(name,bool);
        NBT.LoadScore({
            name: 'tntDuping',
            score: ev[0],
            sender: client
        })
    }
});
sapling.Builder({
    name: 'tntDropIce',
    usage: '<true/false>',
    modules: ['tnt'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'tntDropIce';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});
sapling.Builder({
    name: 'tntDropAllBlocks',
    usage: '<true/false>',
    modules: ['tnt'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'tntDropAllBlocks';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});
sapling.Builder({
    name: 'tntNotExplodes',
    usage: '<true/false>',
    modules: ['tnt'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'tntNotExplodes';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});


// Entities 
sapling.Builder({
    name: 'guardianDropSponges',
    usage: '<true/false>',
    modules: ['entity'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'guardianDropSponges';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});
sapling.Builder({
    name: 'huskDropSand',
    usage: '<true/false>',
    modules: ['entity'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'huskDropSand';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});
sapling.Builder({
    name: 'ghastDropQuartz',
    usage: '<true/false>',
    modules: ['entity'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'ghastDropQuartz';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});
sapling.Builder({
    name: 'silverfishDropGravel',
    usage: '<true/false>',
    modules: ['entity'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'silverfishDropGravel';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});
sapling.Builder({
    name: 'pigmansFarmWarts',
    usage: '<true/false>',
    modules: ['entity'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'pigmansFarmWarts';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});


// World
sapling.Builder({
    name: 'endPortalGBD',
    usage: '<true/false>',
    modules: ['world'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'endPortalGBD';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});
sapling.Builder({
    name: 'anvilBedrockBreaker',
    usage: '<true/false>',
    modules: ['world'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'anvilBedrockBreaker';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});
sapling.Builder({
    name: 'cauldronBedrockBreaker',
    usage: '<true/false>',
    modules: ['world'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'cauldronBedrockBreaker';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});
sapling.Builder({
    name: 'renewableSoulSand',
    usage: '<true/false>',
    modules: ['world'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'renewableSoulSand';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});

// Tweaks
sapling.Builder({
    name: 'autoCrafting',
    usage: '<true/false>',
    modules: ['tweaks'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'autoCrafting';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});
sapling.Builder({
    name: 'flippinCactus',
    usage: '<true/false>',
    modules: ['tweaks'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'flippinCactus';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});
sapling.Builder({
    name: 'toolChanger',
    usage: '<true/false>',
    modules: ['tweaks'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'toolChanger';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});
sapling.Builder({
    name: 'shulkerContent',
    usage: '<true/false>',
    modules: ['tweaks'],
    run: (client, ev) => {
        if (!['true','false'].includes(ev[0]) || ev[0] == undefined) return ephemeral('§cInvalid value§r',client);
        // Set values
        const bool = ev[0] == 'true' ? true : false;
        const name = 'shulkerContent';
        NBT.setData(name,bool);
        if (bool) ephemeral(`§7${name} enabled...`,client);
        else ephemeral(`§8${name} disabled...`,client);
    }
});


///////////////////////////////////////////

let modules = [];
sapling.Builder({
    name: 'help',
    usage: '<module>',
    modules: [],
    run: (client, ev) => {
        let mods = [], txt = '', cmds = {};
        const { Commands } = sapling.Collection;
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
            txt = '§aSapling modules\n§r'
            mods.forEach(x => txt += `§7 - ${x}\n`);
            ephemeral(txt.trim(),client);
       } else if (mods.includes(ev[0])) {
           txt = `§3${ev[0]} commands\n§r`;
           cmds[ev[0]].forEach(x => txt += x);
           ephemeral(txt.trim(),client);
       } else ephemeral('§cInvalid module§r',client);
    }
});