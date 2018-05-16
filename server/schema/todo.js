export default `
  type Todo {
      id: Int!
      title: String!
      description: [String!]!
      completed: Boolean!
      userId: Int!
  }

  type Query {
    getTodoById(id: Int!) : Todo
  }

  type Mutation {
    createTodo(title: String!, description: [String!]!, completed: Boolean!, userId: Int!) : Todo
    deleteTodo(id: Int!) : Todo
  }
`;