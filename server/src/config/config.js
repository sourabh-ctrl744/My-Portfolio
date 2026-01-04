require('dotenv').config();

const useUrl = !!process.env.DATABASE_URL;

const common = {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {}
};

function cfgFromEnv() {
  if (useUrl) {
    const ssl = String(process.env.PG_SSL || '').toLowerCase() === 'true';
    return {
      ...common,
      use_env_variable: 'DATABASE_URL',
      dialectOptions: ssl ? { ssl: { require: true, rejectUnauthorized: false } } : {}
    };
  }
  const ssl = String(process.env.PG_SSL || '').toLowerCase() === 'true';
  return {
    ...common,
    host: process.env.PG_HOST || 'localhost',
    port: Number(process.env.PG_PORT || 5432),
    username: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASS || '',
    database: process.env.PG_DB || 'portfolio_db',
    dialectOptions: ssl ? { ssl: { require: true, rejectUnauthorized: false } } : {}
  };
}

module.exports = {
  development: cfgFromEnv(),
  test: cfgFromEnv(),
  production: cfgFromEnv(),
};