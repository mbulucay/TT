import axios from "axios";
import { configData } from "../../../../config";

// export const listPorts = () => {
//   return axios.get(configData.BASE_URL);
// };
// //same as upper
// export const listPorts2 = () => axios.get(configData.BASE_URL);

class PortService {
  static async getAllPorts(token) {
    return await axios
      .get(`${configData.BASE_URL}/ports`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  }
  static async addPort(portData, token) {
    try {
      const response = await axios.post(
        `${configData.BASE_URL}/ports/create`,
        portData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding port:", error);
      throw error;
    }
  }
  static async deletePort(portId, token) {
    try {
      const response = await axios.delete(
        `${configData.BASE_URL}/ports/delete/${portId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting port:", error);
      throw error;
    }
  }
  static async updatePort(portId, portData, token) {
    try {
      const response = await axios.put(
        `${configData.BASE_URL}/ports/update`,
        portData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating port:", error);
      throw error;
    }
  }
  static async getPortById(portId, token) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL}/ports/get/${portId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching port:", error);
      throw error;
    }
  }

  static async getPortByUnlocode(unlocde, token) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL}/ports/unlocode-to-ports/${unlocde}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching port:", error);
      throw error;
    }
  }

  static async getPortsByCountry(country, token) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL}/ports/country-to-ports/${country}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching port:", error);
      throw error;
    }
  }

  static async getPortsByCountryCode(country_code, token) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL}/ports/countrycode-to-ports/${country_code}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching port:", error);
      throw error;
    }
  }

}

export { PortService };
