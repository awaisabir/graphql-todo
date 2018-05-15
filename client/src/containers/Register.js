import React, { Component } from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

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

    this.setState({loading: true});

    try {
      const result = await this.props.registerMutation({
      variables: {
          username,
          password,
        }
      });
      
      const { message, success } = result.data.register;

      this.setState({loading: false, message, success}, () => {
        this.handleClick();
      });
    } catch (error) { this.setState({loading: false, error}, () => { this.handleClick(); }); }
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
    alert('Event removed from your calendar.');
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
    const { username, password, loading, error, message, success } = this.state;

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
            action="undo"
            autoHideDuration={this.state.autoHideDuration}
            onActionClick={this.handleActionClick}
            onRequestClose={this.handleRequestClose}
          /> : null
        }

        { success ? 
          <Snackbar
            open={this.state.open}
            message={message}
            action="undo"
            autoHideDuration={this.state.autoHideDuration}
            onActionClick={this.handleActionClick}
            onRequestClose={this.handleRequestClose}
          /> : null
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