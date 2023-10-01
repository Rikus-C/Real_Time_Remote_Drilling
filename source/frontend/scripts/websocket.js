// this is a websocket client code, the websocket server it will be
// connecting to can be found in the backend code for this program

const socket = new WebSocket("ws://" + settings["backend ip"] + ":" + settings["backend port"]);

socket.addEventListener("open", function() {
  console.log("Connected to backend");
});

socket.addEventListener("message", function(msg) {
  var message = JSON.parse(msg.data);

  if(message.type === "feedback"){ // move all oif this to its own function in control_panel.js
    show_feedback(message.data);
  } else if (message.type === "request inputs"){
    socket.send(JSON.stringify(get_user_inputs()));
  } else if (message.type === "message from frontend"){
    show_alert_message(message.messageData);
  }
});

socket.addEventListener("close", (event) => {
  if (event.wasClean) {
    console.log("WebSocket connection closed cleanly.");
  } else {
    console.error("WebSocket connection closed unexpectedly.");
  }
  console.log("Close code:", event.code, "Reason:", event.reason);
});

socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
});
