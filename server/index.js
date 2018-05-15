import dotenv from 'dotenv';
const result = dotenv.config();

import express from 'express';
import graphql from 'graphql';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from "graphql-tools";
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';


if (!result.error) {
    const models = require('./db').default;

    const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
    const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });
    
    const PORT = process.env.PORT || 4200;
    const app  = express();

    const graphqlEndpoint = '/graphql';

    app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ 
        schema, 
        context: {
            models,
        } 
    }));

    app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

    app.use(cors());

    (async () => {
        await models.sequelize.sync();
        
        app.listen(PORT, err => {
            if (err) throw err;
            console.log(`App listening on port ${PORT}`);
        });            
    })();

} else 
    throw Error('Environment file not loaded');