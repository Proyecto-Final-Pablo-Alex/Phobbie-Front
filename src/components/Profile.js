import React from "react";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  render() {
    const { username, friends } = this.props.user;
    const friendList = friends.map((friend, index) => {
      return (
        <li key={index}>
          <img src={friend.photo} alt={`${friend.name} foto`} />
          {friend.name}
        </li>
      );
    });
    return (
      <div>
        <Link to="/edit-user">Edit user</Link>
        <h1>Hola {username}</h1>
        <img src="foto" alt={`Foto de perfil de ${username}`} />
        <div>
          <h2>Friends</h2>
          <ul>{friendList}</ul>
        </div>
      </div>
    )
  }
}

export default Profile;
