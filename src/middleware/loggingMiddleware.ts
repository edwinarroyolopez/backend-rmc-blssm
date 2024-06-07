import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { OPERATIONS_ALLOWED_LOG } from '../tools/constants';

export const loggingMiddleware: ApolloServerPlugin = {
  async requestDidStart(requestContext) {
    // console.log('Request started! Query:\n' +
    //   requestContext.request.query);
    return {
      async didResolveOperation(context) {
        const operationName: string  = context.operationName || '';
        if(OPERATIONS_ALLOWED_LOG.includes(operationName)){
          console.log(`Operation: ${context.operation.operation}`);
          console.log(`Operation Name: ${context.operationName}`);
          console.log('Variables:', context.request.variables);
        }
      },
      async willSendResponse(context) {
        const operationName: string  = context.operationName || '';
        if(OPERATIONS_ALLOWED_LOG.includes(operationName)){
          console.log('Response:', context.response.data);
        }
      }
    };
  }
};
