import "./App.css";
import React from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";

class App extends React.Component {
  state = {
    user: {
      username: "",
      friends: [],
      _id: "",
      password: "",
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
        <Link to="/all-pokemon">All pokemon</Link>
        <Link to="/profile"> My profile </Link>
        <Switch>
          <Route
            path="/pokemon-details/:name"
            component={(routeProps) => <PokemonDetails {...routeProps} />}
          />
          <Route
            path="/all-pokemon"
            component={() => (
              <PokemonList
                user={this.state.user}
                setAppState={(body) => this.editStateFromLogin(body)}
              />
            )}
          />
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
        </Switch>
      </div>
    );
  }
}

export default App;
