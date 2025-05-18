import React, { useState } from "react";
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

function ShipDetailMap() {
  const [position, setPosition] = useState([]);
  const [popupPosition, setPopupPosition] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);
  const mapStyles = {
    height: "100%", // Adjust the height as needed
    width: "100%", // Take up the full width of the container
    display: "grid",
    placeItems: "center", // For modern browsers supporting `place-items`
    alignItems: "center", // For older browsers, specify `align-items` separately
    justifyContent: "center", // For older browsers, specify `justify-content` separately
  };

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        // setState your coords here
        // coords exist in "e.latlng.lat" and "e.latlng.lng"
        // console.log(e);
        // console.log(e.latlng.lat);
        // console.log(e.latlng.lng);

        // setPopupPosition([e.latlng.lat, e.latlng.lng]);
        // handleRotate();
      },

      mousemove(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Set the popup position and display it
        setMousePosition([lat, lng]);
        // handleRotate();
        // console.log(mousePosition)
      },
    });
  };

  return (
    <div id="map" className="translate-x-0 translate-y-0" style={mapStyles}>
      <MapContainer
        center={[39.754815, 37.007378]}
        zoom={5.8}
        scrollWheelZoom={true}
        style={mapStyles}
      >
        <TileLayer
          attribution='Triton Map'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />

        <Marker
          position={[39.754815, 37.007378]}
          // icon={<React.Fragment key={index}>{<FaAnchor/>}</React.Fragment>}
          icon={L.divIcon({
            className: "custom-div-icon",
            html: ReactDOMServer.renderToString(
              <div>
                <IoMdNavigate
                  className="bg-transparent"
                  color="blue"
                  fontSize={24}
                />
              </div>
            ),
          })}
        >
          <Popup>Ship</Popup>
        </Marker>

        <>
          {popupPosition && (
            <Popup position={popupPosition}>
              {`Clicked: 
              ${popupPosition[0].toFixed(2)}, 
              ${popupPosition[1].toFixed(2)}`}
            </Popup>
          )}
        </>
      </MapContainer>
    </div>
  );
}

export default ShipDetailMap;
