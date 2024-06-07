import path from 'path';

console.log({ p: path.resolve(__dirname, './graphql/types/*.ts') })

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
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor de desarrollos',
      },
    ],
  },
  apis: [
      './src/*.ts'
  ],
};


console.log(swaggerOptions)
export default swaggerOptions;
