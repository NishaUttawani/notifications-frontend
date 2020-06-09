import React from 'react';
import axios from 'axios';
import { setUserSession, getBaseUrl } from '../../utils/Common';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  login = (e) => {
    console.log(getBaseUrl());
    e.preventDefault();
    axios.post(`${getBaseUrl()}users/signin`,  this.state).then(response => {
      setUserSession(response.data.token, response.data.user);
      this.props.history.push('/profile');
    }).catch(err => {
      console.log(err);
      this.setState({email: '', password: ''});
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <div class="jumbotron col-12">
        <h3 class="display-4">Login</h3>
        <form  method="post" onSubmit={this.login}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="form-control"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

