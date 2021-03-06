// --------------- APP COMPONENT -------------------//
import React from "react";
import {Switch, Route} from "react-router-dom";

// --------------- COMPONENTS -------------------//
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
// ----- Media query component for Big Screens--------//
import BigScreen from "./components/BigScreen"


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
    theme: 'dark',
    matches: window.matchMedia("(min-width: 501px)").matches,
  }

// ----- Check for the size of the screen on CDM --------//
  componentDidMount() {
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 501px)").addListener(handler);
  }

  // ----- Toggle dark mode and light mode --------//
  toggleMode(){
    if (this.state.theme === 'light'){
      this.setState({...this.state, theme: "dark"})
    }else{
      this.setState({...this.state, theme: "light"})
    }
  }

// ----- Get the user when log in --------//
  editStateFromLogin(body) {
    const stateCopy = { ...this.state }
    stateCopy.user = body
    stateCopy.logInSuccess = true
    this.setState(stateCopy)
  }

  // ----- Remove user when logout --------//
  editStateFromLogout(){
    const stateCopy = { ...this.state }
    stateCopy.user = {}
    stateCopy.logInSuccess = false
    this.setState(stateCopy)
  }
  
  // ----- Render with all the Routes --------//
  render() {
    return this.state.matches ? <BigScreen /> : (
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
            component={() => <Profile logInSuccess={this.state.logInSuccess} setAppState={()=>this.editStateFromLogout()} />}
          />

          <Route
            path="/login"
            exact
            component={() => (<Login setAppState={(body) => this.editStateFromLogin(body)} logInSuccess={this.state.logInSuccess} />)}
          />

          <Route 
            path="/signup" 
            exact component={() => <Signup />} 
          />

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
            component={() => <MyHobbies  setAppState={()=>this.editStateFromLogout()} />}
          />

           <Route
            path="/my-friends"
            exact
            component={() => <MyFriends  setAppState={()=>this.editStateFromLogout()} />}
          />

           <Route
            path="/my-chats"
            exact
            component={() => <ChatList  setAppState={()=>this.editStateFromLogout()} />}
          />

          <Route
            path="/chat/:_id"
            exact
            component={(routeProps) => <Chat {...routeProps} user={this.state.user}/>}
          />

        </Switch>
        
      </div>
    )
  }
}

export default App;
