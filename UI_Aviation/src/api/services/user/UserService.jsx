import axios from "axios";
import { configData } from "../../../config";

// export const listPorts = () => {
//   return axios.get(configData.BASE_URL);
// };
// //same as upper
// export const listPorts2 = () => axios.get(configData.BASE_URL);

class UserService {
  static async getUsers(token) {
    return await axios
      .get(`${configData.BASE_URL}/users`, {
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
}

export { UserService };
