// ---------- IMPORTS -------------//
import React from "react"

//----- COMPONENTS------//
import Footer from "./Footer"

// ---------- Component for rendering the homepage -------------//
class Home extends React.Component {

    render(){

        return(
            <div className="Home">

                {/* ---------- Spinning logo from homepage ------------- */}
                <div className="lds-circle"><div></div></div>
           
                <h1>Welcome to Phobbie!!</h1>

                <hr />

                <div>
                    Phobbie is a place to connect with other people with your same hobbies. It was first developed as a final project for a Web Developer Bootcamp but we hope you like it and give it a try. <span>😉</span>
                </div>

                <Footer />
            </div>
        )
    }
}
export default Home