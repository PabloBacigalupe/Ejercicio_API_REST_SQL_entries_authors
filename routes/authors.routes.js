


const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authors.controller');

// Rutas
router.get('/', authorController.getAllAuthors);
router.get('/:email', authorController.getEmail);
router.post('/', authorController.insertAuthor);
router.put('/', authorController.updateAuthor);
router.delete('/', authorController.deleteAuthor);

module.exports = router;