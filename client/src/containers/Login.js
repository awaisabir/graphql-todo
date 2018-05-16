import React, { Component } from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

import { graphql, compose } from 'react-apollo';
import { login } from '../apollo/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      success: false,
      error: {},
      autoHideDuration: 4000,
      open: false,
    };

    this._onFormSubmit        = this._onFormSubmit.bind(this);
    this.handleClick          = this.handleClick.bind(this);
    this.handleActionClick    = this.handleActionClick.bind(this);
    this.handleChangeDuration = this.handleChangeDuration.bind(this);
    this.handleRequestClose   = this.handleRequestClose.bind(this);
  };

  async _onFormSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { onLogin, history }   = this.props;

    this.setState({loading: true, username: '', password: ''});

    try {
      const result = await this.props.loginMutation({
        variables: {
          username,
          password,
        }
      });

      const { token } = result.data.login;

      this.setState({loading: false}, () => {
        this.handleClick();
        onLogin(token);
        history.push('/profile');
      });
    } catch (error) {
      const errorMessage = JSON.parse(error.graphQLErrors[0].message).message;
      this.setState({loading: false, error: {message: errorMessage}}, () => {
        this.handleClick();
      });
    }
  }

  handleClick() {
    this.setState({
      open: true,
    });
  };

  handleActionClick() {
    this.setState({
      open: false,
    });
  };

  handleChangeDuration(e) {
    const value = e.target.value;
    this.setState({
      autoHideDuration: value.length > 0 ? parseInt(value) : 0,
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  render() {
    const { username, password, loading, error, } = this.state;
    return (
      <div style={{marginTop: '50px',}}>
        { loading ?
          <div style={{marginBottom: '50px', textAlign: 'center'}}>
            <CircularProgress 
              size={80} 
              thickness={5} 
            />
          </div> : null
        }
        
        { error.message ?
          <Snackbar
            open={this.state.open}
            message={error.message}
            autoHideDuration={this.state.autoHideDuration}
            onActionClick={this.handleActionClick}
            onRequestClose={this.handleRequestClose}
          /> : null
        }

        <Card style={{textAlign: 'center'}}>
          <CardTitle title='Login' />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <TextField
                type='text'
                value={username}
                onChange={e => this.setState({username: e.target.value, error: {}})}
                floatingLabelText='Username'
              />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <TextField
                type='Password'
                value={password}
                onChange={e => this.setState({password: e.target.value, error: {}})}
                floatingLabelText='Password'
              />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
              <RaisedButton 
                style={{marginBottom: '25px', marginTop: '25px'}}
                label='Login' 
                primary={true} 
                onClick={e => this._onFormSubmit(e)}
              />
            </div>
        </Card>
      </div>
    );
  }
};

export default compose(
  graphql(login, {name: 'loginMutation'})
)(Login);