# AWS Deployment Guide for fr0strated.me

This guide will help you deploy your portfolio to AWS with your custom domain `fr0strated.me`.

## Prerequisites

1. AWS Account
2. Domain `fr0strated.me` registered
3. AWS CLI installed and configured
4. Node.js 18+ installed

## Option 1: AWS Amplify (Recommended - Easiest)

### Step 1: Set up AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click "New app" → "Host web app"
3. Connect your Git repository (GitHub, GitLab, Bitbucket)
4. Select your branch (usually `main` or `master`)
5. Amplify will auto-detect the build settings from `amplify.yml`

### Step 2: Configure Build Settings

The `amplify.yml` file is already configured. Amplify will:
- Install dependencies
- Build the frontend
- Deploy to CDN

### Step 3: Add Custom Domain

1. In Amplify Console, go to "Domain management"
2. Click "Add domain"
3. Enter `fr0strated.me`
4. Follow the DNS configuration instructions
5. Update your domain's DNS records as instructed

### Step 4: Deploy Backend (Separate)

The backend needs to be deployed separately. Options:
- **AWS Lambda + API Gateway** (Serverless - Recommended)
- **AWS EC2** (Traditional server)
- **AWS Elastic Beanstalk** (Managed platform)

## Option 2: AWS S3 + CloudFront + Route 53

### Step 1: Create S3 Bucket

```bash
aws s3 mb s3://fr0strated-portfolio
aws s3 website s3://fr0strated-portfolio --index-document index.html
```

### Step 2: Configure Bucket Policy

Create `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::fr0strated-portfolio/*"
    }
  ]
}
```

Apply it:
```bash
aws s3api put-bucket-policy --bucket fr0strated-portfolio --policy file://bucket-policy.json
```

### Step 3: Deploy Frontend

```bash
npm run build
aws s3 sync dist/ s3://fr0strated-portfolio --delete
```

### Step 4: Set up CloudFront

1. Go to CloudFront Console
2. Create distribution
3. Origin: Your S3 bucket
4. Default root object: `index.html`
5. Add custom domain: `fr0strated.me`
6. Configure SSL certificate (use AWS Certificate Manager)

### Step 5: Configure Route 53

1. Go to Route 53 Console
2. Create hosted zone for `fr0strated.me`
3. Update nameservers in your domain registrar
4. Create A record pointing to CloudFront distribution

## Option 3: AWS EC2 (Full Control)

### Step 1: Launch EC2 Instance

1. Launch Ubuntu 22.04 LTS instance
2. Configure security group (ports 80, 443, 22, 3000)
3. Allocate Elastic IP

### Step 2: Set up Server

SSH into your instance:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install PM2:
```bash
sudo npm install -g pm2
```

### Step 3: Deploy Application

```bash
# Clone your repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install
cd server && npm install && cd ..

# Build frontend
npm run build

# Start backend with PM2
cd server
pm2 start index.js --name portfolio-api
pm2 save
pm2 startup
```

### Step 4: Set up Nginx

```bash
sudo apt install nginx
```

Create `/etc/nginx/sites-available/fr0strated.me`:
```nginx
server {
    listen 80;
    server_name fr0strated.me www.fr0strated.me;

    location / {
        root /home/ubuntu/portfolio/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/fr0strated.me /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Set up SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d fr0strated.me -d www.fr0strated.me
```

## Backend Deployment Options

### Option A: AWS Lambda + API Gateway (Serverless)

1. Install Serverless Framework:
```bash
npm install -g serverless
```

2. Create `serverless.yml` (see below)

3. Deploy:
```bash
cd server
serverless deploy
```

### Option B: AWS Elastic Beanstalk

1. Install EB CLI:
```bash
pip install awsebcli
```

2. Initialize:
```bash
cd server
eb init
eb create portfolio-api
eb deploy
```

## Environment Variables

Create `.env` file in `server/`:
```env
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://fr0strated.me
# Add other environment variables as needed
```

## DNS Configuration

For `fr0strated.me`, configure:

- **A Record**: Point to your CloudFront/EC2 IP
- **CNAME Record**: `www.fr0strated.me` → `fr0strated.me`
- **Nameservers**: Use Route 53 nameservers if using Route 53

## SSL Certificate

Use AWS Certificate Manager (ACM) for SSL:
1. Request certificate for `fr0strated.me` and `*.fr0strated.me`
2. Validate via DNS
3. Attach to CloudFront or Load Balancer

## Monitoring

Set up:
- CloudWatch for logs and metrics
- AWS X-Ray for tracing (optional)
- SNS for alerts

## Cost Estimation

- **Amplify**: ~$1-5/month (free tier available)
- **S3 + CloudFront**: ~$1-3/month
- **EC2**: ~$5-20/month (t2.micro free tier available)
- **Route 53**: ~$0.50/month per hosted zone
- **Lambda**: Pay per request (very cheap)

## Next Steps

1. Choose your deployment option
2. Set up your domain DNS
3. Configure SSL
4. Deploy backend
5. Update frontend API endpoints
6. Test everything!

## Support

For issues, check:
- AWS Documentation
- AWS Support Forums
- Your deployment logs

