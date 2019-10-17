import "./index.css";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import DataProvider from "./data-provider";
import React from "react";
import ReactDOM from "react-dom";

const superSecretToken =

const client = new ApolloClient({
  uri: "https://oojbiy2e.api.sanity.io/v1/graphql/production/default",
  headers: {
    Authorization: "Bearer " + superSecretToken
  },
});

const App = (
  <ApolloProvider client={client}>
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <DataProvider />
      </QueryParamProvider>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
