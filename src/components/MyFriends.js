import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ProfileNavbar from "./ProfileNavbar";


class MyFriends extends React.Component {
    render(){
        return(
            <div>
                <ProfileNavbar />
                <h1>Friends</h1>
            </div>
            
        )
    }
}
export default MyFriends;