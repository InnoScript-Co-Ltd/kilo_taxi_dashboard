import { Button, List, ListItem, ListItemText } from "@mui/material";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import React, { useEffect, useState } from "react";
import signalRService from "../helpers/signalrService";

type LocationData = {
  vehicleId: any,
  lat: any;
  long: any;
};

type Message = {
  location: LocationData;
};

const GetVehicle = ({ id }: { id: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { connection, startConnection, invokeMethod, sendMethod, onReceive } =
    signalRService();

  useEffect(() => {
    startConnection();
  
    onReceive("ReceiveLocationData", (location: any) => {
      console.log(`Location data received for vehicle:`, location);
      setMessages((prevMessages: any) => [...prevMessages, { location }]);
    });

    return () => {
      connection
        .stop()
        .then(() => console.log("SignalR connection stopped"))
        .catch((err) =>
          console.error("Error stopping SignalR connection:", err)
        );
    };
  }, [connection, startConnection, onReceive]);

  const handleSend = async () => {
    try {
      // Using `invoke` to send a message and receive a response
      const response = await invokeMethod("RequestVehicleLocation", id);
      console.log("Server response:", response);

      // Using `send` to send a message without expecting a response
      await sendMethod("RequestVehicleLocation", id);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };
  return (
    <div>
      <Button startIcon={<LocalTaxiIcon />} onClick={handleSend}>
        Get Vehicle
      </Button>

      <List dense={false}>
      {messages.map((message, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`Vehicle ID: ${message.location.vehicleId}`}
            secondary={`Location: Latitude ${message.location.lat}, Longitude ${message.location.long}`}
          />
        </ListItem>
      ))}
    </List>
    </div>
  );
};

export default GetVehicle;
