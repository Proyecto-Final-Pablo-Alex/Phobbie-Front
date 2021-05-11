import React from "react";


class AddHobbie extends React.Component {

  handleSubmit(){

  }

  render() {
    return (
      <div>
        <h2>Add a new hobbie</h2>
        <form onSubmit={()=>this.handleSubmit()}>
            <label htmlFor="name">Name: </label>
            <input type="text" name='name'/>
            <button>Add hobbie</button>
        </form>
      </div>
    );
  }
}

export default AddHobbie;
