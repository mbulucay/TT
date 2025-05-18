import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ImageDisplay from "../../maritime/msc/ImageDisplay";
import {
  TileLayer,
  FeatureGroup,
  Popup,
  MapContainer,
  useMapEvents,
  Marker,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { IoMdNavigate } from "react-icons/io";
import { MscService } from "../../../api/services/maritime/msc/MscService";
import { VesselCrewRelationService } from "../../../api/services/maritime/vessel_crew_relation/VesselCrewRelationService";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FiInfo } from "react-icons/fi";
import path from "./path.json";
import { antPath } from "leaflet-ant-path";
import { useLeafletContext } from "@react-leaflet/core";

function Home() {
  const user_data = useSelector((state) => state.auth);

  const [center, setCenter] = useState([40.710791, 28.660491]);

  const [borderCoordinate, setBorderCoordinate] = useState({
    left_bottom: [39.536409, 25.878986],
    right_top: [41.720649, 30.273517],
  });

  const [connection, setConnection] = useState(null);

  const [imo, setImo] = useState(9893979);
  const [vessel_info, setVesselInfo] = useState({});
  const [crew_info, setCrewInfo] = useState([]);

  const mapStyles = {
    height: "88%", // Adjust the height as needed
    width: "98%", // Take up the full width of the container
  };
  const url = "wss://stream.aisstream.io/v0/stream";
  const API_KEY = "37d2bbb48c24fbe963c5791c3ef4b5eef0a06fe8";

  /*   useEffect(() => {
    connection = new WebSocket(url);
    setConnection(connection);
    return () => connection.close();
  }, []); */

  const [ships, setShips] = useState([]);

  const fetchVesselInfo = async () => {
    try {
      const response = await MscService.getMscByImo(
        imo,
        user_data.access_token
      );
      setVesselInfo(response);
    } catch (error) {
      console.error("Error fetching vessel info:", error);
    }
  };

  const fetchCrewInfo = async () => {
    try {
      const response = await VesselCrewRelationService.getCrewRelationByImo(
        user_data.access_token,
        imo
      );
      setCrewInfo(response.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error("Error fetching crew info:", error);
    }
  };

  useEffect(() => {
    fetchVesselInfo();
    fetchCrewInfo();
  }, []);

  // useEffect(() => {
  //   const fetchShips = async () => {
  //     try {
  //       console.log("asdasd");
  //       const response = await axios.get(
  //         "https://stream.aisstream.io/v0/stream",
  //         {
  //           APIkey: API_KEY,
  //           BoundingBoxes: [
  //             [
  //               [-11.0, 104.0],
  //               [2.0, 126.0],
  //             ],
  //           ],
  //         }
  //       );
  //       console.log("asdasd", response);
  //       setShips(response.data);
  //     } catch (error) {
  //       console.error("Error fetching ships:", error);
  //     }
  //   };

  //   const interval = setInterval(fetchShips, 10000); // Fetch data every 5 seconds

  //   return () => clearInterval(interval); // Cleanup interval
  // }, []); // Empty dependency array ensures this effect runs only once

  const antPathOptions = {
    delay: 1000,
    dashArray: [20, 60],
    weight: 6,
    color: "0C356A",
    pulseColor: "#0000FF",
    paused: false,
    reverse: false,
    hardwareAccelerated: true,
  };

  const AntPath = (p) => {
    const context = useLeafletContext();
    useEffect(() => {
      let antPolyline = antPath(p.positions, p.options);
      antPolyline.bindPopup("Pasaport Vapur Iskelesi - Sochi Port ");
      antPolyline.on("click", function (e) {
        // console.log("AntPath clicked", e);
      });
      context.map.addLayer(antPolyline);
      return () => {
        context.map.removeLayer(antPolyline);
      };
    });
    return null;
  };

  function SwappedAntPath({ positions, options }) {
    // Function to swap indices 0 and 1 within each coordinate pair
    const swapIndices = (coordinatePair) => {
      return [coordinatePair[1], coordinatePair[0]];
    };

    // Ensure positions is defined before mapping
    if (!positions) return null;

    // Convert positions with swapped indices
    const swappedPositions = positions.map((coordinatePair) =>
      swapIndices(coordinatePair)
    );

    return <AntPath positions={swappedPositions} options={options} />;
  }

  const [visible, setVisible] = useState(false);
  return (
    <div className="flex-col gap-5 w-full h-full  bg-blue-200 relative">
      <div className="flex justify-start gap-5 w-full p-4 bg-gradient-to-b from-blue-700 to-blue-200 rounded-lg">
        <span className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
          Center Coordinate: {center.join(", ").replace(/,/g, ", ")}
        </span>
        <span className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
          Left Bottom Coordinate:{" "}
          {borderCoordinate.left_bottom.join(", ").replace(/,/g, ", ")}
        </span>
        <span className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
          Right Top Coordinate:{" "}
          {borderCoordinate.right_top.join(", ").replace(/,/g, ", ")}
        </span>
        <span className="flex-grow"></span>
        <span className="block tracking-wide text-white text-xs font-semibold mb-1 text-left ml-2">
          Live Data: Ais Stream
        </span>
      </div>
      <div className="pt-3 flex justify-center space-y-5 rounded-lg">
        <MapContainer
          center={center}
          zoom={5.7}
          scrollWheelZoom={true}
          style={mapStyles}
        >
          <TileLayer
            attribution="Triton Map"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <AntPath positions={path} options={antPathOptions} />

          <Marker
            position={[43.4310746, 37.243652]}
            // icon={<React.Fragment key={index}>{<FaAnchor/>}</React.Fragment>}
            icon={L.divIcon({
              className: "custom-div-icon",
              html: ReactDOMServer.renderToString(
                <div className="rotate-90">
                  <IoMdNavigate
                    className="bg-transparent"
                    color="blue"
                    fontSize={32}
                  />
                </div>
              ),
            })}
            eventHandlers={{
              click: (e) => {
                setVisible(true);
              },
            }}
          >
            <ConfirmDialog
              group="declarative"
              visible={visible}
              onHide={() => setVisible(false)}
              header="Vessel Information"
              icon="pi pi-exclamation-triangle"
              content={({ hide }) => (
                <div className="bg-gradient-to-b from-blue-800 to-white p-4 rounded-3xl">
                  <div className="flex justify-around p-4 gap-2 bg-blue-200 rounded-2xl">
                    <div className="h-56 w-72 p-1 shadow-xl bg-white">
                      <ImageDisplay image_url={vessel_info.images} />
                      <div className="w-full text-center mt-2 font-extrabold">
                        {vessel_info.imo}
                      </div>
                    </div>
                    <div className="whitespace-nowrap">
                      <span className=" font-bold ">
                        {vessel_info.ship_name}
                      </span>
                      <br></br>
                      <span className="font-semibold">
                        {vessel_info.flag_name}
                      </span>
                      <br></br>
                      <span className="font-semibold">{vessel_info.imo}</span>
                      <br></br>
                      <span className="font-semibold">{vessel_info.mmsi}</span>
                      <br></br>
                      <span className="font-semibold">Izmir - Soçi Сочи</span>
                      <br></br>
                      <br></br>
                      <span className="font-semibold">
                        {vessel_info.ship_type} - {vessel_info.years_of_build}
                      </span>
                      <br></br>
                      <span className="">
                        {vessel_info.width}m x {vessel_info.length}m
                      </span>
                      <br></br>
                      <span className="">{vessel_info.deadweight} DWT</span>
                      <br></br>
                    </div>
                  </div>

                  <div className="overflow-hidden ml-10 m-2">
                    <div className="max-h-60 overflow-y-auto">
                      <table className="min-w-full divide-y-2 divide-blue-800/50 text-sm whitespace-nowrap">
                        <thead>
                          <tr>
                            <th className="px-2 py-1">Id</th>
                            <th className="px-2 py-1">Name</th>
                            <th className="px-2 py-1">Identification Number</th>
                            <th className="px-2 py-1">Start Date</th>
                            <th className="px-2 py-1">End Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-800/50">
                          {crew_info.map((crew, index) => (
                            <tr key={index}>
                              <td className="px-2 py-1">{crew.id}</td>
                              <td className="px-2 py-1">
                                {crew.personname} {crew.personsurname}
                              </td>
                              <td className="px-2 py-1">
                                {crew.identification_number}
                              </td>
                              <td className="px-2 py-1">{crew.start_date}</td>
                              <td className="px-2 py-1">{crew.end_date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex w-full justify-center">
                    <Button
                      label="Close"
                      onClick={(e) => hide(e)}
                      text
                      className="p-3 w-8/12 text-primary-50 hover:text-white 
                      border-1 mt-2 border-blue-500/100 rounded-lg text-xl
                      border-white-alpha-30 hover:bg-white-alpha-10 duration-100
                      bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800
                      hover:bg-gradient-to-br focus:shadow-outline focus:outline-none"
                    ></Button>
                  </div>
                </div>
              )}
            />

            {/* <Popup
              className="request-popup"
              style={{ backgroundColor: "black" }}
            >
              <div>
                <div className="flex p-4 gap-2 bg-blue-200 rounded-2xl">
                  <div className="w-176 p-1 shadow-xl bg-white">
                    <ImageDisplay image_url={vessel_info.images} />
                    <div className="w-full text-center mt-2 font-extrabold">
                      {vessel_info.imo}
                    </div>
                  </div>
                  <div className="whitespace-nowrap">
                    <span className=" font-bold ">{vessel_info.ship_name}</span>
                    <br></br>
                    <span className="font-semibold">
                      {vessel_info.flag_name}
                    </span>
                    <br></br>
                    <span className="font-semibold">
                      MMSI: {vessel_info.mmsi}
                    </span>
                    <br></br>
                    <br></br>
                    <span className="font-semibold">
                      {vessel_info.ship_type} - {vessel_info.years_of_build}
                    </span>
                    <br></br>
                    <span className="">
                      {vessel_info.width}m x {vessel_info.length}m
                    </span>
                    <br></br>
                    <span className="">{vessel_info.deadweight} DWT</span>
                    <br></br>
                  </div>
                </div>

                <div className="overflow-hidden ml-10 m-2">
                  <div className="max-h-60 overflow-y-auto">
                    <table className="min-w-full divide-y-2 divide-blue-800/50 text-sm whitespace-nowrap">
                      <thead>
                        <tr>
                          <th className="px-2 py-1">Name</th>
                          <th className="px-2 py-1">Identification Number</th>
                          <th className="px-2 py-1">Start Date</th>
                          <th className="px-2 py-1">End Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-800/50">
                        {crew_info.map((crew, index) => (
                          <tr key={index}>
                            <td className="px-2 py-1">
                              {crew.personname} {crew.personsurname}
                            </td>
                            <td className="px-2 py-1">
                              {crew.identification_number}
                            </td>
                            <td className="px-2 py-1">{crew.start_date}</td>
                            <td className="px-2 py-1">{crew.end_date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Popup> */}
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default Home;
