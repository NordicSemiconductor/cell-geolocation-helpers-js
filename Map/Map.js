import L from "../_snowpack/pkg/leaflet.js";
import React, {useEffect, useRef, useState} from "../_snowpack/pkg/react.js";
import styled from "../_snowpack/pkg/styled-components.js";
import {cellFromGeolocations} from "../_dist_/cellFromGeolocations.js";
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
const marker = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41]
});
export const Map = () => {
  const [locations, setLocations] = useState([]);
  const cell = calculateCell(locations);
  const mapDiv = useRef(null);
  const mapRef = useRef();
  const cellLayerRef = useRef();
  const markerLayerRef = useRef();
  useEffect(() => {
    if (mapDiv.current === null)
      return;
    mapRef.current = L.map(mapDiv.current).setView([63.4210966, 10.4378928], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(mapRef.current);
    mapRef.current.on("click", (event) => {
      setLocations((loc) => [...loc, event.latlng]);
    });
    cellLayerRef.current = L.layerGroup().addTo(mapRef.current);
    markerLayerRef.current = L.layerGroup().addTo(mapRef.current);
    return () => {
      mapRef.current?.off();
      mapRef.current?.remove();
    };
  }, [mapDiv]);
  useEffect(() => {
    cellLayerRef.current?.clearLayers();
    if (cell === void 0 || cellLayerRef.current === void 0)
      return;
    L.circle([cell.lat, cell.lng], {radius: cell?.accuracy / 2}).addTo(cellLayerRef.current);
  }, [cell]);
  useEffect(() => {
    markerLayerRef.current?.clearLayers();
    if (markerLayerRef.current === void 0)
      return;
    for (const location of locations) {
      L.marker([location.lat, location.lng], {
        icon: marker
      }).addTo(markerLayerRef.current);
    }
  }, [locations]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    ref: mapDiv,
    style: {width: "100%", height: "100%"}
  }), /* @__PURE__ */ React.createElement(Button, {
    type: "button",
    onClick: () => setLocations([])
  }, "reset"));
};
