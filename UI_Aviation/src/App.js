import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Home from "./components/shared/other/Home.jsx";
import Layout from "./components/shared/layout/Layout.jsx";
import useAuth from "./hooks/useAuth.jsx";
import Info from "./components/shared/app_pages/Info.jsx";
import PortsMap from "./components/maritime/subdirectories/port/map/PortsMap.jsx";
import Locations from "./components/tt/locations/Locations.jsx";
import Transportation from "./components/tt/transportation/Transportation.jsx";
import AviationRoutes from "./components/tt/routes/AviationRoutes.jsx";
import LocationAddForm from "./components/tt/locations/LocationAddForm.jsx";
import TransportationAdd from "./components/tt/transportation/TransportationAdd";

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
        <Route path="locations/add" element={<LocationAddForm />} />

        <Route path="transportations" element={<Transportation />} />

        <Route path="transportations/add" element={<TransportationAdd />} />
        <Route path="routes" element={<AviationRoutes />} />

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
