const socket = io("http://localhost:8000");
const chat = document.querySelector(".chat-container");
const Name = prompt("Enter your name : ");
document.querySelector("#user-name").innerHTML = `${Name}`;
socket.emit("new-user-joined", Name);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "middle");
});

function append(message, position) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  chat.append(messageElement);
}

const form = document.querySelector("#form");
const messageInput = document.querySelector("#messageInp");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputMsg = messageInput.value;
  append(`<b>You : </b>${inputMsg}`, "right");
  socket.emit("send", inputMsg);
  messageInput.value = "";
  var audio1 = new Audio("public/sent.mp3");
  audio1.volume = 0.2;
  audio1.play();
});

socket.on("receive", (data) => {
  append(`<b> ${data.name} : </b>${data.message}`, "left");
  var audio2 = new Audio("public/receive.mp3");
  audio2.volume = 0.6;
  audio2.play();
});
socket.on("left", (name) => {
  append(`${name} left the chat`, "middle");
});
