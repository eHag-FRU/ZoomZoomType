import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useCookies} from 'react-cookie';

async function getProfileData(cookie) {

    return [
        {
            RaceNumber:1,
            Speed: 57,
            Accuracy: 96.1,
            Place: 2,
            Date: "3/20/2025"
        },

        {
            RaceNumber:2,
            Speed: 64,
            Accuracy: 97.8,
            Place: 4,
            Date: "4/23/2025"
        },
    ];
}

const ProfilePage = () => {

    const cookie = (useCookies(['usr'])[0]).usr;



    const [statData, setStatData] = useState([]);
    const [fullAverage, setFullAverage] = useState(0);
    const [bestRace, setBestRace] = useState(0);
    const [raceCount, setRaceCount] = useState(0);

    const navigate = useNavigate();
    const handleEditOnClick = () => {
        navigate('/EditProfile');
    }

    useEffect(() => {
        if (cookie?.userID) {
            getProfileData(cookie).then(data => {
                var sData = data;

                var rCount = sData.length;
                var fa = 0;
                var br = 0;
        
                for (var i = 0; i < rCount; i++) {
                    fa += sData[i].Speed;
                    if (sData[i].Speed > br)
                        br = sData[i].Speed;
                }
        
                if (rCount > 0)
                    fa = fa/rCount;
        
                setStatData(sData);
                setRaceCount(rCount);
                setFullAverage(fa);
                setBestRace(br);        
            });
        }

       
    }, [cookie]);

    return (
       <div className='profile-page'>
            <div className='profile-page-header'>
                <span> Your Profile</span>
                <button className='edit-profile-button' onClick={handleEditOnClick}>Edit Profile</button>
            </div>
            <div className='profile-page-summary'>
                <img className='profile-page-image' src='https://img.freepik.com/premium-vector/people-profile-graphic_24911-21373.jpg' />
                <div className='profile-page-summary-item'>
                    {fullAverage} WPM
                    <br/>
                    Full Avg
                </div>
                <div className='profile-page-summary-item'>
                    {bestRace} WPM
                    <br/>
                    Best Race
                </div>
                <div className='profile-page-summary-item'>
                    {raceCount}
                    <br/>
                    Races
                </div>
            </div>
            <div className='profile-page-details'>
            <span>Your Latest Race Results</span>
                <table>
                    <thead>
                        <tr>
                            <th>Race</th>
                            <th>Speed</th>
                            <th>Accuracy</th>
                            <th>Place</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            statData.sort((i1, i2) => i2.RaceNumber - i1.RaceNumber).map((item) => (
                              <tr key={item.RaceNumber}>
                                <td>{item.RaceNumber}</td>
                                <td>{item.Speed}</td>
                                <td>{item.Accuracy}</td>
                                <td>{item.Place}</td>
                                <td>{item.Date}</td>
                              </tr>  
                            ))
                        }
                    </tbody>
                </table>
            </div>
       </div>
    )
}

export default ProfilePage;