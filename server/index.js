import dotenv from 'dotenv';
const result = dotenv.config();

import express from 'express';
import jwt from 'express-jwt';
import graphql from 'graphql';
import bodyParser from 'body-parser';
import cors from 'cors';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from "graphql-tools";
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';


if (!result.error) {
  
  const models = require('./db').default;
  const PORT = process.env.PORT || 4200;
  const app  = express();
  const auth = jwt({
    secret: process.env.SECRET,
    credentialsRequired: false,
  });
  
  const graphqlEndpoint = '/graphql';
  const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
  const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
  const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
  });

  app.use(cors());
  app.use(graphqlEndpoint, bodyParser.json(), auth, graphqlExpress(req => {
    return { 
      schema, 
      context: {
        models,
        tokenString: req.headers.authorization ? req.headers.authorization : null
      } 
    }
  }));
  app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

  (async () => {
      await models.sequelize.sync();
      
      app.listen(PORT, err => {
          if (err) throw err;
          console.log(`App listening on port ${PORT}`);
      });            
  })();

} else 
    throw Error('Environment file not loaded');