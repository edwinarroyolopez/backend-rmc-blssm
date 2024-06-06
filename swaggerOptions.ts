import path from 'path';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Rick and Morty API',
      version: '1.0.0',
      description: 'API para acceder a información sobre los personajes de Rick and Morty',
    },
    servers: [
      {
        url: 'http://localhost:4000/',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: [
    path.resolve(__dirname, './graphql/types/*.ts'),
    path.resolve(__dirname, './graphql/resolvers/*.ts')
  ],
};

export default swaggerOptions;
