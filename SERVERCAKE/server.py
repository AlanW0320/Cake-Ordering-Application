import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser

DB = 'mycakes.sqlite'

app = Flask(__name__)

def get_row_as_dict(row):
    return {
        'id': row[0],
        'name': row[1],
        'price': row[2],
        'img': row[3],
    }

def get_record_as_dict(row):
    return {
        'id': row[0],
        'name': row[1],
        'price': row[2],
        'img': row[3],
        'date': row[4],
    }

@app.route('/api/cakes', methods=['GET'])
def get_cakes():
    try:
        db = sqlite3.connect(DB)
        cursor = db.cursor()
        cursor.execute('SELECT * FROM cakes ORDER BY name')
        rows = cursor.fetchall()
        return jsonify([get_row_as_dict(row) for row in rows]), 200
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@app.route('/api/cakerecords', methods=['GET'])
def get_cakerecords():
    try:
        db = sqlite3.connect(DB)
        cursor = db.cursor()
        cursor.execute('SELECT * FROM cakerecords ORDER BY name')
        rows = cursor.fetchall()
        return jsonify([get_record_as_dict(row) for row in rows]), 200
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@app.route('/api/cakes/<int:cake>', methods=['GET'])
def show(cake):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM cakes WHERE id=?', (str(cake),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200

@app.route('/api/cakes', methods=['POST'])
def add_cakerecords():
    if not request.is_json:
        return jsonify({'error': 'Request must be in JSON format'}), 400

    data = request.get_json()
    print("Received JSON:", data)  # Debugging print

    # Validate required fields
    required_fields = ['name', 'price', 'img', 'date']
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    try:
        new_cakerecords = (
            data['name'],
            data['price'],
            data['img'],
            data['date'],
        )

        print("Prepared for insert:", new_cakerecords)  # Debugging print

        db = sqlite3.connect(DB)
        cursor = db.cursor()
        cursor.execute('''
            INSERT INTO cakerecords(name, price, img, date)
            VALUES (?, ?, ?, ?)
        ''', new_cakerecords)

        db.commit()

        return jsonify({
            'id': cursor.lastrowid,
            'affected': db.total_changes,
            'message': 'Cake order added successfully.'
        }), 201

    except sqlite3.Error as e:
        db.rollback()
        print("SQLite error:", str(e))  # Server-side log
        return jsonify({'error': f'Database error: {str(e)}'}), 500

    finally:
        db.close()

@app.route('/api/newcakes', methods=['POST'])
def add_cake():
    if not request.is_json:
        return jsonify({'error': 'Request must be in JSON format'}), 400

    data = request.get_json()
    print("Received JSON:", data)  # Debugging print

    # Validate required fields
    required_fields = ['name', 'price', 'img']
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    try:
        new_cake = (
            data['name'],
            data['price'],
            data['img'],
            
        )

        print("Prepared for insert:", new_cake)  # Debugging print

        db = sqlite3.connect(DB)
        cursor = db.cursor()
        cursor.execute('''
            INSERT INTO cakes(name, price, img)
            VALUES (?, ?, ?)
        ''', new_cake)

        db.commit()

        return jsonify({
            'id': cursor.lastrowid,
            'affected': db.total_changes,
            'message': 'New Cake added successfully.'
        }), 201

    except sqlite3.Error as e:
        db.rollback()
        print("SQLite error:", str(e))  # Server-side log
        return jsonify({'error': f'Database error: {str(e)}'}), 500

    finally:
        db.close()



@app.route('/api/cakes/<int:cake>', methods=['PUT'])
def update(cake):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != cake:
        abort(400)

    update_cake = (
        request.json['name'],
        request.json['price'],
        request.json['img'],
        str(cake),
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE cakes SET
            name=?,price=?,img=?
        WHERE id=?
    ''', update_cake)

    db.commit()

    response = {
        'id': cake,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/cakes/<int:cake>', methods=['DELETE'])
def deletecake(cake):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != cake:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM cakes WHERE id=?', (str(cake),))

    db.commit()

    response = {
        'id': cake,
        'affected': db.total_change,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/cakerecords/<int:cakerecords>', methods=['DELETE'])
def deletecakerecords(cakerecords):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != cakerecords:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM cakerecords WHERE id=?', (str(cakerecords),))

    db.commit()

    response = {
        'id': cakerecords,
        'affected': db.total_change,
    }

    db.close()

    return jsonify(response), 201


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5001, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)