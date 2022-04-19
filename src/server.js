import http from "http";
import { WebSocketServer } from "ws";
import express from "express";
import { parse } from "path";

const PORT = 4000;
const app = express();

app.set("view engine", "pug"); // 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 템플릿들이 모여있는 곳 가르키기
app.use("/public", express.static(__dirname + "/public")); // Express 정적 파일 제공
// __dirname : 현재 이 파일이 있는 폴더 경로

app.get("/", (req, res) => res.render("home")); // home.pug 렌더링
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);

const server = http.createServer(app); // http 서버 생성
const wss = new WebSocketServer({
  server,
}); // websocket 서버 생성 (http 서버 위에)

const sockets = [];

wss.on("connection", (socket) => {
  // 프론트쪽에서 보내는 socket
  // 여기서 socket.send() 를 사용하면 프론트쪽으로 값을 보냄
  sockets.push(socket); // 브라우저와 연결 될 때 마다 소켓하나씩 추가 (각 브라우저에서 socket 객체를 만드니깐)
  socket["nickname"] = "Anon";
  console.log("Connected to Browser ✅");
  socket.on("close", () => {
    console.log("Disconnected from Browser ❌");
  });
  socket.on("message", (msg) => {
    // 프론트단에서 넘어오는 메시지를 처리하는 곳
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = message.payload; // socket 객체에 nickname 프로퍼티를 payload와 함께 추가하는것 (대괄호 표기법)
        console.log(socket);
        break;
    }
  });
});

server.listen(PORT, handleListen);
