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
          url: `https://phobbie.herokuapp.com/sv/return-friend/${this.props.match.params.id}`,
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
          url: "https://phobbie.herokuapp.com/sv/delete-friend",
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
                <div key={index}>
                  <img src={hobbie.photo} alt={`${hobbie.name} foto`} />
                  {hobbie.name}
                  <Link to={`/hobbie-details/${hobbie.name}`}><button>See details</button></Link>
                </div>
            )
          })
        }
        return this.state.deleted ? <Redirect to="/profile" /> : this.state.loaded ? (
          <div className="Profile">
            <img src={photo} alt={`Foto de perfil de ${username}`} />

            <div className="info">
              <h1>{username} profile</h1>
              <p className="info-status">
                <b>Status:</b> {status}
              </p>
              <p className="info-location">
                <b>Location:</b> {location}
              </p>
              <p>
                <b>Age:</b> {age}
              </p>
              <p>
                {friends.length} friends
              </p>
            </div>
            <div className="info-buttons">
              <Link to={`/chat/${_id}`}><button>Chat</button></Link>
              <button onClick={()=>this.deleteFriend(_id)}>Delete Friend</button>
            </div>

            {(hobbies.length !== 0)
            ?   <div className="friendHobbies">
                    {hobbiesList}
                </div>

            :   <p>No hobbies yet</p>}
            
            </div>
        ) : (
          <div className="spinner">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
        )
      }
}

export default FriendProfile;
