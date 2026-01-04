const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { sequelize } = require('./models');
const messagesRouter = require('./routes/messages');
const ratingsRouter = require('./routes/ratings');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.set('trust proxy', 1);
app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(compression());
app.use(morgan('tiny'));
app.use(express.json({ limit: '1mb' }));
app.use(cors({ origin: ORIGIN, credentials: true }));

app.use('/api/', rateLimit({ windowMs: 60 * 1000, limit: 100 }));

app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.use('/api/messages', messagesRouter);
app.use('/api/ratings', ratingsRouter);


async function start() {
  try {
    // Verify DB connection
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // In dev you can ensure tables exist (comment out in prod; use migrations instead)
    // await sequelize.sync();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ API running on port ${PORT}`);
      console.log(`✅ Listening on 0.0.0.0:${PORT} (accessible from nginx)`);
    });
  } catch (e) {
    console.error('❌ DB connection failed:', e.message);
    process.exit(1);
  }
}
start();
