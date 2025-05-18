import React, { useEffect, useState } from "react";
import { DashboardServices } from "../../../api/services/dashboard/DashboardServices";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { AuthService } from "../../../api/auth/auth";
import { authDataAssign } from "../../../store/user/authSlice";

function ApplicationCard() {
  const [ready_time, setReadyTime] = useState(0.0);
  const [started_time, setStartedTime] = useState(0.0);
  const { access_token, refresh_token, role } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const fetchApplicationDashboard = async () => {
    try {
      const rt = await DashboardServices.getAppReadyTime(access_token);
      const st = await DashboardServices.getAppStartTime(access_token);

      setReadyTime((prev) => rt.measurements[0].value);
      setStartedTime((prev) => st.measurements[0].value);
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
    fetchApplicationDashboard();
  }, [access_token]);

  return (
    <div>
      <Card
        header={"Application Properties"}
        data={{ ready_time: `${ready_time} s`, boot_time: `${started_time} s` }}
      />
    </div>
  );
}

export default ApplicationCard;
