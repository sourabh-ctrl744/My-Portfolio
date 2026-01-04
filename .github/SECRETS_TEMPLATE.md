# GitHub Secrets Template

Copy this template and fill in your values in GitHub repository settings.

## Required Secrets

```
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-portfolio-frontend
```

## Frontend Secrets

```
VITE_API_URL=https://api.yourdomain.com
CLOUDFRONT_DISTRIBUTION_ID=E1234567890ABC
```

## Backend Secrets (Elastic Beanstalk)

```
EB_APPLICATION_NAME=portfolio-backend
EB_ENVIRONMENT_NAME=portfolio-backend-prod
```

## Database Secrets (Optional - for migrations)

```
RUN_MIGRATIONS=true
DATABASE_URL=postgresql://user:pass@host:5432/db
# OR use individual vars:
PG_HOST=your-db.region.rds.amazonaws.com
PG_PORT=5432
PG_USER=postgres
PG_PASS=your-password
PG_DB=portfolio_db
PG_SSL=true
```

## How to Add Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret name and value
5. Click **Add secret**

## Notes

- Never commit actual secrets to the repository
- Use different secrets for different environments (staging/production)
- Rotate secrets regularly for security
- Ensure `AWS_REGION` matches the region where your S3 bucket and Elastic Beanstalk environment are located
