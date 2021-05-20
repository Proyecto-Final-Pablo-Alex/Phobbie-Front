// ---------- IMPORTS -------------//
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import AddHobbie from "./AddHobbie";

// ---------- Component for rendering all hobbies -------------//

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
        copyAllHobbies:[],
        loaded: false
    }

    componentDidMount(){
      const user = this.props.user
      axios({
        method: "get",
        url: "https://phobbie.herokuapp.com/sv/hobbies/allHobbies",
        withCredentials: true
      })
        .then((result) => {
          const {hobbies} = result.data
          this.setState({...this.state, loaded: true,  allHobbies: hobbies, copyAllHobbies: hobbies, user})
        })
        .catch((err) => {
          console.log(err);
        });
    }

// ---------- Function that filters hobbies for the search feature -------------//

    filterHobbies(e){
      const {value} = e.target
      const hobbiesfiletered = this.state.allHobbies.filter(hobbie=>{
        return hobbie.name.toLowerCase().includes(value.toLowerCase())
      })
      this.setState({...this.state, copyAllHobbies: hobbiesfiletered})
    }


  render() {
    const sortedHobbiesByName = this.state.copyAllHobbies.sort((a,b)=> a.name.localeCompare(b.name))  //Function that sorts hobbies by name
    const sortedHobbiesByUsers = sortedHobbiesByName.sort((a,b)=> b.users.length - a.users.length)    //Function that sorts hobbies by number of users  
    const hobbiesmap = sortedHobbiesByUsers.map((hobbie, index)=>{                                    //Function that maps all hobbies already sorted
      return <div key={index} className="hobby">
                <img src={hobbie.photo} alt={hobbie.name}/> 
                <h3>{hobbie.name}</h3>
                <p>{hobbie.description.slice(0, 40)}...</p>
                <p><i>{hobbie.users.length} {(hobbie.users.length === 1) ? ("user") : ("users")}</i></p>
                <Link to={`/hobbie-details/${hobbie.name}`}><button>Details & Users</button></Link>
              </div>
    })
    return this.state.loaded ? (
      <div className="AllHobbies">
        <input type='text' onChange={(e)=>this.filterHobbies(e)} placeholder="Search your hobby"/>

        {(hobbiesmap.length > 0)
        ? <div className="hobbyContainer">
              {hobbiesmap}
          </div>
        : <AddHobbie user={this.state.user}/>}
        </div>
    ) : (
      <div className="spinner">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>                   {/* Spinner for the loading */}
      </div>
    )
  }
}

export default AllHobbies;