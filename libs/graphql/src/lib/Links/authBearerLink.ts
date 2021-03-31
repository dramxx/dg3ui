import { ApolloLink } from '@apollo/client';

export const authBearerLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: sessionStorage.getItem('token') || null,
    }
  });

  return forward(operation);
})
