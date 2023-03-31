import React, { useState, useEffect } from "react";
import LocationService from "../services/LocationService";
import { useParams } from "react-router-dom";

const ViewLocationComponent = () => {
  const { id } = useParams();
  const [location, setLocation] = useState({});

  useEffect(() => {
    LocationService.getLocationById(id).then((res) => {
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
            <label> Astronomer: </label>
            <div> {location.astronomer}</div>
          </div>
          <div className="row">
            <label> Location: </label>
            <div> {location.location}</div>
          </div>
          <div className="row">
            <label> GPS Coordinates: </label>
            <div> {location.gps}</div>
          </div>
          <div className="row">
            <label> Image URL: </label>
            <div> {location.imageUrl}</div>
          </div>
          <div className="row">
            <label> Description: </label>
            <div> {location.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLocationComponent;
