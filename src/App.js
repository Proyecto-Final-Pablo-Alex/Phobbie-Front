import React from "react";
import {Switch, Route} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import EditUser from "./components/EditUser";
import AllHobbies from "./components/AllHobbies";
import AddHobbie from "./components/AddHobbie";
import Navbar from "./components/Navbar";
import HobbieDetails from "./components/HobbieDetails";
import FriendProfile from "./components/FriendProfile";
import MyFriends from "./components/MyFriends";
import MyHobbies from "./components/MyHobbies";
import ChatList from "./components/ChatList";
import Chat from "./components/Chat";


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
    logInSuccess: false,
    theme: 'dark'
  }

  toggleMode(){
    if (this.state.theme === 'light'){
      this.setState({...this.state, theme: "dark"})
    }else{
      this.setState({...this.state, theme: "light"})
    }
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
      <div className={`App ${this.state.theme}`}>
        <Navbar logInSuccess={this.state.logInSuccess} toggleButton={()=>this.toggleMode()}/>
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Home />}
          />
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
          <Route
            path="/return-friend/:id"
            exact
            component={(routeProps) => <FriendProfile {...routeProps} user={this.state.user}/>}
          />
           <Route
            path="/my-hobbies"
            exact
            component={() => <MyHobbies />}
          />
           <Route
            path="/my-friends"
            exact
            component={() => <MyFriends />}
          />
           <Route
            path="/my-chats"
            exact
            component={() => <ChatList />}
          />
          <Route
            path="/chat/:_id"
            exact
            component={(routeProps) => <Chat {...routeProps} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
