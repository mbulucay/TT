import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
// import { TileLayer, FeatureGroup, Popup, MapContainer } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewCoordinate,
  resetRoute,
  startRecord,
  stopRecord,
} from "../../../store/maritime/shipping/ShippingRouteSlice";
import { saveAs } from "file-saver";

function XEditControl({ parentState }) {
  const calculateArea = (layer) => {
    const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    return area;
  };

  const dispatch = useDispatch();
  const { route_record_state, route } = useSelector(
    (state) => state.shipping_route
  );

  // const [route_record_state, setRouteRecordState] = useState(false);
  // const [route, setRoute] = useState([]);

  const calculateLength = (layer) => {
    let length = 0;
    const latlngs = layer.getLatLngs();
    for (let i = 0; i < latlngs.length - 1; i++) {
      length += latlngs[i].distanceTo(latlngs[i + 1]);
    }
    return length;
  };

  const onCreate = (e) => {
    // console.log(e.layerType);

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
    /* e.layer.bindPopup(
      `<Popup>
        Outer Popup Content
        <br />
        Area: ${calculateArea(e.layer).toFixed(2)}
      </Popup>`
    ); */
    const length = calculateLength(e.layer);

    // Bind popup to display length
    e.layer.bindPopup(
      `<Popup>
        Outer Popup Content
        <br />
        Length: ${length.toFixed(2)} meters
      </Popup>`
    );
  };

  useEffect(() => {
    // if (route_record_state === true) {
    //   console.log("UPS", route);
    // } else {
    //   console.log("F", route);
    //   // save file with random id

    // }

    if (!route_record_state && route.length > 0) {
  
      // Generate a random 32-bit ID
      const randomId = Math.floor(Math.random() * Math.pow(2, 32)).toString(16);
  
      // Convert route data to JSON
      const jsonData = JSON.stringify(route);
  
      // Create a Blob with the JSON data
      const blob = new Blob([jsonData], { type: "application/json;charset=utf-8" });
  
      // Save the Blob as a file with a random ID
      saveAs(blob, `./custom/route_${randomId}.json`);
    }

  }, [route_record_state, route]);

  const handleDrawStop = (e) => {
    // console.log(e.layerType);
    if (e.layerType === "polyline") {
      dispatch(stopRecord());
    }
  };

  const handleDrawVertex = (e) => {
  };

  const handleDelete = (e) => {
    dispatch(resetRoute())
  };

  const handleMapClick = (e) => {
    // console.log(e);
    // console.log(e.latlng.lat);
    // console.log(e.latlng.lng);

    if (route_record_state) {
      const newRoute = [...route, [e.latlng.lat, e.latlng.lng]];
      dispatch(addNewCoordinate([e.latlng.lat, e.latlng.lng]));
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,

      mousemove(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Set the popup position and display it
        // setMousePosition([lat, lng]);
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

  useEffect(() => {
  }, [route]);

  return (
    <>
      <EditControl
        position="topleft"
        // onEdited={_onEditPath}
        onCreated={onCreate}
        // onDeleted={_onDeleted}
        onDrawStart={(e) => {
          if (e.layerType === "polyline") {
            dispatch(startRecord());
          }
        }}
        onDrawStop={handleDrawStop}
        onDrawVertex={handleDrawVertex}
        onDeleted={handleDelete}
        draw={{
          // polyline: false,
          polygon: false,
          rectangle: false,
          circle: false,
          marker: false,
          circlemarker: false,
        }}
      />
      <MapEvents />
    </>
  );
}

export default XEditControl;
