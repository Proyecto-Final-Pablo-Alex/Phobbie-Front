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
               this.setState(stateCopy)
               this.scrollToBottom();
               this.chatCheck()
           })
           .catch(error => {
               console.log(error)
           })  
    }

     /* componentDidUpdate(){
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
                }
          })
          .catch(error => {
              console.log(error)
          })  
     } */
    
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
         }, 3000);
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
      
    render(){
        let messages, friend
        if(this.state.loaded){
            messages = this.state.chat.messages.map((message,index)=>{
                return (
                    <div key={index}>
                        <p>{message.username}: {message.message}</p>
                        <p>{message.date}</p>
                    </div> 
                )

            })
            friend = this.state.chat.participants.filter(participant=>{
                return (participant._id !== this.props.user._id)
            })[0]
        }
        return this.state.loaded ? (
            <div>
                <Link to="/my-chats">Go back to all chats</Link>
                <h2>Chatting with {friend.username}</h2>
                <div style={{height: "400px", border: "3px solid black", overflowY: "auto"}}>
                    {messages}
                    <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}></div>
                </div>
                <div>
                    <form action="">
                        <input type="text" name="message" value={this.state.message} onChange={(e)=>this.handleInput(e)}/>
                        <button onClick={(e)=>this.sendMessage(e)}>Send</button>
                    </form>
                </div>
            </div>
        ) : <p>Loading...</p>
    }
}
export default Chat;