import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

import '../styles/App.css';
import User from '../components/User';
import Todos from '../components/Todos';

import decode from 'jwt-decode';
import { graphql } from 'react-apollo';
import { getUser } from '../apollo/users';


const Profile = ({data: {loading, error, getUser} }) => {
  if (loading)
    return <CircularProgress size={80} thickness={5} />;

  if (error)
    return (
      <div style={{textAlign: 'center', marginTop: '100px'}}>
        {error.message}
      </div>
    );

  if (getUser) {
    const { username } = getUser;
    return (
      <span>
        <User style={{marginTop: '50px'}} username={username} />
        <Todos />
      </span>
    );
  }

  return <CircularProgress size={80} thickness={5} />;
}

export default graphql(getUser, {
  options: props => ({
    variables: {
      id: decode(localStorage.getItem('token')).id
    }
  })
})(Profile);
