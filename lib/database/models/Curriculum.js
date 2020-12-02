const { INTEGER, STRING, FLOAT, Model } = require('sequelize');
const { db } = require('../config');
const CON = require('./ConcurrentRequesites');
const PRE = require('./PreRequesites');

class CURRICULUM extends Model {};

CURRICULUM.init({
  id: { type: INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  code: { type: INTEGER, allowNull: true },
  name: { type: STRING, allowNull: true },
  class: { type: FLOAT, allowNull: true },
  practice: { type: FLOAT, allowNull: true }, 
  year: { type: INTEGER, allowNull: true },
  semester: { type: INTEGER, allowNull: true },
  major: { type: STRING, allowNull: true },
  department: { type: STRING, allowNull: true },
  academicAbstract: { type: STRING, allowNull: true },

}, { sequelize: db, modelName: 'Curriculum' });

CURRICULUM.hasMany(PRE, { foreignKey: 'course', sourceKey: 'code', constraints: false });
CURRICULUM.hasMany(CON, { foreignKey: 'course', sourceKey: 'code', constraints: false });


CURRICULUM.sync({ alter: true });

module.exports = CURRICULUM;