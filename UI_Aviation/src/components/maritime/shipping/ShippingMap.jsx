import {
  TileLayer,
  FeatureGroup,
  Popup,
  MapContainer,
  useMapEvents,
  Marker,
  Polyline,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import XEditControl from "./XEditControl";
import { useState, useEffect } from "react";
import "leaflet-rotatedmarker";
import React from "react";
import { useLeafletContext } from "@react-leaflet/core";
import { antPath } from "leaflet-ant-path";
import p1 from "./p1.json";
import p2 from "./p2.json";
import p3 from "./p3.json";

// import AntPath from "react-leaflet-ant-path";
// import MarkerClusterGroup from "react-leaflet-markercluster";
// import MarkerCluster from "react-leaflet-markercluster/src/react-leaflet-markercluster";
// import customIconUrl from "./icon/ship-trawler-icon.svg";
// import unknown_ship_icon_url from "./icon/Unknown_icon.svg";

function ShippingMap() {
  const [popupPosition, setPopupPosition] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleRotate = () => {
    setRotationAngle((prevAngle) => (prevAngle + 45) % 360);
  };

  const calculateArea = (layer) => {
    const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    return area;
  };

  const onCreate = (e) => {
    /* parentState("Printed in Child")
    const rectangleArea = e.layer.getArea(); // Assuming e.layer is a Rectangle
    Add the newly created shape layer to the state
    const newLayer = {
      id: e.layer._leaflet_id,
      type: e.layerType,
      geometry: e.layer.toGeoJSON().geometry,
    };

    switch (e.layerType) {
      case "Polygon":
        e.layer.bindPopup(
          `<Popup>
              Outer Popup Content
              <br />
              Area: ${calculateArea(e.layer).toFixed(2)}
            </Popup>`
        );
        break;
      case "Rectangle":
        e.layer.bindPopup(
          `<Popup>
              Outer Popup Content
              <br />
              Area: ${calculateArea(e.layer).toFixed(2)}
            </Popup>`
        );
      case "Circle":
          area = Math.PI * Math.pow(clickedLayer.geometry.coordinates[0][2], 2);
          break;
        default:
          break;
    } */
    e.layer.bindPopup(
      `<Popup>
        Outer Popup Content
        <br />
        Area: ${calculateArea(e.layer).toFixed(2)}
      </Popup>`
    );
  };

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        // setState your coords here
        // coords exist in "e.latlng.lat" and "e.latlng.lng"
        // console.log(e);
        // console.log(e.latlng.lat);
        // console.log(e.latlng.lng);

        setPopupPosition([e.latlng.lat, e.latlng.lng]);
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

  const generatePopUpContent = (item) => {
    return (
      <div id="popupcontent">
        <p>
          Name: {item.name} <br />
          Lat Lon : {item.lat_lon} <br />
          un/lo Code : {item.un_lo_code} <br />
          Type : {item.p_type} <br />
          Size : {item.p_size} <br />
          Terminal : {item.terminal} <br />
          Region : {item.region} <br />
          Tel : {item.tel} <br />
          Addr : {item.addr} <br />
        </p>
      </div>
    );
  };

  const antPathOptions = {
    delay: 400,
    dashArray: [20, 20],
    weight: 3,
    color: "#C8102E",
    pulseColor: "#00FFFF",
    paused: false,
    reverse: false,
    hardwareAccelerated: true,
  };

  const AntPath = (p) => {
    const context = useLeafletContext();
    useEffect(() => {
      let antPolyline = antPath(p.positions, p.options);
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

/*   const calculateLength = (positions) => {
    let length = 0;
    for (let i = 0; i < positions.length - 1; i++) {
      length += positions[i].distanceTo(positions[i + 1]);
    }
    return length;
  }; */

  function SwapPolyline({ positions }) {
    // Function to swap indices 0 and 1 within each coordinate pair
    const swapIndices = (coordinatePair) => {
      return [coordinatePair[1], coordinatePair[0]];
    };

    // Ensure polyline is defined before mapping
    if (!positions) return null;

    // Convert polyline with swapped indices
    const swappedPositions = positions.map((coordinatePair) =>
      swapIndices(coordinatePair)
    );

    // const length = calculateLength(swappedPositions);
    return (
      <Polyline positions={swappedPositions}>
        <Popup>
          Outer Popup Content
          {/* <br />
          Length: ${length.toFixed(2)} meters */}
        </Popup>
      </Polyline>
    );
  }

  return (
    <div
      id="map"
      className="relative -translate-x-6 -translate-y-8 -p-10 z-10"
      style={mapStyles}
    >
      <MapContainer
        center={[39.754815, 37.007378]}
        zoom={2.5}
        scrollWheelZoom={true}
        minZoom={2}
        maxBoundsViscosity={1}
      >
        <TileLayer
          attribution="Triton Map"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* {<AntPath positions={paths} options={antPathOptions} />} */}
        {/* <SwappedAntPath positions={path1} options={antPathOptions} />
        <SwappedAntPath positions={path3} options={antPathOptions} />
        <SwappedAntPath positions={path4} options={antPathOptions} />
        <AntPath positions={path2} options={antPathOptions} /> */}
        {p1.map((coordinateGroup, index) => (
          <SwapPolyline key={index} positions={coordinateGroup} />
          // <Polyline key={index} positions={coordinateGroup}/>
        ))}
        {p2.map((coordinateGroup, index) => (
          <SwapPolyline key={index} positions={coordinateGroup} />
          // <Polyline key={index} positions={coordinateGroup}/>
        ))}
        {p3.map((coordinateGroup, index) => (
          <SwapPolyline key={index} positions={coordinateGroup} />
          // <Polyline key={index} positions={coordinateGroup}/>
        ))}

        <FeatureGroup>
          <XEditControl />
        </FeatureGroup>
        {/* <MapEvents /> */}

        <>
          {popupPosition && (
            <Popup position={popupPosition}>
              {`Clicked Pos: 
                ${popupPosition[0].toFixed(2)}, 
                ${popupPosition[1].toFixed(2)}`}
            </Popup>
          )}

          {/* {mousePosition && (
            <Popup position={mousePosition}>
              {`Mouse: ${mousePosition[0].toFixed(
                2
              )}, ${mousePosition[1].toFixed(2)}`}
            </Popup>
          )} */}
        </>
      </MapContainer>
    </div>
  );
}

export default ShippingMap;
