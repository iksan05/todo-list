const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });
app.listen({ port: 5000 }, () => {
  console.log("Running at http://localhost:5000" + server.graphqlPath);
});
