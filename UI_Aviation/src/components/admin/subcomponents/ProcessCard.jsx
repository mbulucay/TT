import React, { useEffect, useState } from "react";
import { DashboardServices } from "../../../api/services/dashboard/DashboardServices";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { AuthService } from "../../../api/auth/auth";
import { authDataAssign } from "../../../store/user/authSlice";

function ProcessCard() {
  const [process_cpu_usage, setProcessCpuUsage] = useState(0.0);
  const [open_file, setOpenFile] = useState(0);
  const [start_time, setStartTime] = useState("");
  const [process_uptime, setProcessUptime] = useState(0.0);

  const { access_token, refresh_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchJvmDashboard = async () => {
    try {
      const cu = await DashboardServices.getProcessCpuUsage(access_token);
      const fo = await DashboardServices.getProcessFileOpen(access_token);
      const st = await DashboardServices.getProcessStartTime(access_token);
      const upt = await DashboardServices.getProcessUptime(access_token);
      const ut = upt.measurements[0].value;

      setProcessCpuUsage((prev) => cu.measurements[0].value * 100);
      setOpenFile((prev) => fo.measurements[0].value);
      setStartTime((prev) => st.measurements[0].value * 1000);
      const uph = Math.floor(ut / 3600);
      const remain = ut % 3600;
      const upm = Math.floor(remain / 60);
      const ups = Math.floor(remain % 60);
      setProcessUptime((prev) => `${uph}h-${upm}m-${ups}s`);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error(
          "Access forbidden. Check your credentials or permissions."
        );
        const response = await AuthService.updateAccessToken(refresh_token);
        if (response) {
          dispatch(
            authDataAssign({
              access_token: response?.access_token,
              refresh_token: response?.refresh_token,
              email: response?.email,
              role: response?.user_role,
              firstname: response?.user_firstname,
              lastname: response?.user_lastname,
            })
          );
        }
      } else {
        console.error("An error occurred AppCard get:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchJvmDashboard();
  }, [access_token]);

  return (
    <div>
      <Card
        header={"Process Properties"}
        data={{
          process_cpu_usage: `${process_cpu_usage.toPrecision(2)}%`,
          open_file: open_file,
          start_time: new Date(start_time).toUTCString(),
          process_uptime: process_uptime,
        }}
      />
    </div>
  );
}

export default ProcessCard;
