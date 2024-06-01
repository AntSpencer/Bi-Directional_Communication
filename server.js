const WebSocket = require("ws"); //makes it require the websocket package
const server = new WebSocket.Server({ port: 8080 }); //This makes a websocket server instead of one of the regular localhost ones
const clients = new Set(); //This holds all currently connected clients

server.on("connection", (socket) => {
   console.log("Client connected");
   clients.add(socket);

   socket.on("message", (message) => {
      console.log(`Received: ${message}`);
      //THIS CODE TOOK ME LIKE AN HOUR TO SOLVE
      clients.forEach((client) => {
         if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(`${message}`); //if you dont use backticks it return a blib object
         }
      });
   });

   socket.on("close", () => {
      console.log("Client disconnected");
      clients.delete(socket);
   });

   socket.send("Welcome to the WebSocket server!");
});

console.log("WebSocket server is now on ws://localhost:8080");
