export default `
    type Todo {
        id: Int!
        title: String!
        description: [String!]!
        completed: Boolean!
    }

    type Query {
        getUser(id: Int!): User!
        allUsers: [User!]!
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User!
    }
`;