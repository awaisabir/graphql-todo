import React, { Component } from 'react';

import { BrowserRouter as Router, Route  } from 'react-router-dom';

import RouterRoot from '../components/routing/RouterRoot';
import NavBar from '../components/Navbar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      token: '',
    };

    this.onLogout = this.onLogout.bind(this);
    this.onLogin  = this.onLogin.bind(this);
  }

  onLogout() {
    this.setState({isLoggedIn: false, token: ''});
  }

  onLogin(token) {
    this.setState({token, isLoggedIn: true});
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar isLoggedIn={this.state.isLoggedIn} onLogout={this.onLogout}/>
          <div className='container'>
            <div>
              <Route path='/' render={() => <RouterRoot 
                isLoggedIn={this.state.isLoggedIn} 
                onLogin={this.onLogin}
              />} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
};

export default App;