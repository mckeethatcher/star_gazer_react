import React, { useEffect, useState } from "react";
import LocationService from "../services/LocationService";
import { useNavigate } from "react-router-dom";

function ListLocationComponent() {
  const [locations, setLocations] = useState([]);

  // Get the navigate function from the useNavigate hook
  const navigate = useNavigate();

  const deleteLocation = (id) => {
    LocationService.deleteLocation(id).then((res) => {
      setLocations(locations.filter((location) => location.id !== id));
    });
  };


  const viewLocation = (location) => {
    navigate(`/view-location/${location}`);
  };

  const editLocation = (location) => {
    navigate(`/add-location/${location}`);
  };

  const addLocation = () => {
    navigate("/add-location/_add");
  };

  useEffect(() => {
    LocationService.getLocations().then((res) => {
      setLocations(res.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-center">Locations List</h2>
      <div className="row">
        <button className="btn btn-primary" onClick={addLocation}>
          Add Location
        </button>
      </div>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Astronomer </th>
              <th> Location </th>
              <th> GPS </th>
              <th> Image URL </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id}>
                {" "}
                {/* Add the key prop here */}
                <td> {location.astronomer} </td>
                <td> {location.location} </td>
                <td> {location.coordinates} </td>
                <td> {location.image} </td>
                <td>
                  <button
                    onClick={() => editLocation(location.id)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteLocation(location.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => viewLocation(location.id)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListLocationComponent;
         
