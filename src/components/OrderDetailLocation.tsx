import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useEffect, useRef, useState } from "react";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const OrderDetailLocation = ({
  detailLocation,
}: {
  detailLocation: Array<any>;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  const fetchCoordinatesFromAPI = async (location: Array<any>) => {
    return new Promise<[number, number][]>((resolve) =>
      setTimeout(() => {
        if (location?.length > 0) {
          let realLocationPayload: any = location.map((loc: any) => {
            return [loc.lat, loc.long];
          });
          resolve(realLocationPayload);
        } else {
          resolve([]);
        }
      }, 1000)
    );
  };

  useEffect(() => {
    const fetchAndRenderMap = async () => {
      const apiCoordinates = await fetchCoordinatesFromAPI(detailLocation);

      if (apiCoordinates.length < 2) {
        console.error(
          "At least two locations (pick-up and destination) are required."
        );
        return;
      }
      console.log(
        "pickupLatLong : ",
        apiCoordinates[0][0],
        apiCoordinates[0][1]
      );

      console.log(
        "destLatLong : ",
        apiCoordinates[apiCoordinates.length - 1][0],
        apiCoordinates[apiCoordinates.length - 1][1]
      );

      const pickupLatLng = L.latLng(apiCoordinates[0][0], apiCoordinates[0][1]);
      const destinationLatLng = L.latLng(
        apiCoordinates[apiCoordinates.length - 1][0], // Last latitude
        apiCoordinates[apiCoordinates.length - 1][1] // Last longitude
      );

      if (!mapInstanceRef.current) {
        // Initialize the map
        const map = L.map(mapRef.current!).setView(pickupLatLng, 13);
        mapInstanceRef.current = map;

        // Add Tile Layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add Markers for Start and End Points
        L.marker(pickupLatLng)
          .addTo(map)
          .bindPopup("Pick-Up Location")
          .openPopup();
        L.marker(destinationLatLng)
          .addTo(map)
          .bindPopup("Destination Location");

        // Configure Routing Machine
        const routingControl = L.Routing.control({
          waypoints: [pickupLatLng, destinationLatLng],
          lineOptions: {
            styles: [
              {
                color: "rgba(255, 165, 0, 0.8)", // Orange with opacity
                weight: 5,
              },
            ],
          },
          routeWhileDragging: true,
          createMarker: () => null, // Prevent marker creation
          show: false, // Hide the route details box
        } as any).addTo(map);

        routingControl.on("routesfound", (e: any) => {
          const route = e.routes[0];
          const distanceInKm = route.summary.totalDistance / 1000;
          setTotalDistance(distanceInKm);
        });
        // Wait for the DOM to render the instructions and style it
        routingControl.on("routeselected", () => {
          const container = document.querySelector(
            ".leaflet-routing-container"
          );
          if (container) {
            container.setAttribute(
              "style",
              "background-color: rgba(0, 0, 0, 0.5); color: white; padding: 10px; border-radius: 5px;"
            );
          }
        });

        // Adjust Map Bounds to Fit Both Locations
        const bounds = L.latLngBounds([pickupLatLng, destinationLatLng]);
        map.fitBounds(bounds);
      } else {
        // Update existing map and routing
        const map: any = mapInstanceRef.current;

        if (map) {
          const routingControl = map._layers;
          routingControl.setWaypoints([pickupLatLng, destinationLatLng]);
        }

        const bounds = L.latLngBounds([pickupLatLng, destinationLatLng]);
        map.fitBounds(bounds);
      }
    };

    fetchAndRenderMap();
  }, [detailLocation]);

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
      <div>
        <h3>Total Distance: {Math.round(totalDistance)} km</h3>
      </div>
    </div>
  );
};

export default OrderDetailLocation;
