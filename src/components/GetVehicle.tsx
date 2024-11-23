import {
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import React from "react";

const GetVehicle = () => {
  const [location, setLocation] = React.useState<any>({
    latitude: null,
    longitude: null,
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  return (
    <div>
      <Button startIcon={<LocalTaxiIcon />} onClick={getLocation}>
        Get Vehicle
      </Button>

      <List dense={false}>
        <ListItem>
          <ListItemText primary={location.latitude} secondary={location.longitude} />
        </ListItem>
      </List>
    </div>
  );
};

export default GetVehicle;
