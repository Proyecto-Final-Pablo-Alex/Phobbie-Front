import React from 'react'

class BigScreen extends React.Component{
    render(){
        const tuerca = 'https://res.cloudinary.com/hobbiesphere/image/upload/v1621495656/tuerca_zkxbhg.png'
        return (
            <div className="BigScreen">
                <div>
                    <p>The Phobbie development team apologizes in advance for any inconvenience we may cause. </p>
                    <p>We are working on making the Desktop version available.</p>
                    <p>Please open the app with a mobile phone.</p>
                    <div>
                    <img className='gear1' src={tuerca}/>
                    <img className='gear2' src={tuerca}/>
                    <img className='gear1' src={tuerca}/>
                    <img className='gear2' src={tuerca}/>
                    </div>
                    <img src="https://res.cloudinary.com/hobbiesphere/image/upload/v1621265220/Logo_Phobbie_solo_nombre_negro_lxq426.png" className="phobbie-logo" />
                </div>
            </div>
        )
    }
}

export default BigScreen