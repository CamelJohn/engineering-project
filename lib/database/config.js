const { Sequelize } = require('sequelize');
require('dotenv/config');

const { DB_DIALECT, DB_NAME, DB_USERNAME, DB_PWD, DB_HOST } = process.env;

const config = {
  dialect: DB_DIALECT,
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PWD,
  host: DB_HOST,
  logging: false,
};

exports.db = new Sequelize(config);