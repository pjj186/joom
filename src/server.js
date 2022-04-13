import express from "express";

const PORT = 4000;
const app = express();

app.set("view engine", "pug"); // 템플릿 엔진 설정
app.set("views", __dirname + "/src/views"); // 템플릿들이 모여있는 곳 가르키기

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);
app.listen(PORT, handleListen);
