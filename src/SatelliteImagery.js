import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function SatelliteImagery() {
  const [imagery, setImagery] = useState([]);

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/earth/assets?lon=YOUR_LONGITUDE_HERE&lat=YOUR_LATITUDE_HERE&date=YYYY-MM-DD&dim=0.10&api_key=fFek0AUwa9FcL7VJiAWIA0nDTi1AzsxcOgNNDtLL')
      .then(response => response.json())
      .then(data => setImagery(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Satellite Imagery</h2>
      {imagery.length > 0 && (
        <img src={imagery[0].url} alt="Satellite Imagery" />
      )}
    </div>
  );
}

export default SatelliteImagery;