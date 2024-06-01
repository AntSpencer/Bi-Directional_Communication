window.onload = function () {
   // Get references to elements on the page.
   var form = document.getElementById("message-form");
   var messageField = document.getElementById("message");
   var messageList = document.getElementById("messages");
   var socketStatus = document.getElementById("status");
   var closeBtn = document.getElementById("close");
   // the rest of the code goes here...
   // create a new WebSocket object.
   var socket = new WebSocket(" ws://localhost:8080");
   socket.onopen = function (event) {
      socketStatus.innerHTML = "Connected to: " + event.currentTarget.url;
      socketStatus.className = "open";
   };
   socket.onerror = function (error) {
      console.log("WebSocket Error " + error);
   };
   // send a message when the form is submitted.
   form.onsubmit = function (e) {
      e.preventDefault();
      // retrieve the message from the textarea.
      var message = messageField.value;
      // send the message through the websocket
      socket.send(message);
      // add the message to the list of messages.
      messageList.innerHTML +=
         '<li class="sent"><span>Sent:</span>' + message + "</li>";
      // clear the message field.
      messageField.value = "";
      return false;
   };
   // Handle messages sent by the server.
   socket.onmessage = function (event) {
      var message = event.data;
      messageList.innerHTML +=
         '<li class="received"><span>Received:</span>' + message + "</li>";
   };
   // Show a disconnect message when the websocket is closed.
   socket.onclose = function (event) {
      socketStatus.innerHTML = "Disconnected from: " + event.currentTarget.url;
      socketStatus.className = "closed";
   };
   // Close the websocket when the close button is clicked.
   closeBtn.onclick = function (e) {
      e.preventDefault();
      socket.close();
      return false;
   };
};
