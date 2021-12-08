import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MapProvider } from "./context/MapProvider";

ReactDOM.render(
  <React.StrictMode>
    <MapProvider>
      <App />
    </MapProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
