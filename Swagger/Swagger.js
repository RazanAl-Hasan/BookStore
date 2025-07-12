const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookStore API',
      version: '1.0.0',
      description: 'توثيق REST API لمشروع مكتبة باستخدام Node.js وExpress'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server'
      }
    ]
  },
  apis: ['./Swagger/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;