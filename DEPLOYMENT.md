# AWS Deployment Guide

This guide will walk you through deploying your MERN portfolio application to AWS using GitHub Actions.

## 📋 Prerequisites

1. **AWS Account** with appropriate permissions
2. **GitHub Repository** with Actions enabled
3. **AWS CLI** installed locally (for initial setup)
4. **Domain name** (optional but recommended)

## 🏗️ Architecture Overview

- **Frontend**: React app → S3 bucket → CloudFront (CDN)
- **Backend**: Node.js/Express → Elastic Beanstalk
- **Database**: PostgreSQL (RDS or external)

## 🚀 Step-by-Step Setup

### 1. AWS Infrastructure Setup

#### A. Create S3 Bucket for Frontend

```bash
# Create bucket
aws s3 mb s3://your-portfolio-frontend --region us-east-1

# Enable static website hosting
aws s3 website s3://your-portfolio-frontend \
  --index-document index.html \
  --error-document index.html

# Set bucket policy for public read access
cat > bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-portfolio-frontend/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
  --bucket your-portfolio-frontend \
  --policy file://bucket-policy.json
```

#### B. Create CloudFront Distribution (Recommended)

1. Go to AWS Console → CloudFront
2. Create Distribution
3. Origin Domain: Select your S3 bucket
4. Viewer Protocol Policy: Redirect HTTP to HTTPS
5. Default Root Object: `index.html`
6. Create Distribution
7. Note the Distribution ID

#### C. Setup Backend - Elastic Beanstalk

1. Go to AWS Console → Elastic Beanstalk
2. Create Application
3. Create Environment:
   - Platform: Node.js
   - Platform version: Latest
   - Application code: Sample application (we'll deploy via GitHub Actions)
4. Configure environment variables in EB console
5. Note Application and Environment names

### 2. GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

#### Required Secrets:

| Secret Name             | Description        | Example                                    |
| ----------------------- | ------------------ | ------------------------------------------ |
| `AWS_ACCESS_KEY_ID`     | AWS IAM access key | `AKIAIOSFODNN7EXAMPLE`                     |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION`            | AWS region         | `us-east-1`                                |
| `S3_BUCKET_NAME`        | S3 bucket name     | `your-portfolio-frontend`                  |

#### Frontend Secrets:

| Secret Name                  | Description                           | Example                      |
| ---------------------------- | ------------------------------------- | ---------------------------- |
| `VITE_API_URL`               | Backend API URL                       | `https://api.yourdomain.com` |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID (optional) | `E1234567890ABC`             |

#### Backend Secrets (Elastic Beanstalk):

| Secret Name           | Description         | Example                  |
| --------------------- | ------------------- | ------------------------ |
| `EB_APPLICATION_NAME` | EB application name | `portfolio-backend`      |
| `EB_ENVIRONMENT_NAME` | EB environment name | `portfolio-backend-prod` |

#### Database Secrets (if using migrations):

| Secret Name      | Description                     | Example                               |
| ---------------- | ------------------------------- | ------------------------------------- |
| `RUN_MIGRATIONS` | Set to `true` to run migrations | `true`                                |
| `DATABASE_URL`   | Full database URL (optional)    | `postgresql://user:pass@host:5432/db` |
| `PG_HOST`        | Database host                   | `your-db.region.rds.amazonaws.com`    |
| `PG_PORT`        | Database port                   | `5432`                                |
| `PG_USER`        | Database user                   | `postgres`                            |
| `PG_PASS`        | Database password               | `your-password`                       |
| `PG_DB`          | Database name                   | `portfolio_db`                        |
| `PG_SSL`         | Use SSL (true/false)            | `true`                                |

### 3. IAM User Setup

Create an IAM user with the following permissions:

1. Go to AWS Console → IAM → Users → Create User
2. Attach policies:
   - `AmazonS3FullAccess` (or create custom policy for specific bucket)
   - `CloudFrontFullAccess` (if using CloudFront)
   - `ElasticBeanstalkFullAccess` (if using EB)
   - Or create custom policy with minimal permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-portfolio-frontend",
        "arn:aws:s3:::your-portfolio-frontend/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "*"
    }
  ]
}
```

3. Create Access Key → Save credentials for GitHub secrets

### 4. SSH Key Setup for EC2

If deploying to EC2, you need to add your SSH private key to GitHub secrets:

```bash
# Copy your private key content
cat ~/.ssh/your-ec2-key.pem

# Copy the entire output including -----BEGIN and -----END lines
# Paste into GitHub secret: EC2_SSH_KEY
```

### 5. Enable GitHub Actions

1. Go to repository → Settings → Actions → Gener
2. Enable "Allow all actions and reusable workflows"
3. Save

### 6. Deploy

#### Automatic Deployment

Push to `main` or `master` branch:

```bash
git add .
git commit -m "Setup deployment"
git push origin main
```

GitHub Actions will automatically:

- Build and deploy frontend to S3
- Invalidate CloudFront cache
- Deploy backend to EC2/EB

#### Manual Deployment

Go to repository → Actions → Select workflow → Run workflow

### 7. Post-Deployment

#### SSL Certificate (HTTPS)

1. **For CloudFront**: Use AWS Certificate Manager (ACM)

   - Request certificate in `us-east-1` region (required for CloudFront)
   - Add to CloudFront distribution

2. **For Elastic Beanstalk**: Use AWS Certificate Manager (ACM)
   - Request certificate in your region
   - Configure HTTPS listener in Elastic Beanstalk environment

#### Database Setup

1. Create PostgreSQL database (RDS or external)
2. Run migrations:
   - Option 1: Set `RUN_MIGRATIONS=true` in GitHub secrets (automatic)
   - Option 2: Run manually via EB SSH or locally with database credentials

#### Monitoring

- **CloudWatch Logs** (Elastic Beanstalk): Automatic logging enabled
  - View logs in AWS Console → Elastic Beanstalk → Your Environment → Logs
  - Or use AWS CLI: `aws elasticbeanstalk request-environment-info --environment-name <env-name>`

## 🔧 Troubleshooting

### Frontend Issues

- **404 errors on refresh**: Ensure S3 bucket has error document set to `index.html`
- **API calls failing**: Check `VITE_API_URL` secret matches your backend URL
- **CloudFront not updating**: Check invalidation in CloudFront console

### Backend Issues

- **Connection refused**: Check Elastic Beanstalk environment health and security groups
- **Database connection failed**: Verify database credentials and security groups
- **Deployment failed**: Check Elastic Beanstalk logs in AWS Console

### GitHub Actions Issues

- **AWS credentials error**: Verify IAM user has correct permissions
- **Elastic Beanstalk deployment failed**: Check EB application and environment names match your secrets
- **Deployment timeout**: Increase `wait_for_environment_recovery` in workflow file

## 📝 Environment Variables Reference

### Backend (.env on server)

```env
PORT=5002
CLIENT_ORIGIN=https://your-frontend-domain.com
DATABASE_URL=postgresql://user:pass@host:5432/db
# OR
PG_HOST=your-db-host
PG_PORT=5432
PG_USER=your-db-user
PG_PASS=your-db-password
PG_DB=your-db-name
PG_SSL=true
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend (Build-time)

Set `VITE_API_URL` in GitHub secrets for production builds.

## 🔒 Security Best Practices

1. **Never commit secrets**: Use GitHub Secrets
2. **Use IAM roles**: Prefer IAM roles over access keys when possible
3. **Enable MFA**: On AWS account and GitHub
4. **Rotate keys**: Regularly rotate AWS access keys
5. **Use HTTPS**: Always use SSL/TLS certificates
6. **Database security**: Use RDS with VPC, enable SSL
7. **Rate limiting**: Already configured in backend
8. **CORS**: Configured to only allow your frontend domain

## 💰 Cost Estimation

- **S3**: ~$0.023/GB storage + $0.005/1000 requests
- **CloudFront**: ~$0.085/GB data transfer
- **Elastic Beanstalk**: Free tier eligible (750 hours/month for t2/t3 instances)
- **RDS**: ~$15/month for db.t2.micro (free tier eligible)
- **Total**: ~$0-20/month (depending on traffic)

## 📚 Additional Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
