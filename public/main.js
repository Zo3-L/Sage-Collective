const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
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
  document.querySelector(".chat-messages").appendChild(div);
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
