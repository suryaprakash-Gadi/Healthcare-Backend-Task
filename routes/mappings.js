const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const mappingController = require('../controllers/mappingController');

// Log the imported controller to debug
console.log('Imported mappingController:', mappingController);

// Protected routes
router.post('/', auth, mappingController.createMapping);
router.get('/', auth, mappingController.getAllMappings);
router.get('/:patientId', auth, mappingController.getMappingsByPatient);
router.delete('/:id', auth, mappingController.deleteMapping);

module.exports = router;