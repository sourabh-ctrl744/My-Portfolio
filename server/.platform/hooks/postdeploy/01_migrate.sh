#!/bin/bash
# Elastic Beanstalk post-deploy hook to run migrations

echo "🔄 Running database migrations after deployment..."
cd /var/app/current
npm run db:migrate
if [ $? -eq 0 ]; then
  echo "✅ Migrations completed successfully"
else
  echo "⚠️  Migration failed, but continuing..."
fi

