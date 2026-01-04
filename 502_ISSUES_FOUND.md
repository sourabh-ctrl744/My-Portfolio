# 502 Error - Issues Found & Fixed

## 🔴 CRITICAL ISSUE #1: Not Binding to 0.0.0.0

**Found in:** `server/src/index.js` line 42

**Problem:**
```javascript
app.listen(PORT, () => console.log(...));  // ❌ WRONG
```

**Fixed to:**
```javascript
app.listen(PORT, '0.0.0.0', () => { ... });  // ✅ CORRECT
```

**Why this causes 502:**
- Without `'0.0.0.0'`, Express binds to `localhost` only
- Nginx (reverse proxy) cannot reach `localhost` from outside
- Result: 502 Bad Gateway

**Status:** ✅ FIXED

---

## ⚠️ ISSUE #2: Database Connection Failure Causes App Exit

**Found in:** `server/src/index.js` line 44-45

**Problem:**
```javascript
catch (e) {
  console.error('❌ DB connection failed:', e.message);
  process.exit(1);  // ❌ App exits if DB fails
}
```

**Impact:**
- If database connection fails, app exits immediately
- EB shows app as "started" but it's actually dead
- Result: 502 Bad Gateway

**Recommendation:**
- Keep this for now (better to fail fast)
- But ensure DATABASE_URL is set correctly in EB
- Ensure RDS security group allows EB access

**Status:** ⚠️ Keep as-is, but ensure DB is accessible

---

## ✅ CHECKED: package.json Start Script

**Found in:** `server/package.json` line 8

**Status:** ✅ CORRECT
```json
{
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js"
  }
}
```

- ✅ `main` points to correct file
- ✅ `start` script matches main file
- ✅ No issues here

---

## ⚠️ ISSUE #3: Application Root Directory

**Problem:**
Your backend is in `/server` folder, but EB might be looking in root.

**Check in EB Console:**
1. Go to **Configuration** → **Software**
2. Look for **Application root** setting
3. **Should be set to:** `server`

**If not set:**
- EB will run `npm start` in root directory
- Won't find `package.json` in root
- Result: 502 Bad Gateway

**Fix:**
1. EB → Configuration → Software → Edit
2. Set **Application root** = `server`
3. Apply and redeploy

**Status:** ⚠️ NEEDS VERIFICATION

---

## ⚠️ ISSUE #4: Node Version Compatibility

**Current:** Unknown (need to check EB platform)

**Recommendation:**
- Use **Node.js 20** (stable, well-supported)
- Avoid Node 24 (too new, compatibility issues)

**Check in EB:**
1. Configuration → Platform
2. Should show: "Node.js 20 running on 64bit Amazon Linux 2023"

**If using Node 24:**
1. Platform → Change platform version
2. Select: "Node.js 20 running on 64bit Amazon Linux 2023"
3. Redeploy

**Status:** ⚠️ NEEDS VERIFICATION

---

## 📋 Summary of Fixes

### ✅ Fixed:
1. **Binding to 0.0.0.0** - App now listens on all interfaces

### ⚠️ Needs Action:
1. **Set Application Root** in EB to `server`
2. **Verify Node version** is 20 (not 24)
3. **Ensure DATABASE_URL** is set in EB environment variables
4. **Ensure RDS security group** allows EB security group

### ✅ Already Correct:
1. package.json start script
2. PORT usage from process.env

---

## 🚀 Next Steps

1. **Commit the fix:**
   ```bash
   git add server/src/index.js
   git commit -m "Fix: Bind app to 0.0.0.0 for EB compatibility"
   git push origin main
   ```

2. **Verify EB Configuration:**
   - Application root = `server`
   - Node version = 20
   - DATABASE_URL environment variable set

3. **Redeploy:**
   - Push will trigger automatic deployment
   - Or manually trigger workflow

4. **Test:**
   ```bash
   curl http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/health
   ```

5. **Check Logs:**
   - EB → Logs → Request Logs
   - Should see: "✅ API running on port XXXX"
   - Should see: "✅ Listening on 0.0.0.0:XXXX"

---

## 🎯 Expected Result After Fix

- ✅ Health endpoint works: `/api/health`
- ✅ No more 502 errors
- ✅ Backend accessible from nginx
- ✅ Can make API calls from frontend

