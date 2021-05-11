import React from "react";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  render() {
    const { username, friends } = this.props.user;
    const friendList = friends.map((pokemon, index) => {
      return (
        <li key={index}>
          <img src={pokemon.sprite} alt={`${pokemon.name} foto`} />
          {pokemon.name}
        </li>
      );
    });
    return (
      <div>
        <Link to="/all-pokemon">All pokemon</Link>
        <h1>Hola {username}</h1>
        <img src="foto" alt={`Foto de perfil de ${username}`} />
        <div>
          <h2>Friends</h2>
          <ul>{friendList}</ul>
        </div>
      </div>
    );
  }
}

export default Profile;
