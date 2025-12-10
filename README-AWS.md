# AWS Deployment Quick Start

## Quick Setup Steps

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Set Up Environment Variables

```bash
# Copy example file
cp server/.env.example server/.env

# Edit server/.env with your configuration
```

### 3. Test Locally

```bash
# Terminal 1: Start backend
npm run server:dev

# Terminal 2: Start frontend
npm run dev

# Or run both together
npm run dev:full
```

### 4. Deploy to AWS

Choose one of these options:

#### Option A: AWS Amplify (Easiest)

1. Push your code to GitHub/GitLab
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
3. Connect your repository
4. Amplify will auto-detect `amplify.yml`
5. Add custom domain `fr0strated.me`

#### Option B: AWS S3 + CloudFront

```bash
# Build frontend
npm run build

# Deploy to S3
aws s3 sync dist/ s3://fr0strated-portfolio --delete

# Then configure CloudFront and Route 53 (see DEPLOYMENT.md)
```

#### Option C: AWS EC2

Follow the detailed guide in `DEPLOYMENT.md`

### 5. Deploy Backend Separately

The backend can be deployed as:
- **AWS Lambda** (Serverless) - Recommended
- **AWS EC2** (Traditional server)
- **AWS Elastic Beanstalk** (Managed)

See `DEPLOYMENT.md` for detailed instructions.

## Domain Configuration

1. **Route 53**: Create hosted zone for `fr0strated.me`
2. **Update Nameservers**: In your domain registrar, update nameservers to Route 53
3. **SSL Certificate**: Use AWS Certificate Manager (ACM)
4. **DNS Records**: 
   - A record: Point to CloudFront/EC2
   - CNAME: `www.fr0strated.me` → `fr0strated.me`

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/portfolio` - Portfolio data
- `POST /api/contact` - Contact form submission
- `POST /api/analytics` - Analytics tracking

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://api.fr0strated.me
```

### Backend (server/.env)
```
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://fr0strated.me
```

## Cost Estimate

- **Amplify**: ~$1-5/month
- **S3 + CloudFront**: ~$1-3/month  
- **EC2 t2.micro**: Free tier (first year)
- **Route 53**: ~$0.50/month
- **Lambda**: Pay per request (~$0.20 per million)

**Total**: ~$2-10/month (can be free with free tier)

## Support

For detailed deployment instructions, see `DEPLOYMENT.md`

