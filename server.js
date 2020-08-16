const express = require("express");

const app = express();
// TODO: find what all can we do
const server = require("http").Server(app);

const io = require("socket.io")(server);

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
    debug: true,
});

app.use('/peerjs', peerServer);

const { v4: uuid } = require("uuid");
// this sets the view engine to ejs.
// `view engine` is a special key that is getting set here.
// view should be inside `views` folder.
app.set("view engine", "ejs");

// TODO:  Check more on this
app.use(express.static("public"));

app.get("/", (req, res) => {
  // creates a new room and re-directs to this route.
  res.redirect(`/${uuid()}`);
});

app.get("/:room", (req, res) => {
  const data = {
    roomId: req.params.room,
  };
  res.render("room", data);
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    console.log("Hey, we have joined the room");
   
    socket.on('message', message => {
        io.to(roomId).emit('createMessage', message);
    })
  });
});

server.listen(process.env.PORT || 3030);
