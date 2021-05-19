import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
let check

class Chat extends React.Component {
    state={
        user: {},
        chat:{
            participants:[],
            messages:[],
        },
        friend: {},
        message: '',
        loaded:false
    }
    
    componentDidMount(){
    axios({
        method: "get",
        url: `https://phobbies-app.herokuapp.com/sv/return-chat/${this.props.match.params._id}`,
        withCredentials: true
        })
        .then(result => {
            const stateCopy = {...this.state}
            stateCopy.chat = result.data
            stateCopy.user = result.data.participants.filter(participant=>(participant._id === this.props.user._id))[0]
            stateCopy.friend = result.data.participants.filter(participant=>(participant._id !== this.props.user._id))[0]
            stateCopy.loaded = true
            this.setState(stateCopy)
            this.nameInput.focus();
            this.scrollToBottom();
            this.chatCheck()
        })
        .catch(error => {
            console.log(error)
        })  
    }
    
     chatCheck(){
            check = setInterval(() => {
            axios({
                method: "get",
                url: `https://phobbies-app.herokuapp.com/sv/return-chat/${this.props.match.params._id}`,
                withCredentials: true
              })
              .then(result => {
                  const stateCopy = {...this.state}
                  stateCopy.chat = result.data
                  if(this.state.chat.messages.length !== result.data.messages.length){
                    this.setState(stateCopy)
                    this.scrollToBottom();
                    }
              })
              .catch(error => {
                  console.log(error)
              })  
         }, 1500);
     }

     componentWillUnmount(){
        clearInterval(check)
     }

      handleInput(e){
        const {value} = e.target
        this.setState({...this.state, message: value})
      }

      sendMessage(e){
        e.preventDefault()
          const {message} = this.state
          if (message === ""){
            return null
        }else if (this.state.user.username === ""){
            return null
        }else{
            axios({
                method: 'post',
                url: `https://phobbies-app.herokuapp.com/sv/send-msg/${this.props.match.params._id}`,
                data: {
                    message: message,
                    date: new Date(),
                    username: this.state.user.username
                },
                withCredentials: true
            })
            .then(result => {
                this.setState({...this.state, message: ""})
            })
            .catch(error => {
                console.log(error)
            })
          }
      }

      scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }

      displayTime(time){
        const timeArr = time.split("T")
        const date = timeArr[0].split("-")
        return `${timeArr[1].slice(0,5)} - ${date[2]}/${date[1]}`
      }

      checkIfRead(status){
        if (status === "READ"){
            return <img className="read-icon" src="https://res.cloudinary.com/hobbiesphere/image/upload/v1621440328/msg-color2_we6x4c.png" />
        }else if (status === "UNREAD"){
            return <img className="read-icon" src="https://res.cloudinary.com/hobbiesphere/image/upload/v1621440365/msg-gris_h433ri.png" /> 
        }
      }
      
    render(){
        let messages
        if(this.state.loaded){
            messages = this.state.chat.messages.map((message,index)=>{
                return message.username === this.props.user.username ? (
                    <div key={index} className="userMessage">
                        <div>
                            <p>{message.message}</p>
                            <i>{this.displayTime(message.date)}{this.checkIfRead(message.status)}</i>
                        </div>
                    </div> 
                ) : (
                    <div key={index} className="friendMessage">
                        <div>
                            <p>{message.message}</p>
                            <i>{this.displayTime(message.date)}</i>
                        </div>
                    </div>
                )
            })
        }
        return this.state.loaded ? (
            <div className="Chat">
                <div className="bar">
                    <div className="photo">
                        <img src={this.state.friend.photo} alt={this.state.friend.username} />
                        <h3>{this.state.friend.username}</h3>
                    </div>
                    <Link to="/my-chats"><button>All chats</button></Link>
                </div>
                <div className="chatBox">
                    {messages}
                    <div
                    ref={(el) => { this.messagesEnd = el; }}></div>
                </div>
                <div>
                    <form action="">
                        <input type="text" name="message" ref={(input) => { this.nameInput = input; }} value={this.state.message} onChange={(e)=>this.handleInput(e)} autoComplete="off"/>
                        <button onClick={(e)=>this.sendMessage(e)}>Send</button>
                    </form>
                </div>
            </div>
        ) : (
            <div className="spinner">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}
export default Chat;