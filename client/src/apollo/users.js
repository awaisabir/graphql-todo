import gql from 'graphql-tag';

export const getUser = gql`
query getUser($id: Int!) {
  getUser(id: $id) {
    id
    username
    todos {
      id
      title
      completed
    }
  }
}`;