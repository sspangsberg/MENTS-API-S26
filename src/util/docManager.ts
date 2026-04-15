
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { Application } from 'express'

export function setupDocs(app: Application) {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'MENTS-RESTAPI',
      version: '1.0.0',
      description:
        'MongoDB Express Node TypeScript API',
    },
    servers: [
      {
        url: 'http://localhost:4000/api/',
        description: 'Development server',
      },
      {
        url: 'https://ments-api-s26.onrender.com',
        description: 'Render.com',
      }
    ],

    tags: [
      {
        name: 'Product Routes',
        description: 'Routes that handles products',
      },
      {
        name: 'User Routes',
        description: 'Routes that handles users',
      },
    ],

    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            imageURL: { type: 'string' },
            price: { type: 'number' },
            stock: { type: 'number' },
            discount: { type: 'boolean' },
            discountPct: { type: 'number' },
            isHidden: { type: 'boolean' },
            _createdBy: { type: 'string' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            registerDate: { type: 'string' },
          },
        },
      },
    },
    security: [
      { 
        ApiKeyAuth: [], 
      }
    ],
  };

  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['**/*.ts'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  //const swaggerDocument = YAML.load("./docs/swagger.yaml");
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
