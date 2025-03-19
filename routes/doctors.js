const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const doctorController = require('../controllers/doctorController');

// Debug log to verify import
console.log('Imported doctorController:', doctorController);

// Protected routes
router.post('/', auth, doctorController.createDoctor);
router.get('/', auth, doctorController.getAllDoctors);
router.get('/:id', auth, doctorController.getDoctor);
router.put('/:id', auth, doctorController.updateDoctor);
router.delete('/:id', auth, doctorController.deleteDoctor);

module.exports = router;