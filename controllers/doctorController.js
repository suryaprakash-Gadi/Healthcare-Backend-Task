const Doctor = require('../models/doctor');

const doctorController = {
  createDoctor: async (req, res) => {
    try {
      const { name, specialty, contact } = req.body;
      const doctor = await Doctor.create({
        name,
        specialty,
        contact,
        userId: req.user.userId // Tied to authenticated user
      });
      res.status(201).json(doctor);
    } catch (error) {
      console.error('Error in createDoctor:', error);
      res.status(500).json({ message: 'Error creating doctor', error: error.message });
    }
  },

  getAllDoctors: async (req, res) => {
    try {
      const doctors = await Doctor.findAll(); // No userId filter - returns all doctors
      res.json(doctors);
    } catch (error) {
      console.error('Error in getAllDoctors:', error);
      res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
  },

  getDoctor: async (req, res) => {
    try {
      const doctor = await Doctor.findOne({
        where: { id: req.params.id, userId: req.user.userId } // Still user-specific
      });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (error) {
      console.error('Error in getDoctor:', error);
      res.status(500).json({ message: 'Error fetching doctor', error: error.message });
    }
  },

  updateDoctor: async (req, res) => {
    try {
      const doctor = await Doctor.findOne({
        where: { id: req.params.id, userId: req.user.userId } // User-specific
      });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      await doctor.update(req.body);
      res.json(doctor);
    } catch (error) {
      console.error('Error in updateDoctor:', error);
      res.status(500).json({ message: 'Error updating doctor', error: error.message });
    }
  },

  deleteDoctor: async (req, res) => {
    try {
      const doctor = await Doctor.findOne({
        where: { id: req.params.id, userId: req.user.userId } // User-specific
      });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      await doctor.destroy();
      res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
      console.error('Error in deleteDoctor:', error);
      res.status(500).json({ message: 'Error deleting doctor', error: error.message });
    }
  }
};

module.exports = doctorController;