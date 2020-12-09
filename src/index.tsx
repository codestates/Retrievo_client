import * as React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client";

import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query getBoards {
        error {
          code
          message
          field
        }
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
