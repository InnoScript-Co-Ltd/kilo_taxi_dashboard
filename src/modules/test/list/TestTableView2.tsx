import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

const TestTableView2: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([16.8409, 96.1735], 9); // Center the map on Yangon region

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Define the Yangon region coordinates (example boundary points)
    const yangonRegionCoordinates: L.LatLngTuple[] = [
      [17.164, 95.919], // Northwest point
      [17.278, 96.130], // North point
      [17.036, 96.323], // Northeast point
      [16.712, 96.544], // East point
      [16.421, 96.367], // Southeast point
      [16.359, 96.145], // South point
      [16.488, 95.987], // Southwest point
      [16.814, 95.919], // West point
      [17.164, 95.919], // Closing the polygon to the starting point
    ];

    const bahanTownshipCoordinates: L.LatLngTuple[] = [
      [16.8143, 96.1421], // Northwest point
      [16.8274, 96.1525], // North point
      [16.8280, 96.1648], // Northeast point
      [16.8160, 96.1762], // East point
      [16.8078, 96.1711], // Southeast point
      [16.8060, 96.1580], // South point
      [16.8101, 96.1459], // Southwest point
      [16.8143, 96.1421], // Closing the polygon to the starting point
    ];

    // Draw the polygon
    const yangonRegionPolygon = L.polygon(bahanTownshipCoordinates, {
      color: "red", // Border color
      weight: 2, // Border width
      fillOpacity: 0, // No fill, only border
    }).addTo(map);

    // Add a popup to the polygon
    yangonRegionPolygon.bindPopup("Yangon Region").openPopup();

    // Save the map instance in ref
    mapRef.current = map;

    return () => {
      // Cleanup map on unmount
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default TestTableView2;
