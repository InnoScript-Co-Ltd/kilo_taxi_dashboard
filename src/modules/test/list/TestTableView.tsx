import * as L from "leaflet"; 
import "leaflet-routing-machine"; 
import { useEffect, useRef } from "react";
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported

const TestTableView = () => {
  const mapRef = useRef<HTMLDivElement>(null); // Reference to map container

  const startPoint: [number, number] = [16.825770, 96.130111];
  // const endPoint: [number, number] = [16.823408, 96.162849];
  const endPoint: [number, number] = [16.808771, 96.154487];

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView(startPoint, 13);

      // Add Tile Layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add Routing Control
      L.Routing.control({
        waypoints: [
          L.latLng(...startPoint), // Start point
          L.latLng(...endPoint),   // End point
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "red", weight: 5 }],
          extendToWaypoints: true,
          missingRouteTolerance: 10,
        },
      }).addTo(map);
    }
  }, [startPoint, endPoint]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default TestTableView;
