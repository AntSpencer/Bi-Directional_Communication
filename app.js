window.onload = function () {
   var form = document.getElementById("message-form");
   var messageField = document.getElementById("message");
   var messageList = document.getElementById("messages");
   var socketStatus = document.getElementById("status");
   var closeBtn = document.getElementById("close");
   var inputName = document.getElementById("name");

   // Update the WebSocket URL to the one provided by Render
   var socket = new WebSocket("wss://websocketsno-1.onrender.com");

   socket.onopen = function (event) {
      socketStatus.innerHTML = "Connected to: " + event.currentTarget.url;
      socketStatus.className = "open";
   };

   socket.onerror = function (error) {
      console.log("WebSocket Error " + error);
   };

   form.onsubmit = function (e) {
      e.preventDefault();
      var message = inputNamevalue + ": " + messageField.value;
      socket.send(message);
      messageField.value = "";
      return false;
   };

   socket.onmessage = function (event) {
      var message = event.data;
      messageList.innerHTML +=
         '<li class="received"><span>Received:</span>' + `${message}` + "</li>";
   };

   socket.onclose = function (event) {
      socketStatus.innerHTML = "Disconnected from: " + event.currentTarget.url;
      socketStatus.className = "closed";
   };

   closeBtn.onclick = function (e) {
      e.preventDefault();
      socket.close();
      return false;
   };
};
