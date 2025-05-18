import axios from "axios";

import { configData } from "../../config";

class AuthService {
  static async register(userRegisterData) {
    try {
      const response = await axios.post(
        `${configData.BASE_URL}/api/v1/auth/register`,
        userRegisterData
      );

      return response.data; // Return response data
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error; // Rethrow the error for handling in the calling code
    }
  }

  static async login(userLoginData) {
    try {
      const response = await axios.post(
        `${configData.BASE_URL}/api/v1/auth/authenticate`,
        userLoginData
      );

      return response.data; // Return response data
    } catch (error) {
      console.error("Error logging in user:", error.message);
      throw error; // Rethrow the error for handling in the calling code
    }
  }

  static async logout(token) {
    return await axios
      .post(`${configData.BASE_URL}/api/v1/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.status;
      })
      .catch((error) => {
        console.log("Error logout", error);
      });
  }

  static async updateAccessToken(rtoken) {
    return await axios
      .post(`${configData.BASE_URL}/api/v1/auth/refresh-token`, null, {
        headers: {
          Authorization: `Bearer ${rtoken}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error logout", error);
      });
  }
}

export { AuthService };
