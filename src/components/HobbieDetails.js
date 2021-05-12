import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
          hobbie: result.data.hobbie,
         ,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
      this.setState({...this.state, user: this.props.user})
    return (
      <div>
        <h1>Detalles de {this.state.hobbie.name}</h1>
        <img src={this.state.hobbie.photo} alt={this.state.hobbie.name} />
        <h2>{this.state.hobbie.name}</h2>
        <p>{this.state.hobbie.description}</p>
      </div>
    );
  }
}

export default HobbieDetails;
