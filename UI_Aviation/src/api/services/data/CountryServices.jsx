import axios from "axios";
import { configData } from "../../../config";

class CountryServices {
  static async getCountries(token) {
    return await axios
      .get(`${configData.BASE_URL}/countries`, {
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

  static async getCountriesByPorts(token) {
    return await axios
      .get(`${configData.BASE_URL}/ports/countries-exist-ports`, {
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
}

export { CountryServices };
