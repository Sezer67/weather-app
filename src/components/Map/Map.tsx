import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useGeolocated } from "react-geolocated";

import { icons } from "../../constants";
import * as mapConfig from "../../configs/map/map.config";
import { LocationType } from "../../types/map.type";
import { Spin } from "antd";
import { TWeather } from "../../types/WeatherState";
import { useAppDispatch } from "../../redux/hook";
import { getByLocation } from "../../redux/service/api-request.service";
import { addQueryToUrl } from "../../helpers/url.helpers";
import { baseUrl } from "../../configs/url/api-url.config";

const icon = L.icon({
  iconUrl: icons.marker,
  iconSize: [36, 36],
});

type PropType = {
  setLocationData: React.Dispatch<React.SetStateAction<TWeather | undefined>>;
  coordinates: LocationType;
  setCoordinates: React.Dispatch<React.SetStateAction<LocationType>>;
};

const Map: React.FC<PropType> = ({
  setLocationData,
  coordinates,
  setCoordinates,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (coordinates) {
      getByLocation(
        addQueryToUrl(
          { q: `${coordinates.latitude},${coordinates.longitude}`, aqi: "no" },
          baseUrl
        )
      ).then((res) => {
        const { data } = res;
        delete data.current.condition.code;
        const weather: Omit<TWeather, "forecast"> = {
          condition: data.current.condition,
          region: data.location.region,
          country: data.location.country,
          feelslike: data.current.feelslike_c,
          lastUpdated: data.current.last_updated,
          name: data.location.name,
          temperature: data.current.temp_c,
          windKph: data.current.wind_kph,
        };
        setLocationData(weather);
      });
    }
  }, [coordinates]);

  if (!coordinates) return <Spin tip="Loading..." />;

  const HandleClickMap: React.FC = () => {
    const map = useMapEvents({
      click: (e: L.LeafletMouseEvent) => {
        map.locate();
        map.flyTo(e.latlng, map.getZoom() + 1 > 12 ? 12 : map.getZoom() + 1);
        setCoordinates({
          latitude: e.latlng?.lat,
          longitude: e.latlng?.lng,
        });
      },
    });
    return null;
  };

  return (
    <MapContainer
      style={{ width: "100%", height: "100%" }}
      center={[coordinates.latitude, coordinates.longitude]}
      zoom={mapConfig.zoom}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=hcxOLb2b4aUOex6XyZsQ"
      />
      <HandleClickMap />
      <Marker
        position={[coordinates.latitude, coordinates.longitude]}
        icon={icon}
      >
        <Popup>You are here!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
