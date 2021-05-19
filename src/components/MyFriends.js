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
      url: "https://phobbies-app.herokuapp.com/sv/return-user",
      withCredentials: true
    })
    .then(result => {
      axios({
        method: "post",
        url: "https://phobbies-app.herokuapp.com/sv/see-requests",
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

    updateRequestAndFriends(){
        axios({
        method: "get",
        url: "https://phobbies-app.herokuapp.com/sv/return-user",
        withCredentials: true
        })
        .then(result => {
          axios({
            method: "post",
            url: "https://phobbies-app.herokuapp.com/sv/see-requests",
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


    acceptFriendRequest(requesterId, reqId){
        axios({
          method: "post",
          url: "https://phobbies-app.herokuapp.com/sv/accept-request",
          data: {_id:reqId, requester:requesterId, recipient: this.state.user._id},
          withCredentials: true
        })
        .then(result => {
          this.updateRequestAndFriends()
        })
        .catch(error => {
          console.log(error)
        })
      }
    
      rejectFriendRequest(requesterId, reqId){
        axios({
          method: "post",
          url: "https://phobbies-app.herokuapp.com/sv/reject-request",
          data: {_id:reqId, requester:requesterId, recipient: this.state.user._id},
          withCredentials: true
        })
        .then(result => {
            this.updateRequestAndFriends()
        })
        .catch(error => {
          console.log(error)
        })
      }

      filterFriends(e){
        const {value} = e.target
        const friendsFiltered = this.state.user.friends.filter((friend)=>{
          return friend.username.toLowerCase().includes(value.toLowerCase())
        })
        this.setState({...this.state, friendsRender: friendsFiltered})
      }

    render(){
        const {friends} = this.state.user
        const {friendsRender} = this.state;
        const {requests} = this.state
        let friendList, friendRequests
        if (this.state.loaded){
            friendList = friendsRender.map((friend, index) => {
                return (
                <div key={index} className="friend">
                    <img src={friend.photo} alt={`${friend.username} foto`} />
                    <p>{friend.username}</p>
                    <Link to={`/return-friend/${friend._id}`}><button>See profile</button></Link>
                </div>
                );
            });
            friendRequests = requests.map((req, index)=>{
                return (
                <div key={index} className="friend">
                    <img src={req.requester.photo} alt={req.requester.username} />
                    <p>{req.requester.username}</p>    
                    <div className="friend-req-buttons">     
                      <button onClick={()=>this.acceptFriendRequest(req.requester._id, req._id)}>Accept</button>
                      <button onClick={()=>this.rejectFriendRequest(req.requester._id, req._id)}>Reject</button>
                    </div> 
                </div>
                )
            })
        }

        return this.state.loaded ? (
            <div className="MyFriends">
            
                <ProfileNavbar />

                <div className="requestList">
                  <h2>Requests</h2>
                  {(this.state.requests.length !== 0) ? <div>{friendRequests}</div> : <p>You don't have any friend requests</p>}
                </div>

                <div className="friendList">
                  <h2>Friends</h2>
                  <input type='text' onChange={(e)=>this.filterFriends(e)} placeholder="Search friend..."/>
                  {(friends.length !== 0) ? <div className="friendContainer">{friendList}</div> : <p>You don't have friends yet</p>}
                </div>

            </div>
            
        ) : (
          <div className="spinner">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
        )
    }
}
export default MyFriends;