// ---------- IMPORTS -------------//
import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"

//------------ Variable for interval -----------//
let check


// ---------- Component for rendering the chat -------------//
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
    
    //--------- Get that specific chat messages from DB on CDM --------------//
    componentDidMount(){

        axios({
            method: "get",
            url: `https://phobbie.herokuapp.com/sv/return-chat/${this.props.match.params._id}`,
            withCredentials: true
            })
            .then(result => {
                const stateCopy = {...this.state}

                stateCopy.chat = result.data
                stateCopy.user = result.data.participants.filter(participant=>(participant._id === this.props.user._id))[0]
                stateCopy.friend = result.data.participants.filter(participant=>(participant._id !== this.props.user._id))[0]
                stateCopy.loaded = true

                this.setState(stateCopy)
                //---------Focus to the input------//
                this.nameInput.focus()   
                //---------Scroll to the bottom when new msg appears-----//
                this.scrollToBottom()
                //---------Calls a function to check for new msgs-------//
                this.chatCheck()            

            })
            .catch(error => {
                console.log(error)
            })  
    }
    
// ---------- Function that gets all chat info from DB and updates the state with it every 1.5 secs -------------//
     chatCheck(){

        check = setInterval(() => {
            axios({
                method: "get",
                url: `https://phobbie.herokuapp.com/sv/return-chat/${this.props.match.params._id}`,
                withCredentials: true
            })
            .then(result => {
                const stateCopy = {...this.state}

                stateCopy.chat = result.data

                if(this.state.chat.messages.length !== result.data.messages.length){
                    this.scrollToBottom()
                }

                this.setState(stateCopy)
            })
            .catch(error => {
                console.log(error)

            })  
        }, 1500)
     }

// ---------- Function that clears the interval when exitting chat to avoid memory leaks -------------//
     componentWillUnmount(){

        clearInterval(check)
     }

// ---------- Function that register the info from the inputs -------------//
      handleInput(e){

        const {value} = e.target

        this.setState({...this.state, message: value})
      }

// ---------- Function that register new messages on the DB -------------//
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
                url: `https://phobbie.herokuapp.com/sv/send-msg/${this.props.match.params._id}`,
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

// ---------- Function that auto-scrolls down when new msg appears -------------//
      scrollToBottom = () => {

        this.messagesEnd.scrollIntoView({ behavior: "smooth" })
      }

// ---------- Function that extracts only the day and hour of the msgs -------------//
      displayTime(time){

        const timeArr = time.split("T")
        const date = timeArr[0].split("-")

        return `${timeArr[1].slice(0,5)} - ${date[2]}/${date[1]}`
      }

// ---------- Function that checks if the msgs are read or unread -------------//
      checkIfRead(status){

        if (status === "READ"){
            return <img className="read-icon" src="https://res.cloudinary.com/hobbiesphere/image/upload/v1621440328/msg-color2_we6x4c.png" />

        }else if (status === "UNREAD"){
            return <img className="read-icon" src="https://res.cloudinary.com/hobbiesphere/image/upload/v1621440365/msg-gris_h433ri.png" /> 

        }
      }
      
// ---------- Render the chats mapped by username -------------//
    render(){
        let messages
        // ---------- Map the messages when loaded -------------//
        if(this.state.loaded){
            messages = this.state.chat.messages.map((message,index)=>{
                return message.username === this.props.user.username ? 
                    (
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

        // ---------- Render chats when loaded and spinner if not -------------//
        return this.state.loaded ? 
            (
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
                        ref={(el) => { this.messagesEnd = el }}></div>
                    </div>

                    <div>
                        <form action="">
                            <input type="text" name="message" ref={(input) => { this.nameInput = input }} value={this.state.message} onChange={(e)=>this.handleInput(e)} autoComplete="off"/>
                            <button onClick={(e)=>this.sendMessage(e)}>Send</button>
                        </form>
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
export default Chat;