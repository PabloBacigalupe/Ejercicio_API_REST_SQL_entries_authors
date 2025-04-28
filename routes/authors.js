const express = require('express');
const router = express.Router();
const authorModel = require('../models/author');

// [GET] /api/authors → Obtener todos los autores
router.get('/', async (req, res) => {
  try {
    const authors = await authorModel.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    console.error('Error al obtener autores:', error);
    res.status(500).json({ error: 'Error al obtener autores' });
  }
});

// [GET] /api/authors?email=... → Buscar un autor por email
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Falta el email' });

    const author = await authorModel.getAuthorByEmail(email);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });

    res.status(200).json(author);
  } catch (error) {
    console.error('Error al obtener autor por email:', error);
    res.status(500).json({ error: 'Error al buscar autor' });
  }
});

// [POST] /api/authors → Crear un autor
router.post('/', async (req, res) => {
  try {
    const { name, surname, email, image } = req.body;
    await authorModel.createAuthor(name, surname, email, image);
    res.status(201).json({ message: `usuario creado: ${email}` });
  } catch (error) {
    console.error('Error al crear autor:', error);
    res.status(500).json({ error: 'Error al crear autor' });
  }
});

// [PUT] /api/authors → Actualizar autor
router.put('/', async (req, res) => {
  try {
    const { name, surname, email, image } = req.body;
    await authorModel.updateAuthor(name, surname, image, email);
    res.status(200).json({ message: `usuario actualizado: ${email}` });
  } catch (error) {
    console.error('Error al actualizar autor:', error);
    res.status(500).json({ error: 'Error al actualizar autor' });
  }
});

// [DELETE] /api/authors → Borrar autor por email
router.delete('/', async (req, res) => {
  try {
    const { email } = req.body;
    await authorModel.deleteAuthor(email);
    res.status(200).json({ message: `Se ha borrado ${email}` });
  } catch (error) {
    console.error('Error al borrar autor:', error);
    res.status(500).json({ error: 'Error al borrar autor' });
  }
});

module.exports = router;