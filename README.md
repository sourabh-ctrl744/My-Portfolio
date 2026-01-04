# Portfolio MERN Stack Application

A full-stack portfolio website built with React (Vite), Node.js, Express, and PostgreSQL.

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, Framer Motion, React Hook Form
- **Backend**: Node.js, Express, Sequelize ORM
- **Database**: PostgreSQL
- **Deployment**: AWS (S3 + CloudFront for frontend, Elastic Beanstalk/EC2 for backend)

## 📁 Project Structure

```
portfolio-mern/
├── client/          # React frontend application
├── server/          # Express backend API
└── .github/         # GitHub Actions workflows
```

## 🛠️ Local Development

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sourabh-ctrl744/My-Portfolio.git
   cd portfolio-mern
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env  # Create .env file with your database credentials
   npm run db:migrate    # Run database migrations
   npm run dev           # Start development server
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm run dev           # Start development server
   ```

The frontend will run on `http://localhost:3000` and backend on `http://localhost:5002`.

## 🌐 AWS Deployment Setup

### Prerequisites

1. AWS Account
2. AWS CLI configured
3. S3 bucket for frontend hosting
4. CloudFront distribution (optional, for CDN)
5. Elastic Beanstalk application or EC2 instance for backend

### GitHub Secrets Configuration

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

#### Required Secrets:

- `AWS_ACCESS_KEY_ID` - Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret access key
- `S3_BUCKET_NAME` - Name of your S3 bucket for frontend hosting

#### Optional Secrets (choose one deployment method):

**For Elastic Beanstalk:**
- `EB_APPLICATION_NAME` - Your Elastic Beanstalk application name
- `EB_ENVIRONMENT_NAME` - Your Elastic Beanstalk environment name

**For EC2:**
- `EC2_HOST` - Your EC2 instance IP or domain
- `EC2_USERNAME` - SSH username (usually `ubuntu` or `ec2-user`)
- `EC2_SSH_KEY` - Your private SSH key for EC2
- `EC2_PORT` - SSH port (default: 22)

**For CloudFront (optional):**
- `CLOUDFRONT_DISTRIBUTION_ID` - Your CloudFront distribution ID

**For Frontend:**
- `VITE_API_URL` - Your backend API URL (e.g., `https://api.yourdomain.com`)

**For Database Migrations:**
- `RUN_MIGRATIONS` - Set to `true` if you want to run migrations automatically

### AWS Setup Steps

#### 1. Create S3 Bucket for Frontend

```bash
aws s3 mb s3://your-portfolio-bucket-name
aws s3 website s3://your-portfolio-bucket-name --index-document index.html --error-document index.html
```

Configure bucket policy to allow public read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-portfolio-bucket-name/*"
    }
  ]
}
```

#### 2. Create CloudFront Distribution (Optional but Recommended)

1. Go to CloudFront in AWS Console
2. Create a new distribution
3. Set origin to your S3 bucket
4. Configure settings and create distribution
5. Note the Distribution ID for GitHub secrets

#### 3. Setup Backend on Elastic Beanstalk

1. Go to Elastic Beanstalk in AWS Console
2. Create a new application
3. Create a new environment (Node.js platform)
4. Upload your code or connect to GitHub
5. Configure environment variables in EB console
6. Note the Application and Environment names for GitHub secrets

#### 4. Setup Backend on EC2 (Alternative)

1. Launch an EC2 instance (Ubuntu recommended)
2. Install Node.js and PM2:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```
3. Setup Nginx as reverse proxy
4. Configure security groups to allow HTTP/HTTPS traffic
5. Add your SSH key to GitHub secrets

### Deployment

Once all secrets are configured, push to the `main` or `master` branch:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

GitHub Actions will automatically:
1. Build the React frontend
2. Deploy frontend to S3
3. Invalidate CloudFront cache (if configured)
4. Deploy backend to Elastic Beanstalk or EC2
5. Run database migrations (if configured)

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5002
CLIENT_ORIGIN=https://your-frontend-domain.com
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend

The frontend uses Vite environment variables. Create `.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com
```

## 🔧 Database Migrations

Run migrations manually on the server:

```bash
cd server
npm run db:migrate
```

## 📄 License

ISC

## 👤 Author

Sourabh Gupta

