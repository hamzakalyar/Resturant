# Deployment Guide

## 🚀 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variable**:
   - In Vercel dashboard, add: `VITE_API_URL=https://your-backend-url.com`

4. **Configure Domain** (Optional):
   - Add custom domain in Vercel dashboard
   - Update DNS records

**Vercel Config**: Uses `frontend/vercel.json` for SPA routing

---

### Option 2: Netlify

1. **Build locally**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy**:
   - Drag `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or use Netlify CLI:
     ```bash
     npm i -g netlify-cli
     netlify deploy --prod
     ```

3. **Environment Variables**:
   - In Netlify dashboard, add: `VITE_API_URL=https://your-backend-url.com`

**Netlify Config**: Uses root `netlify.toml`

---

### Option 3: GitHub Pages

1. **Update vite.config.js**:
   ```js
   export default defineConfig({
     base: '/Resturant/', // Your repo name
   })
   ```

2. **Build and Deploy**:
   ```bash
   cd frontend
   npm run build
   npx gh-pages -d dist
   ```

3. **Enable GitHub Pages**:
   - Go to repo Settings → Pages
   - Select `gh-pages` branch

---

## 🖥️ Backend Deployment

### Option 1: Railway (Recommended)

1. **Create Account**: [railway.app](https://railway.app)

2. **New Project** → Deploy from GitHub repo

3. **Add PostgreSQL**:
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will auto-set `DATABASE_URL`

4. **Environment Variables**:
   ```
   SECRET_KEY=your-secure-random-key
   CORS_ORIGINS=https://your-frontend-domain.com
   ENVIRONMENT=production
   DEBUG=False
   ```

5. **Deploy**:
   - Railway auto-deploys on git push
   - Get your backend URL from Railway dashboard

---

### Option 2: Render

1. **Create Account**: [render.com](https://render.com)

2. **New Web Service** → Connect GitHub repo

3. **Configure**:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Add PostgreSQL**:
   - Create new PostgreSQL database
   - Copy `DATABASE_URL` to web service env vars

5. **Environment Variables**:
   ```
   DATABASE_URL=postgresql://...
   SECRET_KEY=your-secure-key
   CORS_ORIGINS=https://your-frontend-domain.com
   ENVIRONMENT=production
   ```

---

### Option 3: Heroku

1. **Install Heroku CLI**:
   ```bash
   npm i -g heroku
   ```

2. **Login and Create App**:
   ```bash
   heroku login
   heroku create your-restaurant-api
   ```

3. **Add PostgreSQL**:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Create Procfile** (in backend folder):
   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

5. **Deploy**:
   ```bash
   git subtree push --prefix backend heroku main
   ```

6. **Set Environment Variables**:
   ```bash
   heroku config:set SECRET_KEY=your-key
   heroku config:set CORS_ORIGINS=https://your-frontend.com
   ```

---

## 🔗 Connecting Frontend & Backend

### After Deploying Backend:

1. **Get Backend URL**: e.g., `https://your-api.railway.app`

2. **Update Frontend Environment**:
   
   **For Vercel/Netlify**:
   - Add `VITE_API_URL=https://your-api.railway.app` in dashboard

   **For Local Development**:
   ```bash
   # frontend/.env
   VITE_API_URL=https://your-api.railway.app
   ```

3. **Update Backend CORS**:
   ```bash
   # In your deployment dashboard
   CORS_ORIGINS=https://your-frontend.vercel.app,https://your-frontend.netlify.app
   ```

4. **Rebuild Frontend** with new API URL

---

## ✅ Deployment Checklist

### Before Deploying:

- [ ] Test all forms and features locally
- [ ] Check responsive design on all devices
- [ ] Verify all images load correctly
- [ ] Test API endpoints
- [ ] Review console for errors
- [ ] Update contact information
- [ ] Set strong SECRET_KEY for production
- [ ] Configure CORS properly
- [ ] Set up database backups (PostgreSQL)

### After Deploying:

- [ ] Test contact form submission
- [ ] Test reservation form
- [ ] Verify SEO meta tags (view-source)
- [ ] Test 404 page
- [ ] Check scroll-to-top button
- [ ] Verify all navigation links
- [ ] Test on mobile devices
- [ ] Check page load speeds
- [ ] Monitor error logs

---

## 🌐 Custom Domain Setup

### For Frontend (Vercel/Netlify):

1. **Purchase Domain**: Namecheap, GoDaddy, Google Domains

2. **Add to Platform**:
   - Vercel: Domains → Add Domain
   - Netlify: Domain Settings → Add Custom Domain

3. **Update DNS**:
   ```
   Type: CNAME
   Name: www
   Value: your-app.vercel.app (or netlify.app)
   
   Type: A
   Name: @
   Value: (Platform's IP - they provide this)
   ```

4. **Enable HTTPS**: Auto-configured by Vercel/Netlify

---

## 📊 Recommended Stack

**Best Free Tier Combination**:
- **Frontend**: Vercel (free, unlimited bandwidth)
- **Backend**: Railway (free 500 hours/month)
- **Database**: Railway PostgreSQL (free tier)

**Estimated Costs**:
- **Free Tier**: $0/month (handles ~10k visits/month)
- **Paid Tier**: ~$25/month (Railway Pro + Vercel Pro)

---

## 🔧 Environment Variables Summary

### Frontend (.env)
```bash
VITE_API_URL=https://your-backend-url.com
```

### Backend (.env)
```bash
DATABASE_URL=postgresql://...
SECRET_KEY=super-secret-key-min-32-chars
CORS_ORIGINS=https://your-frontend.com
ENVIRONMENT=production
DEBUG=False
```

---

## 🆘 Troubleshooting

### Frontend Issues:

**404 on Refresh**:
- ✅ Check `vercel.json` or `netlify.toml` for SPA routing

**API Not Connecting**:
- ✅ Verify `VITE_API_URL` is set correctly
- ✅ Check browser console for CORS errors
- ✅ Ensure backend CORS includes frontend URL

### Backend Issues:

**Database Connection Failed**:
- ✅ Check `DATABASE_URL` format
- ✅ Ensure database is running
- ✅ Verify database credentials

**CORS Errors**:
- ✅ Add frontend URL to `CORS_ORIGINS`
- ✅ Include `http://` or `https://` prefix
- ✅ No trailing slash in URLs

---

## 📞 Need Help?

**Your Contact**:
- Email: hamza@bytecraftsoft.com
- GitHub: hamzakalyar/Resturant

**Useful Links**:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)

---

**🚀 Ready to Deploy!** Choose your platform and follow the steps above!
