import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ProfileNavbar from "./ProfileNavbar";



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

    componentDidMount(){
        axios({
            method: "get",
            url: "http://localhost:5000/return-user",
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

    render(){
        let hobbiesList
        if(this.state.loaded){
            hobbiesList = this.state.user.hobbies.map((hobbie, index) => {
                return (
                  <li key={index}>
                    <img src={hobbie.photo} alt={`${hobbie.name} foto`} style={{width: "200px"}} />
                    {hobbie.name}
                    <Link to={`/hobbie-details/${hobbie.name}`}><button>See details</button></Link>
                  </li>
                )
              })
        }

        return(
            <div className="MyHobbies">
                <ProfileNavbar />
                <h1>My Hobbies</h1>
                {this.state.user.hobbies.length !== 0 ?
                (
                    <ul>
                        {hobbiesList}
                    </ul>
                ) : (
                    <div>
                        <p>You don't have any hobbies added yet.</p>
                        <Link to="/all-hobbies" >Go add some!</Link>
                    </div>
                )
                }
            </div>
            
        )
    }
}
export default MyHobbies;