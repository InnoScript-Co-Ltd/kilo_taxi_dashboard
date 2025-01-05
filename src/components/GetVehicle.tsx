import {
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import React, { useEffect, useState } from "react";
import signalRService from "../helpers/signalrService";

const GetVehicle = () => {
  const [messages, setMessages] = useState<any>([]);
  const { connection, startConnection, invokeMethod, sendMethod, onReceive } = signalRService();

  useEffect(() => {
    // Start the connection
    startConnection();

    // Receive messages from the server
    onReceive("ReceiveLocationData", (user: any, message: string) => {
      console.log(`Message received from ${user}: ${message}`);
      setMessages((prevMessages: any) => [...prevMessages, { user, message }]);
    });

    return () => {
      connection.stop();
    };
  }, [connection, startConnection, onReceive]);

  const handleSend = async () => {
    try {
      // Using `invoke` to send a message and receive a response
      const response = await invokeMethod("RequestVehicleLocation", "User1", "Hello from React!");
      console.log("Server response:", response);

      // Using `send` to send a message without expecting a response
      // await sendMethod("BroadcastMessage", "User1", "Hello everyone!");
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
        <ListItem>
          {/* <ListItemText primary={location.latitude} secondary={location.longitude} /> */}
        </ListItem>
      </List>
    </div>
  );
};

export default GetVehicle;
