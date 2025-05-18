import {
  TileLayer,
  FeatureGroup,
  Popup,
  MapContainer,
  useMapEvents,
  Marker,
} from "react-leaflet";
import L from "leaflet";
// import XEditControl from "./XEditControl";
import { useState, useEffect } from "react";
import "leaflet-rotatedmarker";
import React from "react";
// import { TR_PORTS } from "../../../../data/port/port_tr";
import { FaAnchor } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";

function PortMap({ port }) {

  const [map_center, setMapCenter] = useState([]);

 /*  const [popupPosition, setPopupPosition] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);const handleRotate = () => {
    setRotationAngle((prevAngle) => (prevAngle + 45) % 360);
  };
  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        // setState your coords here
        // coords exist in "e.latlng.lat" and "e.latlng.lng"
        console.log(e);
        console.log(e.latlng.lat);
        console.log(e.latlng.lng);

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

    return (
      popupPosition && (
        <Popup position={popupPosition}>
          {`${popupPosition[0].toFixed(2)},
            ${popupPosition[1].toFixed(2)}`}
        </Popup>
      )
    );
  }; */

  const mapStyles = {
    height: "105%", // Adjust the height as needed
    width: "103%", // Take up the full width of the container
  };

  const generatePopUpContent = (port) => {
    return (
      <div id="popupcontent">
        <p>
          Name: {port.port_name} <br />
          Lat : {port.latitude} <br />
          Lon : {port.longitude} <br />
          un/lo Code : {port.unlocode} <br />
          Type : {port.port_type} <br />
          Size : {port.port_size} <br />
          Terminal : {port.terminal} <br />
          Region : {port.region} <br />
          Tel : {port.telephone} <br />
          Addr : {port.address} <br />
          Country Code : {port.country_code} <br />
          Organization: {port.maritimeCompanyOrganization}
        </p>
      </div>
    );
  };

  useEffect(() => {
    setMapCenter(prev => [port.latitude, port.longitude]);
  }, []);

  return (
    <div
      id="map"
      className="-translate-x-6 -translate-y-5 -p-10"
      style={mapStyles}
    >
      <MapContainer
        center={[port.latitude, port.longitude]}
        zoom={13}
        scrollWheelZoom={true}
        style={mapStyles}
      >
        <TileLayer
          attribution="Triton Map"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* {TR_PORTS.map((item, index) => ( */}
        <Marker
          //   key={index}
          position={[port.latitude, port.longitude]}
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
          <Popup>{generatePopUpContent(port)}</Popup>
        </Marker>
        {/* ))} */}
        <FeatureGroup>{/* <XEditControl /> */}</FeatureGroup>
        {/* <MapEvents /> */}
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
  );
}

export default PortMap;
