const express = require('express');
const { Rating } = require('../models');
const router = express.Router();

// Submit a rating
router.post('/', async (req, res) => {
  try {
    const { stars } = req.body;
    if (!stars || stars < 1 || stars > 5) {
      return res.status(400).json({ error: 'Stars must be between 1 and 5' });
    }

    await Rating.create({ stars });
    const stats = await Rating.findAll({
      attributes: [
        [Rating.sequelize.fn('AVG', Rating.sequelize.col('stars')), 'average'],
        [Rating.sequelize.fn('COUNT', Rating.sequelize.col('id')), 'count']
      ]
    });

    res.json({
      average: parseFloat(stats[0].getDataValue('average')).toFixed(2),
      count: parseInt(stats[0].getDataValue('count'))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get rating stats
router.get('/', async (_req, res) => {
  try {
    const stats = await Rating.findAll({
      attributes: [
        [Rating.sequelize.fn('AVG', Rating.sequelize.col('stars')), 'average'],
        [Rating.sequelize.fn('COUNT', Rating.sequelize.col('id')), 'count']
      ]
    });

    res.json({
      average: parseFloat(stats[0].getDataValue('average')).toFixed(2) || 0,
      count: parseInt(stats[0].getDataValue('count')) || 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
