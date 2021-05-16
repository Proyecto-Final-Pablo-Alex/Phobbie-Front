import axios from "axios";
import React from "react";
import { Link, Redirect } from "react-router-dom";

class FriendProfile extends React.Component {
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
        friend: {
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
        deleted: false
    }

    componentDidMount(){
        axios({
          method: "get",
          url: `http://localhost:5000/return-friend/${this.props.match.params.id}`,
          withCredentials: true
        })
        .then(result => {
            const stateCopy = {...this.state}
            stateCopy.friend = result.data.result
            stateCopy.user = this.props.user
            stateCopy.loaded = true
            this.setState(stateCopy)
        })
        .catch(error => {
            console.log(error)
        })  
      }

      deleteFriend(friendId){
        axios({
          method: "post",
          url: "http://localhost:5000/delete-friend",
          data: {requester:this.state.user._id, recipient:friendId},
          withCredentials: true
        })
        .then(result => {
          this.setState({...this.state, deleted: true})
        })
        .catch(error => {
          console.log(error)
        })
      }

    render(){
        const {_id, username, friends, photo, hobbies,status,age,location} = this.state.friend;
        let hobbiesList
        if (this.state.loaded){
          hobbiesList = hobbies.map((hobbie, index) => {
            return (
                <li key={index}>
                  <img src={hobbie.photo} alt={`${hobbie.name} foto`} style={{width: "200px"}} />
                  {hobbie.name}
                  <Link to={`/hobbie-details/${hobbie.name}`}><button>See details</button></Link>
                </li>
            )
          })
        }
        return this.state.deleted ? <Redirect to="/profile" /> : this.state.loaded ? (
          <div>
            <img src={photo} alt={`Foto de perfil de ${username}`} />

            <div>
              <h1>{username} profile</h1>
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
            <button onClick={()=>this.deleteFriend(_id)}>Delete Friend</button>

            {(hobbies.length !== 0)
            ?   <div>
                    <h2>Hobbies</h2>
                    <ul>{hobbiesList}</ul>
                </div>

            :   <p>No hobbies yet</p>}
            
            </div>
        )
        : <p>Loading...</p>
      }
}

export default FriendProfile;
