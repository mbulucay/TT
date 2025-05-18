import React, { useEffect } from "react";
import HeaderComponent from "./HeaderComponent";
import IhsList from "./IhsList";
import { useSelector } from "react-redux";
import PersonIhs from "./PersonIhs";
import VesselIhs from "./VesselIhs";
import CompanyIhs from "./CompanyIhs";
import PortIhs from "./PortIhs";

function Ihs() {
  const { active } = useSelector((state) => state.ihs_active);

  useEffect(() => {
  }, [active]);

  return (
    <div>
      <div className="relative z-10">
        <HeaderComponent />
      </div>
      <div className="relative z-10">
        {active === "company" && <CompanyIhs />}
        {active === "vessel" && <VesselIhs />}
        {active === "person" && <PersonIhs />}
        {active === "port" && <PortIhs />}
        {active === "data" && <IhsList />}
      </div>

      <div className="mt-3 bg-blue-100 p-8">
        The IHS Fairplay Application enables operators to access and process
        information about vessels, owners, managers, maritime companies and
        shipping companies from IHS Fairplay (formerly Lloyd's Fairplay) in
        order to validate merchant shipping data from unverified or external
        sources
      </div>
    </div>
  );
}

export default Ihs;
