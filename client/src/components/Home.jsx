import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';


const Home = () => {


    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 theme-d5 text-center">            <h1 className="border-bottom border-3 border-primary d-inline">
                <FontAwesomeIcon icon={faCar}/> Zoom Zoom  Type
            </h1>
            <p className="lead col align-items-center border-bottom border-3 border-primary ">
                Hone your typing skills solo or compete against others
            </p>
            <div className="col">
                <button className="btn btn-large btn-primary mb-3">Primary button</button>
                <button className="btn btn-large btn-primary mb-3">Primary button</button>
            </div>
      
        </div>
    )
}

export default Home;