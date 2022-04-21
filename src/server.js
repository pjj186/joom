import http from "http";
import express from "express";
import SocketIO from "socket.io";

const PORT = 4000;
const app = express();

app.set("view engine", "pug"); // 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 템플릿들이 모여있는 곳 가르키기
app.use("/public", express.static(__dirname + "/public")); // Express 정적 파일 제공
// __dirname : 현재 이 파일이 있는 폴더 경로

app.get("/", (req, res) => res.render("home")); // home.pug 렌더링
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);

const httpServer = http.createServer(app); // http 서버 생성
const wsServer = SocketIO(httpServer);

const publicRooms = () => {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer; // sids : socket id들만 / rooms:  socket id, room 전부
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
};

const countRoom = (roomName) => {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
};

wsServer.on("connection", (socket) => {
  wsServer.sockets.emit("room_change", publicRooms());
  socket["nickname"] = "Anon";
  socket.onAny((event) => {
    console.log(`Socket Event:${event}`);
  });

  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done(countRoom(roomName)); // 실행 위치 : 프론트엔드
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName)); // 나를 제외한 다른 사람들이 봄
    wsServer.sockets.emit("room_change", publicRooms());
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      console.log(room);
      socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1);
    });
  });

  socket.on("disconnect", () => {
    wsServer.sockets.emit("room_change", publicRooms());
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done(); // 실행 위치 : 프론트엔드
  });

  socket.on("nickname", (nickName) => {
    console.log(nickName);
    socket["nickname"] = nickName;
  }); // 대괄호 표기법으로 객체에 프로퍼티 추가
});

httpServer.listen(PORT, handleListen);
