import axios from "axios";
import { configData } from "../../../../config";

class OrganizationService {
  static async getAllOrganizations(token) {
    const response = await axios
      .get(`${configData.BASE_URL}/maritime-companies-organizations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });

    return response;
  }
  static async addOrganization(orgData, token) {
    try {
      const response = await axios.post(
        `${configData.BASE_URL}/maritime-companies-organizations/create`,
        orgData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding organization:", error);
      throw error;
    }
  }
  static async deleteOrganization(orgId, token) {
    try {
      const response = await axios.delete(
        `${configData.BASE_URL}/maritime-companies-organizations/delete/${orgId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting organization:", error);
      throw error;
    }
  }
  static async updateOrganization(orgId, orgData, token) {
    try {
      const response = await axios.put(
        `${configData.BASE_URL}/maritime-companies-organizations/update`,
        orgData,
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
  static async getOrganizationById(orgId, token) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL}/maritime-companies-organizations/get/${orgId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching org:", error);
      throw error;
    }
  }

  static async getOrganizationByImo(orgImo, token) {
    try {
      const response = await axios.get(
        `${configData.BASE_URL}/maritime-companies-organizations/companyimo-to-companies/${orgImo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching org:", error);
      throw error;
    }
  }
}

export { OrganizationService };
