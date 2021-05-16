import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ProfileNavbar from "./ProfileNavbar";



class MyHobbies extends React.Component {
    render(){
        return(
            <div>
                <ProfileNavbar />
                <h1>Hobbies</h1>
            </div>
            
        )
    }
}
export default MyHobbies;