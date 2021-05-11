import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

class EditUser extends React.Component {

    state = {
        user: {
            username: "",
            age: '',
            location: '',
            friends: [],
            hobbies: [],
            _id: "",
            password: "",
            photo: ''
          },
          successEditing: false,
    }
    componentDidMount(){
      const user=this.props.user
      this.setState({
          ...this.state,
          user: user,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        axios({
          method: "post",
          url: "http://localhost:5000/edit-user",
          data: this.state.user,
        })
          .then((result) => {
            console.log(result);
            if (result.data.message === "User created") {
              this.setState({ ...this.state, successEditing: true });
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
        console.log(this.state.user);
        
      }

  render() {
    const provincias = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
    'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
    'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

    const allOptions=provincias.map((provincia, index)=>{return(<option key={index}>{provincia}</option>)})

    const {photo, password, age, _id, location} = this.props.user
    return (
      <div>
       <h1>Edit profile</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>

        <input type="text" name="_id" hidden value={_id} />

        <label htmlFor="photo">Profile Picture</label>
          <input
            type="file"
            name="photo"
            onChange={(event)=>this.handleChange(event)}
          />
          <input type="text" name="actualPhoto" hidden defaultValue={photo} />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(event) => this.handleChange(event)}
            defaultValue={password}
          />

          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            onChange={(event) => this.handleChange(event)}
            defaultValue={age}
          />

          <label htmlFor="location">Location</label>
          <select name="location" onChange={(event) => this.handleChange(event)} defaultValue={location}>
            {allOptions}
          </select>

       
          <button>Edit profile</button>
          
        </form>
      </div>
    )
  }
}

export default EditUser;
