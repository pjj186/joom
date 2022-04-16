import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import express from "express";

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

server.listen(PORT, handleListen);
