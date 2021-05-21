// ---------- IMPORTS -------------//
import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"

//----- COMPONENTS ------//
import ProfileNavbar from "./ProfileNavbar"

// ---------- Component for rendering the friend list -------------//
class MyFriends extends React.Component {
    state={
        user:{},
        requests: [],
        friendsRender: [],
        loaded:false,
    }

    //----- Returns the user logged and the friend requests from database on CDM------//
    componentDidMount(){

      axios({
        method: "get",
        url: "https://phobbie.herokuapp.com/sv/return-user",
        withCredentials: true
      })
      .then(result => {
        axios({
          method: "post",
          url: "https://phobbie.herokuapp.com/sv/see-requests",
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

// ---------- Function to update friend requests and friendlist to refresh it when a new request arrives or you accept a new friend -------------//
    updateRequestAndFriends(){

      axios({
      method: "get",
      url: "https://phobbie.herokuapp.com/sv/return-user",
      withCredentials: true
      })
      .then(result => {
        axios({
          method: "post",
          url: "https://phobbie.herokuapp.com/sv/see-requests",
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

// ---------- Function that accepts a friend request and add a friend to your friendlist -------------//
    acceptFriendRequest(requesterId, reqId){

        axios({
          method: "post",
          url: "https://phobbie.herokuapp.com/sv/accept-request",
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
    
// ---------- Function that rejects a friend request  -------------//
    rejectFriendRequest(requesterId, reqId){
      axios({
        method: "post",
        url: "https://phobbie.herokuapp.com/sv/reject-request",
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

// ---------- Function that filters the friendlist for the search feature -------------//
    filterFriends(e){

      const {value} = e.target

      const friendsFiltered = this.state.user.friends.filter((friend)=>{
        return friend.username.toLowerCase().includes(value.toLowerCase())
      })

      this.setState({...this.state, friendsRender: friendsFiltered})
    }

// ---------- Function that render the friend list and requests when loads -------------//
    render(){
        const {friends} = this.state.user
        const {friendsRender} = this.state
        const {requests} = this.state
        let friendList, friendRequests
        
// ---------- When loaded renders all the friends and requests -------------//
        if (this.state.loaded){
            friendList = friendsRender.map((friend, index) => {
                return (
                  <div key={index} className="friend">

                      <img src={friend.photo} alt={`${friend.username} foto`} />
                      <p>{friend.username}</p>
                      <Link to={`/return-friend/${friend._id}`}><button>See profile</button></Link>

                  </div>
                )
            })
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

// ---------- when loaded renders the profile navbar, requests list and friend list  -------------//
        return this.state.loaded ? (
            <div className="MyFriends">
            
                <ProfileNavbar setAppState={()=>this.props.setAppState()}/>

                <div className="requestList">
                  <h2>Requests</h2>
                  {(this.state.requests.length !== 0) ? <div>{friendRequests}</div> : <p>You don't have any friend requests</p>}
                </div>

                <div className="friendList">
                  <h2>Friends</h2>
                  
                  {(friends.length !== 0) ? 
                  (
                    <div className="friendContainer">
                      <input type='text' onChange={(e)=>this.filterFriends(e)} placeholder="Search in friends..."/>
                      {friendList.length === 0 ? <p>No results</p> : <div>{friendList}</div>}
                    </div> 
                  ) : (
                    <p>You don't have friends yet</p>
                  )}
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
export default MyFriends