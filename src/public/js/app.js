const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`); // 프론트엔드단의 소켓 서버의 "/" Route로 소켓을 보내고있음

// 여기서 socket.send() 를 사용하면 백엔드 쪽으로 값을 보냄

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log("New message : ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
