execute at @e[type=falling_block] if block ~~~ anvil if block ~~-1~1 piston_arm_collision run setblock ~~-2~1 air
execute at @e[type=falling_block] if block ~~~ anvil if block ~~-1~-1 piston_arm_collision run setblock ~~-2~-1 air
execute at @e[type=falling_block] if block ~~~ anvil if block ~1~-1~ piston_arm_collision run setblock ~1~-2~ air
execute at @e[type=falling_block] if block ~~~ anvil if block ~-1~-1~ piston_arm_collision run setblock ~-1~-2~ air