import axios from "axios";
import { configData } from "../../../../config";

class OrganizationVesselRelationService {
  static async createOrganizationVesselRelation(token, data) {

    return await axios
      .post(`${configData.BASE_URL}/company-vessel-relations/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error creating vessel crew relation:", error);
        throw error;
      });
  }

  static async getAllOrganizationVesselRelation(token) {
    return await axios
      .get(
        `${configData.BASE_URL}/company-vessel-relations`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error getting vessel crew relations:", error);
        throw error;
      });
  }

  static async getAllByCompanyImo(token, c_imo) {
    return await axios
      .get(
        `${configData.BASE_URL}/company-vessel-relations/companyimo-to-vesselimo/${c_imo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error getting vessel crew relations:", error);
        throw error;
      });
  }
}

export { OrganizationVesselRelationService };
