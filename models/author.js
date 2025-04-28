const pool = require('../config/db_pgsql'); // conexión a PostgreSQL
const db_queries_authors = require('../queries/author.queries'); // tus queries

const getAllAuthors = async () => {
  const result = await pool.query(db_queries_authors.getAllAuthors);
  return result.rows;
};

const getAuthorByEmail = async (email) => {
  const result = await pool.query(db_queries_authors.getAuthorByEmail, [email]);
  return result.rows[0];
};

const createAuthor = async (name, surname, email, image) => {
  await pool.query(db_queries_authors.createAuthor, [name, surname, email, image]);
};

const updateAuthor = async (name, surname, image, email) => {
  await pool.query(db_queries_authors.updateAuthor, [name, surname, image, email]);
};

const deleteAuthor = async (email) => {
  await pool.query(db_queries_authors.deleteAuthor, [email]);
};

module.exports = {
  getAllAuthors,
  getAuthorByEmail,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};