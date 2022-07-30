import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import { icons } from "../../constants";

const icon = L.icon({
    iconUrl:icons.marker,
    iconSize:[36,36]
})

const Map = () => {
  return (
    <MapContainer style={{width:'100%',height:'100%'}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=hcxOLb2b4aUOex6XyZsQ"
      />
      <Marker position={[51.505, -0.09]} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
