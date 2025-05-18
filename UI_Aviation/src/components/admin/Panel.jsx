import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import UserList from "./UserList";
import Analysis from "./Analysis";

function Panel() {
  const [content, setContent] = useState("dashboard");

  useEffect(() => {
  }, [content]);

  return (
    <div>
      <TopBar setContent={setContent} />
      <div
        style={{
          transition: "background-color 1s",
          backgroundColor:
            content === "dashboard"
              ? "rgba(255, 255, 255, 0)"
              : "rgba(255, 255, 255, 1)",
        }}
      >
        {content === "dashboard" && <Dashboard />}
        {content === "users" && <UserList />}
        {content === "analysis" && <Analysis />}
      </div>
    </div>
  );
}

export default Panel;
