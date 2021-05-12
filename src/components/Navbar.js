import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {

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
        logged: false
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: "http://localhost:5000/return-user",
            withCredentials: true
        })
        .then(user => {
            if(user.data.result.username){
                this.setState({user: user.data.result, logged: true})
            }else{
                return
            }
        })
        .catch(error => {
            console.log(error)
        })
        
    }

    render(){

        return this.state.logged ? (
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
