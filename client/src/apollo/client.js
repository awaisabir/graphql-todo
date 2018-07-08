import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
	uri: 'http://localhost:4200/graphql'
});

export default client;
