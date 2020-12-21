import * as React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const PROD = "https://retrievo.io/graphql";
const DEV = "http://localhost:4000/graphql";
const NET = "https://retrievo.netlify.app/";
// eslint-disable-next-line import/prefer-default-export
export const client = new ApolloClient({
  // uri: PROD,
  uri: NET,
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
