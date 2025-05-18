import {
  TileLayer,
  FeatureGroup,
  Popup,
  MapContainer,
  useMapEvents,
  Marker,
} from "react-leaflet";
import L from "leaflet";
import XEditControl from "./XEditControl";
import { useState, useEffect } from "react";
import "leaflet-rotatedmarker";
import React from "react";
import { FaAnchor } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import { PortService } from "../../../../../api/services/maritime/ports/PortService";
import { useDispatch, useSelector } from "react-redux";
import CountrySelector from "../../../../shared/country_selector/CountrySelector";
import { AuthService } from "../../../../../api/auth/auth";
import { authDataAssign } from "../../../../../store/user/authSlice";

function PortsMap() {
  const [popupPosition, setPopupPosition] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  const [ports, setPorts] = useState([]);
  const dispatch = useDispatch();

  const { access_token, refresh_token } = useSelector((state) => state.auth);

  const handleRotate = () => {
    setRotationAngle((prevAngle) => (prevAngle + 45) % 360);
  };

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        // setState your coords here
        // coords exist in "e.latlng.lat" and "e.latlng.lng"

        setPopupPosition([e.latlng.lat, e.latlng.lng]);
        // handleRotate();
      },

      mousemove(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        setMousePosition([lat, lng]);
        // handleRotate();
        // console.log(mousePosition)
      },
    });

    // return (
    //   popupPosition && (
    //     <Popup position={popupPosition}>
    //       {`${popupPosition[0].toFixed(2)},
    //         ${popupPosition[1].toFixed(2)}`}
    //     </Popup>
    //   )
    // );
  };

  const mapStyles = {
    height: "105%", // Adjust the height as needed
    width: "103%", // Take up the full width of the container
  };

  const filterByCountry = (country_name) => {};

  const fetchPorts = async (country) => {
    try {
      const response = await PortService.getPortsByCountryCode(
        country,
        access_token
      );
      setPorts((prev) => response);
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
        console.error("An error occurred during portlistget:", error.message);
      }
    }
  };

  // useEffect(() => {
  //   fetchPorts("TR");
  // }, []);

  const updateMap = (selectedCountry) => {
    //console.log("SS", selectedCountry);
    fetchPorts(selectedCountry);
  };

  const generatePopUpContent = (item) => {
    return (
      <div id="popupcontent">
        <div className="bg-blue-200/50 rounded-md p-2 ring-2 ring-blue-400">
          Name: {item.portname} <br />
          Lat : {item.latitude && item.latitude.toPrecision(2)} <br />
          Lon : {item.latitude && item.longitude.toPrecision(2)} <br />
          Unlocode : {item.unlocode} <br />
          Type : {item.port_type} <br />
          Size : {item.port_size} <br />
          Terminal : {item.terminal} <br />
          Region : {item.region} <br />
          Tel : {item.telephone} <br />
          Addr : {item.address} <br />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 justify-center  w-full h-full bg-blue-900/75 p-2 rounded-lg">
      <CountrySelector updateMap={updateMap} />

      <div className="flex h-full w-full justify-center">
        <MapContainer
          center={[39.754815, 37.007378]}
          zoom={5.8}
          scrollWheelZoom={true}
          style={{
            height: "86%", // Adjust the height as needed
            width: "96%", // Take up the full width of the container
          }}
        >
          <TileLayer
            attribution="Triton Map"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></TileLayer>

          {ports.map((item, index) => (
            <Marker
              key={index}
              position={[item.latitude, item.longitude]}
              icon={L.divIcon({
                className: "custom-div-icon",
                html: ReactDOMServer.renderToString(
                  <div>
                    <FaAnchor
                      className="bg-transparent"
                      color="blue"
                      fontSize={18}
                    />
                  </div>
                ),
              })}
            >
              <Popup>{generatePopUpContent(item)}</Popup>
              {/* {item.latitude && item.longitude ? (
                <Popup>{generatePopUpContent(item)}</Popup>
              ) : (
                (() => {
                  console.error("Error: item.lat_lon is null", item);
                  return null;
                })()
              )} */}
            </Marker>
          ))}

          {/* <FeatureGroup>
            <XEditControl />
          </FeatureGroup> */}

          <MapEvents />
          {/* <>
            {popupPosition && (
              <Popup position={popupPosition}>
                {`Clicked: 
              ${popupPosition[0].toFixed(2)}, 
              ${popupPosition[1].toFixed(2)}`}
              </Popup>
            )}

            {mousePosition && (
              <Popup position={mousePosition}>
                {`Mouse: ${mousePosition[0].toFixed(
                  2
                )}, ${mousePosition[1].toFixed(2)}`}
              </Popup>
            )}
          </> */}
        </MapContainer>
      </div>
    </div>
  );
}

export default PortsMap;
