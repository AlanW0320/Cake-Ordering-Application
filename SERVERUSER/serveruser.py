import sqlite3
import bcrypt
import re
from flask import Flask, jsonify, request
from argparse import ArgumentParser

DB = 'users.sqlite'
app = Flask(__name__)

# Email validation regex
EMAIL_REGEX = re.compile(r'^[\w\.-]+@gmail\.com$', re.IGNORECASE)

def is_valid_email(email):
    return EMAIL_REGEX.match(email)

# Password hashing functions
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def check_password(hashed_password, user_password):
    return bcrypt.checkpw(user_password.encode('utf-8'), hashed_password.encode('utf-8'))

def initialize_database():
    try:
        with sqlite3.connect(DB) as db:
            cursor = db.cursor()
            cursor.execute('''
            CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                pass TEXT NOT NULL,
                position BOOLEAN DEFAULT FALSE
            )''')
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)')
            admin_email = 'admin123@gmail.com'
            cursor.execute('SELECT 1 FROM users WHERE email = ?', (admin_email,))
            if not cursor.fetchone():
                hashed_pw = hash_password('admin1234')
                cursor.execute('''
                    INSERT INTO users (name, email, pass, position)
                    VALUES (?, ?, ?, ?)''', ('Admin User', admin_email, hashed_pw, True))
            sample_users = [
                ('Regular User', 'user@example.com', 'user123', False)
            ]
            for name, email, password, position in sample_users:
                cursor.execute('SELECT 1 FROM users WHERE email = ?', (email,))
                if not cursor.fetchone():
                    hashed_pw = hash_password(password)
                    cursor.execute('''
                        INSERT INTO users (name, email, pass, position)
                        VALUES (?, ?, ?, ?)''', (name, email, hashed_pw, position))
            db.commit()
            print("Database initialized successfully")
    except Exception as e:
        print(f"Error initializing database: {e}")

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email', '').strip()
        password = data.get('pass', '').strip()
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        if not is_valid_email(email):
            return jsonify({'error': 'Invalid email format. Must be a @gmail.com address.'}), 400
        with sqlite3.connect(DB) as db:
            db.row_factory = sqlite3.Row
            cursor = db.cursor()
            cursor.execute('''
                SELECT id, name, email, pass, position 
                FROM users 
                WHERE email COLLATE NOCASE = ?''', (email,))
            user = cursor.fetchone()
            if not user or not check_password(user['pass'], password):
                return jsonify({'error': 'Invalid credentials'}), 401
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'role': 'admin' if user['email'].lower() == 'admin123@gmail.com' else 'user'
            }
        }), 200
    except Exception as e:
        app.logger.error(f"Login error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('pass', '').strip()
        if email == 'admin123@gmail.com':
            return jsonify({'error': 'Cannot register using reserved admin email'}), 403
        if not name or not email or not password:
            return jsonify({'error': 'All fields are required'}), 400
        if not is_valid_email(email):
            return jsonify({'error': 'Invalid email format. Must be a @gmail.com address.'}), 400
        hashed_pw = hash_password(password)
        with sqlite3.connect(DB) as db:
            db.row_factory = sqlite3.Row
            cursor = db.cursor()
            cursor.execute('SELECT 1 FROM users WHERE LOWER(email) = ?', (email,))
            if cursor.fetchone():
                return jsonify({'error': 'Email already registered'}), 409
            cursor.execute('''
                INSERT INTO users (name, email, pass, position)
                VALUES (?, ?, ?, ?)''', (name, email, hashed_pw, 0))
            db.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        app.logger.error(f"Registration error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    initialize_database()
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port
    app.run(host='0.0.0.0', port=port)