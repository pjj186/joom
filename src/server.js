import express from "express";

const PORT = 4000;
const app = express();

console.log("Hello");

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);
app.listen(PORT, handleListen);
