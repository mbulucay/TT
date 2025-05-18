import React, { useEffect, useState } from "react";
import { DashboardServices } from "../../../api/services/dashboard/DashboardServices";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { AuthService } from "../../../api/auth/auth";
import { authDataAssign } from "../../../store/user/authSlice";

function SystemCard() {
  const [cpu_usage, setCpuUsage] = useState(0.0);
  const [cpu_count, setCpuCount] = useState(0);
  const [load_average, setLoadAverage] = useState(0);

  const { access_token, refresh_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchSystemDashboard = async () => {
    try {
      const cu = await DashboardServices.getSystemCpuUsage(access_token);
      const cc = await DashboardServices.getSystemCpuCount(access_token);
      const la = await DashboardServices.getSystemLoadAvg(access_token);

      setCpuUsage((prev) => cu.measurements[0].value * 100);
      setCpuCount((prev) => cc.measurements[0].value);
      setLoadAverage((prev) => la.measurements[0].value);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error(
          "Access forbidden. Check your credentials or permissions."
        );
        // const response = await AuthService.updateAccessToken(refresh_token);
        // if (response) {
        //   dispatch(
        //     authDataAssign({
        //       access_token: response?.access_token,
        //       refresh_token: response?.refresh_token,
        //       email: response?.email,
        //       role: response?.user_role,
        //       firstname: response?.user_firstname,
        //       lastname: response?.user_lastname,
        //     })
        //   );
        // }
      } else {
        console.error("An error occurred AppCard get:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchSystemDashboard();
  }, [refresh_token]);

  return (
    <div>
      <Card
        header={"System Properties"}
        data={{
          cpu_usage: `${cpu_usage.toPrecision(2)}%`,
          cpu_count: cpu_count,
          load_average: load_average.toPrecision(2),
        }}
      />
    </div>
  );
}

export default SystemCard;
