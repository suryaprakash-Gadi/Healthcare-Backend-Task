const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient');
const Doctor = require('./doctor');

const Mapping = sequelize.define('Mapping', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

// Relationships
Mapping.belongsTo(Patient, { foreignKey: 'patientId' });
Mapping.belongsTo(Doctor, { foreignKey: 'doctorId' });
Patient.hasMany(Mapping, { foreignKey: 'patientId' });
Doctor.hasMany(Mapping, { foreignKey: 'doctorId' });

module.exports = Mapping;