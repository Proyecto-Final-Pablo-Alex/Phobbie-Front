import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    },
    hobbie: {
      name: "",
      photo: "",
      description: "",
      users: [],
      _id: "",
    },
    loaded: false,
    added: false
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `http://localhost:5000/hobbie-details/${this.props.match.params.name}`,
      withCredentials: true,
    })
      .then((hobbie) => {

          axios({
              method: "get",
              url: "http://localhost:5000/return-user",
              withCredentials: true
          })
          .then(user=>{
            if(user.data.result.hobbies.filter(hob=> hob.name === hobbie.data.name).length>0){
              this.setState({
                ...this.state,
                hobbie: hobbie.data,
                user: user.data.result,
                loaded: true,
                added: true
              })
            }else{
              this.setState({
                ...this.state,
                hobbie: hobbie.data,
                user: user.data.result,
                loaded: true
              })
            }
          })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  addToMyHobbies(_id){
    axios({
      method: "post",
      url: "http://localhost:5000/hobbies/addToMyHobbies",
      data: {_id, userId: this.state.user._id}
    })
    .then(result => {
        console.log(result)
      this.setState({...this.state, user: result.data.user, hobbie: result.data.hobbie, added: true})
    })
    .catch(error => {
      console.log(error)
    })  
  }

  removeFromMyHobbies(_id){
    axios({
      method: "post",
      url: "http://localhost:5000/hobbies/removeFromMyHobbies",
      data: {_id, userId: this.state.user._id}
    })
    .then(result => {
        console.log(result)
        this.setState({...this.state, user: result.data.user, hobbie: result.data.hobbie, added: false})
    })
    .catch(error => {
      console.log(error)
    })  
  }

  render() {
    const {name,photo,description,users, _id} = this.state.hobbie
    const sortedUsersByName = users.sort((a,b)=> a.username.localeCompare(b.username))
    const usersmap = sortedUsersByName.map((user, index)=>{
      return <li key={index}>
                <img src={user.photo} alt={user.username} style={{width: "100px"}}/> 
                <h3>{user.username}</h3>
                <Link to={`/`}><button>Add friend</button></Link>
              </li>
    })
    return this.state.loaded ? (
      <div>
        <h1>{name}</h1>
        <img src={photo} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>
        {this.state.added ? (
            <button onClick={()=>this.removeFromMyHobbies(_id)}>Remove from my hobbies</button>
        ):(
            <button onClick={()=>this.addToMyHobbies(_id)}>Add to my hobbies</button>
            )}
        <div>
        {this.state.added ? <p>Added successfully!</p> : null}
        <ul>
            {usersmap}
        </ul>
        </div>
      </div>
    ) : (<p>Loading...</p>)
  }
}

export default HobbieDetails;
