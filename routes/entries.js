const express = require('express');
const router = express.Router();
const entryModel = require('../models/entry');
const entriesControllers = require('../controllers/entries.controller')

// [GET] /api/entries → obtener todas las entradas con datos del autor
router.get('/', entriesControllers.getAllEntries);

// [PUT] /api/entries → actualizar una entrada por título
router.put('/', entriesControllers.putEntries);

// [DELETE] /api/entries → borrar una entrada por título
router.delete('/', entriesControllers.deleteEntries);

module.exports = router;