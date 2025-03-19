const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Doctor = sequelize.define('Doctor', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  specialty: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING, allowNull: true }
});

Doctor.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Doctor, { foreignKey: 'userId' });

module.exports = Doctor;