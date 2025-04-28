import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';

import { useCookies} from 'react-cookie';

async function getProfileData(cookie) {
    const result = await axios.get("http://localhost:3000/api/profileData", {params:{"userID": cookie.userID}});
    if (!result.data)
        result.data = [];
    return result.data;
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
                if (!sData)
                    sData = [];

                var rCount = sData.length;
                var fa = 0;
                var br = 0;
        
                for (var i = 0; i < rCount; i++) {
                    fa += sData[i].wpm;
                    if (sData[i].wpm > br)
                        br = sData[i].wpm;
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
                            <th>Time</th>
                            <th>WPM</th>
                            <th>Accuracy</th>
                            <th>Ranking</th>
                            <th>Mode</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            statData.sort((i1, i2) => i2.wpm - i1.wpm).map((item, index) => (
                              <tr key={index}>
                                <td>{item.time}</td>
                                <td>{item.wpm}</td>
                                <td>{item.accuracy}</td>
                                <td>{item.ranking}</td>
                                <td>{item.mode}</td>
                                <td>{item.dateOfGame}</td>
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