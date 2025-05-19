import axios from "axios";
import { configData } from "../../../../config";

class LocationServices {
  static async getAllLocations() {
    return await axios
      .get(`${configData.BASE_URL_TT}/locations`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching locations:", error);
        throw error;
      });
  }

  static async getLocationById(locationId) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL_TT}/locations/${locationId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching location:", error);
      throw error;
    }
  }

  static async getLocationByCode(locationCode) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL_TT}/locations/code/${locationCode}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching location by code:", error);
      throw error;
    }
  }

  static async searchLocations(params) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL_TT}/locations/search`,
        {
          params: params, // Can include country, city, or name
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching locations:", error);
      throw error;
    }
  }

  static async createLocation(locationData) {
    try {
      const response = await axios.post(
        `${configData.BASE_URL_TT}/locations`,
        locationData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating location:", error);
      throw error;
    }
  }

  static async updateLocation(locationId, locationData) {
    try {
      const response = await axios.put(
        `${configData.BASE_URL_TT}/locations/${locationId}`,
        locationData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating location:", error);
      throw error;
    }
  }

  static async deleteLocation(locationId) {
    try {
      const response = await axios.delete(
        `${configData.BASE_URL_TT}/locations/${locationId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting location:", error);
      throw error;
    }
  }
}

export { LocationServices };
