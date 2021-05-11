import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class AllHobbies extends React.Component {
    state={
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
        allHobbies:[],
        copyAllHobbies:[],
        search:``
    }

    componentDidMount(){
      const user = this.props.user
      axios({
        method: "get",
        url: "http://localhost:5000/hobbies/allHobbies",
      })
        .then((result) => {
          console.log(result.data);
          const {hobbies} = result.data
          this.setState({...this.state, allHobbies: hobbies, copyAllHobbies: hobbies, user})
        })
        .catch((err) => {
          console.log(err);
        });
    }

    filterHobbies(e){
      const {value} = e.target
      const hobbiesfiletered = this.state.allHobbies.filter(hobbie=>{
        return hobbie.name.toLowerCase().includes(value.toLowerCase())
      })
      this.setState({...this.state, copyAllHobbies: hobbiesfiletered})
    }

  render() {
    const hobbiesmap = this.state.copyAllHobbies.map((hobbie, index)=>{
      return <li key={index}>
                <img src={hobbie.photo} alt={hobbie.name} style={{width: "100px"}}/> 
                <h3>{hobbie.name}</h3>
                <p>{hobbie.description}</p>
                <Link to="/"><button>Details & Users</button></Link>
              </li>
    })
    return (
      <div>
        <input type='text' onChange={(e)=>this.filterHobbies(e)} />
        <ul>
          {hobbiesmap}
        </ul>
      </div>
    )
  }
}

export default AllHobbies;