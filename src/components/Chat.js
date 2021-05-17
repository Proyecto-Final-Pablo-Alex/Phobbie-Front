import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
let check

class Chat extends React.Component {
    state={
        chat:{
            participants:[],
            messages:[],
        },
        friendName: '',
        message: '',
        loaded:false
    }
    
    componentDidMount(){
         axios({
             method: "get",
             url: `http://localhost:5000/return-chat/${this.props.match.params._id}`,
             withCredentials: true
           })
           .then(result => {
               const stateCopy = {...this.state}
               stateCopy.chat = result.data
               stateCopy.loaded = true
               stateCopy.friendName = result.data.participants.filter(participant=>(participant._id !== this.props.user._id))[0].username
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
                url: `http://localhost:5000/return-chat/${this.props.match.params._id}`,
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
          }else{
            axios({
                method: 'post',
                url: `http://localhost:5000/send-msg/${this.props.match.params._id}`,
                data: {
                    message: message,
                    date: new Date(),
                    username: this.props.user.username
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
      
    render(){
        let messages
        if(this.state.loaded){
            messages = this.state.chat.messages.map((message,index)=>{
                return message.username === this.props.user.username ? (
                    <div key={index} className="userMessage">
                        <div>
                            <p>{message.message}</p>
                            <i>{this.displayTime(message.date)}</i>
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
            <div>
                <Link to="/my-chats">Go back to all chats</Link>
                <h2>Chatting with {this.state.friendName}</h2>
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
        ) : <p>Loading...</p>
    }
}
export default Chat;