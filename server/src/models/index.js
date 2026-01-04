'use strict';
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const config = require('../config/config.js');

const env = process.env.NODE_ENV || 'development';
const cfg = config[env];

let sequelize;
if (cfg.use_env_variable) {
  sequelize = new Sequelize(process.env[cfg.use_env_variable], cfg);
} else {
  sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, cfg);
}

const db = {};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(name => {
  if ('associate' in db[name]) db[name].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
