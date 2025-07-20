const express = require('express');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middlewares/auth.middleware');

const { sequelize } = require('./models');
const tareaRoutes = require('./routes/tarea.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/tareas', authMiddleware, tareaRoutes);
// app.use('/api/tareas', tareaRoutes);

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
