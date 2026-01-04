# Debug API Issues - Step by Step

## 🔍 Your Curl Command Analysis

Your curl command looks correct:
- ✅ POST to `/api/messages`
- ✅ Correct Content-Type header
- ✅ Valid JSON payload
- ✅ Has Referer header

## 🚨 Most Likely Issues

### Issue 1: CORS Error (90% chance)

**Symptom:** Request blocked, "Provisional headers shown"

**Fix:**
1. Go to **Elastic Beanstalk** → Your Environment → **Configuration** → **Software** → **Edit**
2. Set `CLIENT_ORIGIN` = `http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com`
   - **No trailing slash**
   - **Exact match** (case-sensitive)
3. Click **Apply** and wait 2-5 minutes
4. Test again

### Issue 2: Database Table Doesn't Exist

**Symptom:** 500 error, "relation 'Messages' does not exist"

**Fix:** Run migrations (see `RUN_MIGRATIONS.md`)

### Issue 3: Backend Not Running

**Symptom:** Connection refused, 502/503 errors

**Fix:** Check EB health status and logs

## 🧪 Test Commands

### Test 1: Health Check (Should work even without CORS)
```bash
curl http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/health
```

**Expected:** `{"ok":true,"time":"..."}`

**If this fails:** Backend is not running

### Test 2: Test CORS Headers
```bash
curl -v -X OPTIONS \
  -H "Origin: http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com" \
  -H "Access-Control-Request-Method: POST" \
  http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/messages
```

**Look for:** `Access-Control-Allow-Origin: http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com`

**If missing:** CORS not configured correctly

### Test 3: Your Exact Request
```bash
curl -v 'http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/messages' \
  -H 'Origin: http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  --data-raw '{"name":"Sourabh Gupta","email":"guptasourabh744@gmail.com","subject":"Test","body":"Test message"}'
```

**Check the response:**
- HTTP status code (200/201 = success, 400 = bad request, 500 = server error)
- Response body
- CORS headers in response

## 🔧 Quick Fix Checklist

Run these tests in order:

1. **Health Check:**
   ```bash
   curl http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/health
   ```
   - ✅ Works = Backend is running
   - ❌ Fails = Backend not running, check EB health

2. **Check CORS:**
   ```bash
   curl -I -X OPTIONS \
     -H "Origin: http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com" \
     http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/messages
   ```
   - ✅ Has `Access-Control-Allow-Origin` = CORS configured
   - ❌ Missing = Set `CLIENT_ORIGIN` in EB

3. **Test POST (from command line - no CORS):**
   ```bash
   curl -X POST \
     http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/messages \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","body":"Test"}'
   ```
   - ✅ Works = API endpoint is fine, issue is CORS
   - ❌ 500 error = Database issue (run migrations)
   - ❌ 400 error = Check request format

## 📋 What to Check in EB Console

1. **Health Status:**
   - EB → Your Environment → Check if Green/Yellow/Red

2. **Environment Variables:**
   - Configuration → Software → Environment properties
   - Verify:
     - `CLIENT_ORIGIN` = `http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com`
     - `DATABASE_URL` = Your database connection string
     - `PORT` = `5002`
     - `NODE_ENV` = `production`

3. **Logs:**
   - Logs → Request Logs → Last 100 Lines
   - Look for:
     - `✅ Database connected` (good)
     - `❌ DB connection failed` (bad - check DATABASE_URL)
     - `✅ API running` (good)
     - Any error messages

## 🎯 Most Likely Solution

Based on your setup, **99% chance it's CORS**. 

**Do this:**
1. EB → Configuration → Software → Edit
2. Set `CLIENT_ORIGIN` = `http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com`
3. Apply
4. Wait 2-5 minutes
5. Test again

## 🚀 Run the Test Script

I've created a test script for you. Run it:

```bash
cd "/Users/sourabhgupta/Downloads/Lifeguru/DSA/portfolio-mern copy"
./test-api.sh
```

This will test all endpoints and show you exactly what's wrong.

