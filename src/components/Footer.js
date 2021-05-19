import React from 'react'

class Footer extends React.Component {
    render(){
        const simbol = "</>"
        return(
         <div className="Footer">
            {simbol} by <a href="https://github.com/PabloCabreraR">Pablo Cabrera</a> & <a href="https://github.com/alescofet">Alex Escofet</a>
         </div>
        )
    }
}

export default Footer;