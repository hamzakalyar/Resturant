import requests
import json

# Test registration with the API directly
url = "http://localhost:8000/api/auth/register"
data = {
    "email": "debuguser@example.com",
    "full_name": "Debug Test User",
    "password": "test123456",
    "phone": "1234567890"
}

print("=" * 50)
print("TESTING REGISTRATION API")
print("=" * 50)
print(f"\nURL: {url}")
print(f"\nPayload:")
print(json.dumps(data, indent=2))
print("\n" + "=" * 50)

try:
    response = requests.post(url, json=data, timeout=5)
    print(f"\n✅ Status Code: {response.status_code}")
    
    if response.status_code == 201:
        print("✅ SUCCESS! User registered successfully")
        print(f"\nResponse:")
        print(json.dumps(response.json(), indent=2))
    else:
        print("❌ REGISTRATION FAILED")
        print(f"\nError Response:")
        try:
            print(json.dumps(response.json(), indent=2))
        except:
            print(response.text)
            
except requests.exceptions.ConnectionError as e:
    print(f"\n❌ CONNECTION ERROR")
    print(f"Cannot connect to {url}")
    print("The backend might not be running or not accessible on port 8000")
    
except requests.exceptions.Timeout:
    print("\n❌ TIMEOUT ERROR")
    print("Request timed out - backend is not responding")
    
except Exception as e:
    print(f"\n❌ UNEXPECTED ERROR")
    print(f"Error Type: {type(e).__name__}")
    print(f"Error: {e}")

print("\n" + "=" * 50)
