# duping
execute if score "tntDuping" SaplingDB = "true" SaplingCF if block ~-1~~ noteblock run setblock ~~~ tnt []
execute if score "tntDuping" SaplingDB = "true" SaplingCF if block ~1~~ noteblock run setblock ~~~ tnt []
execute if score "tntDuping" SaplingDB = "true" SaplingCF if block  ~~~-1 noteblock run setblock ~~~ tnt []
execute if score "tntDuping" SaplingDB = "true" SaplingCF if block  ~~~1 noteblock run setblock ~~~ tnt []

#tp
execute if score "tntDuping" SaplingDB = "true" SaplingCF if block ~-1~~ noteblock run tp ~~-1~
execute if score "tntDuping" SaplingDB = "true" SaplingCF if block ~1~~ noteblock run tp ~~-1~
execute if score "tntDuping" SaplingDB = "true" SaplingCF if block ~~~-1 noteblock run tp ~~-1~
execute if score "tntDuping" SaplingDB = "true" SaplingCF if block ~~~1 noteblock run tp ~~-1~