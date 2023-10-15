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

function createNewSender(Person) {
  const msgsContainer = document.getElementById("sidebar");
  const newMsg = document.createElement("div");
  newMsg.classList.add("sidebar-content");
  if (Person == null) { Person = `{Error}` }
  newMsg.innerHTML = `
  <h2>${Person}</h2>
  `;
  msgsContainer.appendChild(newMsg);
}

//createNewMsg()
//createNewSenderMsg()
//createNewSender()

function send() {
  var BBPT = document.getElementById("BBPT");
  const token = 'API_TOKEN';
  const gist_id = 'GIST_ID';

  const headers = {
    'Authorization': `token ${token}`
  };

  const content = `{
    "Marie": {
      "Sent": "false",
      "Received": "false",
      "Last": "Sent",
      "Sending": "${BBPT.value}",
      "Receiving": "Hello"
    }
  }
  `

  const data = {
    files: {
      [`Template`]: {
        content: content
      }
    }
  };

  fetch(`https://api.github.com/gists/${gist_id}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => console.log(data));

  createNewSenderMsg(BBPT.value);
}

function checkEnterKey(event) {
  if (event.keyCode === 13) {
    send()
  }
}