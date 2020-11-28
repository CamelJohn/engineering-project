const { INTEGER, STRING, BOOLEAN, FLOAT, Model } = require('sequelize');
const { db } = require('../config');

class CURRICULUM extends Model {};

CURRICULUM.init({
  id: { type: INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  code: { type: INTEGER, allowNull: true },
  name: { type: STRING, allowNull: true },
  class: { type: FLOAT, allowNull: true },
  parctice: { type: FLOAT, allowNull: true }, 
  prc1: { type: INTEGER, allowNull: true },
  prn1: { type: STRING, allowNull: true },
  prc2: { type: INTEGER, allowNull: true },
  prn2: { type: STRING, allowNull: true },
  prc3: { type: INTEGER, allowNull: true },
  prn3: { type: STRING, allowNull: true },
  crc1: { type: INTEGER, allowNull: true },
  crn1: { type: STRING, allowNull: true },
  crc2: { type: INTEGER, allowNull: true },
  crn2: { type: STRING, allowNull: true },
  year: { type: INTEGER, allowNull: true },
  semester: { type: INTEGER, allowNull: true },
  major: { type: STRING, allowNull: true },
  department: { type: STRING, allowNull: true },
  academicAbstract: { type: STRING, allowNull: true }
}, { sequelize: db, modelName: 'Curriculum' });

CURRICULUM.sync({ alter: true });

module.exports = CURRICULUM;