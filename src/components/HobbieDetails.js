// ---------- IMPORTS -------------//
import React from "react"
import axios from "axios"

// ---------- Component for rendering the hobbies details -------------//
class HobbieDetails extends React.Component {
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
    hobbie: {
      name: "",
      photo: "",
      description: "",
      users: [],
      _id: "",
    },
    loaded: false,
    added: false,
    requestSent: false,
    renderUsers: [],
    usersChecked: false,
    errorMessage: ''
  }

  //----- Get hobbie details from DB when CDM------//
  componentDidMount() {

    axios({
      method: "get",
      url: `https://phobbie.herokuapp.com/sv/hobbie-details/${this.props.match.params.name}`,
      withCredentials: true,
    })
    .then((hobbie) => {

        axios({
            method: "get",
            url: "https://phobbie.herokuapp.com/sv/return-user",
            withCredentials: true
        })
        .then(user=>{

          if(user.data.result.hobbies.filter(hob=> hob.name === hobbie.data.name).length>0){
            this.setState({
              ...this.state,
              hobbie: hobbie.data,
              user: user.data.result,
              renderUsers: hobbie.data.users,
              loaded: true,
              added: true
            })

          }else{
            this.setState({
              ...this.state,
              hobbie: hobbie.data,
              renderUsers: hobbie.data.users,
              user: user.data.result,
              loaded: true
            })
          }
        })

    })
    .catch((err) => {
      console.log(err)

    })
  }

// ---------- Function that adds a hobbie to your profile -------------//
  addToMyHobbies(_id){

    axios({
      method: "post",
      url: "https://phobbie.herokuapp.com/sv/hobbies/addToMyHobbies",
      data: {_id, userId: this.state.user._id},
      withCredentials: true
    })
    .then(result => {
      this.setState({...this.state, user: result.data.user, hobbie: result.data.hobbie, renderUsers: result.data.hobbie.users, added: true})

    })
    .catch(error => {
      console.log(error)

    })  
  }

// ---------- Function that deletes a hobbie from your profile -------------//
  removeFromMyHobbies(_id){

    axios({
      method: "post",
      url: "https://phobbie.herokuapp.com/sv/hobbies/removeFromMyHobbies",
      data: {_id, userId: this.state.user._id},
      withCredentials: true
    })
    .then(result => {
        this.setState({...this.state, user: result.data.user, hobbie: result.data.hobbie, renderUsers: result.data.hobbie.users, added: false})
    })
    .catch(error => {
      console.log(error)
    })  
  }

// ---------- Function that sends a friend request -------------//
  sendFriendRequest(id){

    axios({
      method: "post",
      url: "https://phobbie.herokuapp.com/sv/send-request",
      data: {requester: this.state.user._id, recipient: id},
      withCredentials: true
    })
    .then(result => {
      this.setState({...this.state, requestSent: true, errorMessage: result.data.errorMessage})

    })
    .catch(error => {
      console.log(error)

    })
  }

// ---------- Function that filter users by name -------------//
  filterUsers(e){

    const {value} = e.target

    const renderUsers = this.state.hobbie.users.filter(user=>{
      return user.username.toLowerCase().includes(value.toLowerCase())
    })

    this.setState({...this.state, renderUsers: renderUsers})
  }

// ---------- Function that filter users by "My Area" -------------//
  onlyMyAreaUsers(){

    const {usersChecked} = this.state

    if (usersChecked === false){
      const filteredUsers = this.state.hobbie.users.filter(user=>{
        return user.location === this.state.user.location
      })
      this.setState({...this.state, usersChecked: true, renderUsers: filteredUsers})

    }else{
      this.setState({...this.state, usersChecked: false, renderUsers: this.state.hobbie.users})
    }
  }

// ---------- Function that checks if a user is already your friend -------------//
  checkIfFriends(username){

    const {friends} = this.state.user

    const booleanArr = friends.filter(friend=>{
      return friend.username === username
      })

    return booleanArr.length > 0
  }


//----- Map and render the hobbie details------//
  render() {

    const {name,photo,description, _id} = this.state.hobbie
    const {renderUsers} = this.state

    //------ Sorts users by name----//
    const sortedUsersByName = renderUsers.sort((a,b)=> a.username.localeCompare(b.username)) 

    //------Filter users so the logged profile don't appear------//
    const filteredUsers = sortedUsersByName.filter(user=>user._id !== this.state.user._id) 

    //----- Map for rendering all users sorted and filtered------//
    const usersmap = filteredUsers.map((user, index)=>{                                         
      return <div className="friend" key={index}>
                <img src={user.photo} alt={user.username}/> 
                <h3>{user.username}</h3>
                {this.checkIfFriends(user.username) ? <button disabled>Already friends</button> : <button onClick={()=>this.sendFriendRequest(user._id)}>Friend request</button>}
              </div>
    })

    //----- Render the details mapped------//
    return this.state.loaded ? 
      (
        <div className="HobbieDetails">

          <h1>{name}</h1>
          <hr />

          <div className="hobbieContainer">
            <img src={photo} alt={name} className="HobbieDetails-img"/>
            <p>{description}</p>
            {this.state.added ? 
              (
                  <button onClick={()=>this.removeFromMyHobbies(_id)}>Remove from my hobbies</button>
              ):(
                  <button onClick={()=>this.addToMyHobbies(_id)}>Add to my hobbies</button>
              )
            }

            <div className="HobbieDetails-searchbar">
            
              <input className="search-user" type="text" onChange={(e)=>this.filterUsers(e)} placeholder="Search users..."/>

              <div className="my-area">
                  <input type="checkbox" onChange={()=>this.onlyMyAreaUsers()} />
                  <label>My area users</label>            
              </div> 

              <div>
                  {usersmap}
              </div>

            </div>

          </div>

        </div>
      ) : (
      //------------------Spinner for the loading----------------//
        <div className="spinner">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      )
  }
}

export default HobbieDetails
