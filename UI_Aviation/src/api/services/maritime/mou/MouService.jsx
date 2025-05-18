import axios from "axios";
import { configData } from "../../../../config";

class MouService {
  static async getAllMous(token) {
    return await axios
      .get(`${configData.BASE_URL}/vessel-detentions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching mou data:", error);
        throw error;
      });
  }
  static async addMou(portData, token) {
    try {
      const response = await axios.post(
        `${configData.BASE_URL}/vessel-detentions/create`,
        portData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding mou:", error);
      throw error;
    }
  }
  static async deleteMou(portId, token) {
    try {
      const response = await axios.delete(
        `${configData.BASE_URL}/vessel-detentions/delete/${portId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting mou:", error);
      throw error;
    }
  }
  static async updateMou(portId, portData, token) {
    try {
      const response = await axios.put(
        `${configData.BASE_URL}/vessel-detentions/update`,
        portData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating mou:", error);
      throw error;
    }
  }
  static async getMouById(portId, token) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL}/vessel-detentions/get/${portId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching mou:", error);
      throw error;
    }
  }
}

export { MouService };
