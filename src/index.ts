import { ApolloServer } from 'apollo-server-express';

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

import redis from './config/redisClient';

import sequelize from './config/database';


import typeDefs  from './graphql/types';
import resolvers from './graphql/resolvers';

import { loggingMiddleware } from './middleware/loggingMiddleware';
import swaggerOptions from '../swaggerOptions';

dotenv.config();


const app:any = express();
const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [loggingMiddleware],
  context: ({ req }) => {
    return {
      headers: req.headers,
      redis
    };
  }
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`📚 Docs ready at http://localhost:${PORT}/api-docs`);
}

const swaggerSpec = swaggerJsdoc(swaggerOptions);
console.log(swaggerSpec)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Synchronize models
sequelize.sync().then(() => {
  console.log('Synchronized database');
}).catch((err: Error) => {
  console.error('Database synchronization error:', err);
});

startServer().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});