const { gql } = require("apollo-server-express");

const typeDefs = gql`

    type Query {
        hello: String
        todos: [Todo!]
    }

    type Todo {
        name: String!
        id: ID!
        is_finish: Boolean!
    }

    input TodoInputCreate{
        name: String!
    }

    input TodoInputUpdate{
        id: ID!
        is_finish: Int!
    }

    input TodoInputDelete{
        id: ID!
    }

    type Mutation {
        addTodo(todoInputCreate: TodoInputCreate): Todo
        updateTodo(todoInputUpdate: TodoInputUpdate): Boolean
        deleteTodo(todoInputDelete: TodoInputDelete): Boolean
    }
    
`;


module.exports = typeDefs;