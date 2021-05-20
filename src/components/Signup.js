import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Signup extends React.Component {
  state = {
    user: {
      username: "",
      age: '',
      location: '',
      friends: [],
      hobbies: [],
      _id: "",
      password: "",
      passwordConfirm:"",
      photo: '',
      status:''
    },
    successSignUp: false,
    errorMessage: false,
    errorMsg: '',
  };

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "https://phobbie.herokuapp.com/sv/signup",
      data: this.state.user,
      withCredentials: true
    })
      .then((result) => {
        if (result.data.message === "User created") {
          this.setState({ ...this.state, successSignUp: true });
        } else {
          this.setState({ ...this.state, errorMessage: true, errorMsg: result.data.message });
        }
      })
      .catch((err) => {
        this.setState({ ...this.state, errorMessage: true, errorMsg: err.message });
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
    'Guipúzcoa','Huelva','Huesca','Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
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
            autoComplete="off"
          />

          <div className="Signup-age-location">
            <div>
              <label htmlFor="age">Age</label>
              <input className="age"
                type="number"
                name="age"
                onChange={(event) => this.handleChange(event)}
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <select name="location" onChange={(event) => this.handleChange(event)} defaultValue="Choose your location...">
                <option value=""  hidden>Your location...</option>
                {allOptions}
              </select>
            </div>
          </div>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(event) => this.handleChange(event)}
            autoComplete="off"
          />

          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            onChange={(event) => this.handleChange(event)}
            autoComplete="off"
          />

          <button>Sign up</button>
          
        </form>
        {this.state.errorMessage ? <p className="error-message">{this.state.errorMsg}</p> : null}
      </div>
    );
  }
}
export default Signup;
