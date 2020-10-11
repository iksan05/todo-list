import React, { Fragment, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import TodoList from "./TodoList";

const ADD_TODO = gql`
  mutation AddTodo($name: String!) {
    addTodo(todoInputCreate: { name: $name }) {
      name
      id
    }
  }
`;
const GET_TODOS = gql`
  query {
    todos {
      id
      name
      is_finish
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(todoInputDelete: { id: $id })
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $is_finish: Int!) {
    updateTodo(todoInputUpdate: { id: $id, is_finish: $is_finish })
  }
`;

function Todo() {
  const [name, setName] = useState("");
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const { loading, error, data } = useQuery(GET_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const submitHandler = (e) => {
    e.preventDefault();
    addTodo({
      variables: {
        name: name,
      },
    });
    setName("");
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <input
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            console.log(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
      {data.todos.map((todo) => (
        <li key={todo.id}>
          {todo.name}
          <button
            onClick={(e) => {
              deleteTodo({ variables: { id: todo.id } });
            }}
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              updateTodo({ variables: { id: todo.id, is_finish: todo.is_finish ? 0 : 1 } });
              
            }}
          >
            {todo.is_finish ? "Set to Not Done" : "Set to Done"}
          </button>
        </li>
      ))}
    </Fragment>
  );
}

export default Todo;
