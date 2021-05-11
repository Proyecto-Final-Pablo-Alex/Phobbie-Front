import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Signup extends React.Component {
  state = {
    user: {
      username: ``,
      password: ``,
    },
    successSignUp: false,
    errorMessage: false,
  };

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/signup",
      data: this.state.user,
    })
      .then((result) => {
        console.log(result);
        if (result.data.message === "User created") {
          this.setState({ ...this.state, successSignUp: true });
        } else {
          this.setState({ ...this.state, errorMessage: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      ...this.state,
      user: { ...this.state.user, [name]: value },
    });
  }

  render() {
    return this.state.successSignUp ? (
      <Redirect to="/login" />
    ) : (
      <div className="Signup">
        <h1>Sign up</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={(event) => this.handleChange(event)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(event) => this.handleChange(event)}
          />

          <button>Sign up</button>
        </form>
        {this.state.errorMessage ? <p>Este usuario ya existe</p> : null}
      </div>
    );
  }
}
export default Signup;
