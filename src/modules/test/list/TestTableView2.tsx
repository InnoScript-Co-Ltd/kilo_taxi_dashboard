import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ygnCorrdinates } from "../../../constants/map";

// Import the ygnCoordinates data

const TestTableView2: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);


  const startPoint: [number, number] = [16.825770, 96.130111];
  // const endPoint: [number, number] = [16.823408, 96.162849];
  const endPoint: [number, number] = [16.808771, 96.154487];

  // useEffect(() => {
  //   // Initialize the map
  //   const map = L.map("map").setView([16.8409, 96.1735], 9); // Center on Yangon region

  //   // Add OpenStreetMap tile layer
  //   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   }).addTo(map);

  //   // Extract geometry from ygnCoordinates
  //   const yangonGeometry = ygnCorrdinates.features[0].geometry;

  //   if (yangonGeometry.type === "MultiPolygon") {
  //     // Loop through each polygon in MultiPolygon
  //     yangonGeometry.coordinates.forEach((polygon: any) => {
  //       const latLngs: L.LatLngTuple[] = polygon[0].map(([lng, lat]: any): any => [lat, lng]);

  //       // Add the polygon to the map
  //       L.polygon(latLngs, {
  //         color: "blue",
  //         weight: 2,
  //         fillOpacity: 0.3, // Slightly filled for better visibility
  //       }).addTo(map);
  //     });
  //   }

  //   // Save the map instance in ref
  //   mapRef.current = map;

  //   return () => {
  //     // Cleanup map on unmount
  //     map.remove();
  //   };
  // }, []);

  useEffect(() => {
    const map = L.map("map").setView([16.8409, 96.1735], 9);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  
    const yangonGeometry = ygnCorrdinates.features[0].geometry;
  
    if (yangonGeometry.type === "MultiPolygon") {
      // Loop through all polygons and add them to the map
      yangonGeometry.coordinates.forEach((polygon: any) => {
        const latLngs: L.LatLngTuple[] = polygon[0].map(([lng, lat]:any) => [lat, lng]);
  
        // Add the polygon to the map
        L.polygon(latLngs, {
          color: "blue",
          weight: 2,
          fillOpacity: 0.3,
        }).addTo(map);
      });

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
  
    mapRef.current = map;
  
    return () => {
      map.remove();
    };
  }, []);
  

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default TestTableView2;
