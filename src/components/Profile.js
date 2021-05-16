import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios'
import ProfileNavbar from "./ProfileNavbar";


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
    requestCounter: "",
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
        stateCopy.requestCounter = requests.data.length
        stateCopy.loaded = true
        this.setState(stateCopy)
      })
    })
    .catch(error => {
      console.log(error)
    })  
  }

  componentDidUpdate(){
    
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
        this.props.updateUser(result.data.result)
        stateCopy.requests = requests.data
        stateCopy.requestCounter = requests.data.length
        stateCopy.loaded = true
        if (requests.data.length === this.state.requests.length && this.state.user.friends.length === result.data.result.friends.length){
          console.log(requests)
          
        } else {
          this.setState(stateCopy)
        }
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
    .then(result => {
      console.log(result)
      this.setState({...this.state, requestCounter: this.state.requestCounter - 1})
    })
    .catch(error => {
      console.log(error)
    })
  }

  rejectFriendRequest(requesterId, reqId){
    axios({
      method: "post",
      url: "http://localhost:5000/reject-request",
      data: {_id:reqId, requester:requesterId, recipient: this.state.user._id},
      withCredentials: true
    })
    .then(result => {
      console.log(result)
this.setState({...this.state, requestCounter: this.state.requestCounter-1})
    })
    .catch(error => {
      console.log(error)
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
      this.props.setAppState()
    })
  }

  render() {
    const { username, friends, photo, hobbies,status,age,location} = this.state.user;
    const {requests} = this.state
    console.log(requests)
    let friendList, hobbiesList, friendRequests
    if (this.state.loaded){
      friendList = friends.map((friend, index) => {
        return (
          <li key={index}>
            <img src={friend.photo} alt={`${friend.username} foto`} />
            <p>{friend.username}</p>
            <Link to={`/return-friend/${friend._id}`}><button>See profile</button></Link>
          </li>
        );
      });
      hobbiesList = hobbies.map((hobbie, index) => {
        return (
          <li key={index}>
            <img src={hobbie.photo} alt={`${hobbie.name} foto`} style={{width: "200px"}} />
            {hobbie.name}
            <Link to={`/hobbie-details/${hobbie.name}`}><button>See details</button></Link>
          </li>
        )
      })
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
    return (!this.props.logInSuccess) ? <Redirect to="/signup" /> : (
      <div>
        <ProfileNavbar />
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
