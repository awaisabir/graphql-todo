import React, { Component } from 'react';
import decode from 'jwt-decode';
import jwt from 'jsonwebtoken';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import RouterRoot from '../components/routing/RouterRoot';
import NavBar from '../components/Navbar';
import config from '../config/config.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      token: '',
    };

    this.onLogout = this.onLogout.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    try {
      const result = token && jwt.verify(token, config.key);
      if (!result) {
        this.setState({ isLoggedIn: false, token: '' });
      } else {
        this.setState({ isLoggedIn: true, token });
      }
    } catch (jsonWebTokenError) {
      localStorage.clearItem('token');
      this.setState({ isLoggedIn: false, token: '' });
    }
  }

  onLogout() {
    localStorage.clear();
    this.setState({ isLoggedIn: false, token: '' });
  }

  onLogin(token) {
    localStorage.setItem('token', token);
    this.setState({ token, isLoggedIn: true });
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar isLoggedIn={this.state.isLoggedIn} onLogout={this.onLogout} />
          <div className="container">
            <div>
              <Route
                path="/"
                render={() => (
                  <RouterRoot
                    isLoggedIn={this.state.isLoggedIn}
                    onLogin={this.onLogin}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
