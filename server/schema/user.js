export default `
    type User {
        id: Int!
        username: String!
        password: String!
        todos: [Todo]
    }
    
    type Query {
        getUser(id: Int!): User!
    }

    type Response {
        success: Boolean!
        message: String!
        token: String
    }

    type Mutation {
        register(username: String!, password: String!): Response!

        login(username: String!, password: String!): Response!

        deleteUser(id: Int!): User
    }
`;