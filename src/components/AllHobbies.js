// ---------- IMPORTS -------------//
import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"

// ---------- COMPONENTS -------------//
import AddHobbie from "./AddHobbie"

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

// ---------- Get all hobbies from the DB and stores them in the state on CDM -------------//
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
        console.log(err)

      })
    }

// ---------- Function that filters hobbies for the search feature -------------//
    filterHobbies(e){
      const {value} = e.target

      const hobbiesfiletered = this.state.allHobbies.filter(hobbie=>{
        return hobbie.name.toLowerCase().includes(value.toLowerCase())
      })

      this.setState({...this.state, copyAllHobbies: hobbiesfiletered})
    }

 //-------- Map the hobbies and render them when state loaded-------------------//
  render() {

    //------ Sorts hobbies by name ------//
    const sortedHobbiesByName = this.state.copyAllHobbies.sort((a,b)=> a.name.localeCompare(b.name))  

    //---------- Sorts hobbies by number of users---------//
    const sortedHobbiesByUsers = sortedHobbiesByName.sort((a,b)=> b.users.length - a.users.length)      

    //----------- Maps all hobbies already sorted------------//
    const hobbiesmap = sortedHobbiesByUsers.map((hobbie, index)=>{                                   
      return (
        <div key={index} className="hobby">

          <img src={hobbie.photo} alt={hobbie.name}/> 

          <h3>{hobbie.name}</h3>

          <p>{hobbie.description.slice(0, 40)}...</p>

          <p><i>{hobbie.users.length} {(hobbie.users.length === 1) ? ("user") : ("users")}</i></p>

          <Link to={`/hobbie-details/${hobbie.name}`}><button>Details & Users</button></Link>

        </div>
      )
    })

    // ------------ Render the hobbies mapped------//
    return this.state.loaded ? (
      <div className="AllHobbies">

        <input type='text' onChange={(e)=>this.filterHobbies(e)} placeholder="Search your hobby"/>

        {hobbiesmap.length > 0
        ? (
          <div className="hobbyContainer">
              {hobbiesmap}
          </div>
        ) : (
          <AddHobbie user={this.state.user}/>
        )}

        </div>

    ) : (
    //------------------Spinner for the loading----------------//
      <div className="spinner">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>                   
      </div>

    )
  }
}

export default AllHobbies