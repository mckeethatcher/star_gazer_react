import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function SolarActivityData() {
  const [solarData, setSolarData] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    axios.get(`https://api.nasa.gov/DONKI/CME?startDate=${threeDaysAgo}&endDate=${today}&api_key=fFek0AUwa9FcL7VJiAWIA0nDTi1AzsxcOgNNDtLL`)
      .then(response => setSolarData(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Solar Activity Data</h2>
      {solarData.length > 0 && (
        <ul>
          {solarData.map((event, index) => (
            <li key={index}>
              <h3>{event.activityID}</h3>
              <p>{event.note}</p>
              <p>Start Time: {event.startTime}</p>
              <p>End Time: {event.endTime}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SolarActivityData;
