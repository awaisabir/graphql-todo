import gql from 'graphql-tag';
import client from './client';

export const fetchTodos = async () => (
  new Promise(async (resolve, reject) => {
    try {
      const todos = await client.query({
        query: gql`{
          todos {
            id
            title
            description
            completed
          }
        }
      `
      });

      resolve(todos);
    } catch (error) { reject(error); }
  })
)