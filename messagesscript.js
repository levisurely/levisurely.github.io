const isDarkMode = localStorage.getItem("darkMode") === "true";

if (isDarkMode) {
  var linkElement = document.getElementById("stylesheet");
  linkElement.href = "./messagesdark.css";
} else {
  var linkElement = document.getElementById("stylesheet");
  linkElement.href = "./messageslight.css";
}

function createNewMsg(Msg) {
  const msgsContainer = document.querySelector(".main-content");
  const newMsg = document.createElement("div");
  newMsg.classList.add("message-bubble");
  if (Msg == null) { Msg = `{Error}` }
  newMsg.innerHTML = `
  <p>${Msg}</p>
  `;
  msgsContainer.appendChild(newMsg);
}

function createNewSenderMsg(Msg) {
  const msgsContainer = document.querySelector(".main-content");
  const newMsg = document.createElement("div");
  newMsg.classList.add("sender-message-bubble");
  if (Msg == null) { Msg = `{Error}` }
  newMsg.innerHTML = `
  <p>${Msg}</p>
  `;
  msgsContainer.appendChild(newMsg);
}

//createNewMsg()
//createNewSenderMsg()

function send() {
  var BBPT = document.getElementById("BBPT");
  createNewSenderMsg(BBPT.value);
}

function checkEnterKey(event) {
  if (event.keyCode === 13) {
    send()
  }
}