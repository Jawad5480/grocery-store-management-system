from flask import Flask, jsonify, request
from flask_cors import CORS
import products_dao
import uom_dao
import orders_dao
from sql_connection import get_sql_connection

app = Flask(__name__)
CORS(app)  # Enables CORS for all routes

connection = get_sql_connection()

# ========== Products APIs ==========

@app.route('/getProducts', methods=['GET'])
def get_products():
    products = products_dao.get_all_products(connection)
    return jsonify(products)

@app.route('/insertProduct', methods=['POST'])
def insert_product():
    try:
        request_payload = request.get_json(force=True)
        product_id = products_dao.insert_new_product(connection, request_payload)
        return jsonify({'product_id': product_id})
    except Exception as e:
        print("Error inserting product:", e)
        return jsonify({'error': str(e)}), 500

@app.route('/deleteProduct', methods=['POST'])
def delete_product():
    try:
        request_payload = request.get_json(force=True)
        product_id = products_dao.delete_product(connection, request_payload['product_id'])
        return jsonify({'product_id': product_id})
    except Exception as e:
        print("Error deleting product:", e)
        return jsonify({'error': str(e)}), 500

# ========== UOM APIs ==========

@app.route('/getUOM', methods=['GET'])
def get_uoms():
    uoms = uom_dao.get_uoms(connection)
    return jsonify(uoms)

# ========== Orders APIs ==========

@app.route('/getAllOrders', methods=['GET'])
def get_all_orders():
    try:
        orders = orders_dao.get_all_orders(connection)
        return jsonify(orders)
    except Exception as e:
        print("Error getting orders:", e)
        return jsonify({'error': str(e)}), 500

@app.route('/insertOrder', methods=['POST'])
def insert_order():
    try:
        request_payload = request.get_json(force=True)
        print("Received order payload:", request_payload)

        # Defensive check
        if not isinstance(request_payload, dict):
            import json
            request_payload = json.loads(request_payload)

        if 'customer_name' not in request_payload or 'order_details' not in request_payload:
            return jsonify({'error': 'Missing required order fields'}), 400

        order_id = orders_dao.insert_order(connection, request_payload)
        return jsonify({'order_id': order_id})
    except Exception as e:
        print("Error inserting order:", e)
        return jsonify({'error': str(e)}), 500

# ========== Login API ==========

@app.route('/login', methods=['POST'])
def login():
    try:
        request_payload = request.get_json(force=True)
        username = request_payload.get('username')
        password = request_payload.get('password')

        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM users WHERE username=%s AND password=%s"
        cursor.execute(query, (username, password))
        user = cursor.fetchone()
        cursor.close()

        if user:
            return jsonify({'status': 'success', 'message': 'Login successful', 'user': user})
        else:
            return jsonify({'status': 'failure', 'message': 'Invalid credentials'}), 401

    except Exception as e:
        print("Error during login:", e)
        return jsonify({'status': 'error', 'message': str(e)}), 500

# ========== Run Server ==========

if __name__ == '__main__':
    print("Starting Python Flask Server For Grocery Store Management System")
    app.run(port=5000)
