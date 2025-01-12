import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppRootState } from "../stores";

const OpenMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [totalDistance, setTotalDistance] = useState<number>(0); // Total distance state
  const [coordinates, setCoordinates] = useState<[number, number][]>([]); // Array of coordinates
  const routingControlRef = useRef<any>(null); // Reference to the routing control
  const signalLocation = useSelector((state: AppRootState) => state.share.signal)

  // Mock API response: Replace this with your actual API call
  const fetchCoordinatesFromAPI = async (location: any) => {

    console.log(location);
    
    // Simulate a delay
    return new Promise<[number, number][]>((resolve) =>
      setTimeout(() => {
        // resolve([
        //   [16.825770, 96.130111], // Start point
        //   [16.820000, 96.135000],
        //   [16.815000, 96.140000],
        //   [16.808771, 96.154487], // End point
        // ]);

        resolve([location.lat, location.long]);
      }, 1000)
    );
  };

  // console.log(signalLocation);

  useEffect(() => {
    const fetchAndRenderMap = async () => {
      
      const apiCoordinates = await fetchCoordinatesFromAPI(signalLocation);
      console.log(apiCoordinates);
      

      // Only use the first and last points
      const filteredCoordinates = [
        apiCoordinates[0], // Start point
        apiCoordinates[apiCoordinates.length - 1], // End point
      ];
      setCoordinates(filteredCoordinates);

      if (mapRef.current && !mapInstanceRef.current) {
        // Initialize the map
        const map = L.map(mapRef.current).setView(filteredCoordinates[0], 13);
        mapInstanceRef.current = map;

        // Add Tile Layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add Routing Machine
        const routingControl = L.Routing.control({
          waypoints: filteredCoordinates.map(([lat, lng]) => L.latLng(lat, lng)),
          lineOptions: {
            styles: [{ color: "orange", weight: 5 }],
          },
          routeWhileDragging: true,
        }).addTo(map);

        routingControlRef.current = routingControl;

        // Listen for the 'routesfound' event to get distance
        routingControl.on("routesfound", (e: any) => {
          const route = e.routes[0];
          const distanceInKm = route.summary.totalDistance / 1000; // Convert meters to kilometers
          setTotalDistance(distanceInKm);
        });

        // Fit the map to the route
        map.fitBounds(L.polyline(filteredCoordinates).getBounds());
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

export default OpenMap;
