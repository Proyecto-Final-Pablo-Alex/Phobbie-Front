import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ProfileNavbar from "./ProfileNavbar";


class ChatList extends React.Component {
    render(){
        return(
            <div>
                <ProfileNavbar />
                <h1>Chatlist</h1>
            </div>

        )
    }
}
export default ChatList;