# 🍽️ Restaurant Website - Full Stack Project

A modern, full-stack restaurant website with AI-powered features. Built with React, Python FastAPI, and cutting-edge AI technology.

## ✨ Features

### Core Functionality
- 🍴 **Dynamic Menu System** - Browse menu items by category with beautiful layouts
- 📅 **Table Reservations** - Real-time booking system with email confirmations
- 🛒 **Online Ordering** - Add items to cart and place orders for delivery/pickup
- ⭐ **Customer Reviews** - Rate and review your dining experience
- 📧 **Contact Form** - Get in touch with the restaurant team

### AI-Powered Features
- 🤖 **Smart Menu Recommendations** - AI suggests dishes based on your preferences
- 💬 **AI Chatbot** - Get instant answers about menu, hours, and reservations
- 🔍 **Natural Language Search** - Find dishes using conversational queries
- 📊 **Sentiment Analysis** - Automatic analysis of customer reviews

## 🛠️ Tech Stack

### Frontend
- **React 18+** with Vite
- **React Router v6** for navigation
- **Vanilla CSS** with modern design system
- **Framer Motion** for smooth animations
- **Axios** for API calls

### Backend
- **FastAPI** (Python) - Modern, fast API framework
- **PostgreSQL** with SQLAlchemy ORM
- **JWT Authentication** for admin features
- **Pydantic** for data validation
- **OpenAI API** for AI features

## 📁 Project Structure

```
restaurant-website/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
│
├── backend/           # FastAPI backend application
│   ├── app/
│   │   ├── api/       # API routes
│   │   ├── models/    # Database models
│   │   ├── schemas/   # Pydantic schemas
│   │   └── services/  # Business logic
│   └── requirements.txt
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.10+
- **PostgreSQL** (or SQLite for development)

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run at `http://localhost:5173`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start development server
uvicorn main:app --reload
```

The backend API will run at `http://localhost:8000`

### Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost/restaurant_db
SECRET_KEY=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-email-password
```

## 📚 API Documentation

Once the backend is running, visit:
- **Interactive API docs**: http://localhost:8000/docs
- **Alternative docs**: http://localhost:8000/redoc

## 🎨 Design Philosophy

- **Modern & Clean** - Simple yet attractive UI that wows users
- **Responsive** - Works flawlessly on all devices
- **Fast & Smooth** - Optimized performance with smooth animations
- **Accessible** - Built with accessibility best practices

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
npm run lint
```

### Backend
```bash
cd backend
pytest
```

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
vercel deploy
```

### Backend (Render)
- Connect your GitHub repository to Render
- Set environment variables
- Deploy with automatic builds

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome!

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 👨‍💻 Author

Built as part of a portfolio showcase for freelancing opportunities.

---

**Note**: This project is designed with clean, well-managed code - no hardcoding, no unnecessary files. Perfect for showcasing full-stack development skills!
