import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

import '../styles/App.css';
import User from '../components/User';
import Todos from '../components/Todos';

import { graphql } from 'react-apollo';
import { fetchUserById } from '../apollo/users';

const Profile = ({data: {loading, error, username} }) => {
  if (loading)
    return <CircularProgress size={80} thickness={5} />;

  if (error)
    return (
      <div style={{textAlign: 'center', marginTop: '100px'}}>
        {error.message}
      </div>
    );

  return (
    <span>
      <User style={{marginTop: '50px'}} username={username} />
      <Todos />
    </span>
  );
}

export default graphql(fetchUserById, {
  options: props => ({
    variables: {
      id: 1
    }
  })
})(Profile);
