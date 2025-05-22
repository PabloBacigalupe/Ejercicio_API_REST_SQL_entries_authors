// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'entries_authors_db_api_user',
//   host: 'dpg-cvv9lpruibrs73adlal0-a.frankfurt-postgres.render.com',
//   database: 'entries_authors_db_api',
//   password: 'y3v5hWEii6xZnnzzulR8NvGA0ZLqLF1s',
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// module.exports = pool;

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',       
  password: '123456', 
  database: 'entries-authors', 
  port: 5432,
});



module.exports = pool;