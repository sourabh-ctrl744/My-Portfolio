# Elastic Beanstalk Environment Variables Setup

## 🔴 Critical Error: Health Status "Red/Degraded"

This usually means your application failed to start, often due to missing environment variables.

## ✅ Required Environment Variables

### 1. **Database Configuration** (REQUIRED - Server won't start without this)

**Option A: Using DATABASE_URL (Recommended)**
```
DATABASE_URL=postgresql://username:password@host:5432/database_name
PG_SSL=true
```

**Option B: Using Individual Variables**
```
PG_HOST=your-db-host.rds.amazonaws.com
PG_PORT=5432
PG_USER=your_db_username
PG_PASS=your_db_password
PG_DB=your_database_name
PG_SSL=true
```

### 2. **Server Configuration** (REQUIRED)

```
PORT=5002
CLIENT_ORIGIN=https://your-frontend-domain.com
```

**Important Notes:**
- `PORT`: Elastic Beanstalk might override this, but set it anyway
- `CLIENT_ORIGIN`: Must match your frontend URL (S3 bucket URL or CloudFront URL)
  - Example: `https://your-bucket.s3-website-ap-southeast-2.amazonaws.com`
  - Or: `https://your-cloudfront-domain.cloudfront.net`

### 3. **Node Environment** (RECOMMENDED)

```
NODE_ENV=production
```

### 4. **Email Configuration** (OPTIONAL - Only if you want email notifications)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_TO=recipient@example.com
```

## 📝 How to Add Environment Variables in Elastic Beanstalk

### Method 1: Via AWS Console (Easiest)

1. Go to **AWS Console** → **Elastic Beanstalk**
2. Click on your **Application name**
3. Click on your **Environment name**
4. Click **Configuration** in the left sidebar
5. Scroll down to **Software** section
6. Click **Edit**
7. Scroll to **Environment properties**
8. Add each variable:
   - Click **Add environment property**
   - Enter **Name** and **Value**
   - Repeat for each variable
9. Click **Apply** at the bottom
10. Wait for environment update to complete (2-5 minutes)

### Method 2: Via AWS CLI

```bash
aws elasticbeanstalk update-environment \
  --environment-name YOUR_ENV_NAME \
  --option-settings \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=DATABASE_URL,Value=postgresql://user:pass@host:5432/db \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=CLIENT_ORIGIN,Value=https://your-frontend.com \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=PORT,Value=5002 \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=NODE_ENV,Value=production \
  --region ap-southeast-2
```

## 🎯 Minimum Required Variables (Start with these)

Add these **minimum** variables to get your server running:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname
PG_SSL=true
CLIENT_ORIGIN=https://your-frontend-url.com
PORT=5002
NODE_ENV=production
```

## 🔍 How to Check Current Environment Variables

**Via AWS Console:**
1. EB → Your Environment → Configuration → Software → Environment properties

**Via AWS CLI:**
```bash
aws elasticbeanstalk describe-configuration-settings \
  --application-name YOUR_APP_NAME \
  --environment-name YOUR_ENV_NAME \
  --region ap-southeast-2
```

## 🐛 Troubleshooting

### Error: "DB connection failed"

**Cause:** Database connection variables are missing or incorrect

**Fix:**
1. Verify database credentials are correct
2. Check database security group allows EB security group
3. If using RDS, ensure it's in the same VPC or accessible
4. Test connection:
   ```bash
   psql "postgresql://user:pass@host:5432/db"
   ```

### Error: "Health Status: Red"

**Common Causes:**
1. ❌ Missing `DATABASE_URL` or database variables
2. ❌ Database connection failing (wrong credentials/network)
3. ❌ `CLIENT_ORIGIN` not set (CORS issues)
4. ❌ Application crashes on startup

**How to Debug:**
1. Go to EB → Your Environment → **Logs**
2. Click **Request Logs** → **Last 100 Lines**
3. Look for error messages
4. Check **Full Logs** for detailed errors

### Check Application Logs

**Via AWS Console:**
1. EB → Your Environment → **Logs** (left sidebar)
2. Click **Request Logs** → **Last 100 Lines**
3. Or click **Full Logs** → **Request** (downloads full log)

**Via AWS CLI:**
```bash
aws elasticbeanstalk request-environment-info \
  --environment-name YOUR_ENV_NAME \
  --info-type tail \
  --region ap-southeast-2
```

## 📋 Quick Checklist

Before redeploying, ensure you have:

- [ ] `DATABASE_URL` OR (`PG_HOST`, `PG_PORT`, `PG_USER`, `PG_PASS`, `PG_DB`, `PG_SSL`)
- [ ] `CLIENT_ORIGIN` (your frontend URL)
- [ ] `PORT=5002`
- [ ] `NODE_ENV=production`
- [ ] Database is accessible from EB environment
- [ ] Database security group allows EB security group

## 🚀 After Adding Variables

1. **Wait for environment update** (2-5 minutes)
2. **Check health status** - should turn green
3. **Test the API:**
   ```bash
   curl https://your-eb-env.region.elasticbeanstalk.com/api/health
   ```
   Should return: `{"ok":true,"time":"..."}`

## 💡 Pro Tips

1. **CLIENT_ORIGIN**: Must include protocol (`https://`) and no trailing slash
2. **Database**: If using RDS, ensure it's in the same VPC or has proper security group rules
3. **SSL**: Set `PG_SSL=true` for RDS or remote databases
4. **Port**: EB usually handles port automatically, but setting it doesn't hurt
5. **Secrets**: Never commit these values to git - use EB environment variables

## 🔐 Security Notes

- Environment variables in EB are encrypted at rest
- They're only accessible to your application
- Use IAM roles when possible instead of hardcoding credentials
- Rotate database passwords regularly

