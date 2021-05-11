import "./App.css";
import React from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import EditUser from "./components/EditUser";

class App extends React.Component {
  state = {
    user: {
      username: "",
      age: '',
      friends: [],
      hobbies: [],
      _id: "",
      password: "",
      photo: ''
    },
    logInSuccess: false,
  };

  editStateFromLogin(body) {
    const stateCopy = { ...this.state };
    stateCopy.user = body;
    stateCopy.logInSuccess = true;

    this.setState(stateCopy);
  }
  render() {
    return (
      <div className="App">
        <h1>Welcome to Jobbis</h1>
        <Link to="/login">Log in </Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/profile"> My profile </Link>
        <Switch>
          <Route
            path="/profile"
            component={() => <Profile user={this.state.user} />}
          />
          <Route
            path="/login"
            exact
            component={() => (
              <Login
                setAppState={(body) => this.editStateFromLogin(body)}
                logInSuccess={this.state.logInSuccess}
              />
            )}
          />
          <Route path="/signup" exact component={() => <Signup />} />
          <Route path="/edit-user" exact component={() => <EditUser user={this.state.user}/>} />
        </Switch>
      </div>
    );
  }
}

export default App;
