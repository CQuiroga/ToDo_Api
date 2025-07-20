const express = require('express');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const { sequelize } = require('./models');
const authRoutes = require('./routes/auth.routes');
const tareaRoutes = require('./routes/tarea.routes');
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tareas', authMiddleware, tareaRoutes);

// Conexión y arranque
const PORT = process.env.PORT || 3000;
sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
      console.log(`📖 Docs en http://localhost:${PORT}/api/docs`);
    });
  })
  .catch(err => console.error('DB error', err));
