import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = "https://countries.trevorblades.com/graphql";

export function createClient() {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });

  return client;
}
