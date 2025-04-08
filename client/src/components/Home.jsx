import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';


const Home = () => {


    return (
        <div className="container-fluid d-flex flex-column flex-grow-1 justify-content-center align-items-center theme-d5 text-center pb-5">

            <h1 className="border-bottom border-3 d-inline display-3 fw-bold mb-5">
                <FontAwesomeIcon icon={faCar}/> Zoom Zoom Type
            </h1>
            <p className='align-items-center display-6 mb-5'>
                Hone your typing skills solo or compete against others
            </p>
            <div className="row w-100">
                <div className="container-fluid d-flex justify-content-between gap-4 w-25">
                    <button className="btn btn-lg custom-accent-btn mb-3">Play Now</button>
                    <button className="btn btn-lg custom-accent-btn mb-3">Modes</button>
                </div>
            </div>
      
        </div>
    )
}

export default Home;