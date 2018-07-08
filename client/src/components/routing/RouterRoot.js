import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../../containers/Login';
import Register from '../../containers/Register';
import Profile from '../../containers/Profile';

export default ({ isLoggedIn, onLogin }) => (
  <Switch>
    {isLoggedIn
      ? <Route exact path="/login" render={props => <Redirect to="/profile" />} />
      : <Route exact path="/login" render={props => <Login {...props} onLogin={onLogin} />} />
    }

    {isLoggedIn
      ? <Route exact path="/register" render={props => <Profile />} />
      : <Route exact path="/register" component={Register} />
    }

    {isLoggedIn
      ? <Route exact path="/profile" component={Profile} />
      : <Redirect to="/login" />
    }
  </Switch>
);
