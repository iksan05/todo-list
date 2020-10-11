const models = require("../models");

const resolvers = {
  Query: {
    hello: () => "Hello resolvers",
    todos: async () => {
      const todos = await models.Todo.findAll({});
      return todos;
    },
  },
  Mutation: {
    addTodo: async (parent, args) => {
      const todo = await models.Todo.create({
        name: args.todoInputCreate.name,
      });
      return todo;
    },
    updateTodo: async (parent, args) => {
      const todo = await models.Todo.update(
        {
          is_finish: args.todoInputUpdate.is_finish,
        },
        {
          where: {
            id: args.todoInputUpdate.id,
          },
        }
      );
      if (todo[0] === 1) {
        return true;
      } else {
        return false;
      }
    },
    deleteTodo: async (parent, args) => {
      const todo = await models.Todo.destroy({
        where: {
          id: args.todoInputDelete.id,
        },
      });
      if (todo === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};

module.exports = resolvers;
