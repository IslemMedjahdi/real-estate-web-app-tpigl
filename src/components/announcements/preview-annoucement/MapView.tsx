import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import * as ReactLeaflet from "react-leaflet";
import { TileLayer } from "react-leaflet";

const { MapContainer, Marker } = ReactLeaflet;

type Props = {
  lat: number;
  lng: number;
};

const MapView: React.FC<Props> = ({ lat, lng }) => {
  useEffect(() => {
    (async function init() {
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "/marker-icon.png",
        iconUrl: "/marker-icon.png",
      });
    })();
  }, []);

  return (
    <div className="w-full">
      <h1 className="font-serif text-lg font-bold text-gray-900">Map :</h1>
      <MapContainer
        id="map"
        className="z-10 mt-2  aspect-video w-full shadow"
        center={[lat, lng]}
        zoom={7}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={{ lat, lng }} />
      </MapContainer>
    </div>
  );
};

export default MapView;
