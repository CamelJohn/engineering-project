const { INTEGER, STRING, Model } = require('sequelize');
const { db } = require('../config');

class CON extends Model {};

CON.init({
  id: { type: INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  code: { type: INTEGER, allowNull: true },
  name: { type: STRING, allowNull: true },
  year: { type: INTEGER, allowNull: true },
  semester: { type: INTEGER, allowNull: true },
  course: { type: INTEGER, allowNull: true },
}, { sequelize: db, modelName: 'Concurrent_Requesite' });

CON.sync({ alter: true });

module.exports = CON;