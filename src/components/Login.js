// ---------- IMPORTS -------------//
import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

// ---------- Component for rendering the login  -------------//

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
      url: "https://phobbie.herokuapp.com/sv/login",
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
        this.setState({...this.state, errorMsg: true})
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

          {this.state.errorMsg ? <p className="error-message">Wrong credentials. Try again.</p> : null}
        </form>
      </div>
    );
  }
}
export default Login;
