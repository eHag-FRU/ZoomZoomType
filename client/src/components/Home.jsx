import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUser, faCar } from '@fortawesome/free-solid-svg-icons';


const Home = () => {


    return (
        <div className = "container col text-center" align-items-center>
            <h1 className="border-bottom border-3 border-primary d-inline"><FontAwesomeIcon icon={faCar}/> Zoom Zoom  Type</h1>
            <p className="col align-items-center border-bottom border-3 border-primary ">
                Hone your typing skills solo or compete against others
            </p>
            <div className="col">
                <button className="btn btn-primary mb-3">Primary button</button>
                <button className="btn btn-primary mb-3">Primary button</button>
            </div>
        </div>
    )
}

export default Home;