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
  render() {
    const {name,photo,description,users} = this.state.hobbie
    const sortedUsersByName = users.sort((a,b)=> a.name.localeCompare(b.name))
    const usersmap = sortedUsersByName.map((user, index)=>{
      return <li key={index}>
                <img src={user.photo} alt={user.name} style={{width: "100px"}}/> 
                <h3>{user.name}</h3>
                <Link to={`/`}><button>Add friend</button></Link>
              </li>
    })
    return (
      <div>
        <h1>{name}</h1>
        <img src={photo} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>

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
