import React from "react";
import axios from 'axios'
import { Redirect,Link } from "react-router-dom";

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
            confirmPassword:"",
            photo: '',
            status:''
          },
          successEditing: false,
          errorMessage:false
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
        if(this.state.user.password === this.state.user.confirmPassword){
          if (event.target.photo.files.length > 0){
            let photo = event.target.photo.files[0]
            let uploadForm = new FormData()
            uploadForm.append('imageUrl', photo)
            axios({
              method: 'post',
              url: 'http://localhost:5000/upload',
              data: uploadForm,
              withCredentials: true
            })
            .then(image => {
              axios({
                method: "post",
                url: "http://localhost:5000/edit-user",
                data: {...this.state.user, photo: image.data.image},
                withCredentials: true
              })
              .then((res)=>{
                this.setState({...this.state, successEditing:true})
              })
            })
            .catch(error => {
              console.log(error)
            })
        }else{
            axios({
              method: "post",
              url: "http://localhost:5000/edit-user",
              data: {...this.state.user},
              withCredentials: true
            })
            .then((res)=>{
             this.setState({...this.state, successEditing:true})
            })
            .catch(error => {
            console.log(error)
            })
            }
        } else{
         this.setState({...this.state, errorMessage:true}) 
        }
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
    'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

    const allOptions=provincias.map((provincia, index)=>{return(<option key={index}>{provincia}</option>)})

    const {photo, age, _id, location,status} = this.props.user
    return this.state.successEditing ? <Redirect to="/profile"/> : (
      <div>
       <h1>Edit profile</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>

        <input type="text" name="_id" hidden value={_id} />

        <label htmlFor="photo">Profile Picture</label>
          <input
            type="file"
            name="photo"
          />
          <input type="text" name="actualPhoto" hidden value={photo} />

          

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

          <label htmlFor="status">Status</label>
          <input
            type="text"
            name="status"
            onChange={(event) => this.handleChange(event)}
            defaultValue={status}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(event) => this.handleChange(event)}
            placeholder= "Enter your password"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={(event) => this.handleChange(event)}
            placeholder= "repeat password"
          />

          <button>Edit profile</button>
          {this.state.errorMessage ? <p>You have to write the same password on "Password" and "Confirm Password" fields</p> : null}
        </form>
        <Link to="/profile"><button>Go back</button></Link>
      </div>
    )
  }
}

export default EditUser;
