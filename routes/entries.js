const express = require('express');
const router = express.Router();
const entryModel = require('../models/entry');

// [GET] /api/entries → obtener todas las entradas con datos del autor
router.get('/', async (req, res) => {
  try {
    const entries = await entryModel.getAllEntries();
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error al obtener las entradas:', error);
    res.status(500).json({ error: 'Error al obtener entradas' });
  }
});

// [PUT] /api/entries → actualizar una entrada por título
router.put('/', async (req, res) => {
  try {
    const { title, content, date, category, email_author, oldTitle } = req.body;
    await entryModel.updateEntryByTitle({ title, content, date, category, email_author }, oldTitle);
    res.status(200).json({ message: `Se ha modificado la entry '${oldTitle}'` });
  } catch (error) {
    console.error('Error al actualizar la entrada:', error);
    res.status(500).json({ error: 'Error al actualizar entry' });
  }
});

// [DELETE] /api/entries → borrar una entrada por título
router.delete('/', async (req, res) => {
  try {
    const { title } = req.body;
    await entryModel.deleteEntryByTitle(title);
    res.status(200).json({ message: `Se ha borrado la entry '${title}'` });
  } catch (error) {
    console.error('Error al borrar la entrada:', error);
    res.status(500).json({ error: 'Error al borrar entry' });
  }
});

module.exports = router;