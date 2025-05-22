const pool = require('../config/db_pgsql'); // conexión a PostgreSQL
const queries = require('../queries/entries.queries'); // consultas SQL

const getAllEntries = async () => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.getAllEntries);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const insertEntry = async (entry) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.insertEntry, [
      entry.title,
      entry.content,
      entry.date,
      entry.category,
      entry.email_author
    ]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const updateEntry = async (entry) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.updateEntry, [
      entry.title,
      entry.content,
      entry.date,
      entry.category,
      entry.email_author,
      entry.old_title
    ]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const deleteEntry = async (entry) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.deleteEntry, [entry.title]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const entries = {
  getAllEntries,
  insertEntry,
  updateEntry,
  deleteEntry
};

module.exports = entries;