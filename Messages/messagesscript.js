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

document.addEventListener("DOMContentLoaded", function() {


  let savedSettings = JSON.parse(localStorage.getItem("settings")) || {};
  var darkModeCheckbox = savedSettings.darkMode || false;
  var backgroundColorInput = savedSettings.backgroundColor || "#ffffff";
  var backgroundImageURLInput = savedSettings.backgroundImageURL || "";
  var backgroundImageFileInput = "";
  var backgroundImageTransparencyInput = savedSettings.backgroundImageTransparency || "1";

  // Apply settings function
  function applySettings() {
    // Dark mode
    const darkModeEnabled = darkModeCheckbox;
    const stylesheet = document.getElementById("stylesheet");
    stylesheet.href = darkModeEnabled ? "./messagesdark.css" : "./messageslight.css";
    savedSettings.darkMode = darkModeEnabled;

    // Background color
    const backgroundColor = backgroundColorInput;
    document.body.style.backgroundColor = backgroundColor;
    savedSettings.backgroundColor = backgroundColor;

    // Background image
    if (backgroundImageURLInput) {
      const backgroundImageURL = backgroundImageURLInput;
      document.body.style.backgroundImage = `url("${backgroundImageURL}")`;
      savedSettings.backgroundImageURL = backgroundImageURL;
    }

    // Background image transparency
    const transparency = backgroundImageTransparencyInput;
    document.body.style.opacity = transparency;
    savedSettings.backgroundImageTransparency = transparency;
  }

  // Apply settings on page load
  applySettings();
});

function checkCookie() {
  var cookieName = "accessKey";
  var keyPage = "key";
  
  if (document.cookie.indexOf(cookieName) >= 0) {
    // Cookie exists, redirect to the main page
    //window.location.href = "main";
  } else {
    // Cookie does not exist, redirect to the key page
    window.location.href = keyPage;
  }
}

window.onload = checkCookie;