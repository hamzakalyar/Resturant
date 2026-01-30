# 🍽️ Delicious Restaurant Website

A modern, full-stack restaurant website with reservation system, contact forms, and beautiful UI.

**Developed by Muhammad Hamza Imtiaz**

---

## 🌟 Features

### Frontend
- ✨ Modern glassmorphism navbar with floating animations
- 🎨 Pill-shaped active navigation highlighting
- 📱 Fully responsive design for all devices
- 🎯 Custom 404 error page
- ⬆️ Scroll-to-top button
- 📝 Contact form with validation
- 🍽️ Reservation system with date/time picker
- 🎨 Premium orange gradient design theme
- ♿ WCAG AA accessibility compliant
- 🔍 SEO optimized with meta tags

### Backend
- 🚀 FastAPI REST API
- 🗄️ PostgreSQL database
- 📧 Email integration (planned)
- 🔐 Secure data handling
- 📊 Admin panel capabilities

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Routing**: React Router DOM
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Styling**: CSS with CSS Variables
- **Fonts**: Inter (body), Poppins (headings)

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **CORS**: Enabled for frontend communication

---

## 📂 Project Structure

```
Website/
├── frontend/
│   ├── public/
│   │   ├── images/           # Restaurant images
│   │   └── index.html        # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/       # Reusable components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── ScrollToTop.jsx
│   │   │   └── layout/       # Layout components
│   │   │       └── Navbar.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Reservations.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/         # API service layer
│   │   │   ├── api.js
│   │   │   ├── contactService.js
│   │   │   └── reservationService.js
│   │   ├── App.jsx           # Main app component
│   │   ├── index.css         # Global styles
│   │   └── main.jsx          # Entry point
│   └── package.json
│
└── backend/
    ├── app/
    │   ├── api/              # API routes
    │   │   ├── contact.py
    │   │   ├── menu.py
    │   │   └── reservation.py
    │   ├── models/           # Database models
    │   ├── schemas/          # Pydantic schemas
    │   └── __init__.py
    ├── main.py               # FastAPI app
    └── requirements.txt
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- PostgreSQL

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

The backend API will run on `http://localhost:8000`

---

## 🎨 Design System

### Colors
- **Primary Orange**: `#d4511e`
- **Secondary Orange**: `#e76f51`
- **Gradient**: `linear-gradient(135deg, #d4511e, #e76f51)`
- **Text Primary**: `#2d3436`
- **Text Secondary**: `#636e72`

### Typography
- **Headings**: Poppins (600, 700, 800)
- **Body**: Inter (300, 400, 500, 600, 700)

### Components
- **Buttons**: Rounded full with gradient backgrounds
- **Cards**: White with subtle shadows
- **Navbar**: Glassmorphism with blur effect
- **Forms**: Clean inputs with validation states

---

## 📱 Pages

1. **Home** (`/`)
   - Hero section with CTA
   - Featured dishes
   - Testimonials
   - About snippet

2. **Menu** (`/menu`)
   - Categorized menu items
   - Filtering options
   - Item details with images

3. **Reservations** (`/reservations`)
   - Date & time picker
   - Party size selection
   - Special requests field
   - Form validation

4. **About** (`/about`)
   - Restaurant story
   - Core values
   - Team/Chef information
   - Statistics

5. **Contact** (`/contact`)
   - Contact form
   - Location information
   - Business hours
   - Clickable contact links

6. **404** (`*`)
   - Custom error page
   - Navigation options
   - Popular pages list

---

## 🔌 API Endpoints

### Reservations
- `POST /api/reservations/` - Create reservation
- `GET /api/reservations/` - Get all reservations
- `GET /api/reservations/{id}` - Get specific reservation

### Contact
- `POST /api/contact/` - Submit contact message
- `GET /api/contact/` - Get all messages
- `GET /api/contact/{id}` - Get specific message

### Menu
- `GET /api/menu/` - Get all menu items
- `GET /api/menu/{id}` - Get specific item

---

## 🧪 Testing

### Manual Testing Checklist

**Navigation**:
- [ ] All navbar links work
- [ ] Active page is highlighted
- [ ] Mobile menu opens/closes
- [ ] Logo animation visible

**Forms**:
- [ ] Contact form validates correctly
- [ ] Reservation form submits successfully
- [ ] Error messages display properly
- [ ] Success messages appear

**Responsive**:
- [ ] Desktop (1920px)
- [ ] Laptop (1366px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

**Features**:
- [ ] Scroll-to-top button appears
- [ ] 404 page displays for invalid routes
- [ ] All images load correctly
- [ ] Animations are smooth

---

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)

**Vercel**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

**Netlify**:
```bash
# Build
npm run build

# Drag and drop 'dist' folder to Netlify
```

### Backend Deployment (Railway/Render)

**Environment Variables**:
```
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
CORS_ORIGINS=https://your-frontend-domain.com
```

---

## 📧 Contact Information

- **Address**: Flat GF 1 Block C9 PHA Apartments, G11/3 Islamabad
- **Phone**: 0302-0000973
- **Email**: hamza@bytecraftsoft.com

---

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

---

## 📄 License

© 2026 Delicious Restaurant. All rights reserved.

**Developed by Muhammad Hamza Imtiaz**

---

## 🎉 Acknowledgments

- Design inspiration from modern restaurant websites
- Icons from React Icons
- Fonts from Google Fonts (Inter & Poppins)

---

## 📝 Changelog

### Version 1.0.0 (January 2026)
- ✅ Initial release
- ✅ Modern navbar with glassmorphism
- ✅ All core pages implemented
- ✅ Contact and reservation forms
- ✅ SEO optimization
- ✅ Custom 404 page
- ✅ Scroll-to-top button
- ✅ Full responsive design
- ✅ Accessibility features

---

**🚀 Status**: Production Ready!
