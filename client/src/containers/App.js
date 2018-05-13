import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';

import '../styles/App.css';
import User from '../components/User';

import { graphql } from 'react-apollo';
import { fetchUserById } from '../apollo/users';

class App extends Component {
  render() {
    const { data } = this.props;

    if (data.loading)
      return <CircularProgress size={80} thickness={5} />;

    if (data.error)
      return (
        <div style={{textAlign: 'center', marginTop: '100px'}}>
          {data.error.message}
        </div>
      );

    return (
      <User style={{marginTop: '50px'}} username={data.username} />
    );
  }
}

export default graphql(fetchUserById, {
  options: props => ({
    variables: {
      id: 1
    }
  })
})(App);
