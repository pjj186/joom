const socket = new WebSocket(`ws://${window.location.host}`); // 프론트엔드단의 소켓 서버의 "/" Route로 소켓을 보내고있음

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log("New message : ", message.data, "from the server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

setTimeout(() => {
  // 프론트에서 서버로 메시지 전송
  socket.send("Hello from the browser!");
}, 10000);
