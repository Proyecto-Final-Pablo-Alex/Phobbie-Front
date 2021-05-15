import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client'

class Chat extends React.Component {
    state={
        chat:{
            participants:[],
            room:'',
            messages:[],
        },
        message: '',
        loaded:false,
    }

    componentDidMount(){
        const socket = io('http://localhost:5000')
        console.log(socket)
        // axios({
        //     method: "get",
        //     url: `http://localhost:5000/return-chat/${this.props.match.params.id}`,
        //     withCredentials: true
        //   })
        //   .then(result => {
        //       console.log(result.data)
        //       const stateCopy = {...this.state}
        //       stateCopy.chat = result.data.result
        //       stateCopy.loaded = true
        //       this.setState(stateCopy)
        //   })
        //   .catch(error => {
        //       console.log(error)
        //   })  
    }

    componentDidUpdate(){
        axios({
            method: "get",
            url: `http://localhost:5000/return-chat/${this.props.match.params.id}`,
            withCredentials: true
          })
          .then(result => {
              console.log(result.data)
              const stateCopy = {...this.state}
              stateCopy.chat = result.data.result
              stateCopy.loaded = true
            if (result.data.result.messages.length !== this.state.chat.messages.length){
              this.setState(stateCopy)}
          })
          .catch(error => {
              console.log(error)
          }) 
    }


    handleChange(event) { 
        const {value, name } = event.target;
        this.setState({
          ...this.state,
          message: {[name]: value, username: req.params.user.username, date: new Date()},
        });
        console.log(this.state.user);  
      }


    render(){
        const messages = this.state.chat.messages.map((message,index)=>{
           <div>
            <p>{message.username}: {message.message}</p>
            <p>{message.date}</p>
           </div>
        })
        const friend = this.state.chat.participants.filter(participant=>{
            return(participant._id !== req.props.username)
        })
        return(
            <div>
                <h2>Chatting with {friend.username}</h2>
                <div>
                    {messages}
                </div>
                <div>
                    <form action="">
                        <input type="text" name="message" onChange=""/>
                        <button onClick="">Send</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Chat;