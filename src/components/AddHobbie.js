import React from "react";


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
      photo: ''
    },
    newHobbie: {

    }
  };

  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/addHobbie",
      data: this.state.user,
      withCredentials: true
    })
      .then((result) => {
        this.props.setAppState(result.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInput(e) {
    const {name, value } = e.target;
    this.setState({ ...this.state, newHobbie: {[name]: value }})
  }

  render() {
    return (
      <div>
        <h2>Add a new hobbie</h2>
        <form onSubmit={(e)=>this.handleSubmit(e)}>

            <label htmlFor="name">Name: </label>
            <input type="text" name='name' onChange={(e) => this.handleInput(e)} />

            <label htmlFor="photo">Picture: </label>
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
