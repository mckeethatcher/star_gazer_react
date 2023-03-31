import React, { useState, useEffect } from "react";
import LocationService from "../services/LocationService";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const CreateLocationComponent = () => {
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    id: paramId || "_add",
    astronomer: "",
    location: "",
    gps: "",
    imageUrl: "",
    description: "",
  });
useEffect(() => {
  if (state.id === "_add") {
    return;
  } else {
    LocationService.getLocationById(state.id).then((res) => {
      let location = res.data;
      setState({
        id: location.id,
        astronomer: location.astronomer,
        location: location.location,
        gps: location.coordinates, // Use the correct key from the response data
        imageUrl: location.image, // Use the correct key from the response data
        description: location.description,
      });
    });
  }
}, [state.id]);



  const saveOrUpdateLocation = (e) => {
    e.preventDefault();
    let location = {
      astronomer: state.astronomer,
      location: state.location,
      coordinates: state.gps,
      image: state.imageUrl,
      description: state.description,
    };
    console.log("location => " + JSON.stringify(location));

    // Log the value of state.id
    console.log("state.id => " + state.id);

    if (state.id === "_add") {
      LocationService.createLocation(location).then((res) => {
        navigate("/locations");
      });
    } else {
      LocationService.updateLocation(location, state.id).then((res) => {
        navigate("/locations");
      });
    }
  };

  const cancel = () => {
    navigate("/locations");
  };

  const getTitle = () => {
    if (state.id === "_add") {
      return <h3 className="text-center">Add Location</h3>;
    } else {
      return <h3 className="text-center">Update Location</h3>;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
<div className="row">
  <div className="col-lg-8 col-md-10 col-sm-12 mx-auto"> {/* Adjust column classes */}
    <div className="card" style={{ padding: '20px' }}> {/* Add padding to the card */}
      <h3 className="text-center">Add Location</h3>
      <div className="card-body">
        
                <form>
                  <div className="form-group">
                    <label> Astronomer: </label>
                    <input
                      placeholder="Astronomer"
                      name="astronomer"
                      className="form-control"
                      value={state.astronomer}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label> Location: </label>
                    <input
                      placeholder="Location"
                      name="location"
                      className="form-control"
                      value={state.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label> GPS Coordinates: </label>
                    <input
                      placeholder="GPS Coordinates"
                      name="gps"
                      className="form-control"
                      value={state.gps}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label> Image URL: </label>
                    <input
                      placeholder="Image URL"
                      name="imageUrl"
                      className="form-control"
                      value={state.imageUrl}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label> Description: </label>
                    <input
                      placeholder="Description"
                      name="description"
                      className="form-control"
                      value={state.description}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={saveOrUpdateLocation}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={cancel}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
      </div>
    </div>
  </div>
</div>
  );
};
export default CreateLocationComponent;
