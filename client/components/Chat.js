import React from "react";
import { connect } from "react-redux";
import { io } from "socket.io-client";
const qs = require("qs");

class Chat extends React.Component {
  componentDidMount() {
    const chatForm = document.getElementById("chat-form");
    const chatMessages = document.querySelector(".chat-messages");
    const roomName = document.getElementById("room-name");
    const userList = document.getElementById("users");

    // Get username and room from URL

    // const { username, room } = qs.parse(location.search);
    const { username, room } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    const socket = io();

    //join chatroom
    socket.emit("joinRoom", { username, room });

    //message from server
    socket.on("message", (message) => {
      outputMessage(message);
      console.log(message);
      //scroll down
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    //get room and users
    socket.on("roomUsers", ({ room, users }) => {
      outputRoomName(room);
      outputUsers(users);
    });

    //message submit
    chatForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      //get message text
      const msg = ev.target.elements.msg.value;

      //emitting message to server
      socket.emit("chatMessage", msg);

      //clear input
      ev.target.elements.msg.value = "";
      ev.target.elements.msg.focus();
    });

    //output message to DOM
    function outputMessage(message) {
      const div = document.createElement("div");
      div.classList.add("message");
      div.innerHTML = `
  <p class="meta">
    ${message.username}  <span>${message.time}</span>
  </p>
  <p class="text">
    ${message.text}
  </p>`;
      chatMessages.appendChild(div);
      // document.querySelector(".chat-messages").appendChild(div);
    }

    //add room name to DOM
    function outputRoomName(room) {
      roomName.innerText = room;
    }

    //add username to DOM
    function outputUsers(users) {
      userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}
    `;
    }
  }
  render() {
    return (
      <div>
        <div className="chat-container">
          <header className="chat-header">
            <h1> Sage Collective</h1>
            <a href="index.html" className="btn">
              Leave Room
            </a>
          </header>
          <main className="chat-main">
            <div className="chat-sidebar">
              <h3>
                <i className="fas fa-comments"></i> Room Name:
              </h3>
              <h2 id="room-name"></h2>
              <h3>
                <i className="fas fa-users"></i> Users
              </h3>
              <ul id="users"></ul>
            </div>
            <div className="chat-messages"></div>
          </main>
          <div className="chat-form-container">
            <form id="chat-form">
              <input
                id="msg"
                type="text"
                placeholder="Enter Message"
                required
                autoComplete="off"
              />
              <button className="btn">
                <i className="fas fa-paper-plane"></i> Send
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    state,
    username: state.auth.username,
  };
};

export default connect(mapState)(Chat);
