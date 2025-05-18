import axios from "axios";

import { configData } from "../../../../config";

class MscService {
  static async getAllMsc(token) {
    return await axios
      .get(`${configData.BASE_URL}/vessel-information`, {
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

  static async getMscByPage(page, size, token) {
    return await axios
      .get(
        `${configData.BASE_URL}/vessel-information/pageable?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  }

  static async addMsc(mscData, token) {
    try {
      const response = await axios.post(
        `${configData.BASE_URL}/vessel-information/create`,
        mscData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding msc:", error);
      throw error;
    }
  }

  static async deleteMsc(mscId, token) {
    try {
      const response = await axios.delete(
        `${configData.BASE_URL}/vessel-information/delete/${mscId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting msc:", error);
      throw error;
    }
  }

  static async updateMsc(mscId, mscData, token) {
    try {
      const response = await axios.put(
        `${configData.BASE_URL}/vessel-information/update/${mscId}`,
        mscData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating msc:", error);
      throw error;
    }
  }

  static async getMscById(mscId, token) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL}/vessel-information/get/${mscId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching msc:", error);
      throw error;
    }
  }

  static async getMscImage(token, image_url) {
    return await axios
      .get(`${configData.BASE_URL}/image/${image_url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer",
      })
      .then((response) => response)
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  }

  static async getMscByImo(imo, token) {
    return await axios
      .get(
        `${configData.BASE_URL}/people-vessel-relations/imo-to-vessel-information/${imo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  }
}

export { MscService };
