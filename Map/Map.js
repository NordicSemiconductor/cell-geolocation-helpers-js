import React, {useState} from "../_snowpack/pkg/react.js";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents
} from "../_snowpack/pkg/react-leaflet.js";
import styled from "../_snowpack/pkg/styled-components.js";
import {cellFromGeolocations} from "../_dist_/cellFromGeolocations.js";
import {isSome} from "../_snowpack/pkg/fp-ts/lib/Option.js";
import Leaflet from "../_snowpack/pkg/leaflet.js";
const Button = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
	border-radius: 4px;
	border: 0;
	padding: 0.5rem;
	font-family: sans-serif;
	background-color: #fff;
	z-index: 1000;
	margin: 5px;
`;
const calculateCell = cellFromGeolocations({
  minCellDiameterInMeters: 5e3,
  percentile: 0.9
});
const EventHandler = ({
  onClick
}) => {
  const map = useMapEvents({
    click: (event) => onClick({event, map})
  });
  return null;
};
export const Map = () => {
  const [locations, setLocations] = useState([]);
  const cell = calculateCell(locations);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(MapContainer, {
    center: [63.4210966, 10.4378928],
    zoom: 13
  }, /* @__PURE__ */ React.createElement(EventHandler, {
    onClick: ({event}) => {
      setLocations((loc) => [...loc, event.latlng]);
    }
  }), /* @__PURE__ */ React.createElement(TileLayer, {
    attribution: '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }), locations.map((location, i) => /* @__PURE__ */ React.createElement(Marker, {
    key: i,
    position: location,
    icon: Leaflet.icon({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12.5, 41]
    })
  })), isSome(cell) && /* @__PURE__ */ React.createElement(Circle, {
    center: cell.value,
    radius: cell.value.accuracy / 2
  })), /* @__PURE__ */ React.createElement(Button, {
    onClick: () => setLocations([])
  }, "reset"));
};
