import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  };

  onFormSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    console.log(username, password);
  }

  render() {
    const { username, password } = this.state;

    return (
      <div style={{marginTop: '50px',}}>
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
                onClick={e => this.onFormSubmit(e)}
              />
            </div>
        </Card>
      </div>
    );
  }
};

export default Register;