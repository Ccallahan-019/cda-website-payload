import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import fetch from "cross-fetch";

export function getApolloServerClient(token?: string) {
  const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/graphql`,
        fetch,
        headers: token ? { Authorization: `JWT ${token}` } : {},
      }),
    });
  });

  return getClient();
}
