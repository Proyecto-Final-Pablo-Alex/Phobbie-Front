import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class ProfileNavbar extends React.Component {
    render(){
        return (
            <div>
                <Link to="/Profile"><button>Profile</button></Link>
                <Link to="/my-hobbies"><button>Hobbies</button></Link>
                <Link to="/my-friends"><button>Friends</button></Link>
                <Link to="/my-chats"><button>Chats</button></Link>
            </div>
        ) 
    }
}

export default ProfileNavbar;
