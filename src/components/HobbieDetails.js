import React from "react";
import axios from "axios";
import { Redirect,Link } from "react-router-dom";

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
  };
  componentDidMount() {
    console.log("hola");
    axios({
      method: "get",
      url: `http://localhost:5000/hobbie-details/${this.props.match.params.name}`,
      withCredentials: true,
    })
      .then((result) => {
        console.log(result.data);
        this.setState({
          ...this.state,
          hobbie: result.data,
          user: this.props.user
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToMyHobbies(_id){
    axios({
      method: "post",
      url: "http://localhost:5000/hobbies/addToMyHobbies",
      data: {_id, userId: this.state.user._id}
    })
    .then(result => {
      console.log(result)
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
    return (
      <div>
        <h1>{name}</h1>
        <img src={photo} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>
        {this.state.user.hobbies.includes(_id) ? (
            <button onClick={()=>this.removeFromMyHobbies(_id)}>Remove from my hobbies</button>
        ):(
            <button onClick={()=>this.addToMyHobbies(_id)}>Add to my hobbies</button>
            )}
        <div>
        <ul>
            {usersmap}
        </ul>
        </div>
      </div>
    );
  }
}

export default HobbieDetails;
