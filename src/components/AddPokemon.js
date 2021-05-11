import React from "react";


class AddPokemon extends React.Component {
  render() {
    
    return (
      <div>
        <h2>Add new Pokemon to your list</h2>
      <form >
          <label htmlFor="name">Name: </label>
          <input type="text" name='name'/>

         <label htmlFor="sprite">Sprite: </label>
          <input type="text" name='sprite'/>
      </form>
      </div>
    );
  }
}

export default AddPokemon;
