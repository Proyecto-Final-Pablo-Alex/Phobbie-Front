import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ProfileNavbar from "./ProfileNavbar";


class ChatList extends React.Component {
    state={
        chats:[],
        user:{},
        loaded:false
    }
    componentDidMount(){
        axios({
            method: "get",
            url: "http://localhost:5000/return-all-chats",
            withCredentials: true
          })
        .then((result) => {
            axios({
                method: "get",
                url: "http://localhost:5000/return-user",
                withCredentials: true
              })
            .then((user)=>{
                const stateCopy = {...this.state}
                stateCopy.chats = result.data
                stateCopy.user = user.data.result
                stateCopy.loaded = true
                this.setState(stateCopy)
            })
        }).catch((err) => {
            console.log(err)
        });
    }
    render(){
        let allChats
        if (this.state.loaded){
        allChats = this.state.chats.map((chat)=>{
            const friend = chat.participants.filter(participant => participant._id !== this.state.user._id)[0]
            const unreadMsgs = chat.messages.filter(message=> message.status === "UNREAD")
            return(
                <div>
                    <img src={friend.photo} alt={friend.username}/>
                    <div>
                        <p><b>Chatting with {friend.username}</b></p>
                        <p>Unread messages: {unreadMsgs.length}</p>
                    </div>
                </div>
            )
        })}
        return this.state.loaded ? (
            <div>
                <ProfileNavbar />
                <h1>Chatlist</h1>
                {allChats}
            </div>

        ) : null
    }
}
export default ChatList;