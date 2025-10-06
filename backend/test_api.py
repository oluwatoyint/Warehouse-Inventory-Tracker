import requests
import json

BASE_URL = "http://localhost:5000"

def test_api():
    print("🧪 Testing API endpoints...")
    
    try:
        # Test health endpoint
        response = requests.get(f"{BASE_URL}/health")
        print(f"✅ Health check: {response.status_code} - {response.json()}")
        
        # Test get items
        response = requests.get(f"{BASE_URL}/items")
        print(f"✅ Get items: {response.status_code} - Found {len(response.json())} items")
        
        # Test add item
        new_item = {
            "name": "Test Item",
            "quantity": 10,
            "location": "Test Location"
        }
        response = requests.post(f"{BASE_URL}/items", json=new_item)
        print(f"✅ Add item: {response.status_code} - {response.json()}")
        
        # Test get items again
        response = requests.get(f"{BASE_URL}/items")
        print(f"✅ Get items after add: {response.status_code} - Found {len(response.json())} items")
        
    except Exception as e:
        print(f"❌ API test failed: {e}")

if __name__ == "__main__":
    test_api()
