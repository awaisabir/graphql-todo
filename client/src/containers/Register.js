import React, { Component } from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { compose, graphql } from 'react-apollo';
import { register } from '../apollo/auth';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      message: '',
      success: false,
      error: {},
    };

    this._onFormSubmit = this._onFormSubmit.bind(this);
  };

  async _onFormSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    this.setState({loading: true});

    try {
      const result = await this.props.registerMutation({
        variables: {
          username,
          password,
        }
      });
      
    } catch (error) { this.setState({loading: false, error}); }

    this.setState({loading: false,});
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
          <CardTitle title='Register' />
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
                label='Register' 
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
  graphql(register, {name: 'registerMutation'})
)(Register);