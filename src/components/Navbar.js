// ---------- IMPORTS -------------//
import React from "react";
import { Link } from "react-router-dom";

// ---------- Component for rendering the navbar -------------//

class Navbar extends React.Component {

    render(){
        return this.props.logInSuccess ? (
            <div className="Navbar">
            <Link to="/"><img src="https://res.cloudinary.com/hobbiesphere/image/upload/v1621265220/Logo_Phobbie_solo_nombre_negro_lxq426.png" alt="logo name" /></Link>
                <Link to="/profile"><button>Profile</button></Link>
                <Link to="/all-hobbies"><button>Hobbies</button></Link>
                <label className="switch">
                    <input type="checkbox" onChange={(e)=>this.props.toggleButton(e)}/>
                    <span className="slider round"></span>
                </label>
            </div>
        ) : (
            <div className="Navbar">
            <Link to="/"><img src="https://res.cloudinary.com/hobbiesphere/image/upload/v1621265220/Logo_Phobbie_solo_nombre_negro_lxq426.png" alt="logo name" /></Link>
                <Link to="/login"><button>Log in</button></Link>
                <Link to="/signup"><button>Sign up</button></Link>
                <label className="switch">
                    <input type="checkbox" onChange={(e)=>this.props.toggleButton(e)}/>
                    <span className="slider round"></span>
                </label>
            </div>
        )
    }
}

export default Navbar;
