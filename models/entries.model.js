const pool = require('../config/db_pgsql');
const db_queries_entries = require('../queries/entry.queries');

const getAllEntries = async () => {
  let client, result;
  try {
      client = await pool.connect(); // Espera a abrir conexion
      const data = await client.query(queries.getAllEntries)
      result = data.rows
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return result
};


const updateEntryByTitle = async (newEntry, oldTitle) => {
  const { title, content, date, category, email_author } = newEntry;
  await pool.query(db_queries_entries.updateEntryByTitle, [
    title,
    content,
    date,
    category,
    email_author,
    oldTitle
  ]);
};

const deleteEntryByTitle = async (title) => {
  await pool.query(db_queries_entries.deleteEntryByTitle, [title]);
};

module.exports = {
  getAllEntries,
  updateEntryByTitle,
  deleteEntryByTitle
};