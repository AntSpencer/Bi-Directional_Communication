const WebSocket = require("ws");
const port = process.env.PORT || 8080;

const server = new WebSocket.Server({ port: port });

const clients = new Set();

server.on("connection", (socket) => {
   console.log("Client connected");
   clients.add(socket);
   broadcastActiveUserCount();

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
      broadcastActiveUserCount();
   });

   socket.send("Welcome to the WebSocket server!");
});

function broadcastActiveUserCount() {
   const message = JSON.stringify({ type: "activeUsers", count: clients.size });
   clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
         client.send(message);
      }
   });
}

console.log(`WebSocket server is running on ws://localhost:${port}`);
