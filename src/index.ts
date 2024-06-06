import { ApolloServer } from 'apollo-server';
import typeDefs  from './graphql/types';
import resolvers from './graphql/resolvers';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 100 });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ cache })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});