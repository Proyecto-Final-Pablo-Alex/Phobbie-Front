import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";


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
               console.log(result.data)
               const stateCopy = {...this.state}
               stateCopy.chat = result.data
               stateCopy.loaded = true
               console.log(stateCopy)
               this.setState(stateCopy)
           })
           .catch(error => {
               console.log(error)
           })  
    }

    // componentDidUpdate(){
    //     axios({
    //         method: "get",
    //         url: `http://localhost:5000/return-chat/${this.props.match.params.id}`,
    //         withCredentials: true
    //       })
    //       .then(result => {
    //           console.log(result.data)
    //           const stateCopy = {...this.state}
    //           stateCopy.chat = result.data.result
    //           stateCopy.loaded = true
    //         if (result.data.result.messages.length !== this.state.chat.messages.length){
    //           this.setState(stateCopy)}
    //       })
    //       .catch(error => {
    //           console.log(error)
    //       }) 
    // }


    // handleChange(event) { 
    //     const {value, name } = event.target;
    //     this.setState({
    //       ...this.state,
    //       message: {[name]: value, username: this.props.match.params.user.username, date: new Date()},
    //     });
    //     console.log(this.state.user);  
    //   }
    
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
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
            this.setState({...this.state, message: ""})
          }
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
                <div style={{height: "400px", border: "3px solid black"}}>
                    {messages}
                </div>
                <div>
                    <form action="">
                        <input type="text" name="message" onChange={(e)=>this.handleInput(e)}/>
                        <button onClick={(e)=>this.sendMessage(e)}>Send</button>
                    </form>
                </div>
            </div>
        ) : <p>Loading...</p>
    }
}
export default Chat;