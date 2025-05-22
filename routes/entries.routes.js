

const express = require('express');
const router = express.Router();

const entriesController = require('../controllers/entries.controller');

// GET obtengo todas las entries
router.get('/', entriesController.getAllEntries);

// POST Insertar una nueva entry
router.post('/', entriesController.insertEntry);

// PUT Modificar una entry por su título
router.put('/', entriesController.updateEntry);

// DELETE Borrar una entry por su título
router.delete('/', entriesController.deleteEntry);

module.exports = router;