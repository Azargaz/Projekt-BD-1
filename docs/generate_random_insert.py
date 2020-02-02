import random

users = 3
games = 16
status = 3

used_inserts = {'0:0'}

def getRandomInsert():
    random_user = random.randint(1, users)
    random_game = random.randint(1, games)
    random_status = random.randint(1, status)

    random_mark = "null"

    if random_status == 3:
        random_mark = random.randint(1, 10)

    if "{}:{}".format(random_user, random_game) not in used_inserts:
        used_inserts.add("{}:{}".format(random_user, random_game))
        return "SELECT * FROM projekt.dodaj_gre_do_listy( {}, {}, {}, {}, null, null);".format(random_user, random_game, random_status, random_mark)
    else:
        return ""

while True:
    t = getRandomInsert()
    if t != "":
        print(t)