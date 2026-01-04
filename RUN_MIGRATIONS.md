# How to Run Database Migrations

## ❌ Problem

GitHub Actions can't connect to your RDS database because:
- RDS is in a private VPC/subnet
- Security groups don't allow GitHub Actions IPs
- GitHub Actions IPs are dynamic and change

## ✅ Solution: Run Migrations from Elastic Beanstalk

Since EB instances are in the same VPC as RDS, they can connect to the database.

### Option 1: Run Migrations via EB SSH (Recommended - First Time)

1. **Enable SSH access in Elastic Beanstalk:**
   - Go to AWS Console → Elastic Beanstalk
   - Click your **Environment**
   - Click **Configuration** → **Security**
   - Under **EC2 key pair**, select or create a key pair
   - Click **Apply**

2. **Get your EC2 instance ID:**
   - In EB console, go to **Configuration** → **Instances**
   - Note the **Instance ID** (e.g., `i-1234567890abcdef0`)

3. **SSH into the instance:**
   ```bash
   # Get the instance public IP or use EB's SSH feature
   # Option A: Via EB Console
   # - Click "SSH" button in EB console (if available)
   
   # Option B: Via AWS CLI
   aws ec2 describe-instances \
     --instance-ids i-1234567890abcdef0 \
     --query 'Reservations[0].Instances[0].PublicIpAddress' \
     --output text
   
   # Then SSH
   ssh -i your-key.pem ec2-user@<public-ip>
   ```

4. **Run migrations:**
   ```bash
   cd /var/app/current
   npm run db:migrate
   ```

### Option 2: Run Migrations via EB Console (Easier)

1. **Go to Elastic Beanstalk Console**
2. **Click your Environment**
3. **Click "SSH" button** (if available in your EB console)
4. **Or use EB CLI:**
   ```bash
   eb ssh
   cd /var/app/current
   npm run db:migrate
   ```

### Option 3: Use EB Container Commands (Automatic)

I've created a post-deploy hook that will run migrations automatically after each deployment.

**File created:** `.platform/hooks/postdeploy/01_migrate.sh`

This will run migrations automatically after each deployment. Make sure the script is executable:

```bash
chmod +x .platform/hooks/postdeploy/01_migrate.sh
```

### Option 4: Run Migrations on Application Startup

You can also run migrations when the app starts by modifying the startup process, but this is less recommended as it slows down startup.

## 🚀 Quick Steps (First Time Setup)

1. **SSH into your EB instance** (see Option 1 or 2 above)

2. **Navigate to app directory:**
   ```bash
   cd /var/app/current
   ```

3. **Check environment variables are set:**
   ```bash
   echo $DATABASE_URL
   # Should show your database URL
   ```

4. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

5. **Verify tables were created:**
   ```bash
   # Connect to your database and check
   psql $DATABASE_URL -c "\dt"
   # Should show: Messages, Ratings, SequelizeMeta
   ```

## 🔧 Troubleshooting

### Error: "command not found: npm"

**Fix:** Node.js might not be in PATH. Try:
```bash
export PATH=$PATH:/opt/elasticbeanstalk/node-install/node-v18.20.8-linux-x64/bin
npm run db:migrate
```

### Error: "DATABASE_URL not set"

**Fix:** Environment variables might not be loaded. Check:
```bash
# In EB instance
env | grep DATABASE
```

If not set, add it in EB Configuration → Software → Environment properties.

### Error: "Permission denied"

**Fix:** Make sure you're in the right directory:
```bash
cd /var/app/current
sudo npm run db:migrate
```

## 📝 After First Migration

Once migrations run successfully the first time, you have two options:

1. **Manual (each deployment):** SSH and run `npm run db:migrate`
2. **Automatic:** The post-deploy hook (`.platform/hooks/postdeploy/01_migrate.sh`) will run migrations automatically after each deployment

## ✅ Verify Migrations Worked

After running migrations, check your database:

```bash
# Connect to database
psql $DATABASE_URL

# List tables
\dt

# Should see:
# - Messages
# - Ratings  
# - SequelizeMeta (tracks which migrations ran)
```

Or test via your API:
```bash
curl http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com/api/health
```

