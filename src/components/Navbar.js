import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {

    state = {
        loggedout: false
    }

    logout(){
        axios({
            method: 'get',
            url: "http://localhost:5000/logout",
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
        return this.props.logInSuccess ? (
            <div>
                <Link to="/profile"><button> My profile </button></Link>
                <Link to="/all-hobbies"><button>All Hobbies </button></Link>
                <Link to="/"><button onClick={()=>this.logout()}>Logout</button></Link>
            </div>
        ) : (
            <div>
                <Link to="/login"><button>Log in </button></Link>
                <Link to="/signup"><button>Sign up</button></Link>
            </div>
        )
    }
}

export default Navbar;
