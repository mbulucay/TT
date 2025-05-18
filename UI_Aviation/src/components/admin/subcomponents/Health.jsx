import React, { useEffect, useState } from "react";
import { DashboardServices } from "../../../api/services/dashboard/DashboardServices";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { AuthService } from "../../../api/auth/auth";
import { authDataAssign } from "../../../store/user/authSlice";

function Health() {
  const [health, setHealth] = useState({});
  const { access_token, refresh_token, role } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const fetchHealth = async () => {
    try {
      const response = await DashboardServices.getHealth(access_token);
      setHealth((prev) => response.components.diskSpace.details);
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
        console.error("An error occurred Healt get:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchHealth();
  }, [access_token]);

  const data = [
    {
      value: bytesToGB(health.total - (health.free + health.threshold)),
      label: "Used",
      color: "orange",
    },
    {
      value: bytesToGB(health.free),
      label: "Free",
      color: "turquoise",
    },
    // {
    //   value: bytesToGB(health.threshold),
    //   label: "Threshold",
    //   color: "green",
    // },
  ];

  const size = {
    width: 400,
    height: 275,
  };

  function bytesToGB(bytes) {
    // Check if bytes is a valid number
    if (typeof bytes !== "number" || isNaN(bytes)) {
      return "Invalid input";
    }

    // Convert bytes to gigabytes
    return (bytes / (1024 * 1024 * 1024)).toFixed(2);
  }

  function calPercentage(total, bite) {
    return ((total - bite) / total) * 100;
  }

  return (
    <div className="">
      <div className="flex bg-blue-300 rounded-md hover:bg-blue-400 duration-200 ">
        <span className="m-2 font-mono font-extrabold text-xl">Disk Usage</span>
      </div>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value}) GB`,
            arcLabelMinAngle: 5,
            data,
            paddingAngle: 2,
            cornerRadius: 3,
            innerRadius: 60,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
        {...size}
      >
        <PieCenterLabel>
          {calPercentage(health.total, health.free).toFixed(2)}%
        </PieCenterLabel>
      </PieChart>
    </div>
  );
}

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
  fontWeight: "bold",
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default Health;
