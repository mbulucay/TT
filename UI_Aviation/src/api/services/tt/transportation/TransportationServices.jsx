import axios from "axios";
import { configData } from "../../../../config";

class TransportationServices {
  static async getAllTransportations() {
    return await axios
      .get(`${configData.BASE_URL_TT}/transportations`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching transportations:", error);
        throw error;
      });
  }

  static async getTransportationById(id) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL_TT}/transportations/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching transportation:", error);
      throw error;
    }
  }

  static async getTransportationsByType(type) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL_TT}/transportations/type/${type}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching transportations by type:", error);
      throw error;
    }
  }

  static async createTransportation(transportationData) {
    try {
      const response = await axios.post(
        `${configData.BASE_URL_TT}/transportations`,
        transportationData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating transportation:", error);
      throw error;
    }
  }

  static async updateTransportation(id, transportationData) {
    try {
      const response = await axios.put(
        `${configData.BASE_URL_TT}/transportations/${id}`,
        transportationData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating transportation:", error);
      throw error;
    }
  }

  static async deleteTransportation(id) {
    try {
      const response = await axios.delete(
        `${configData.BASE_URL_TT}/transportations/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting transportation:", error);
      throw error;
    }
  }
}

export { TransportationServices }; 