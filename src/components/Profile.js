// ---------- IMPORTS -------------//
import React from "react"
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'

// ----------- COMPONENTS --------------//
import ProfileNavbar from "./ProfileNavbar"

// ---------- Component for rendering the own profile -------------//
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

// ----------- Returns user info from DB on CDM --------------//
  componentDidMount(){
    axios({
      method: "get",
      url: "https://phobbie.herokuapp.com/sv/return-user",
      withCredentials: true
    })
    .then(result => {
      axios({
        method: "post",
        url: "https://phobbie.herokuapp.com/sv/see-requests",
        data: {_id: result.data.result._id},
        withCredentials: true
      })
      .then(requests => {
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

// ---------- Function that shows the last confirmation to delete your account -------------//
  deleteAccountButton(){

    if(!this.state.delButton){
      this.setState({...this.state, delButton:true})

    }else{
      this.setState({...this.state, delButton:false})

    }
  }

// ---------- Function that register the info from the inputs -------------//
  handleInput(e){

    const {value} = e.target
    const stateCopy={...this.state}

    stateCopy.delButtonConfirm = value

    this.setState(stateCopy)
  }

// ---------- Function that delete permanently your account from DB -------------//
  delAccountConfirmation(){
    if (this.state.delButtonConfirm === this.state.user.username){
      axios({
        method:"POST",
        url:"https://phobbie.herokuapp.com/sv/delete-user",
        data: {_id: this.state.user._id},
        withCredentials:true
      })
      .then((result)=>{
        this.props.setAppState()

      })
      .catch((error)=>{
        console.log(error)

      })

    }else{
      return null

    }
  }

// ---------- Render all the user info -------------//
  render() {
    const { username, friends, photo,status,age,location} = this.state.user
    return !this.state.loaded ? 
    (
    //------------------Spinner for the loading----------------//
      <div className="spinner">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
    ) : (
    //------------------Check if user is logged----------------//
      !this.props.logInSuccess 
    ) ? (
    //------------------If not redirect to sign up----------------//
    <Redirect to="/signup" /> 
    ) : (
      <div className="Profile">

        <ProfileNavbar setAppState={()=>this.props.setAppState()}/>

        <img src={photo} alt={`Foto de perfil de ${username}`} />

        <div className="info">

          <h1>{username}</h1>

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

          <Link to="/edit-user"><button>Edit user</button></Link>
          <button onClick={()=>this.deleteAccountButton()}>Delete account</button>

          {this.state.delButton ? 
          (
            <div className="info-delete">
              <p>Are you sure? Confirm your username: </p>
              <form onSubmit={()=>this.delAccountConfirmation()}>
                <input type="text" onChange={(e)=>this.handleInput(e)} autoComplete="off"/>
                <button>Confirm</button>
              </form>
            </div>
          ) : (
            null
          )}
        </div>
      </div>
    )
  }
}

export default Profile
