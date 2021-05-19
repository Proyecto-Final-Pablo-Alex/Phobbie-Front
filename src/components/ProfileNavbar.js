import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

class ProfileNavbar extends React.Component {

    
    state = {
        loggedout: false
    }

    logout(){
        axios({
            method: 'get',
            url: "https://phobbie.herokuapp.com/sv/logout",
            withCredentials: true
        })
        .then(result => {
            this.props.setAppState()
            this.setState({loggedout: true})
        })
        .catch(error => {
            console.log(error)
        })
    }


    render(){
        return (
            <div className="ProfileNavbar">
                <Link to="/Profile"><button>Profile</button></Link>
                <Link to="/my-hobbies"><button>Hobbies</button></Link>
                <Link to="/my-friends"><button>Friends</button></Link>
                <Link to="/my-chats"><button>Chats</button></Link>
                <Link to="/"><button onClick={()=>this.logout()}>Logout</button></Link>
            </div>
        )
    }
}

export default ProfileNavbar;
