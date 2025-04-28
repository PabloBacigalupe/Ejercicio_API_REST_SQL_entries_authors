const db_queries_authors = {
    getAllAuthors: `
      SELECT * FROM authors
    `,
    
    getAuthorByEmail: `
      SELECT * FROM authors WHERE email = $1
    `,
    
    createAuthor: `
      INSERT INTO authors (name, surname, email, image)
      VALUES ($1, $2, $3, $4)
    `,
    
    updateAuthor: `
      UPDATE authors
      SET name = $1, surname = $2, image = $3
      WHERE email = $4
    `,
    
    deleteAuthor: `
      DELETE FROM authors WHERE email = $1
    `,
  
    // Query para crear la tabla (opcional)
    createTable: `
      CREATE TABLE IF NOT EXISTS authors (
        id_author SERIAL PRIMARY KEY,
        name VARCHAR(100),
        surname VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        image TEXT
      )
    `,
  
    // Query para borrar la tabla (opcional)
    dropTable: `
      DROP TABLE IF EXISTS authors
    `
  };
  
  module.exports = db_queries_authors;