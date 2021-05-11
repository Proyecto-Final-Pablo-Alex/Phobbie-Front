import axios from "axios";
import React from "react";


class AllHobbies extends React.Component {
    state={
      user: {
        username: "",
        age: '',
        location: '',
        friends: [],
        hobbies: [],
        _id: "",
        password: "",
        photo: ''
      },
        allHobbies:[],
        copyAllHobbies:[],
        search:``
    }
    componentDidMount(){
      axios({
        method: "get",
        url: "http://localhost:5000/hobbies/allHobbies",
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  render() {
    
    return (
      <>
      </>
    )
  }
}

export default AllHobbies;