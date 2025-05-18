import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Home from "./components/shared/other/Home.jsx";
import Layout from "./components/shared/layout/Layout.jsx";
import Login from "./components/shared/user/Login.jsx";
import Register from "./components/shared/user/Register.jsx";
import Person from "./components/maritime/person/Person.jsx";
import Ihs from "./components/maritime/ihs/Ihs.jsx";
import Lloyds from "./components/maritime/lloyds/Lloyds.jsx";
import Mou from "./components/maritime/mou/Mou.jsx";
import Msc from "./components/maritime/msc/Msc.jsx";
import Ports from "./components/maritime/ports/Ports.jsx";
import Shipping from "./components/maritime/shipping/Shipping.jsx";
import Organization from "./components/maritime/organizations/Organization.jsx";
import PersonAddForm from "./components/maritime/person/PersonAddForm.jsx";
import PortAddForm from "./components/maritime/ports/PortAddForm.jsx";
import MouAddForm from "./components/maritime/mou/MouAddForm.jsx";
import MscAddForm from "./components/maritime/msc/MscAddForm.jsx";
import ShipDetail from "./components/maritime/msc/ShipDetail.jsx";
import OrganizationAddForm from "./components/maritime/organizations/OrganizationAddForm.jsx";
import useAuth from "./hooks/useAuth.jsx";
import Panel from "./components/admin/Panel.jsx";
import PersonQuery from "./components/maritime/subdirectories/person/person_query/PersonQuery.jsx";
import CrewOperations from "./components/maritime/subdirectories/person/crew_operation/CrewOperations.jsx";
import VesselQuery from "./components/maritime/subdirectories/vessel/vessel_crew_records/VesselQuery.jsx";
import VesselOperations from "./components/maritime/subdirectories/vessel/vessel_operation/VesselOperations.jsx";
import OrganizationQuery from "./components/maritime/subdirectories/organization/organization_vessel_records/OrganizationQuery.jsx";
import Info from "./components/shared/app_pages/Info.jsx";
import PortsMap from "./components/maritime/subdirectories/port/map/PortsMap.jsx";
import Locations from "./components/tt/locations/Locations.jsx";

function App() {


  const auth = useAuth();

  // useEffect(() => {
  //   const clearLocalStorage = (event) => {
  //     // Check if the event's returnValue is not set
  //     if (!event.returnValue) {
  //       localStorage.clear();
  //     }
  //   };

  //   window.addEventListener('beforeunload', clearLocalStorage);

  //   return () => {
  //     window.removeEventListener('beforeunload', clearLocalStorage);
  //   };
  // }, []);

  return (
    <Routes>
      {/* Public routes */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}

      {/* App Routes */}
      {/* <Route path="/" element={auth ? <Layout /> : <Navigate to="/login" />}> */}
      <Route path="/" element={<Layout />}>

        <Route index={true} element={<Home />}></Route>

        <Route path="locations" element={<Locations />} />

        {/* <Route path="admin" element={<Panel />} />

        <Route path="person" element={<Person />} />
        <Route path="person/add" element={<PersonAddForm />} />
        <Route path="person/person-query" element={<PersonQuery />} />
        <Route path="person/crew-operations" element={<CrewOperations />} />

        <Route path="ihs" element={<Ihs />} />

        <Route path="lloyds" element={<Lloyds />} />

        <Route path="mou" element={<Mou />} />
        <Route path="mou/add" element={<MouAddForm />} />

        <Route path="msc" element={<Msc />} />
        <Route path="msc/ship/details/:id" element={<ShipDetail />} />
        <Route path="msc/add" element={<MscAddForm />} />
        <Route path="msc/vessel-query" element={<VesselQuery />} />
        <Route path="msc/vessel-operations" element={<VesselOperations />} />

        <Route path="ports" element={<Ports />}></Route>
        <Route path="ports/map" element={<PortsMap />} />
        <Route path="ports/add" element={<PortAddForm />} />

        <Route path="shipping" element={<Shipping />} />

        <Route path="organization" element={<Organization />} />
        <Route path="organization/add" element={<OrganizationAddForm />} />
        <Route
          path="organization/organization-query"
          element={<OrganizationQuery />}
        /> */}

        <Route path="info" element={<Info />} />
      </Route>

      {/* Catch All Routes */}
      <Route
        path="*"
        element={
          <h1 className="font-bold flex justify-center">Page Url Not Found</h1>
        }
      />
    </Routes>
  );
}

export default App;
