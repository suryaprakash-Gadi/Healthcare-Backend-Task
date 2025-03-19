const Patient = require('../models/patient');

const patientController = {
  createPatient: async (req, res) => {
    try {
      const { name, dateOfBirth, gender, medicalHistory } = req.body;
      const patient = await Patient.create({
        name,
        dateOfBirth,
        gender,
        medicalHistory,
        userId: req.user.userId
      });
      res.status(201).json(patient);
    } catch (error) {
      res.status(500).json({ message: 'Error creating patient', error: error.message });
    }
  },

  getAllPatients: async (req, res) => {
    try {
      const patients = await Patient.findAll({
        where: { userId: req.user.userId }
      });
      res.json(patients);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching patients', error: error.message });
    }
  },

  getPatient: async (req, res) => {
    try {
      const patient = await Patient.findOne({
        where: { id: req.params.id, userId: req.user.userId }
      });
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json(patient);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching patient', error: error.message });
    }
  },

  updatePatient: async (req, res) => {
    try {
      const patient = await Patient.findOne({
        where: { id: req.params.id, userId: req.user.userId }
      });
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      await patient.update(req.body);
      res.json(patient);
    } catch (error) {
      res.status(500).json({ message: 'Error updating patient', error: error.message });
    }
  },

  deletePatient: async (req, res) => {
    try {
      const patient = await Patient.findOne({
        where: { id: req.params.id, userId: req.user.userId }
      });
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      await patient.destroy();
      res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting patient', error: error.message });
    }
  }
};

module.exports = patientController;