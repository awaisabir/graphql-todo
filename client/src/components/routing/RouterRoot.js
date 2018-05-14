import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../../containers/Login';
import Register from '../../containers/Register';
import Profile from '../../containers/Main';

export default ({isLoggedIn, onLogin}) => (
  <Switch>
    <Route exact path='/login' render={ props => <Login {...props} onLogin={onLogin}/> } />
    <Route exact path='/register' component={Register} />
    
    {isLoggedIn ? 
      <Route exact path='/profile' component={Profile} />
      : <Redirect to='/login' />
    }
  </Switch>
);