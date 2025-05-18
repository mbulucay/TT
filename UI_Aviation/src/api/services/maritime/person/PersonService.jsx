import axios from "axios";
import { configData } from "../../../../config";

// export const listPorts = () => {
//   return axios.get(configData.BASE_URL);
// };
// //same as upper
// export const listPorts2 = () => axios.get(configData.BASE_URL);

class PersonService {
  static async getAllPersons(token) {
    return await axios
      .get(`${configData.BASE_URL}/maritime-person-list`, {
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
  static async addPerson(portData, token) {
    try {
      const response = await axios.post(
        `${configData.BASE_URL}/maritime-person-list/create`,
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
  static async deletePerson(portId, token) {
    try {
      const response = await axios.delete(
        `${configData.BASE_URL}/maritime-person-list/delete/${portId}`,
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
  static async updatePerson(portId, portData, token) {
    try {
      const response = await axios.put(
        `${configData.BASE_URL}/maritime-person-list/update`,
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
  static async getPersonById(portId, token) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL}/maritime-person-list/get/${portId}`,
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

  static async getPersonByIdentification(token, identification_number) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL}/people-vessel-relations/get-person-details/${identification_number}`,
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

export { PersonService };
