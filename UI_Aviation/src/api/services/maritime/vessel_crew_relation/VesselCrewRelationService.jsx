import axios from "axios";
import { configData } from "../../../../config";

class VesselCrewRelationService {
  // http://10.152.0.111:8088/people-vessel-relations/create
  static async createVesselCrewRelation(token, data) {

    return await axios
      .post(`${configData.BASE_URL}/people-vessel-relations/create`, data, {
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

  // http://10.152.0.111:8088/people-vessel-relations/delete/3722
  static async deleteVesselCrewRelation(token, id) {
    return await axios
      .delete(`${configData.BASE_URL}/people-vessel-relations/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error deleting vessel crew relation:", error);
        throw error;
      });
  }

  // http://10.152.0.111:8088/people-vessel-relations/update
  static async disableRelation(token, data) {
    return await axios
      .put(`${configData.BASE_URL}/people-vessel-relations/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error deleting vessel crew relation:", error);
        throw error;
      });
  }

  static async getAllVesselCrewRelations(token) {
    return await axios
      .get(`${configData.BASE_URL}/people-vessel-relations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error getting vessel crew relations:", error);
        throw error;
      });
  }

  static async getVesselImoCrewRelationsByPerson(token, identificationNumber) {
    return await axios
      .get(
        `${configData.BASE_URL}/people-vessel-relations/details-from-identification-number/${identificationNumber}`,
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
        console.error("Error getting vessel crew relations by person:", error);
        throw error;
      });
  }

  static async getCrewRelationByImo(token, imo) {
    return await axios
      .get(
        // asdasdasd
        `${configData.BASE_URL}/people-vessel-relations/details-from-imo/${imo}`,
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
        console.log("Error getting vessel crew relation by imo:", error);
      });
  }

  static async getVesselImoCrewRelationsByPersonWithDates(
    token,
    identificationNumber,
    startDate,
    endDate
  ) {
    return await axios
      .get(
        `${configData.BASE_URL}/people-vessel-relations/person-to-vessel-wd?identificationNumber=${identificationNumber}&startDate=${startDate}&endDate=${endDate}`,
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
        console.error(
          "Error getting vessel crew relations by person with dates:",
          error
        );
        throw error;
      });
  }
}

export { VesselCrewRelationService };
