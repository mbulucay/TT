import axios from "axios";
import { configData } from "../../../config";

class DashboardServices {
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

  static async getRequests(token, page = 1, perPage = 10, sortColumn="timestamp", sortDirection="desc") {
    return await axios
      .get(`${configData.BASE_URL}/user-activities?page=${page-1}&size=${perPage}&sort=${sortColumn},${sortDirection}`, {
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

  static async getHealth(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/health`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching health:", error);
        throw error;
      });
  }

  static async getAppReadyTime(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/application.ready.time`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching application.ready.time:", error);
        throw error;
      });
  }

  static async getAppStartTime(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/application.started.time`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching application.started.time:", error);
        throw error;
      });
  }

  static async getJvmMaxMemory(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/jvm.memory.max`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching jvm.memory.max:", error);
        throw error;
      });
  }

  static async getJvmUsedMemory(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/jvm.memory.used`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching jvm.memory.used:", error);
        throw error;
      });
  }

  static async getJvmThreadLive(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/jvm.threads.live`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching jvm.threads.live:", error);
        throw error;
      });
  }

  static async getJvmThreadPeak(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/jvm.threads.peak`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching jvm.threads.peak:", error);
        throw error;
      });
  }

  static async getProcessCpuUsage(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/process.cpu.usage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching process.cpu.usage:", error);
        throw error;
      });
  }

  static async getProcessFileOpen(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/process.files.open`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching process.files.open:", error);
        throw error;
      });
  }

  static async getProcessStartTime(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/process.start.time`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching process.start.time:", error);
        throw error;
      });
  }

  static async getProcessUptime(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/process.uptime`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching process.uptime:", error);
        throw error;
      });
  }

  static async getSystemCpuUsage(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/system.cpu.usage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching system.cpu.usage:", error);
        throw error;
      });
  }

  static async getSystemCpuCount(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/system.cpu.count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching system.cpu.count:", error);
        throw error;
      });
  }

  static async getSystemLoadAvg(token) {
    return await axios
      .get(`${configData.BASE_URL}/actuator/metrics/system.load.average.1m`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching system.load.average.1m:", error);
        throw error;
      });
  }
}

export { DashboardServices };
