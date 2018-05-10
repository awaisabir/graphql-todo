import dotenv from 'dotenv';
const result = dotenv.config();

import express from 'express';
import graphql from 'graphql';
import bodyParser from 'body-parser';
import passport from 'passport';

if (!result.error) {
    const PORT = process.env.PORT || 4200;
    const APP  = express();

    APP.listen(POST, err => {
        if (err) throw err;

        console.log(`App listening on port ${PORT}`);
    });
} else 
    throw Error('Environment file not loaded');