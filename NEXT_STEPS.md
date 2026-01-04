# Next Steps to Deploy

Since you've already created your S3 bucket (`portfolio-frontend-sourabh`) and added GitHub secrets, here's what to do next:

## ✅ Already Completed

- [x] S3 bucket created: `portfolio-frontend-sourabh`
- [x] GitHub secrets added:
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY
  - AWS_REGION
  - EB_APPLICATION_NAME
  - EB_ENVIRONMENT_NAME
  - S3_BUCKET_NAME

## 🔧 Remaining Setup Steps

### 1. Configure S3 Bucket for Static Website Hosting

Your S3 bucket needs to be configured for static website hosting:

**Option A: Via AWS Console**

1. Go to S3 → Select `portfolio-frontend-sourabh` bucket
2. Go to **Properties** tab
3. Scroll to **Static website hosting**
4. Click **Edit**
5. Enable static website hosting
6. Set **Index document**: `index.html`
7. Set **Error document**: `index.html` (for React Router)
8. Save changes

**Option B: Via AWS CLI**

```bash
aws s3 website s3://portfolio-frontend-sourabh \
  --index-document index.html \
  --error-document index.html \
  --region ap-southeast-2
```

### 2. Set S3 Bucket Policy for Public Access

The bucket needs public read access for static files:

1. Go to S3 → Select `portfolio-frontend-sourabh` bucket
2. Go to **Permissions** tab
3. Scroll to **Bucket policy**
4. Click **Edit** and add:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::portfolio-frontend-sourabh/*"
    }
  ]
}
```

5. Save changes

### 3. Block Public Access Settings

1. In the same **Permissions** tab
2. Scroll to **Block public access (bucket settings)**
3. Click **Edit**
4. Uncheck **Block all public access** (or uncheck only "Block public access to buckets and objects granted through new public bucket or access point policies")
5. Confirm and save

### 4. Verify Elastic Beanstalk Environ

Make sure your Elastic Beanstalk environment is set up:

1. Go to AWS Console → Elastic Beanstalk
2. Verify your application and environment exist
3. Check that environment variables are configured:
   - `PORT` (usually 5002 or let EB handle it)
   - `CLIENT_ORIGIN` (your frontend URL)
   - Database credentials (if using)
   - Email credentials (if using)

### 5. Add Missing GitHub Secrets (if needed)

Check if you need to add:

- `VITE_API_URL` - Your backend API URL (e.g., `https://your-eb-env.region.elasticbeanstalk.com`)
- `CLOUDFRONT_DISTRIBUTION_ID` - (Optional) If you set up CloudFront

### 6. Test Deployment

1. Make a small change to trigger deployment:

   ```bash
   # Make a small change in client or server
   git add .
   git commit -m "Trigger deployment"
   git push origin main
   ```

2. Monitor deployment:

   - Go to GitHub → Actions tab
   - Watch the workflow runs
   - Check for any errors

3. Verify deployment:
   - Frontend: Check S3 bucket or CloudFront URL
   - Backend: Check Elastic Beanstalk environment health

## 🚨 Common Issues

### S3 Bucket Not Accessible

- Ensure bucket policy allows public read
- Check Block Public Access settings
- Verify bucket is in the correct region

### Backend Deployment Fails

- Verify `EB_APPLICATION_NAME` and `EB_ENVIRONMENT_NAME` match exactly
- Check IAM user has Elastic Beanstalk permissions
- Verify `AWS_REGION` matches your EB environment region

### Frontend Can't Connect to Backend

- Set `VITE_API_URL` secret to your EB environment URL
- Check CORS settings in backend (should allow your frontend domain)
- Verify backend environment variables are set correctly

## 📝 Quick Commands

```bash
# Check S3 bucket configuration
aws s3api get-bucket-website --bucket portfolio-frontend-sourabh --region ap-southeast-2

# Check bucket policy
aws s3api get-bucket-policy --bucket portfolio-frontend-sourabh --region ap-southeast-2

# List EB environments
aws elasticbeanstalk describe-environments --region ap-southeast-2
```

## 🎯 Ready to Deploy?

Once all steps above are complete, push to your `main` branch and GitHub Actions will automatically deploy!

```bash
git push origin main
```
