const express = require('express');
const router = express.Router();
const { Message } = require('../models');
const { maybeSendEmail } = require('../utils/mailer');

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, body } = req.body;
    if (!name || !email || !body) return res.status(400).json({ error: 'Missing fields' });

    const message = await Message.create({ name, email, subject: subject || null, body });
    const emailResult = await maybeSendEmail({ name, email, subject, body });
    res.status(201).json({ ok: true, message, email: emailResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const items = await Message.findAll({ order: [['createdAt', 'DESC']] });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
