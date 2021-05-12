import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {

    render(){

        return this.props.loggedIn ? (
            <div>
                <Link to="/profile"> My profile </Link>
                <Link to="/all-hobbies"> All Hobbies </Link>
                <Link to="/"> Logout</Link>
            </div>
        ) : (
            <div>
                <Link to="/login">Log in </Link>
                <Link to="/signup">Sign up</Link>
            </div>
        )
    }
}

export default Navbar;
