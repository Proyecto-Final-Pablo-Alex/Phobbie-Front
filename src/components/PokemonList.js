import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class PokemonList extends React.Component {
  state = {
    pokemons: [],
    createdSuccess: false,
  };

  componentDidMount() {
    if (this.state.pokemons.length === 0) {
      axios({
        method: "get",
        url: "https://pokeapi.co/api/v2/pokemon?limit=151",
      })
        .then((result) => {
          const pokemons = result.data.results;
          const newPokemons = pokemons.map((pokemon, index) => {
            return {
              name: pokemon.name,
              url: pokemon.url,
              sprite: `https://pokeres.bastionbot.org/images/pokemon/${
                index + 1
              }.png`,
            };
          });

          this.setState({ ...this.state, pokemons: newPokemons });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  addToProfile(name, sprite) {
    axios({
      method: "post",
      url: "http://localhost:5000/add-pokemon",
      data: { name: name, sprite: sprite },
      withCredentials: true,
    })
      .then((result) => {
        this.setState({ ...this.state, createdSuccess: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getPokemons() {
    return this.state.pokemons.map((pokemon, index) => {
      let { name, sprite } = pokemon;
      return (
        <div
          key={index}
          style={{
            border: "dashed red 10px",
            margin: "0 auto",
            padding: "5px 10px",
          }}
        >
          <img src={sprite} alt={name} style={{ width: "200px" }} />
          <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
          <Link to={`/pokemon-details/${name}`}>
            <button style={{ margin: "2px", borderRadius: "8px" }}>
              View details
            </button>
          </Link>
          {this.props.user.username ? (
            <button
              style={{ margin: "2px", borderRadius: "8px" }}
              onClick={() => this.addToProfile(name, sprite)}
            >
              Add to favourites
            </button>
          ) : null}
        </div>
      );
    });
  }

  render() {
    return this.state.createdSuccess ? (
      <Redirect to="/profile" />
    ) : (
      <div>
        <h2>All pokemon</h2>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
          }}
        >
          {this.getPokemons()}
        </div>
      </div>
    );
  }
}

export default PokemonList;

//URL DE IMAGENES
// https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png
