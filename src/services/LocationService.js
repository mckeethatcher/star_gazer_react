import axios from "axios";

const LOCATION_API_BASE_URL = "http://localhost:8000/experiences";

class LocationService {
  getLocations() {
    return axios.get(LOCATION_API_BASE_URL);
  }

  createLocation(location) {
    return axios.post(LOCATION_API_BASE_URL, location);
  }

  getLocationById(id) {
    // Check if id is null or undefined
    if (id === null || id === undefined) {
      // Return a rejected promise with an error message
      return Promise.reject(new Error("Invalid id"));
    }
    return axios.get(LOCATION_API_BASE_URL + "/" + id);
  }

  updateLocation(locationData, locationId) {
    // Check if locationId is null or undefined
    if (locationId === null || locationId === undefined) {
      // Return a rejected promise with an error message
      return Promise.reject(new Error("Invalid locationId"));
    }
    // Construct the URL using the locationId parameter
    const url = LOCATION_API_BASE_URL + "/" + locationId;
    // Make the PUT request to update the location
    return axios.put(url, locationData);
  }

  deleteLocation(locationId) {
    // Check if locationId is null or undefined
    if (locationId === null || locationId === undefined) {
      // Return a rejected promise with an error message
      return Promise.reject(new Error("Invalid locationId"));
    }
    return axios.delete(LOCATION_API_BASE_URL + "/" + locationId);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LocationService();
