const WebSocket = require("ws");
const port = process.env.PORT || 8080; // Use the port provided by Render

const server = new WebSocket.Server({ port: port });

const clients = new Set();

server.on("connection", (socket) => {
   console.log("Client connected");
   clients.add(socket);

   socket.on("message", (message) => {
      console.log(`Received: ${message}`);
      // Broadcast the message to all other connected clients
      clients.forEach((client) => {
         if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(message);
         }
      });
   });

   socket.on("close", () => {
      console.log("Client disconnected");
      clients.delete(socket);
   });

   socket.send("Welcome to the WebSocket server!");
});

console.log(`WebSocket server is running on ws://localhost:${port}`);
