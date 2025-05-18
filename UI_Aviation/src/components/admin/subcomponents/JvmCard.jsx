import React, { useEffect, useState } from "react";
import { DashboardServices } from "../../../api/services/dashboard/DashboardServices";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { AuthService } from "../../../api/auth/auth";
import { authDataAssign } from "../../../store/user/authSlice";

function JvmCard() {
  const [max_mem, setMaxMem] = useState(0);
  const [used_mem, setUsedMem] = useState(0);
  const [thread_live, setThreadLive] = useState(0);
  const [thread_peak, setThreadPeak] = useState(0);

  const { access_token, refresh_token, role } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const fetchJvmDashboard = async () => {
    try {
      const mm = await DashboardServices.getJvmMaxMemory(access_token);
      const um = await DashboardServices.getJvmUsedMemory(access_token);
      const tl = await DashboardServices.getJvmThreadLive(access_token);
      const tp = await DashboardServices.getJvmThreadPeak(access_token);

      setMaxMem((prev) =>
        Math.floor(mm.measurements[0].value / (1024 * 1024 * 1024))
      );
      setUsedMem((prev) => um.measurements[0].value / (1024 * 1024 * 1024));
      setThreadLive((prev) => tl.measurements[0].value);
      setThreadPeak((prev) => tp.measurements[0].value);
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
    fetchJvmDashboard();
  }, [access_token]);

  return (
    <div>
      <Card
        header={"Jvm Properties"}
        data={{
          max_memory: `${max_mem} GB`,
          used_memory: `${used_mem.toPrecision(2)} GB`,
          thread_live: thread_live,
          thread_peak: thread_peak,
        }}
      />
    </div>
  );
}

export default JvmCard;
