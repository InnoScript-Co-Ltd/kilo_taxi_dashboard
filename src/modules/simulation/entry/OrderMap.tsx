import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useRef, useState } from "react";
import { Grid2, TextField, Button } from "@mui/material";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const OrderMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [pickLat, setPickLat] = useState<number>(0);
  const [pickLong, setPickLong] = useState<number>(0);
  const [desLat, setDesLat] = useState<number>(0);
  const [desLong, setDesLong] = useState<number>(0);

  const renderMap = () => {
    if (!pickLat || !pickLong || !desLat || !desLong) {
      alert("Please provide all coordinates for both pick-up and destination.");
      return;
    }

    const pickupLatLng = L.latLng(pickLat, pickLong);
    const destinationLatLng = L.latLng(desLat, desLong);

    if (!mapInstanceRef.current) {
      // Initialize the map
      const map = L.map(mapRef.current!).setView(pickupLatLng, 13);
      mapInstanceRef.current = map;

      // Add Tile Layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    }

    const map = mapInstanceRef.current;

    // Clear existing layers (if any)
    map?.eachLayer((layer) => {
      if (!(layer instanceof L.TileLayer)) {
        map.removeLayer(layer);
      }
    });

    // Add Markers for Start and End Points
    L.marker(pickupLatLng)
      .addTo(map!)
      .bindPopup("Pick-Up Location")
      .openPopup();
    L.marker(destinationLatLng).addTo(map!).bindPopup("Destination Location");

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
    } as any).addTo(map!);

    routingControl.on("routesfound", (e: any) => {
      const route = e.routes[0];
      const distanceInKm = route.summary.totalDistance / 1000;
      setTotalDistance(distanceInKm);
    });

    routingControl.on("routeselected", () => {
      const container = document.querySelector(".leaflet-routing-container");
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
  };

  return (
    <div>
      <Grid2 container spacing={3}>
        <Grid2 size={{ md: 3 }}>
          <TextField
            type="number"
            id="pick-lat"
            label="Pick-Up Lat"
            variant="outlined"
            value={pickLat}
            onChange={(e) => setPickLat(Number(e.target.value))}
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ md: 3 }}>
          <TextField
            type="number"
            id="pick-long"
            label="Pick-Up Long"
            variant="outlined"
            value={pickLong}
            onChange={(e) => setPickLong(Number(e.target.value))}
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ md: 3 }}>
          <TextField
            type="number"
            id="des-lat"
            label="Destination Lat"
            variant="outlined"
            value={desLat}
            onChange={(e) => setDesLat(Number(e.target.value))}
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ md: 3 }}>
          <TextField
            type="number"
            id="des-long"
            label="Destination Long"
            variant="outlined"
            value={desLong}
            onChange={(e) => setDesLong(Number(e.target.value))}
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ md: 6 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={renderMap}
            fullWidth
          >
            Processed
          </Button>
        </Grid2>
      </Grid2>

      <div
        ref={mapRef}
        style={{ width: "100%", height: "500px", marginTop: "20px" }}
      />
      <div>
        <h3>Total Distance: {Math.round(totalDistance)} km</h3>
      </div>
    </div>
  );
};

export default OrderMap;
