import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as ReactLeaflet from "react-leaflet";
import { TileLayer } from "react-leaflet";

const { MapContainer, Marker, Popup } = ReactLeaflet;

type Props = {
  onMarkerChange: (lat: number, lng: number) => void;
};

const MapPicker: React.FC<Props> = ({ onMarkerChange }) => {
  return (
    <div className="w-full">
      <label
        htmlFor={"map"}
        className="mb-2 flex items-center gap-x-1 text-sm font-medium text-gray-600  "
      >
        <span>Selectionner la position</span>
        <span className="text-red-500">*</span>
      </label>
      <MapContainer
        id="map"
        className="z-10 h-[70vh] min-h-[30rem] w-full"
        center={[36.7538, 3.0588]}
        zoom={7}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker onMarkerChange={onMarkerChange} />
      </MapContainer>
    </div>
  );
};

export default MapPicker;

const center = {
  lat: 36.7538,
  lng: 3.0588,
};

const DraggableMarker: React.FC<{
  onMarkerChange: (lat: number, lng: number) => void;
}> = ({ onMarkerChange }) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onMarkerChange(
            (marker as any).getLatLng().lat,
            (marker as any).getLatLng().lng
          );
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  useEffect(() => {
    (async function init() {
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "/marker-icon.png",
        iconUrl: "/marker-icon.png",
      });
    })();
  }, []);
  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span className="cursor-pointer" onClick={toggleDraggable}>
          {draggable
            ? "Le marqueur est déplaçable"
            : "Cliquez ici pour rendre le marqueur déplaçable"}
        </span>
      </Popup>
    </Marker>
  );
};
