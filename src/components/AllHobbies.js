import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import AddHobbie from "./AddHobbie";

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
        photo: '',
        status:''
      },
        allHobbies:[],
        copyAllHobbies:[]
    }

    componentDidMount(){
      const user = this.props.user
      axios({
        method: "get",
        url: "http://localhost:5000/hobbies/allHobbies",
        withCredentials: true
      })
        .then((result) => {
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
    const sortedHobbiesByName = this.state.copyAllHobbies.sort((a,b)=> a.name.localeCompare(b.name))
    const sortedHobbiesByUsers = sortedHobbiesByName.sort((a,b)=> b.users.length - a.users.length)
    const hobbiesmap = sortedHobbiesByUsers.map((hobbie, index)=>{
      return <li key={index} className="hobby">
                <img src={hobbie.photo} alt={hobbie.name}/> 
                <h3>{hobbie.name}</h3>
                <p>{hobbie.description}</p>
                <p>{hobbie.users.length} users</p>
                <Link to={`/hobbie-details/${hobbie.name}`}><button>Details & Users</button></Link>
              </li>
    })
    return (
      <div>
        <input type='text' onChange={(e)=>this.filterHobbies(e)} />

        {(hobbiesmap.length > 0)
        ? <div>
            <ul>
              {hobbiesmap}
            </ul>
          </div>
        : <div>
            <AddHobbie user={this.state.user}/>
          </div>
          }
        </div>
    )
  }
}

export default AllHobbies;