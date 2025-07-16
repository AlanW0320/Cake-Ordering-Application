import sqlite3


db = sqlite3.connect('mycakes.sqlite')


cursor = db.cursor()


cursor.execute('DROP TABLE IF EXISTS cakes')
cursor.execute('DROP TABLE IF EXISTS cakerecords')


cursor.execute('''CREATE TABLE cakes(
    id integer PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    price integer NOT NULL,
    img text NOT NULL
)''')

cursor.execute('''CREATE TABLE cakerecords(
    id integer PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    price integer NOT NULL,
    img text NOT NULL,
    date text NOT NULL
)''')


cursor.execute('''
    INSERT INTO cakes(name, price, img)
    VALUES(?, ?, ?)
''', ('Chocolate Cake', 68, 'https://bluebowlrecipes.com/wp-content/uploads/2023/08/chocolate-truffle-cake-8844.jpg'))

cursor.execute('''
    INSERT INTO cakes(name, price, img)
    VALUES(?, ?, ?)
''', ('Strawberry Chocolate Cake', 88, 'https://www.giverecipe.com/wp-content/uploads/2020/06/Chocolate-Strawberry-Cake.jpg'))

cursor.execute('''
    INSERT INTO cakes(name, price, img)
    VALUES(?, ?, ?)
''', ('Strawberry Cake', 78, 'https://www.jocooks.com/wp-content/uploads/2024/06/strawberry-cake-1-30a.jpg'))

cursor.execute('''
    INSERT INTO cakes(name, price, img)
    VALUES(?, ?, ?)
''', ('Oreo Cake', 68, 'https://eatsdelightful.com/wp-content/uploads/2023/04/decorated-Oreo-cake-on-serving-platter-3-scaled.jpg'))

cursor.execute('''
    INSERT INTO cakes(name, price, img)
    VALUES(?, ?, ?)
''', ('Vanilla Cake', 58, 'https://thescranline.com/wp-content/uploads/2025/02/VANILLA-CAKE-25-S-01.jpg'))

cursor.execute('''
    INSERT INTO cakes(name, price, img)
    VALUES(?, ?, ?)
''', ('Strawberry Vanilla Cake', 78, 'https://aegeandelight.com/wp-content/uploads/2022/08/vegan-vanilla-cake-68.jpg'))

cursor.execute('''
    INSERT INTO cakes(name, price, img)
    VALUES(?, ?, ?)
''', ('Mango Cake', 78, 'https://teakandthyme.com/wp-content/uploads/2022/08/mango-chiffon-cake-DSC_5172-1x1-1600.jpg'))

cursor.execute('''
    INSERT INTO cakes(name, price, img)
    VALUES(?, ?, ?)
''', ('Blueberry Cake', 78, 'https://www.vibrantplate.com/wp-content/uploads/2016/09/Blueberry-Mascarpone-Cake-07-540x720.jpg'))

cursor.execute('''
    INSERT INTO cakes(name, price, img)
    VALUES(?, ?, ?)
''', ('Red Velvet Cake', 68, 'https://thescranline.com/wp-content/uploads/2023/06/RED-VELVET-CAKE-23-S-01.jpg'))

cursor.execute('''
    INSERT INTO cakes(name, price, img)
    VALUES(?, ?, ?)
''', ('Fruit Cake', 128, 'https://nourishingamy.com/wp-content/uploads/2021/04/vegan-fruit-cake-7.jpg'))




db.commit()
db.close()