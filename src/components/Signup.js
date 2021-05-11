import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Signup extends React.Component {
  state = {
    user: {
      username: "",
      age: '',
      friends: [],
      hobbies: [],
      _id: "",
      password: "",
      photo: ''
    },
    successSignUp: false,
    errorMessage: false,
  };

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/signup",
      data: this.state.user,
    })
      .then((result) => {
        console.log(result);
        if (result.data.message === "User created") {
          this.setState({ ...this.state, successSignUp: true });
        } else {
          this.setState({ ...this.state, errorMessage: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      ...this.state,
      user: { ...this.state.user, [name]: value },
    });
  }

  render() {
    const provincias = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
    'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
    'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

    const allOptions=provincias.map((provincia, index)=>{return(<option key={index}>{provincia}</option>)})

    return this.state.successSignUp ? (
      <Redirect to="/login" />
    ) : (
      <div className="Signup">
        <h1>Sign up</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={(event) => this.handleChange(event)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(event) => this.handleChange(event)}
          />

          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            onChange={(event) => this.handleChange(event)}
          />

          <label htmlFor="location">Location</label>
          <select name="location" onChange={(event) => this.handleChange(event)}>
          <option value="" disabled selected hidden>Choose your location...</option>
            {allOptions}
          </select>

          <button>Sign up</button>
          
        </form>
        {this.state.errorMessage ? <p>Este usuario ya existe</p> : null}
      </div>
    );
  }
}
export default Signup;
