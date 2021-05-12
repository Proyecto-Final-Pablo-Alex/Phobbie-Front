import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

class Profile extends React.Component {

  state = {
    user: {
      username: "",
      age: '',
      location: '',
      friends: [],
      hobbies: [],
      _id: "",
      password: "",
      photo: ''
    },
    loaded: false
  }


  componentDidMount(){
    axios({
      method: "get",
      url: "http://localhost:5000/return-user",
      withCredentials: true
    })
    .then(result => {
      console.log(result)
      this.setState({user: result.data.result, loaded: true})
    })
    .catch(error => {
      console.log(error)
    })
    
  }
  render() {
    const { username, friends, photo, hobbies} = this.state.user;
    console.log(friends)
    console.log(hobbies)
    let friendList, hobbiesList
    if (this.state.loaded){
      friendList = friends.map((friend, index) => {
        return (
          <li key={index}>
            <img src={friend.photo} alt={`${friend.name} foto`} />
            {friend.name}
          </li>
        );
      });
      hobbiesList = hobbies.map((hobbie, index) => {
        return (
          <li key={index}>
            <img src={hobbie.photo} alt={`${hobbie.name} foto`} />
            {hobbie.name}
          </li>
        );
      });
    }
    return (
      <div>
        <Link to="/edit-user">Edit user</Link>
        <h1>Hola {username}</h1>
        <img src={photo} alt={`Foto de perfil de ${username}`} />

          {(friends.length !== 0)
          ? <div>
              <h2>Friends</h2>
              <ul>{friendList}</ul>
            </div>

          : <div>
            You don't have friends yet
            </div>}
          
          {(hobbies.length !== 0)
          ? <div>
              <h2>Hobbies</h2>
              <ul>{hobbiesList}</ul>
            </div>

          : <div>
            You don't have hobbies yet
            </div>}
          
          </div>
    )
  }
}

export default Profile;
