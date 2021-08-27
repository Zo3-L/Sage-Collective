const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require("../script/seed");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const formatMessage = require("../utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("../utils/users");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }

    const admin = "Community Admin";

    //run when client connects
    io.on("connection", (socket) => {
      // socket.on("message", ({ name, message }) => {
      //   io.emit("message", { name, message });
      // });

      socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        //welcome current user
        socket.emit(
          "message",
          formatMessage(admin, "Welcome to Sage Collective!")
        );
        //broadcast when a user connects
        socket.broadcast
          .to(user.room)
          .emit(
            "message",
            formatMessage(admin, `${user.username} has joined the chat`)
          );
        //send users and room info
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      });
      //listens for chatMessage
      socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
      });
      //runs when client disconnects
      socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
          io.to(user.room).emit(
            "message",
            formatMessage(admin, `${user.username} has left the chat`)
          );
          //send users and room info
          io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
          });
        }
      });
    });
    // start listening (and create a 'server' object representing our server)
    http.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
