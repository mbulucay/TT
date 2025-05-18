import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
// import { TileLayer, FeatureGroup, Popup, MapContainer } from "react-leaflet";

function XEditControl({ parentState }) {
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

  return (
    <EditControl
      position="topleft"
      // onEdited={_onEditPath}
      onCreated={onCreate}
      // onDeleted={_onDeleted}
      draw={{
        // polyline: false,
        // polygon: false,
        // rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
      }}
    />
  );
}

export default XEditControl;
