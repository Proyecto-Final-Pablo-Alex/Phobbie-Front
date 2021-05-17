import React from "react";


class Home extends React.Component {
    render(){
        return(
            <div className="Home">
                <img src="https://res.cloudinary.com/hobbiesphere/image/upload/v1621249675/Logo_Phobbie_completo_q1jiwe.png" alt="Logo" />
                <h1>Welcome to Phobbie!!</h1>
                <hr />
                <div>
                    Phobbie is a place to connect with other people with your same hobbies. It was first developed as a final project for a Web Developer Bootcamp but we hope you like it and give it a try. <span>😉</span>
                </div>
            </div>
        )
    }
}
export default Home;