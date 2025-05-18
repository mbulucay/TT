import axios from "axios";
import { configData } from "../../../config";

class HttpRequestServices {
  static async getActiveUsers(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/activeusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching active users:", error);
        throw error;
      });
  }

  static async getRequestsCount(token) {
    return await axios
      .get(
        `${configData.BASE_URL}/user-activities/request-count-per-response`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching requests:", error);
        throw error;
      });
  }

  static async getRequestsCountbyUser(token, email) {
    return await axios
      .get(
        `${configData.BASE_URL}/user-activities/request-count-per-response-by-user/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching requests:", error);
        throw error;
      });
  }

  static async getRequestStatics(token) {
    return await axios
      .get(`${configData.BASE_URL}/user-activities/request-statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching requests:", error);
        throw error;
      });
  }

  static async getUserRequestByPage(email, page, size, token, sortColumn="timestamp", sortDirection="desc") {
    return await axios.get(
      `${configData.BASE_URL}/user-activities/get-by-user-email/${email}?page=${page-1}&size=${size}&sort=${sortColumn},${sortDirection}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export { HttpRequestServices };
