const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

let dev = true;
const nextApp = next({ dev });

const nextHandler = nextApp.getRequestHandler();

let port = 3000;

io.on("connect", (socket) => {
  console.log("player connected");

  socket.on("i joined", function (id) {
    socket.broadcast.emit("new player joined", id, socket.id);
  });

  socket.on("my info", function (data) {
    io.to(data.connector).emit("other player", data.me);
  });

  socket.on("player data", function (playerInformation) {
    socket.broadcast.emit("other players data", playerInformation);
  });
});

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`server listening on port: ${port}`);
  });
});
