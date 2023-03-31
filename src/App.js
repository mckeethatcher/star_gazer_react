import './App.css';
import AstronomyPicture from './AstronomyPicture';
import CloudCover from './CloudCover';
import SolarActivityData from './SolarActivityData';
import SatelliteImagery from './SatelliteImagery';
import ConstellationLookup from './ConsetellationLookup';
import ListLocationComponent from "./components/ListLocationComponent";
import CreateLocationComponent from "./components/CreateLocationComponent";
import ViewLocationComponent from "./components/ViewLocationComponent";
// Import the Routes and Route components from react-router-dom
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function NASAInfo() {
  return (
    <div>
      <CloudCover />
      <Router>
        {" "}
        {/* Add the Router component here */}
        <Routes>
          <Route path="/" element={<ListLocationComponent />} index />
          <Route path="/locations" element={<ListLocationComponent />} />
          <Route
           
            path="/add-location/:id"
            element={<CreateLocationComponent />}
          />
          <Route
            path="/view-location/:id"
            element={<ViewLocationComponent />}
          />
          {/* <Route path = "/update-location/:id" element = {<UpdateLocationComponent />} /> */}
        </Routes>
      </Router>{" "}
      {/* Close the Router component here */}
      <ConstellationLookup />
      <AstronomyPicture />
      <SatelliteImagery />
      <SolarActivityData />
    </div>
  );
}

export default NASAInfo;
