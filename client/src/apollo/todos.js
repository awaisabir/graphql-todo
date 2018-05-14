import gql from 'graphql-tag';

/** MUTATIONS */
export const createTodo = gql`
  mutation createTodo($userId: Int!, $heading: String!, $description: [String!]!, $completed: Boolean!) {
    success
    message
    heading
    description
    completed
  }
`;

export const deleteTodo = gql`
  mutation deleteTodo($id: Int) {
    success
    message
    id
  }
`;