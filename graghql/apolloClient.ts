import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export function getClient(token?: string) {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql`, // your Payload GraphQL URL
      fetch,
      headers: token ? { Authorization: `JWT ${token}` } : {},
    }),
    cache: new InMemoryCache(),
  });
}
