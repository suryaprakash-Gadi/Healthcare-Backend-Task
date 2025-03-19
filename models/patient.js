const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Patient = sequelize.define('Patient', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  dateOfBirth: { type: DataTypes.DATE, allowNull: false },
  gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: false },
  medicalHistory: { type: DataTypes.TEXT, allowNull: true }
});

Patient.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Patient, { foreignKey: 'userId' });

module.exports = Patient; 