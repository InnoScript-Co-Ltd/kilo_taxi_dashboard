import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { hadUrl } from "../constants/config";

const signalRService = () => {
  const connection = new HubConnectionBuilder()
    .withUrl(hadUrl) // Replace with your server's SignalR URL
    .configureLogging(LogLevel.Information) // Optional: Logging level
    .withAutomaticReconnect() // Optional: Automatically reconnect if the connection is lost
    .build();

  const startConnection = async () => {
    try {
      await connection.start();
      console.log("SignalR connected.");
    } catch (err) {
      console.error("Error while starting SignalR connection:", err);
      setTimeout(startConnection, 5000); // Retry connection
    }
  };

  connection.onclose(async () => {
    console.log("SignalR connection lost, reconnecting...");
    await startConnection();
  });

  // Sending data using `invoke`
  const invokeMethod = async (methodName: string, ...args: any) => {
    try {
      const response = await connection.invoke(methodName, ...args);
      console.log(`Response from ${methodName}:`, response);
      return response;
    } catch (err) {
      console.error(`Error invoking ${methodName}:`, err);
      throw err;
    }
  };

  // Sending data using `send` (fire-and-forget)
  const sendMethod = async (methodName: string, ...args: any) => {
    try {
      await connection.send(methodName, ...args);
      console.log(`Data sent to ${methodName} successfully.`);
    } catch (err) {
      console.error(`Error sending to ${methodName}:`, err);
      throw err;
    }
  };

  // Receiving messages from the server
  const onReceive = (methodName: string, callback: any) => {
    connection.on(methodName, callback);
    console.log(`Listening for ${methodName} events.`);
  };

  return { connection, startConnection, invokeMethod, sendMethod, onReceive };
};

export default signalRService;
