// ---------- IMPORTS -------------//
import React from 'react'

// ---------- Component for rendering the footer on the homepage -------------//
class Footer extends React.Component {

    render(){

        const simbol = "</>"

        return(
            <div className="Footer">
                {simbol} by <a href="https://github.com/PabloCabreraR" target="_blank">Pablo Cabrera</a> & <a href="https://github.com/alescofet" target="_blank">Alex Escofet</a>
            </div>
        )
    }
}

export default Footer