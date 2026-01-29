"""
Diagnostic script to verify backend setup and configuration.
Run this to check if all components are properly configured.
"""

import os
import sys
from pathlib import Path

def print_header(text):
    """Print a formatted header."""
    print("\n" + "=" * 60)
    print(f"  {text}")
    print("=" * 60)

def print_check(name, status, details=""):
    """Print a check result."""
    icon = "[OK]" if status else "[FAIL]"
    print(f"{icon} {name}")
    if details:
        print(f"   {details}")

def check_environment_file():
    """Check if .env file exists and has required variables."""
    print_header("Environment Configuration")
    
    env_path = Path(".env")
    if not env_path.exists():
        print_check(".env file", False, "File not found - copy .env.example to .env")
        return False
    
    print_check(".env file", True, f"Found at {env_path.absolute()}")
    
    # Check for required variables
    required_vars = ["DATABASE_URL", "SECRET_KEY"]
    missing_vars = []
    
    with open(env_path, 'r') as f:
        content = f.read()
        for var in required_vars:
            if var not in content:
                missing_vars.append(var)
    
    if missing_vars:
        print_check("Required variables", False, f"Missing: {', '.join(missing_vars)}")
        return False
    
    print_check("Required variables", True, "All required variables present")
    return True

def check_dependencies():
    """Check if required Python packages are installed."""
    print_header("Python Dependencies")
    
    required_packages = [
        ("fastapi", "FastAPI framework"),
        ("sqlalchemy", "Database ORM"),
        ("passlib", "Password hashing"),
        ("jose", "JWT token handling"),
        ("pydantic", "Data validation"),
        ("uvicorn", "ASGI server")
    ]
    
    all_installed = True
    for package, description in required_packages:
        try:
            __import__(package)
            print_check(f"{package}", True, description)
        except ImportError:
            print_check(f"{package}", False, f"Not installed - {description}")
            all_installed = False
    
    if not all_installed:
        print("\n   Run: pip install -r requirements.txt")
    
    return all_installed

def check_database():
    """Check database connection and schema."""
    print_header("Database Configuration")
    
    db_path = Path("restaurant.db")
    if not db_path.exists():
        print_check("Database file", False, "restaurant.db not found - will be created on first run")
        return False
    
    print_check("Database file", True, f"Found at {db_path.absolute()} ({db_path.stat().st_size} bytes)")
    
    # Try to load database configuration
    try:
        from app.database import engine, Base, get_db
        from app.models.user import User
        from sqlalchemy import inspect
        
        # Check if tables exist
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        
        if "users" not in tables:
            print_check("Users table", False, "Table not found - run migrations or restart server")
            return False
        
        print_check("Users table", True, "Table exists")
        
        # Check table columns
        columns = [col['name'] for col in inspector.get_columns('users')]
        required_columns = ['id', 'email', 'full_name', 'password_hash', 'phone', 'is_active', 'is_admin']
        missing_columns = [col for col in required_columns if col not in columns]
        
        if missing_columns:
            print_check("Table schema", False, f"Missing columns: {', '.join(missing_columns)}")
            return False
        
        print_check("Table schema", True, f"All required columns present: {', '.join(columns)}")
        
        # Try a test query
        db = next(get_db())
        user_count = db.query(User).count()
        db.close()
        print_check("Database query", True, f"Can query database - {user_count} users found")
        
        return True
        
    except Exception as e:
        print_check("Database access", False, f"Error: {str(e)}")
        return False

def check_auth_configuration():
    """Check authentication configuration."""
    print_header("Authentication Configuration")
    
    try:
        from app.core.auth import get_password_hash, verify_password, create_access_token
        
        # Test password hashing (use a short password to avoid bcrypt 72-byte limit)
        test_password = "test123"
        hashed = get_password_hash(test_password)
        verified = verify_password(test_password, hashed)
        
        if verified:
            print_check("Password hashing", True, "bcrypt working correctly")
        else:
            print_check("Password hashing", False, "Verification failed")
            return False
        
        # Test JWT token creation
        token = create_access_token(data={"sub": "test@example.com"})
        if token and len(token) > 0:
            print_check("JWT token generation", True, "Token creation working")
        else:
            print_check("JWT token generation", False, "Token creation failed")
            return False
        
        return True
        
    except Exception as e:
        print_check("Auth module", False, f"Error: {str(e)}")
        return False

def check_api_routes():
    """Check if API routes are properly configured."""
    print_header("API Routes")
    
    try:
        from main import app
        
        routes = [route.path for route in app.routes]
        required_routes = [
            "/api/auth/register",
            "/api/auth/login",
            "/api/auth/login/json",
            "/api/auth/me"
        ]
        
        all_present = True
        for route in required_routes:
            if route in routes:
                print_check(route, True)
            else:
                print_check(route, False, "Route not found")
                all_present = False
        
        return all_present
        
    except Exception as e:
        print_check("API routes", False, f"Error loading app: {str(e)}")
        return False

def main():
    """Run all verification checks."""
    print("\n" + "=" * 60)
    print("  BACKEND SETUP VERIFICATION")
    print("=" * 60)
    
    results = {
        "Environment": check_environment_file(),
        "Dependencies": check_dependencies(),
        "Database": check_database(),
        "Authentication": check_auth_configuration(),
        "API Routes": check_api_routes()
    }
    
    print_header("Summary")
    
    for name, status in results.items():
        print_check(name, status)
    
    all_passed = all(results.values())
    
    if all_passed:
        print("\n[OK] All checks passed! Backend is ready to run.")
        print("\n   Start the server with: python main.py")
    else:
        print("\n[ERROR] Some checks failed. Please fix the issues above.")
        print("\n   Common fixes:")
        print("   1. Install dependencies: pip install -r requirements.txt")
        print("   2. Check .env file exists with correct variables")
        print("   3. Restart server to create database tables")
    
    print("\n" + "=" * 60 + "\n")
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())
