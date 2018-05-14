import gql from 'graphql-tag';

export const register = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      success
      message
    }
  }
`;

export const login = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      message
      token
    }
  }
`;