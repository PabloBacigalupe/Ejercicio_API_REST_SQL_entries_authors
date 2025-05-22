const entry = require("../models/entries.model"); 

const getAllEntries = async (req, res) => {
  let result;
  try {
    result = await entry.getAllEntries();
    res.status(200).json(result); // Devuelve lista de entradas
  } catch (error) {
    console.error("Error al obtener entradas:", error.message);
    res.status(500).json({ error: "Error en la BBDD" });
  }
};

const insertEntry = async (req, res) => {
  const newEntry = req.body;
  if (
    "title" in newEntry &&
    "content" in newEntry &&
    "date" in newEntry &&
    "category" in newEntry &&
    "email_author" in newEntry
  ) {
    try {
      const result = await entry.insertEntry(newEntry);
      res.status(200).json({
        items_inserted: result,
        data: newEntry
      });
    } catch (error) {
      res.status(500).json({ error: "Error en la BBDD" });
    }
  } else {
    res.status(400).json({ error: "Faltan campos en la entrada" });
  }
};

const updateEntry = async (req, res) => {
  const updatedEntry = req.body;
  if (
    "title" in updatedEntry &&
    "content" in updatedEntry &&
    "date" in updatedEntry &&
    "category" in updatedEntry &&
    "email_author" in updatedEntry &&
    "old_title" in updatedEntry
  ) {
    try {
      const result = await entry.updateEntry(updatedEntry);
      res.status(200).json({
        items_updated: result,
        data: updatedEntry
      });
    } catch (error) {
      res.status(500).json({ error: "Error en la BBDD" });
    }
  } else {
    res.status(400).json({ error: "Faltan campos en la entrada" });
  }
};

const deleteEntry = async (req, res) => {
  const deletedEntry = req.body;
  if ("title" in deletedEntry) {
    try {
      const result = await entry.deleteEntry(deletedEntry);
      res.status(200).json({
        items_deleted: result,
        data: deletedEntry
      });
    } catch (error) {
      res.status(500).json({ error: "Error en la BBDD" });
    }
  } else {
    res.status(400).json({ error: "Falta el campo title" });
  }
};

module.exports = {
  getAllEntries,
  insertEntry,
  updateEntry,
  deleteEntry
};