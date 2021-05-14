import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class FriendProfile extends React.Component {
    state = {
        user: {
          username: "",
          age: '',
          location: '',
          friends: [],
          hobbies: [],
          _id: "",
          photo: '',
          status:''
        },
        loaded: false,
    }

    componentDidMount(){
        axios({
          method: "get",
          url: `http://localhost:5000/return-friend/${this.props.match.params.id}`,
          withCredentials: true
        })
        .then(result => {
            console.log(result.data)
            const stateCopy = {...this.state}
            stateCopy.user = result.data.result
            stateCopy.loaded = true
            this.setState(stateCopy)
        })
        .catch(error => {
            console.log(error)
        })  
      }

    render(){
        const {username, friends, photo, hobbies,status,age,location} = this.state.user;
        let friendList, hobbiesList
        if (this.state.loaded){
          friendList = friends.map((friend, index) => {
            return (
              <li key={index}>
                <img src={friend.photo} alt={`${friend.name} foto`} />
                <p>{friend.username}</p>
                <button onClick={()=>this.deleteFriend(friend._id)}>Delete Friend</button>
              </li>
            );
          });
          hobbiesList = hobbies.map((hobbie, index) => {
            return (
              <Link to={`/hobbie-details/${hobbie.name}`}>
                <li key={index}>
                  <img src={hobbie.photo} alt={`${hobbie.name} foto`} style={{width: "200px"}} />
                  {hobbie.name}
                </li>
              </Link>
            )
          })
        }
        return this.state.loaded ? (
          <div>
            <img src={photo} alt={`Foto de perfil de ${username}`} />
            <div>
              <h1>Welcome, {username}</h1>
              <p>
                <b>Status:</b> {status}
              </p>
              <p>
                <b>Age:</b> {age}
              </p>
              <p>
                <b>Location:</b> {location}
              </p>
              <p>
                {friends.length} friends
              </p>
            </div>
    
              {(friends.length !== 0)
              ? <div>
                  <h2>Friends</h2>
                  <ul>{friendList}</ul>
                </div>
    
              : <div>
                No friends yet
                </div>}
              
              {(hobbies.length !== 0)
              ? <div>
                  <h2>Hobbies</h2>
                  <ul>{hobbiesList}</ul>
                </div>
    
              : <div>
                No hobbies yet
                </div>}
              
              </div>
        )
        : <p>Loading...</p>
      }
}

export default FriendProfile;
