import React from "react";
import {Switch, Route} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import EditUser from "./components/EditUser";
import AllHobbies from "./components/AllHobbies";
import AddHobbie from "./components/AddHobbie";
import Navbar from "./components/Navbar";
import HobbieDetails from "./components/HobbieDetails";

class App extends React.Component {
  state = {
    user: {
      username: "",
      age: "",
      location: "",
      friends: [],
      hobbies: [],
      _id: "",
      password: "",
      photo: "",
      status:''
    },
    logInSuccess: false
  }


  editStateFromLogin(body) {
    const stateCopy = { ...this.state }
    stateCopy.user = body
    stateCopy.logInSuccess = true
    this.setState(stateCopy)
  }

  editStateFromLogout(){
    const stateCopy = { ...this.state }
    stateCopy.user = {}
    stateCopy.logInSuccess = false
    this.setState(stateCopy)
  }
  
  render() {
    return (
      <div className="App">
        <h1>Welcome to HobbiesSphere</h1>
        <Navbar logInSuccess={this.state.logInSuccess} setAppState={()=>this.editStateFromLogout()}/>
        <Switch>
          <Route
            path="/profile"
            exact
            component={() => <Profile logInSuccess={this.state.logInSuccess} setAppState={()=>this.editStateFromLogout()}/>}
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
          <Route
            path="/edit-user"
            exact
            component={() => <EditUser user={this.state.user} />}
          />
          <Route
            path="/all-hobbies"
            exact
            component={() => <AllHobbies user={this.state.user} />}
          />
          <Route
            path="/add-hobbies"
            exact
            component={() => <AddHobbie user={this.state.user} />}
          />
          <Route
            path="/hobbie-details/:name"
            exact
            component={(routeProps) => <HobbieDetails {...routeProps} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
