import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './App.css';

const API_URL = 'https://api.astronomyapi.com';
const applicationId = '33162d4b-bd10-4b09-b3b4-2856b9a47c7a';
const applicationSecret = '2103c94e35755505a17eb688f1ca8564a3c5fef02129d3448628fd1a44ea31d35a9494db2138d6da2b7c361cdba0a79c9f7dbb574961da4ecf820a31b6c237c839457a867fdd5fe1c9ffdd39b476387c57bc1dbe8c009e95bbd607afb652577f599eff2080556de2b7e2702f94284607';

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  Authorization: `Basic ${btoa(`${applicationId}:${applicationSecret}`)}`,
};

const styles = {
  default: 'Default',
  inverted: 'Inverted',
  navy: 'Navy',
  red: 'Red',
};

const constellations= {
  and: "Andromeda",
  ant: "Antlia",
  aps: "Apus",
  aqr: "Aquarius",
  aql: "Aquila",
  ara: "Ara",
  ari: "Aries",
  aur: "Auriga",
  boo: "Boötes",
  cae: "Caelum",
  cam: "Camelopardalis",
  cnc: "Cancer",
  cvn: "Canes Venatici",
  cma: "Canis Major",
  cmi: "Canis Minor",
  cap: "Capricornus",
  car: "Carina",
  cas: "Cassiopeia",
  cen: "Centaurus",
  cep: "Cepheus",
  cet: "Cetus",
  cha: "Chamaeleon",
  cir: "Circinus",
  col: "Columba",
  com: "Coma Berenices",
  cra: "Corona Austrina",
  crb: "Corona Borealis",
  crv: "Corvus",
  crt: "Crater",
  cru: "Crux",
  cyg: "Cygnus",
  del: "Delphinus",
  dor: "Dorado",
  dra: "Draco",
  equ: "Equuleus",
  eri: "Eridanus",
  for: "Fornax",
  gem: "Gemini",
  gru: "Grus",
  her: "Hercules",
  hor: "Horologium",
  hya: "Hydra",
  hyi: "Hydrus",
  ind: "Indus",
  lac: "Lacerta",
  leo: "Leo",
  lmi: "Leo Minor",
  lep: "Lepus",
  lib: "Libra",
  lup: "Lupus",
  lyn: "Lynx",
  lyr: "Lyra",
  men: "Mensa",
  mic: "Microscopium",
  mon: "Monoceros",
  mus: "Musca",
  nor: "Norma",
  oct: "Octans",
  oph: "Ophiuchus",
  ori: "Orion",
  pav: "Pavo",
  peg: "Pegasus",
  per: "Perseus",
  phe: "Phoenix",
  pic: "Pictor",
  psc: "Pisces",
  psa: "Piscis Austrinus",
  pup: "Puppis",
  pyx: "Pyxis",
  ret: "Reticulum",
  sge: "Sagitta",
  sgr: "Sagittarius",
  sco: "Scorpius",
  scl: "Sculptor",
  sct: "Scutum",
  ser: "Serpens Caput",
  ser: "Serpens Cauda",
  sex: "Sextans",
  tau: "Taurus",
  tel: "Telescopium",
  tri: "Triangulum",
  tra: "Triangulum Australe",
  tuc: "Tucana",
  uma: "Ursa Major",
  umi: "Ursa Minor",
  vel: "Vela",
  vir: "Virgo",
  vol: "Volans",
  Vul: "Vulpecula"
}

const StarChart = () => {
  const [longitude, setLongitude] = useState('-84.39733');
  const [latitude, setLatitude] = useState('33.775867');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [type, setType] = useState('constellation');
  const [constellation, setConstellation] = useState('ori');
  const [ra, setRa] = useState(0);
  const [dec, setDec] = useState(0);
  const [zoom, setZoom] = useState(6);
  const [style, setStyle] = useState('inverted');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Click the "Generate" button to load the image');

  const generate = () => {
    setLoading(true);
    setStatus('Loading...');

    const parameters = {};
    if (type === 'constellation') {
      parameters.constellation = constellation;
    }
    if (type === 'area') {
      parameters.position = {
        equatorial: {
          rightAscension: ra,
          declination: dec,
        },
      };
      parameters.zoom = zoom;
    }

    const url = `${API_URL}/api/v2/studio/star-chart`;
    const params = {
      style,
      observer: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        date: moment(date).format('YYYY-MM-DD'),
      },
      view: {
        type,
        parameters,
      },
    };

    axios.post(url, params, { headers }).then((response) => {
      setImageUrl(response.data.data.imageUrl);
      setLoading(false);
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="column column-25">
          <h3>Star Chart</h3>
          <p>
            this page uses /v2/studio/star-chart api endpoint to generate star charts.
          </p>
          <form>
            <fieldset>
              <label>Longitude</label>
              <input value={longitude} onChange={(e) => setLongitude(e.target.value)} type="text" />
              <label>Latitude</label>
              <input value={latitude} onChange={(e) => setLatitude(e.target.value)} type="text" />
              <label>Date</label>
              <input value={date} onChange={(e) => setDate(e.target.value)} type="date" />
              <label>Style</label>
              <select value={style} onChange={(e) => setStyle(e.target.value)}>
                {Object.keys(styles).map((key) => (
                  <option value={key} key={key}>
                    {styles[key]}
                  </option>
                ))}
              </select>
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="area">Area</option>
                <option value="constellation">Constellation</option>
              </select>
              {type === 'constellation' && (
                <>
                  <label>Constellation</label>
                  <select value={constellation} onChange={(e) => setConstellation(e.target.value)}>
                    {Object.keys(constellations).map((key) => (
                      <option value={key} key={key}>
                        {constellations[key]}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {type === 'area' && (
                <>
                  <label>Right Ascension</label>
                  <input value={ra} onChange={(e) => setRa(e.target.value)} type="number" />
                  <label>Declination</label>
                  <input value={dec} onChange={(e) => setDec(e.target.value)} type="number" />
                  <label>Zoom</label>
                  <input value={zoom} onChange={(e) => setZoom(e.target.value)} type="number" />
                </>
              )}
              <button type="button" onClick={generate}>
                Generate
              </button>
            </fieldset>
          </form>
        </div>
        <div className="column column-75">
          {loading && <div>{status}</div>}
          {imageUrl && <img src={imageUrl} alt="Star Chart" />}
        </div>
      </div>
    </div>
  );
}  

export default StarChart;
