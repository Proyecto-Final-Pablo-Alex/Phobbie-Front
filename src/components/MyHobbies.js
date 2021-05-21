// ---------- IMPORTS -------------//
import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"

//----- COMPONENTS-----//
import ProfileNavbar from "./ProfileNavbar"

// ---------- Component for rendering the own hobbies list -------------//
class MyHobbies extends React.Component {

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
        loaded: false
    }

    //----- Returns the user form the DB when CDM------//
    componentDidMount(){

        axios({
            method: "get",
            url: "https://phobbie.herokuapp.com/sv/return-user",
            withCredentials: true
        })
        .then(result => {
            const stateCopy = {...this.state}

            stateCopy.user = result.data.result
            stateCopy.loaded = true

            this.setState(stateCopy)

        })
        .catch(error => {
            console.log(error)

        })
    }

    //----- Render my hobbies and map them------//
    render(){

        let hobbiesList
        //----- Map hobbies when loaded------//
        if(this.state.loaded){
            hobbiesList = this.state.user.hobbies.map((hobbie, index) => {
                return (
                  <li key={index} className="hobby">

                    <img src={hobbie.photo} alt={`${hobbie.name} foto`} />
                    {hobbie.name}
                    <Link to={`/hobbie-details/${hobbie.name}`}><button>See details</button></Link>

                  </li>
                )
              })
        }

        //----- Render hobbies mapped------//
        return this.state.loaded ? (
            <div className="MyHobbies">

                <ProfileNavbar setAppState={()=>this.props.setAppState()}/>

                <h1>My Hobbies</h1>

                {this.state.user.hobbies.length !== 0 ?
                (
                    <ul>
                        {hobbiesList}
                    </ul>
                ) : (
                    <div className="MyHobbies-empty">
                        <p>You don't have any hobbies added yet.</p>
                        <Link to="/all-hobbies"><button>Go add some!</button></Link>
                    </div>
                )
                }
            </div> 
        ) : (
        //------------------Spinner for the loading----------------//
            <div className="spinner">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}

export default MyHobbies