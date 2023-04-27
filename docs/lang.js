import os
os.system('clear')

# table
table = [
    # 0 = void
    # 1 = wall 
    # 2 = user
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,2,1,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,1,0,0,0,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1]
]


# game

def find ():
    for i in range(len(table)): 
        for j in range(len(table[i])):
           if (table[i][j] == 2): return { 'col': i, 'fil': j }

def game(key):
    user = find()
    if (key=='w'):
        if (table[user['col']-1][user['fil']] == 1): return
        table[user['col']][user['fil']] = 0
        table[user['col']-1][user['fil']] = 2
    
    elif (key=='s'):
        if (table[user['col']+1][user['fil']] == 1): return
        table[user['col']][user['fil']] = 0
        table[user['col']+1][user['fil']] = 2
        
    elif (key=='a'):
        if (table[user['col']][user['fil']-1] == 1): return
        table[user['col']][user['fil']] = 0
        table[user['col']][user['fil']-1] = 2
        
    elif (key=='d'):
        if (table[user['col']][user['fil']+1] == 1): return
        table[user['col']][user['fil']] = 0
        table[user['col']][user['fil']+1] = 2

def graph():
    for i in table:
        txt = ''
        for j in i: 
            if (j == 0): txt += str(j).replace('0','⬛')
            elif (j == 1): txt += str(j).replace('1','⬜')
            elif (j == 2): txt += str(j).replace('2','🟩')
        print(txt)


# bucle
while True:
    os.system('clear')
    graph()
    act = input('wasd? ')
    game(act)
