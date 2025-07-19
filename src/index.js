const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const tareaRoutes = require('./routes/tarea.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tareas', tareaRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida con la base de datos ✔️');
    return sequelize.sync(); // opcionalmente { force: false }
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
