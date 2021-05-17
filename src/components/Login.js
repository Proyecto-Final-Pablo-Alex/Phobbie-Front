import React from "react";
import axios from "axios";

import { Redirect } from "react-router-dom";

class Login extends React.Component {
  state = {
    user: {
      username: "",
      password: "",
    },
    errorMsg: false
  };

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/login",
      data: this.state.user,
      withCredentials: true
    })
      .then((result) => {
        if(result.data.user){
          this.props.setAppState(result.data.user);
        }else{
          this.setState({...this.state, errorMsg: true})
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      user: { ...this.state.user, [name]: value },
    });
  }

  render() {
    return this.props.logInSuccess ? (
      <Redirect to="/profile" />
    ) : (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={(event) => this.handleInput(event)}
            autoComplete="off"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(event) => this.handleInput(event)}
            autoComplete="off"
          />

          <button>Log in</button>

          {this.state.errorMsg ? <p>Wrong credentials. Try again.</p> : null}
        </form>
      </div>
    );
  }
}
export default Login;
