const Mapping = require('../models/mapping');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

const mappingController = {
  createMapping: async (req, res) => {
    try {
      const { patientId, doctorId } = req.body;
      // Ensure patient belongs to the authenticated user
      const patient = await Patient.findOne({
        where: { id: patientId, userId: req.user.userId }
      });
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found or not authorized' });
      }
      const mapping = await Mapping.create({ patientId, doctorId });
      res.status(201).json({ message: 'Mapping created successfully', mapping });
    } catch (error) {
      console.error('Error in createMapping:', error);
      res.status(500).json({ message: 'Error creating mapping', error: error.message });
    }
  },

  getAllMappings: async (req, res) => {
    try {
      const mappings = await Mapping.findAll({
        include: [Patient, Doctor] // No userId filter - returns all mappings
      });
      res.json(mappings);
    } catch (error) {
      console.error('Error in getAllMappings:', error);
      res.status(500).json({ message: 'Error fetching mappings', error: error.message });
    }
  },

  getMappingsByPatient: async (req, res) => {
    try {
      const mappings = await Mapping.findAll({
        where: { patientId: req.params.patientId },
        include: [Patient, Doctor]
      });
      // Optionally check if patient belongs to user
      if (mappings.length > 0 && mappings[0].Patient.userId !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized to view this patient’s mappings' });
      }
      res.json(mappings);
    } catch (error) {
      console.error('Error in getMappingsByPatient:', error);
      res.status(500).json({ message: 'Error fetching mappings', error: error.message });
    }
  },

  deleteMapping: async (req, res) => {
    try {
      const mapping = await Mapping.findByPk(req.params.id);
      if (!mapping) {
        return res.status(404).json({ message: 'Mapping not found' });
      }
      // Ensure mapping’s patient belongs to the user
      const patient = await Patient.findByPk(mapping.patientId);
      if (patient.userId !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized to delete this mapping' });
      }
      await mapping.destroy();
      res.json({ message: 'Mapping deleted successfully' });
    } catch (error) {
      console.error('Error in deleteMapping:', error);
      res.status(500).json({ message: 'Error deleting mapping', error: error.message });
    }
  }
};

module.exports = mappingController;