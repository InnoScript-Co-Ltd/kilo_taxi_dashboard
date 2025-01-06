import * as L from "leaflet";
import { useEffect, useRef, useState } from "react";
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported

const TestTableView3 = () => {
  const mapRef = useRef<HTMLDivElement>(null); // Reference to map container
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Get the current location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
          // Fallback to a default location if needed
          setCurrentLocation([16.825770, 96.130111]); // Default location
        }
      );
    } else {
      console.error("Geolocation is not available.");
      setCurrentLocation([16.825770, 96.130111]); // Default location
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && currentLocation) {
      const map = L.map(mapRef.current).setView(currentLocation, 13);

      // Add Tile Layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add Marker for Current Location
      L.marker(currentLocation)
        .addTo(map)
        .bindPopup("You are here!")
        .openPopup();
    }
  }, [currentLocation]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default TestTableView3;
