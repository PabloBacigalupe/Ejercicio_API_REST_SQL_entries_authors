
const pool = require('../config/db_pgsql');
const queries = require('../queries/authors.queries') 



const getAllAuthors = async () => {
let client, result;
try {
  
    client = await pool.connect(); 
    const data = await client.query(queries.getAllAuthors)
    result = data.rows
} catch (err) {
    console.log(err);
    throw err;
} finally {
    client.release();
}
return result
}


const getEmail = async (entry) => {
    const { email } = entry;
    let client, result;
    try {
      client = await pool.connect();
      const data = await client.query(queries.getEmail, [email]); 
      result = data.rows;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      client.release();
    }
    return result;
  };




const deleteAuthor = async (entry) => {
    const {email} = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteAuthor,[
            email
        ]);
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}




const updateAuthor = async (entry) => {
    const { name, surname, email, image, old_email } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateAuthor,[
            name, 
            surname,
            email, 
            image,
            old_email
        ]);
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}



const insertAuthor = async (entry) => {
    const { name, surname, email, image } = entry;
    let client, result;
    try {
      client = await pool.connect();
      const data = await client.query(queries.insertAuthor, [
        name,
        surname,
        email,
        image
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


const authors = {
    getAllAuthors,
    getEmail,
    deleteAuthor,
    updateAuthor,
    insertAuthor
}

module.exports = authors;
