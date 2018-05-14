const typeDefs = `
  type User {
    id: Int!
    username: String!
    password: String!
    todos: [Todo]
  }

  type Todo {
    id: Int!
    heading: String!
    description: [String!]!
    completed: Boolean!
    userId: Int!
  }

  type Query {
    todo(id: String!): Todo!
    completedTodos: [Todos!]!
    activeTodos: [Todos!]!
    deleteTodo(id: String!) : Todo!

    user($userId: Int!) {
      user(id: $userId) {
        id
        username
        todos {
          id
          heading
          description
          completed
        }
      }
    }

    type Mutations {
      addTodo($userId: Int!, $heading: String!, $description: [String!]!, $completed: Boolean!) : Todo
      deleteTodo($id: Int!) : Todo

      register($username: String!, $password: String!) : {
        success
        message
      }
      login($username: String!, $password: String!) : {
        success
        message
        token
      }
      deleteUser($id: Int!) : User
    }

  }
`;