import React, { createContext, useContext, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Circle, MapContainer, TileLayer } from "react-leaflet";
import { Switch } from "@headlessui/react";
import DraggableMarker from "../components/Map/DraggableMarker";
import * as centers from "../assets/json/coordinates.json";
import "leaflet/dist/leaflet.css";
import clsx from "clsx";

export const MapContext = createContext(null);
export const useMap = () => useContext(MapContext);

const position = [-24.529569320671335, 134.20898437500003];

export function MapProvider({ children }) {
  const [toggleDialog, setToggleDialog] = useState(false);
  const [coords, setCoords] = useState({ lat: position[0], lng: position[1] });
  const [toggleHotspots, setToggleHotspots] = useState(false);

  useEffect(() => {
    const bodyTag = document.getElementsByTagName("body")[0];
    const htmlTag = document.getElementsByTagName("html")[0];
    bodyTag.className += "bg-gray-700";
    htmlTag.className += " pr-0";
  }, []);

  function togglePopup(newState) {
    setToggleDialog((toggleState) =>
      typeof newState === "undefined" ? !toggleState : newState
    );
  }

  return (
    <MapContext.Provider value={{ togglePopup, coords }}>
      <Dialog
        open={toggleDialog}
        onClose={() => setToggleDialog(false)}
        className="fixed z-10 flex items-center justify-center inset-0 overflow-y-auto p-7"
      >
        <Dialog.Overlay className="fixed w-full h-full inset-0 bg-black opacity-30" />
        <div className="relative bg-white w-full overflow-hidden h-full rounded-md grid grid-cols-5">
          <div className="col-span-2 p-10 flex flex-col">
            <div className="flex w-full items-center justify-between mb-14">
              <div>Latitude : {coords.lat}</div>
              <div>Longitude : {coords.lng}</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-8">Legend Toggles</h3>
              <Switch.Group
                as="div"
                className="flex items-center justify-between"
              >
                <span className="flex-grow flex flex-col">
                  <Switch.Label
                    as="span"
                    className="font-medium text-gray-900"
                    passive
                  >
                    Accident Hotspots
                  </Switch.Label>
                  <Switch.Description
                    as="span"
                    className="text-sm text-red-500"
                  >
                    Can performance impact on lower end devices
                  </Switch.Description>
                </span>
                <Switch
                  checked={toggleHotspots}
                  onChange={setToggleHotspots}
                  className={clsx(
                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                    {
                      "bg-indigo-600": toggleHotspots,
                      "bg-gray-200": !toggleHotspots,
                    }
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
                      {
                        "translate-x-5": toggleHotspots,
                        "translate-x-0": !toggleHotspots,
                      }
                    )}
                  />
                </Switch>
              </Switch.Group>
            </div>
            <div className="flex items-center justify-around mt-auto">
              <button
                onClick={() => {
                  setToggleHotspots(false);
                  setToggleDialog(false);
                }}
                className="inline-flex items-center px-24 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Close
              </button>
            </div>
          </div>
          <div className="col-span-3 h-full">
            <MapContainer
              preferCanvas
              className="h-full"
              center={position}
              zoom={4}
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <DraggableMarker
                onDrag={({ lat, lng }) => setCoords({ lat, lng })}
                position={position}
              />
              {!!centers &&
                toggleHotspots &&
                Object.keys(centers?.latitude).map((idx) => (
                  <Circle
                    key={idx}
                    pathOptions={{ color: "orange" }}
                    center={[centers.latitude[idx], centers.longitude[idx]]}
                    radius={200}
                  />
                ))}
            </MapContainer>
          </div>
        </div>
      </Dialog>
      {children}
    </MapContext.Provider>
  );
}
