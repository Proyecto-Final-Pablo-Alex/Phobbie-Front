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
    const { username, friends, photo,status,age,location} = this.state.user;
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
            ) : null}
      </div>
    )
  }
}

export default Profile;
