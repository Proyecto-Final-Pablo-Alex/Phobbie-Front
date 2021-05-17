import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ProfileNavbar from "./ProfileNavbar";


class MyFriends extends React.Component {
    state={
        user:{},
        requests: [],
        friendsRender: [],
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
        const stateCopy = {...this.state}
        stateCopy.user = result.data.result
        stateCopy.friendsRender = result.data.result.friends
        stateCopy.requests = requests.data
        stateCopy.loaded = true
        this.setState(stateCopy)
      })
    })
    .catch(error => {
      console.log(error)
    })  
  }

    componentDidUpdate(){
   
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
            const stateCopy = {...this.state}
            stateCopy.user = result.data.result
            stateCopy.requests = requests.data
            stateCopy.loaded = true
            if (requests.data.length === this.state.requests.length && this.state.user.friends.length === result.data.result.friends.length){
            } else {
            this.setState(stateCopy)
            }
        })
        })
        .catch(error => {
        console.log(error)
        })
        
    }


    acceptFriendRequest(requesterId, reqId){
        axios({
          method: "post",
          url: "http://localhost:5000/accept-request",
          data: {_id:reqId, requester:requesterId, recipient: this.state.user._id},
          withCredentials: true
        })
        .then(result => {
          this.setState({...this.state})
        })
        .catch(error => {
          console.log(error)
        })
      }
    
      rejectFriendRequest(requesterId, reqId){
        axios({
          method: "post",
          url: "http://localhost:5000/reject-request",
          data: {_id:reqId, requester:requesterId, recipient: this.state.user._id},
          withCredentials: true
        })
        .then(result => {
            this.setState({...this.state})
        })
        .catch(error => {
          console.log(error)
        })
      }


    render(){
        const {friends} = this.state.user;
        const {requests} = this.state
        let friendList, friendRequests
        if (this.state.loaded){
            friendList = friends.map((friend, index) => {
                return (
                <li key={index} className="friend">
                    <img src={friend.photo} alt={`${friend.username} foto`} />
                    <p>{friend.username}</p>
                    <Link to={`/return-friend/${friend._id}`}><button>See profile</button></Link>
                </li>
                );
            });
            friendRequests = requests.map((req, index)=>{
                return (
                <li key={index} className="friend">
                    <img src={req.requester.photo} alt={req.requester.username} />
                    <p>{req.requester.username}</p>          
                    <button onClick={()=>this.acceptFriendRequest(req.requester._id, req._id)}>Accept</button>
                    <button onClick={()=>this.rejectFriendRequest(req.requester._id, req._id)}>Reject</button>
                </li>
                )
            })
        }
            return this.state.loaded ? (
                <div className="MyFriends">
                    <ProfileNavbar />
                    {(this.state.requests.length !== 0)
                        ?   <div className="requestList">
                                <h2>Requests</h2>
                                <ul>{friendRequests}</ul>
                            </div>

                        :   <div>
                                <h2>Requests</h2>
                                You don't have any friend requests
                            </div>}
                    
                    {(friends.length !== 0)
                        ? <div className="friendList">
                            <h2>Friends</h2>
                            <ul>{friendList}</ul>
                            </div>

                        : <div>
                            <h2>Friends</h2>
                            You don't have friends yet
                            </div>}
                </div>
                
            ) : null
    }
}
export default MyFriends;