import React from "react";
import { Link, Redirect } from "react-router-dom";
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
      photo: '',
      status:''
    },
    loaded: false,
    requests: [],
    delButton:false,
    delButtonConfirm: "",
    deleted:false

  }

  componentDidMount(){
    axios({
      method: "get",
      url: "http://localhost:5000/return-user",
      withCredentials: true
    })
    .then(result => {
      axios({
        method: "post",
        url: "http://localhost:5000/see-requests",
        data: {_id: result.data.result._id},
        withCredentials: true
      })
      .then(requests => {
        console.log(requests)
        const stateCopy = {...this.state}
        stateCopy.user = result.data.result
        stateCopy.requests = requests.data
        stateCopy.loaded = true
        this.setState(stateCopy)
      })
    })
    .catch(error => {
      console.log(error)
    })  
  }


  acceptFriendRequest(requesterId, reqId){
    axios({
      method: "post",
      url: "http://localhost:5000/accept-request",
      data: {_id:reqId, requester:requesterId, recipient: this.state.user._id},
      withCredentials: true
    })
  }

  rejectFriendRequest(requesterId, reqId){
    axios({
      method: "post",
      url: "http://localhost:5000/reject-request",
      data: {_id:reqId, requester:requesterId, recipient: this.state.user._id},
      withCredentials: true
    })
  }

  deleteFriend(friendId){
    axios({
      method: "post",
      url: "http://localhost:5000/delete-friend",
      data: {requester:this.state.user._id, recipient:friendId},
      withCredentials: true
    })
  }

  deleteAccountButton(){
    if(!this.state.delButton){
      this.setState({...this.state, delButton:true})
    }else{
      this.setState({...this.state, delButton:false})
    }
  }

  handleInput(e){
    const {value} = e.target
    const stateCopy={...this.state}
    stateCopy.delButtonConfirm = value
    this.setState(stateCopy)
  }

  delAccountConfirmation(){
    axios({
      method:"POST",
      url:"http://localhost:5000/delete-user",
      data: {_id: this.state.user._id},
      withCredentials:true
    })
    .then((result)=>{
      this.setState({...this.state, deleted:true})
    })
  }

  render() {
    const { username, friends, photo, hobbies} = this.state.user;
    const {requests} = this.state
    console.log(requests)
    let friendList, hobbiesList, friendRequests
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
          <li key={index}>
            <img src={hobbie.photo} alt={`${hobbie.name} foto`} style={{width: "200px"}} />
            {hobbie.name}
          </li>
        );
      });
      friendRequests = requests.map((req, index)=>{
        return (
          <li key={index}>
            <img src={req.requester.photo} alt={req.requester.username} />
            <p>{req.requester.username}</p>          
            <button onClick={()=>this.acceptFriendRequest(req.requester._id, req._id)}>Accept</button>
            <button onClick={()=>this.rejectFriendRequest(req.requester._id, req._id)}>Reject</button>
          </li>
        )
      })
    }
    return this.state.deleted ? <Redirect to="/" /> : (
      <div>
        <h1>Hola {username}</h1>
        <img src={photo} alt={`Foto de perfil de ${username}`} />
        <Link to="/edit-user"><button>Edit user</button></Link>
        <button onClick={()=>this.deleteAccountButton()}>Delete account</button>
        {this.state.delButton ? (
          <div>
            <p>Are you sure? Type your username to confirm: </p>
            <form onSubmit={()=>this.delAccountConfirmation()}>
              <input type="text" onChange={(e)=>this.handleInput(e)} />
              <button>Confirm</button>
            </form>
          </div>
          ): null}

        {(this.state.requests.length !== 0)
          ? <div>
              <h2>Requests</h2>
              <ul>{friendRequests}</ul>
            </div>

          : <div>
            You don't have any friend requests
            </div>}

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
