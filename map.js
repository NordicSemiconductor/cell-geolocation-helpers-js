import * as React from "./_snowpack/pkg/react.js";
import {createRoot} from "./_snowpack/pkg/react-dom/client.js";
import {Map} from "./Map/Map.js";
console.log("%c Cell Geolocation Helpers ", "background-color: #00a9ce; color: #ffffff; padding: 0.25rem;", "Source code:", "https://github.com/NordicSemiconductor/cell-geolocation-helpers-js");
const container = document.getElementById("map");
const root = createRoot(container);
root.render(/* @__PURE__ */ React.createElement(Map, null));
