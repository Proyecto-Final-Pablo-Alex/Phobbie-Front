import React from "react";
import axios from "axios";

class PokemonDetails extends React.Component {
  state = {
    name: "",
    type: "",
    weight: "",
    height: "",
    img: "",
  };

  componentDidMount() {
    const { name } = this.props.match.params;
    axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${name}`,
    })
      .then((result) => {
        const { name, id, weight, height } = result.data;
        const type = result.data.types[0].type.name;
        this.setState({
          name,
          type,
          weight,
          height,
          img: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return this.state.name ? (
      <div>
        <h1>{this.state.name[0].toUpperCase() + this.state.name.slice(1)} details:</h1>
        <img
          src={this.state.img}
          alt={this.state.name[0].toUpperCase() + this.state.name.slice(1)}
        />
        <p>{this.state.name[0].toUpperCase() + this.state.name.slice(1)}</p>
        <p>Type: {this.state.type}</p>
        <p>Weight: {this.state.weight}</p>
        <p>Height: {this.state.height}</p>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default PokemonDetails;
