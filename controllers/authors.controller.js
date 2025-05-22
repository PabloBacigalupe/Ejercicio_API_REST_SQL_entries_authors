const author = require("../models/authors.model"); // Importar el modelo de la BBDD


const getAllAuthors = async (req, res) => {
  let entries;
  try {
      entries = await author.getAllAuthors();
    res.status(200).json(entries); // [] con las entries encontradas
  } catch (error) {
    res.status(500).json({ error: "Error en la BBDD" });
  }
};

const getEmail = async (req, res) => {
  const emailToSearch = req.params.email; 
  try {
    const result = await author.getEmail({ email: emailToSearch }); 
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: "Email no encontrado" });
    }
  } catch (error) {
    console.error("Error al buscar el email:", error.message);
    res.status(500).json({ error: "Error en la BBDD" });
  }
};

const deleteAuthor = async (req, res) => {
  const deleteAuthor = req.body; // {title}
  if (
    "email" in deleteAuthor 
  ) {
    try {
      const response = await author.deleteAuthor(deleteAuthor);
      res.status(200).json({
        items_updated: response,
        data: deleteAuthor,
      });
    } catch (error) {
      res.status(500).json({ error: "Error en la BBDD" });
    }
  } else {
    res.status(400).json({ error: "Faltan campos en la entrada" });
  }
};

const updateAuthor = async (req, res) => {
  const modifiedEntry = req.body; // {name,surname,email,image,old_title}
  if (
    "name" in modifiedEntry &&
    "surname" in modifiedEntry &&
    "email" in modifiedEntry &&
    "image" in modifiedEntry &&
    "old_email" in modifiedEntry 
  ) {
    try {
      const response = await author.updateAuthor(modifiedEntry);
      res.status(200).json({
        items_updated: response,
        data: modifiedEntry,
      });
    } catch (error) {
      res.status(500).json({ error: "Error en la BBDD" });
    }
  } else {
    res.status(400).json({ error: "Faltan campos en la entrada" });
  }
};

const insertAuthor = async (req, res) => {
  const newAuthor = req.body;
  if (
    "name" in newAuthor &&
    "surname" in newAuthor &&
    "email" in newAuthor &&
    "image" in newAuthor
  ) {
    try {
      const response = await author.insertAuthor(newAuthor);
      res.status(200).json({
        items_updated: response,
        data: newAuthor,
      });
    } catch (error) {
      res.status(500).json({ error: "Error en la BBDD" });
    }
  } else {
    res.status(400).json({ error: "Faltan campos en la entrada" });
  }
};

module.exports = {
getAllAuthors,
getEmail,
deleteAuthor,
updateAuthor,
insertAuthor
};