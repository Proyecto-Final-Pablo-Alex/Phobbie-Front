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
            <div className="Navbar">
            <img src="https://res.cloudinary.com/hobbiesphere/image/upload/v1621264700/Logo_Phobbie_solo_nombre_white_vbti3g.png" alt="logo name" />
                <label className="switch">
                    <input type="checkbox" onChange={(e)=>this.props.toggleButton(e)}/>
                    <span className="slider round"></span>
                </label>
                <Link to="/profile"><button> My profile </button></Link>
                <Link to="/all-hobbies"><button>All Hobbies </button></Link>
                <Link to="/"><button onClick={()=>this.logout()}>Logout</button></Link>
            </div>
        ) : (
            <div className="Navbar">
            <img src="https://res.cloudinary.com/hobbiesphere/image/upload/v1621264700/Logo_Phobbie_solo_nombre_white_vbti3g.png" alt="logo name" />
                <label className="switch">
                    <input type="checkbox" onChange={(e)=>this.props.toggleButton(e)}/>
                    <span className="slider round"></span>
                </label>
                <Link to="/login"><button>Log in </button></Link>
                <Link to="/signup"><button>Sign up</button></Link>
            </div>
        )
    }
}

export default Navbar;
