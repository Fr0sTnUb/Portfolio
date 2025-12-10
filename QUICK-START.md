# Quick Start Guide - Dynamic Portfolio with AWS

Your portfolio is now set up as a **dynamic website** with backend API support and AWS deployment configuration.

## What's New

✅ **Backend API** (`server/`) - Express.js server with REST endpoints  
✅ **AWS Deployment Config** - Multiple deployment options  
✅ **Dynamic Frontend** - Fetches data from API  
✅ **Domain Ready** - Configured for `fr0strated.me`  
✅ **Contact Form** - Now connects to backend API  

## Local Development

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Start Development Servers

**Option A: Run separately**
```bash
# Terminal 1: Backend (port 3000)
npm run server:dev

# Terminal 2: Frontend (port 5173)
npm run dev
```

**Option B: Run together**
```bash
npm run dev:full
```

### 3. Test the API

Visit:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api/health
- Portfolio Data: http://localhost:3000/api/portfolio

## AWS Deployment

### Recommended: AWS Amplify

1. **Push to Git** (GitHub/GitLab/Bitbucket)
2. **Go to AWS Amplify Console**
3. **Connect Repository**
4. **Auto-deploy** - Amplify detects `amplify.yml`
5. **Add Domain** - Configure `fr0strated.me`

### Backend Deployment Options

**Option 1: AWS Lambda (Serverless) - Recommended**
```bash
cd server
npm install -g serverless
serverless deploy
```

**Option 2: AWS EC2**
- Follow instructions in `DEPLOYMENT.md`
- Use PM2 for process management

**Option 3: AWS Elastic Beanstalk**
```bash
cd server
pip install awsebcli
eb init
eb create portfolio-api
eb deploy
```

## Domain Setup (fr0strated.me)

1. **Route 53**: Create hosted zone
2. **Update Nameservers**: In your domain registrar
3. **SSL Certificate**: Request in AWS Certificate Manager
4. **DNS Records**: 
   - A record → CloudFront/EC2 IP
   - CNAME `www` → `fr0strated.me`

## Environment Variables

### Frontend
Create `.env`:
```
VITE_API_URL=http://localhost:3000
```

### Backend
Create `server/.env`:
```
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

## API Endpoints

- `GET /api/health` - Server health check
- `GET /api/portfolio` - Portfolio data (skills, tech stack, etc.)
- `POST /api/contact` - Contact form submissions
- `POST /api/analytics` - Analytics tracking

## Project Structure

```
Portfolio/
├── server/              # Backend API
│   ├── index.js        # Express server
│   ├── package.json    # Backend dependencies
│   └── .env.example    # Environment template
├── src/                # Frontend React app
│   ├── components/     # React components
│   ├── services/       # API service layer
│   └── config/         # API configuration
├── amplify.yml         # AWS Amplify config
├── DEPLOYMENT.md       # Detailed deployment guide
└── README-AWS.md       # AWS quick reference
```

## Next Steps

1. ✅ Test locally with `npm run dev:full`
2. ✅ Push code to Git repository
3. ✅ Set up AWS Amplify (or choose another option)
4. ✅ Deploy backend (Lambda/EC2/Beanstalk)
5. ✅ Configure domain DNS
6. ✅ Set up SSL certificate
7. ✅ Update environment variables for production

## Need Help?

- See `DEPLOYMENT.md` for detailed AWS setup
- See `README-AWS.md` for quick reference
- Check AWS documentation for specific services

## Cost Estimate

- **Free Tier Available**: Yes (EC2 t2.micro, Lambda free tier)
- **Estimated Cost**: $2-10/month (can be $0 with free tier)
- **Services**: Amplify/S3, CloudFront, Route 53, Lambda/EC2

---

**Your portfolio is now dynamic and ready for AWS deployment! 🚀**

