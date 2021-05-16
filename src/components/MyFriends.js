import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ProfileNavbar from "./ProfileNavbar";


class MyFriends extends React.Component {
    stat={
        user:{},
        requests: [],
        loaded:false,
    }
    componentDidMount(){
    axios({
      method: "get",
      url: "http://localhost:5000/return-user",
      withCredentials: true
    })
    .then(result => {
      axios({
        method: "post",
        url: "http://localhost:5000/see-requests",
        data: {_id: result.data.result._id},
        withCredentials: true
      })
      .then(requests => {
        console.log(requests)
        const stateCopy = {...this.state}
        stateCopy.user = result.data.result
        stateCopy.requests = requests.data
        stateCopy.loaded = true
        this.setState(stateCopy)
      })
    })
    .catch(error => {
      console.log(error)
    })  
  }
    render(){
        const { username, friends, photo, hobbies,status,age,location} = this.state.user;
        const {requests} = this.state
        console.log(requests)
        let friendList, friendRequests
        if (this.state.loaded){
            friendList = friends.map((friend, index) => {
                return (
                <li key={index}>
                    <img src={friend.photo} alt={`${friend.username} foto`} />
                    <p>{friend.username}</p>
                    <Link to={`/return-friend/${friend._id}`}><button>See profile</button></Link>
                </li>
                );
            });
            friendRequests = requests.map((req, index)=>{
                return (
                <li key={index}>
                    <img src={req.requester.photo} alt={req.requester.username} />
                    <p>{req.requester.username}</p>          
                    <button onClick={()=>this.acceptFriendRequest(req.requester._id, req._id)}>Accept</button>
                    <button onClick={()=>this.rejectFriendRequest(req.requester._id, req._id)}>Reject</button>
                </li>
                )
            })
        }
            return(
                <div>
                    <ProfileNavbar />
                    <h1>Friends</h1>
                </div>
                
            )
    }
}
export default MyFriends;