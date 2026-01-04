# Frontend API Configuration Fix

## ❌ Current Problem

Your frontend is calling APIs using the S3 bucket URL:
```
http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com/api/messages
```

This is **WRONG** because:
- S3 is just static file hosting
- Your backend API is on **Elastic Beanstalk**
- API calls should go to your EB URL, not S3

## ✅ Solution

### Step 1: Get Your Elastic Beanstalk URL

1. Go to **AWS Console** → **Elastic Beanstalk**
2. Click on your **Application** → **Environment**
3. Find the **URL** at the top (e.g., `http://your-app.ap-southeast-2.elasticbeanstalk.com`)
4. Copy this URL

### Step 2: Add VITE_API_URL to GitHub Secrets

1. Go to **GitHub** → Your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_API_URL`
4. Value: Your Elastic Beanstalk URL (e.g., `http://your-app.ap-southeast-2.elasticbeanstalk.com`)
5. Click **Add secret**

**Important:** 
- Use `http://` or `https://` (depending on your EB setup)
- **No trailing slash** at the end
- Example: `http://portfolio-backend.ap-southeast-2.elasticbeanstalk.com`

### Step 3: Rebuild and Redeploy Frontend

After adding the secret:

1. **Option A: Push a change to trigger deployment**
   ```bash
   git add .
   git commit -m "Update API configuration"
   git push origin main
   ```

2. **Option B: Manually trigger workflow**
   - Go to **Actions** tab
   - Select **Deploy Frontend to S3** workflow
   - Click **Run workflow**

### Step 4: Verify

After deployment, check your browser's Network tab:
- API calls should now go to: `http://your-eb-url.elasticbeanstalk.com/api/messages`
- Not: `http://portfolio-frontend-sourabh.s3-website.../api/messages`

## 🔧 What I Fixed in Code

1. **Updated `api.js`**: Added helper functions for ratings API
2. **Updated `RatePortfolio.jsx`**: Now uses the API service instead of direct `fetch()`

## 📝 Example URLs

### Correct Setup:

**GitHub Secret `VITE_API_URL`:**
```
http://portfolio-backend.ap-southeast-2.elasticbeanstalk.com
```

**Frontend will call:**
```
http://portfolio-backend.ap-southeast-2.elasticbeanstalk.com/api/messages
http://portfolio-backend.ap-southeast-2.elasticbeanstalk.com/api/ratings
```

### Wrong Setup (Current):

**If `VITE_API_URL` is empty or wrong:**
```
http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com/api/messages
```
❌ This won't work because S3 doesn't have your backend!

## 🚨 Common Issues

### Issue: Still calling S3 URL after fix

**Cause:** Frontend was built before adding `VITE_API_URL` secret

**Fix:** 
1. Verify secret is set correctly in GitHub
2. Rebuild frontend (push a change or manually trigger workflow)
3. Clear browser cache

### Issue: CORS errors

**Cause:** Backend `CLIENT_ORIGIN` doesn't match frontend URL

**Fix:**
1. Go to **Elastic Beanstalk** → **Configuration** → **Software**
2. Update `CLIENT_ORIGIN` to your S3 website URL:
   ```
   CLIENT_ORIGIN=http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com
   ```
   Or if using CloudFront:
   ```
   CLIENT_ORIGIN=https://your-cloudfront-domain.cloudfront.net
   ```

### Issue: Mixed HTTP/HTTPS

**Cause:** Frontend on HTTPS, backend on HTTP (or vice versa)

**Fix:**
- Use HTTPS for both (recommended)
- Or configure CloudFront to proxy API calls
- Or set up SSL certificate for Elastic Beanstalk

## ✅ Quick Checklist

- [ ] Got Elastic Beanstalk URL
- [ ] Added `VITE_API_URL` to GitHub secrets (no trailing slash)
- [ ] Updated `CLIENT_ORIGIN` in EB environment variables
- [ ] Rebuilt and redeployed frontend
- [ ] Tested API calls in browser Network tab
- [ ] Verified API calls go to EB URL, not S3 URL

