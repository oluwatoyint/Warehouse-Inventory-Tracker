from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Explicitly allow React frontend

# Use SQLite for development
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Model
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'quantity': self.quantity,
            'location': self.location
        }

# Create tables and add sample data
with app.app_context():
    db.create_all()
    
    # Add sample data if table is empty
    if Item.query.count() == 0:
        sample_items = [
            Item(name="Laptop", quantity=25, location="Warehouse A"),
            Item(name="Monitor", quantity=40, location="Warehouse B"),
            Item(name="Keyboard", quantity=75, location="Warehouse A"),
            Item(name="Mouse", quantity=100, location="Warehouse C")
        ]
        db.session.bulk_save_objects(sample_items)
        db.session.commit()
        print("✅ Sample data added!")
    
    print("✅ Database initialized successfully!")

@app.route('/')
def home():
    return jsonify({
        'message': 'Warehouse Inventory API is running!',
        'endpoints': {
            'GET /items': 'Get all items',
            'POST /items': 'Add new item',
            'PUT /items/<id>': 'Update item',
            'DELETE /items/<id>': 'Delete item'
        }
    })

@app.route('/items', methods=['GET'])
def get_items():
    try:
        items = Item.query.all()
        print(f"📦 Found {len(items)} items in database")
        return jsonify([item.to_dict() for item in items])
    except Exception as e:
        print(f"❌ Error fetching items: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/items', methods=['POST'])
def add_item():
    try:
        data = request.get_json()
        print(f"📥 Received data: {data}")
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        if not data.get('name'):
            return jsonify({'error': 'Name is required'}), 400
        if data.get('quantity') is None:
            return jsonify({'error': 'Quantity is required'}), 400
        
        new_item = Item(
            name=data['name'], 
            quantity=data['quantity'], 
            location=data.get('location', '')
        )
        db.session.add(new_item)
        db.session.commit()
        
        print(f"✅ Added new item: {new_item.to_dict()}")
        return jsonify(new_item.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error adding item: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/items/<int:id>', methods=['PUT'])
def update_item(id):
    try:
        item = Item.query.get(id)
        if not item:
            return jsonify({'error': 'Item not found'}), 404
            
        data = request.get_json()
        print(f"📥 Update data for item {id}: {data}")
        
        if 'name' in data:
            item.name = data['name']
        if 'quantity' in data:
            item.quantity = data['quantity']
        if 'location' in data:
            item.location = data['location']
            
        db.session.commit()
        print(f"✅ Updated item: {item.to_dict()}")
        return jsonify(item.to_dict())
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error updating item: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    try:
        item = Item.query.get(id)
        if not item:
            return jsonify({'error': 'Item not found'}), 404
            
        db.session.delete(item)
        db.session.commit()
        print(f"✅ Deleted item with id: {id}")
        return '', 204
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error deleting item: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'database': 'connected'})

if __name__ == '__main__':
    print("🚀 Starting Warehouse Inventory API...")
    print("📍 Backend URL: http://localhost:5000")
    print("📍 Frontend URL: http://localhost:3000")
    app.run(debug=True, port=5000, host='0.0.0.0')
