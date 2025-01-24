import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppRootState } from "../stores";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CurrentLocation = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const routingControlRef = useRef<any>(null);
  const signalLocation = useSelector(
    (state: AppRootState) => state.share.signal
  );

  const fetchCoordinatesFromAPI = async (location: any) => {
    return new Promise<[number, number][]>((resolve) =>
      setTimeout(() => {
        if (location?.lat && location?.long) {
          resolve([[location.lat, location.long]]);
        } else {
          resolve([]);
        }
      }, 1000)
    );
  };

  useEffect(() => {
    const fetchAndRenderMap = async () => {
      if (!signalLocation || !signalLocation.lat || !signalLocation.long) {
        console.error("No valid signal location data available.");
        return;
      }

      const apiCoordinates = await fetchCoordinatesFromAPI(signalLocation);
      if (apiCoordinates.length === 0) {
        console.error("Invalid coordinates returned from API.");
        return;
      }

      if (!mapInstanceRef.current) {
        // Initialize the map only if it's not already initialized
        const map = L.map(mapRef.current!).setView(apiCoordinates[0], 13);
        mapInstanceRef.current = map;

        // Add Tile Layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add Marker
        const marker = L.marker(apiCoordinates[0])
          .addTo(map)
          .bindPopup("Current Location")
          .openPopup();
        markerRef.current = marker;

        // Add Routing Machine
        const routingControl = L.Routing.control({
          waypoints: apiCoordinates.map(([lat, lng]) => L.latLng(lat, lng)),
          lineOptions: {
            styles: [{ color: "orange", weight: 5 }],
          },
          routeWhileDragging: true,
        }).addTo(map);

        routingControlRef.current = routingControl;

        routingControl.on("routesfound", (e: any) => {
          const route = e.routes[0];
          const distanceInKm = route.summary.totalDistance / 1000;
          setTotalDistance(distanceInKm);
        });
      } else {
        // Update existing marker and map
        const map = mapInstanceRef.current;
        const marker = markerRef.current;
        marker?.setLatLng(apiCoordinates[0]).bindPopup("Current Location");
        map.setView(apiCoordinates[0], 13);

        // Update Routing Control
        if (routingControlRef.current) {
          routingControlRef.current.setWaypoints(
            apiCoordinates.map(([lat, lng]) => L.latLng(lat, lng))
          );
        }
      }
    };

    fetchAndRenderMap();
  }, [signalLocation]);

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
      <div>
        <h3>Total Distance: {totalDistance.toFixed(2)} km</h3>
      </div>
    </div>
  );
};

export default CurrentLocation;
