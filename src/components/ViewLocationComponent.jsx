import React, { useState, useEffect } from "react";
import LocationService from "../services/LocationService";
import { useParams } from "react-router-dom";

const ViewLocationComponent = () => {
  const { id } = useParams();
  const [location, setLocation] = useState({});

useEffect(() => {
  LocationService.getLocationById(id).then((res) => {
    console.log(res.data); // Log the data to the console
    setLocation(res.data);
  });
}, [id]);

  return (
    <div>
      <br></br>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center"> View Location Details</h3>
        <div className="card-body">
          <div className="row">
            <strong>Astronomer:</strong> {location.astronomer}
          </div>
          <div className="row">
            <strong>Location:</strong> {location.location}
          </div>
          <div className="row">
            <strong>GPS Coordinates:</strong> {location.coordinates}{" "}
            {/* Updated */}
          </div>
          <div className="row">
            <strong>Image URL:</strong> {location.image} {/* Updated */}
          </div>
          <div className="row">
            <strong>Description:</strong> {location.description}
          </div>
        </div>
      </div>
    </div>
  );


  };

export default ViewLocationComponent;
