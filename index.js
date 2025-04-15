const morgan = require('morgan');
// express: importa Express para poder crear rutas y el servidor web.
// cors: permite que tu servidor acepte peticiones desde otros orígenes (como desde el frontend).
// pool: importa el archivo db.js que conecta a tu base de datos PostgreSQL.

const express = require('express');
const cors = require('cors');
const pool = require('./db');

// app es tu aplicación de Express.
// PORT es el número de puerto donde se va a ejecutar el servidor (accederás con http://localhost:3000).
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
  stream: {
    write: (msg) => {
      console.log('🔊 Morgan dice:', msg.trim());
    }
  }
}));

app.use((req, res, next) => {
  console.log('🧭 Petición recibida:', req.method, req.url);
  next();
});

const authorRoutes = require('./routes/authors');
app.use('/api/authors', authorRoutes);

const entryRoutes = require('./routes/entries');
app.use('/api/entries', entryRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en puerto ${PORT}`);
});


process.on('uncaughtException', (err) => {
  console.error('⛔ Error no detectado:', err);
});

setInterval(() => {}, 1000); // mantiene el proceso vivo artificialmente

/*
//Ruta GET
//pool query para hacer la consulta SQL a la base de datos
app.get('/api/entries', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT 
          e.title, 
          e.content, 
          e.date, 
          e.category,
          a.name, 
          a.surname, 
          a.image
        FROM entries e
        JOIN authors a ON e.email_author = a.email
      `);
  //devuelve JSON con los datos pedidos
  //si falle devuelve error 500
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener las entries:', error);
      res.status(500).json({ error: 'Error al obtener las entries' });
    }
  });
  */

/*
  //Ruta POST para crear un nuevo autor 
  app.post('/api/authors', async (req, res) => {
    try {
      const { name, surname, email, image } = req.body;
  
      await pool.query(
        `INSERT INTO authors (name, surname, email, image) VALUES ($1, $2, $3, $4)`,
        [name, surname, email, image]
      );
  
      res.status(201).json({ message: `usuario creado: ${email}` });
    } catch (error) {
      console.error('Error al crear autor:', error);
      res.status(500).json({ error: 'Error al crear autor' });
    }
  });
  */
