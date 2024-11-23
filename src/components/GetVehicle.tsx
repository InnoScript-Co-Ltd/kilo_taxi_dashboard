import {
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import React from "react";

function generate(element: React.ReactElement<unknown>) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const GetVehicle = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [data, setData] = React.useState<any>([]);
  const [location, setLocation] = React.useState<any>({
    latitude: null,
    longitude: null,
  });

  const testFunc = () => {
    setData([{ lat: 40310.21, lound: 210392103 }]);
  };

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
  console.log(location);

  return (
    <div>
      <Button startIcon={<LocalTaxiIcon />} onClick={getLocation}>
        Get Vehicle
      </Button>

      <List dense={dense}>
        <ListItem>
          <ListItemText primary={location.latitude} secondary={location.longitude} />
        </ListItem>
      </List>
    </div>
  );
};

export default GetVehicle;
