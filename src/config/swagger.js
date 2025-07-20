const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API To-Do List',
      version: '1.0.0',
      description: 'Documentación de la API REST de To-Do List con autenticación JWT'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  // Rutas donde buscar JSDoc
  apis: ['./src/routes/*.js', './src/models/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
