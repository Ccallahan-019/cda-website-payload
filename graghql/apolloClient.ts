import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

export function getClient(token?: string) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql`, // your Payload GraphQL URL
      fetch,
      headers: token ? { Authorization: `JWT ${token}` } : {},
    }),
    cache: new InMemoryCache(),
  });
}
