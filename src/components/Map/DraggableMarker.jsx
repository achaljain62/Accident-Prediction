import React, { useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";

const DraggableMarker = ({ onDrag, position: initialPos, ...others }) => {
  const [position, setPosition] = useState(initialPos);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPositions = marker.getLatLng();
          setPosition(newPositions);
          if (onDrag) onDrag(newPositions);
        }
      },
    }),
    []
  );

  return (
    <Marker
      {...others}
      draggable={true}
      eventHandlers={eventHandlers}
      position={initialPos}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span>{`${position.lat}, ${position.lng}`}</span>
      </Popup>
    </Marker>
  );
};

export default DraggableMarker;
