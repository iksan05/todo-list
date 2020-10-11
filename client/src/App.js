import React from "react";

import Todo from "./Todo";
import { ApolloClient, ApolloProvider,InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()

});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Todo />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
