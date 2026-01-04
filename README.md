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

## 🌐 AWS Deployment

This project includes GitHub Actions workflows for automated deployment to AWS.

### Quick Start

1. **Frontend**: Deploys to S3 + CloudFront (CDN)
2. **Backend**: Deploys to EC2 or Elastic Beanstalk

### Deployment Workflows

- **Frontend**: `.github/workflows/deploy-frontend.yml` - Builds React app and deploys to S3
- **Backend (EC2)**: `.github/workflows/deploy-backend.yml` - Deploys to EC2 instance with PM2
- **Backend (EB)**: `.github/workflows/deploy-backend-eb.yml` - Deploys to Elastic Beanstalk

### 📖 Complete Deployment Guide

For detailed step-by-step instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)** which covers:

- AWS infrastructure setup (S3, CloudFront, EC2, RDS)
- GitHub Secrets configuration
- IAM user setup and permissions
- SSL/HTTPS configuration
- Database migrations
- Troubleshooting guide
- Security best practices

### Quick Setup Checklist

1. ✅ Create S3 bucket for frontend
2. ✅ Create CloudFront distribution (optional)
3. ✅ Launch EC2 instance or Elastic Beanstalk environment
4. ✅ Configure GitHub Secrets (see DEPLOYMENT.md)
5. ✅ Push to `main` branch to trigger deployment

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

