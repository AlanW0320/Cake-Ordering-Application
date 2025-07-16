import sqlite3
import bcrypt
import re

EMAIL_REGEX = re.compile(r'^[\w\.-]+@gmail\.com$', re.IGNORECASE)

def is_valid_email(email):
    return EMAIL_REGEX.match(email)

def hash_password(password):
    """Hash a password using bcrypt."""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Connect to database
db = sqlite3.connect('users.sqlite')
cursor = db.cursor()

# Drop existing table if exists
cursor.execute('DROP TABLE IF EXISTS users')

# Create users table
cursor.execute('''
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    pass TEXT NOT NULL,
    position BOOLEAN DEFAULT FALSE  
)
''')


# Ensure only one admin exists with a fixed email
admin_email = 'admin123@gmail.com'
admin_password = hash_password('admin1234')  # Fixed admin password


cursor.execute('''
    INSERT INTO users(name, email, pass, position)
    VALUES(?, ?, ?, ?)
''', ('ADMIN', admin_email, admin_password, True))

# Insert users with hashed passwords
users = [
    ('SARAH', 'sarah@gmail.com', hash_password('mary123'), False),
    ('MICHAEL', 'michael@gmail.com', hash_password('michael123'), False)
]


for name, email, password, position in users:
    if is_valid_email(email):
        cursor.execute('''
            INSERT INTO users(name, email, pass, position)
            VALUES (?, ?, ?, ?)''', (name, email, password, position))


db.commit()
db.close()
