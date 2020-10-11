import React, { Fragment, useEffect } from "react";

import { useQuery, gql } from "@apollo/client";

const GET_TODOS = gql`
  query {
    todos {
      id
      name
    }
  }
`;

function TodoList() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <h1>Loading....</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <Fragment>
      {data.todos.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </Fragment>
  );
}

export default TodoList;
