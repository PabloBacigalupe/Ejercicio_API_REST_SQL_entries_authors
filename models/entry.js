const pool = require('../db');
const db_queries_entries = require('../queries/entry.queries');

const getAllEntries = async () => {
  const result = await pool.query(db_queries_entries.getAllEntries);
  return result.rows;
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