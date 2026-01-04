# Elastic Beanstalk Deployment Error Fix

## Error Message
```
Error: Deployment failed: Error: Status: 400. Code: InvalidParameterValue, 
Message: No Application named '***' found.
```

## Root Cause
The `EB_APPLICATION_NAME` secret in GitHub doesn't match an existing Elastic Beanstalk application in your AWS account.

## How to Fix

### Step 1: Verify Your Elastic Beanstalk Application Name

**Option A: Via AWS Console**
1. Go to AWS Console → Elastic Beanstalk
2. Look at the left sidebar - you'll see your **Application name** at the top
3. Click on it to see all environments
4. Note the **exact** application name (case-sensitive)

**Option B: Via AWS CLI**
```bash
aws elasticbeanstalk describe-applications --region ap-southeast-2
```

This will list all applications. Look for the `ApplicationName` field.

### Step 2: Verify Your Environment Name

**Option A: Via AWS Console**
1. In Elastic Beanstalk, click on your application
2. You'll see a list of environments
3. Note the **exact** environment name (case-sensitive)

**Option B: Via AWS CLI**
```bash
aws elasticbeanstalk describe-environments \
  --application-name YOUR_APP_NAME \
  --region ap-southeast-2
```

### Step 3: Update GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Find `EB_APPLICATION_NAME` and click the pencil icon
4. Update it with the **exact** name from Step 1 (case-sensitive, no extra spaces)
5. Find `EB_ENVIRONMENT_NAME` and update it with the **exact** name from Step 2
6. Verify `AWS_REGION` matches your EB region (e.g., `ap-southeast-2`)

### Step 4: Verify Region Matches

Make sure your `AWS_REGION` secret matches where your Elastic Beanstalk application is located:
- If your EB app is in **Asia Pacific (Sydney)**, use: `ap-southeast-2`
- If your EB app is in **US East (N. Virginia)**, use: `us-east-1`

### Step 5: Re-run the Workflow

After updating the secrets:
1. Go to **Actions** tab
2. Click on the failed workflow run
3. Click **Re-run all jobs**

Or push a new commit to trigger a new deployment.

## Common Mistakes

❌ **Wrong**: Application name has extra spaces or different casing
✅ **Correct**: Exact match, case-sensitive

❌ **Wrong**: Using environment name as application name
✅ **Correct**: Application name is the parent, environment is the child

❌ **Wrong**: Region mismatch
✅ **Correct**: Region in secret matches where EB app was created

## Quick Check Commands

```bash
# List all applications in your region
aws elasticbeanstalk describe-applications --region ap-southeast-2

# List environments for a specific application
aws elasticbeanstalk describe-environments \
  --application-name YOUR_APP_NAME \
  --region ap-southeast-2

# Get detailed info about an environment
aws elasticbeanstalk describe-environment-health \
  --environment-name YOUR_ENV_NAME \
  --attribute-names All \
  --region ap-southeast-2
```

## If Application Doesn't Exist

If you don't have an Elastic Beanstalk application yet:

1. **Create via AWS Console:**
   - Go to Elastic Beanstalk → Create Application
   - Application name: `portfolio-backend` (or your preferred name)
   - Platform: Node.js
   - Platform version: Latest
   - Create environment (choose a name like `portfolio-backend-prod`)
   - Configure environment variables in EB console
   - Note the exact application and environment names

2. **Add to GitHub Secrets:**
   - `EB_APPLICATION_NAME`: The application name you created
   - `EB_ENVIRONMENT_NAME`: The environment name you created
   - `AWS_REGION`: The region where you created it

## Still Having Issues?

Double-check:
- [ ] Application name in GitHub secret matches AWS exactly
- [ ] Environment name in GitHub secret matches AWS exactly  
- [ ] Region in GitHub secret matches where EB app exists
- [ ] IAM user has `elasticbeanstalk:*` permissions
- [ ] Application and environment are in the same AWS account

