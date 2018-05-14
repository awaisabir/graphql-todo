import React, { Component } from 'react';

import { BrowserRouter as Router, Route  } from 'react-router-dom';

import RouterRoot from '../components/routing/RouterRoot';
import NavBar from '../components/Navbar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    const { isLoggedIn } = this.state;

    if (isLoggedIn)
      this.setState({isLoggedIn: false});
    else
      this.setState({isLoggedIn: true});
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar isLoggedIn={this.state.isLoggedIn} onLogout={this.onLogout}/>
          <div className='container'>
            <div>
              <Route path='/' render={() => <RouterRoot isLoggedIn={this.state.isLoggedIn} />} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
};

export default App;