const { INTEGER, STRING, Model } = require('sequelize');
const { db } = require('../config');
const { options } = require('./ConcurrentRequesites');
const CURRICULUM = require('./Curriculum');

class PRE extends Model {};

PRE.init({
  id: { type: INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  code: { type: INTEGER, allowNull: true },
  name: { type: STRING, allowNull: true },
  year: { type: INTEGER, allowNull: true },
  semester: { type: INTEGER, allowNull: true },
  course: { type: INTEGER, allowNull: true },
}, { sequelize: db, modelName: 'Pre_Requesite' });

PRE.sync({ alter: true });

module.exports = PRE;