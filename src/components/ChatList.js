// ---------- IMPORTS -------------//
import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"

// ---------- COMPONENTS -------------//
import ProfileNavbar from "./ProfileNavbar"

// ---------- Component for rendering the list of all chats -------------//
class ChatList extends React.Component {

    state={
        user:{},
        loaded:false,
        chats:[],
        renderChats: []
    }

    // ---------- Return all the chats from user logged from DB -------------//
    componentDidMount(){

        axios({
            method: "get",
            url: "https://phobbie.herokuapp.com/sv/return-all-chats",
            withCredentials: true
          })
        .then((result) => {

            axios({
                method: "get",
                url: "https://phobbie.herokuapp.com/sv/return-user",
                withCredentials: true
              })
            .then((user)=>{
                const stateCopy = {...this.state}

                stateCopy.chats = result.data
                stateCopy.renderChats = result.data
                stateCopy.user = user.data.result
                stateCopy.loaded = true

                this.setState(stateCopy)

            })

        }).catch((err) => {
            console.log(err)

        })
    }

// ---------- Function that searchs in the chat list -------------//
    filterChats(e){
        const {value} = e.target

        const chatsFiltered = this.state.chats.filter((chat, index)=>{
          const friend = chat.participants.filter(participant => participant._id !== this.state.user._id)[0]
          return friend.username.toLowerCase().includes(value.toLowerCase())
        })

        this.setState({...this.state, renderChats: chatsFiltered})
      }

      // ---------- Render all the chats when loaded and map them -------------//
    render(){
        let allChats
        // ----------Map the chats when loaded -------------//
        if (this.state.loaded){  
            allChats = this.state.renderChats.map((chat, index)=>{

                //------ Returns the id from the other chat participant-----//
                const friend = chat.participants.filter(participant => participant._id !== this.state.user._id)[0]      
                //------- Returns the unread msg count---------// 
                const unreadMsgs = chat.messages.filter(message=> message.status === "UNREAD" && message.username !== this.state.user.username)     

                
                return(
                    <Link to={`/chat/${friend._id}`} key={index}>
                        <div className="friend">
                            <img src={friend.photo} alt={friend.username}/>
                            <div>
                                <p><b>Chatting with {friend.username}</b></p>
                                <p>Unread messages: {unreadMsgs.length}</p>
                            </div>
                        </div>
                    </Link>
                )
            })

        }


        return this.state.loaded ? 
        (
            <div className="Chatlist">
                <ProfileNavbar setAppState={()=>this.props.setAppState()}/>
                <h1>Chatlist</h1>
                <input type='text' placeholder="Search chat..." onChange={(e)=>this.filterChats(e)} />
                <div className="chatContainer">
                    {this.state.chats.length === 0 ? <p>Add some friends to chat with them.</p> :
                    this.state.renderChats.length === 0 ? <p>No results...</p> : <div>{allChats}</div>}
                </div>
            </div>

        ) : (
        //------------------Spinner for the loading----------------//
            <div className="spinner">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}

export default ChatList;