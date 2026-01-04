# API Error Troubleshooting Guide

## 🔍 How to Find the Actual Error

1. **Open Browser Console** (F12 or Right-click → Inspect → Console)
2. **Check Network Tab** → Click on the failed request → **Response** tab
3. Look for red error messages

## 🚨 Common Errors & Fixes

### Error 1: CORS Error

**Error Message:**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Cause:** `CLIENT_ORIGIN` in Elastic Beanstalk doesn't match your frontend URL

**Fix:**
1. Go to **AWS Console** → **Elastic Beanstalk** → Your Environment
2. **Configuration** → **Software** → **Edit**
3. Find `CLIENT_ORIGIN` environment variable
4. Set it to your **exact** frontend URL:
   ```
   CLIENT_ORIGIN=http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com
   ```
   - **Important:** 
     - Use `http://` (not `https://` if your S3 is HTTP)
     - **No trailing slash** at the end
     - Must match exactly (case-sensitive)
5. Click **Apply** and wait 2-5 minutes

### Error 2: Connection Refused / Network Error

**Error Message:**
```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```

**Cause:** Backend is not running or not accessible

**Check:**
1. Go to **Elastic Beanstalk** → Your Environment
2. Check **Health Status** (should be Green)
3. If Red/Yellow, check **Logs** → **Request Logs**

**Fix:**
- If health is Red, backend likely crashed (check database connection)
- Check EB logs for errors

### Error 3: 500 Internal Server Error

**Error Message:**
```
500 Internal Server Error
```

**Cause:** Backend error (database connection, code error, etc.)

**Fix:**
1. Check **Elastic Beanstalk Logs**:
   - EB → Your Environment → **Logs** → **Request Logs** → **Last 100 Lines**
2. Look for error messages
3. Common causes:
   - Database connection failed
   - Missing environment variables
   - Code errors

### Error 4: 404 Not Found

**Error Message:**
```
404 Not Found
```

**Cause:** Route doesn't exist or backend not deployed correctly

**Fix:**
- Verify backend is deployed
- Check if `/api/messages` route exists
- Test health endpoint: `http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/health`

### Error 5: Database Connection Failed

**Error Message in Logs:**
```
❌ DB connection failed: ...
```

**Cause:** Database credentials wrong or RDS not accessible

**Fix:**
1. Verify `DATABASE_URL` in EB environment variables
2. Check RDS security group allows EB security group
3. Test database connection manually

## ✅ Quick Diagnostic Steps

### Step 1: Test Backend Health Endpoint

Open in browser:
```
http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/health
```

**Expected Response:**
```json
{"ok":true,"time":"2026-01-04T..."}
```

**If this fails:** Backend is not running properly

### Step 2: Check Elastic Beanstalk Health

1. Go to **AWS Console** → **Elastic Beanstalk**
2. Click your **Environment**
3. Check **Health Status**:
   - 🟢 **Green** = Good
   - 🟡 **Yellow** = Warning
   - 🔴 **Red** = Error

### Step 3: Check Environment Variables

1. EB → **Configuration** → **Software** → **Environment properties**
2. Verify these are set:
   - `DATABASE_URL` = `postgresql://postgres:...@...:5432/portfolio_db`
   - `CLIENT_ORIGIN` = `http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com`
   - `PORT` = `5002`
   - `NODE_ENV` = `production`

### Step 4: Check Logs

1. EB → **Logs** → **Request Logs** → **Last 100 Lines**
2. Look for:
   - `✅ Database connected` (good)
   - `❌ DB connection failed` (bad)
   - `✅ API running` (good)
   - Any error messages

## 🔧 Most Likely Fix (CORS)

Based on your setup, the most common issue is **CORS**. 

**Quick Fix:**
1. EB → Configuration → Software → Edit
2. Set `CLIENT_ORIGIN` = `http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com`
3. Apply and wait
4. Clear browser cache and retry

## 📝 Test Commands

### Test Backend Directly
```bash
# Health check
curl http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/health

# Test messages endpoint
curl -X POST http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","body":"Test message"}'
```

### Check CORS Headers
```bash
curl -H "Origin: http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS \
  http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/messages \
  -v
```

Look for `Access-Control-Allow-Origin` in response headers.

## 🎯 Quick Checklist

- [ ] Backend health endpoint works (`/api/health`)
- [ ] EB Health Status is Green
- [ ] `CLIENT_ORIGIN` matches frontend URL exactly
- [ ] `DATABASE_URL` is set correctly
- [ ] Database connection successful (check logs)
- [ ] No errors in EB logs
- [ ] Browser console shows actual error message

