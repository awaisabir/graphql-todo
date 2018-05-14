import gql from 'graphql-tag';

/** QUERIES */
export const fetchTodos = gql`{
  query fetchTodos {
    todos {
      id
      title
      completed
    }
  }
}`;

export const fetchTodoById = gql`{
  query fetchTodoById($id: Int!) {
    todo(id: $id) {
      id
      title
      description
      completed
    }
  }
}`;

/** MUTATIONS */
export const createTodo = gql`{
  mutation createTodo($title, String!, $description: [String]!, $completed: Boolean!)
}`;