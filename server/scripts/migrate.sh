#!/bin/bash
# Run database migrations before starting the application

echo "🔄 Running database migrations..."
cd /var/app/current
npm run db:migrate
if [ $? -eq 0 ]; then
  echo "✅ Migrations completed successfully"
else
  echo "⚠️  Migration failed, but continuing..."
fi

