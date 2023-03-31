import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
function AstronomyPicture() {
  const [picture, setPicture] = useState({});

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=fFek0AUwa9FcL7VJiAWIA0nDTi1AzsxcOgNNDtLL')
      .then(response => response.json())
      .then(data => setPicture(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Astronomy Picture of the Day</h2>
      <img src={picture.url} alt={picture.title} />
      <h3>{picture.title}</h3>
      <p>{picture.explanation}</p>
    </div>
  );
}

export default AstronomyPicture;