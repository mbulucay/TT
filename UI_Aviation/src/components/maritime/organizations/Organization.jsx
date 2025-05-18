import React from "react";
import OrganizationList from "./OrganizationList";
import HeaderComponent from "./HeaderComponent";

function Organization() {
  return (
    <div className="">
      <div className="relative z-10">
        <HeaderComponent />
      </div>
      <div className="relative z-10">
        <OrganizationList />
      </div>
      <div className="mt-3 bg-blue-100 p-8">
        The Maritime Organizations Application enables operators to access
        information about maritime organizations in order to support enhanced
        Maritime Situational Awareness.
      </div>
    </div>
  );
}

export default Organization;
