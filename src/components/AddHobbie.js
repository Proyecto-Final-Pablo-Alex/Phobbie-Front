// ---------- IMPORTS -------------//
import React from "react"
import axios from 'axios'
import { Redirect } from "react-router";


class AddHobbie extends React.Component {

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
    newHobbie: {
      userId: '',
      name: '',
      photo: '',
      description: ''
    },
    hobbieCreated: false
  };

  componentDidMount(){
    const {user} = this.props
    this.setState({user, newHobbie: {...this.state.newHobbie, userId: user._id}})
  }

  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://phobbie.herokuapp.com/sv/hobbies/addHobbie",
      data: this.state.newHobbie,
      withCredentials: true
    })
      .then((result) => {
        this.setState({...this.state, hobbieCreated:true})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInput(e) {
    const {name, value } = e.target;
    this.setState({ ...this.state, newHobbie: {...this.state.newHobbie, [name]: value }})
  }

  render() {
    return (
      <div className="AddHobbie">
        {this.state.hobbieCreated ? <Redirect to='/profile'/> : null}
        <h2>No results, create your desired hobbie</h2>
        <form onSubmit={(e)=>this.handleSubmit(e)}>

            <label htmlFor="name">Name: </label>
            <input type="text" name='name' onChange={(e) => this.handleInput(e)} />

            <label htmlFor="photo">Picture url: </label>
            <input type="text" name='photo' onChange={(e) => this.handleInput(e)} />

            <label htmlFor="description">Description: </label>
            <input type="text" name='description' onChange={(e) => this.handleInput(e)} />

            <button>Add hobbie</button>
        </form>
      </div>
    )
  }
}

export default AddHobbie
