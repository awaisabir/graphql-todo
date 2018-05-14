import React, { Component } from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { graphql, compose } from 'react-apollo';
import { login } from '../apollo/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      error: {},
    };

    this._onFormSubmit = this._onFormSubmit.bind(this);
  };

  async _onFormSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { onLogin, history }   = this.props;

    this.setState({loading: true});

    try {
      const result = await this.props.loginMutation({
        variables: {
          username,
          password,
        }
      });

      const {data: { token }} = result;

      this.setState({loading: false});
      onLogin(token);
      history.push('/profile');
    } catch (error) { 
      this.setState({loading: false, error});
    }
  }

  render() {
    const { username, password, loading, error } = this.state;
    return (
      <div style={{marginTop: '50px',}}>
        {
          loading ?
          <div style={{marginBottom: '50px', textAlign: 'center'}}>
            <CircularProgress 
              size={80} 
              thickness={5} 
            />
          </div> : null
        }
        {
          error ?
          <div style={{marginBottom: '50px', textAlign: 'center'}}>
            <h2>{error.message}</h2>
          </div> : null
        }

        <Card style={{textAlign: 'center'}}>
          <CardTitle title='Login' />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <TextField
                type='text'
                value={username}
                onChange={e => this.setState({username: e.target.value})}
                floatingLabelText='Username'
              />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <TextField
                type='Password'
                value={password}
                onChange={e => this.setState({password: e.target.value})}
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