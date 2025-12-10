#!/bin/bash

# AWS Deployment Script for fr0strated.me
# This script helps deploy your portfolio to AWS

echo "🚀 Starting AWS Deployment for fr0strated.me"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Build frontend
echo "📦 Building frontend..."
npm run build

# Deploy to S3 (if using S3 + CloudFront)
if [ "$1" == "s3" ]; then
    echo "📤 Deploying to S3..."
    aws s3 sync dist/ s3://fr0strated-portfolio --delete
    echo "✅ Frontend deployed to S3"
    echo "⚠️  Don't forget to configure CloudFront and Route 53 for your domain"
fi

# Deploy to EC2 (if using EC2)
if [ "$1" == "ec2" ]; then
    echo "📤 Deploying to EC2..."
    echo "⚠️  Make sure you have configured your EC2 instance and deployment keys"
    # Add your EC2 deployment commands here
fi

echo "✅ Deployment complete!"

