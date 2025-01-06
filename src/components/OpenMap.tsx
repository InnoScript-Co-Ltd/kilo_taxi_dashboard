import * as L from "leaflet";
import "leaflet-routing-machine"; // Ensure the routing plugin is imported
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const OpenMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null); // Reference to map instance
  const [waypoints, setWaypoints] = useState<L.LatLng[]>([]); // State to track waypoints
  const [totalDistance, setTotalDistance] = useState<number>(0); // State to track total distance

  const startPoint: [number, number] = [16.825770, 96.130111];
  const endPoint: [number, number] = [16.808771, 96.154487];

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView(startPoint, 13);
      mapInstanceRef.current = map; // Store the map instance in the ref

      // Add Tile Layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Initialize the waypoints
      const initialWaypoints = [L.latLng(...startPoint), L.latLng(...endPoint)];
      setWaypoints(initialWaypoints);

      // Add Routing Control
      const routingControl = (L as any).Routing.control({
        waypoints: initialWaypoints,
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "red", weight: 5 }],
        },
      }).addTo(map);

      // Listen for waypoint updates and update state
      routingControl.on("routesfound", (event: any) => {
        const newWaypoints = event.routes[0].waypoints;
        setWaypoints(newWaypoints);
        
        // Calculate the total distance
        let totalDistanceInMeters = 0;
        for (let i = 0; i < newWaypoints.length - 1; i++) {
          totalDistanceInMeters += newWaypoints[i].latLng.distanceTo(newWaypoints[i + 1].latLng);
        }
        setTotalDistance(totalDistanceInMeters / 1000); // Convert to kilometers
      });
    }
  }, []); // Empty dependency array ensures the map is initialized only once

  // Update the route dynamically when waypoints change
  useEffect(() => {
    if (mapInstanceRef.current) {
      // Create a new Routing control whenever waypoints change
      const routingControl = (L as any).Routing.control({
        waypoints: waypoints,
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "red", weight: 5 }],
        },
      }).addTo(mapInstanceRef.current);

      // Remove previous route if any
      if (mapInstanceRef.current.hasLayer(routingControl)) {
        mapInstanceRef.current.removeLayer(routingControl);
      }
    }
  }, [waypoints]); // Re-render whenever waypoints change

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
      <div>
        <h3>Total Distance: {totalDistance.toFixed(2)} km</h3>
      </div>
    </div>
  );
};

export default OpenMap;
