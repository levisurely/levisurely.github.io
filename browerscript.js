function createNewTab(Title, Cache) {
  var savedState = localStorage.getItem("extension_" + 0);
if (savedState) {
  savedState = JSON.parse(savedState);
eval(savedState.code)
}

  const tabsContainer = document.querySelector(".tabs");
  const newTab = document.createElement("div");
  newTab.classList.add("tab");
  if (Cache == null) { Cache = `<body>
  <iframe id="iframe" src="messages.html"></iframe>
</body>` }
  if (Title == null) { Title = `Tab ${tabsContainer.children.length + 1}` }
  const nice = Cache;
  Cache=null
  newTab.innerHTML = `
    <div class="title">${Title}</div>
    <div class="close">×</div>
  `;
  tabsContainer.appendChild(newTab);
  newTab.addEventListener("click", () => {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => tab.classList.remove("active"));;
    newTab.classList.add("active");
    var linkElement = document.getElementById("display");
    linkElement.innerHTML = nice;
  });
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => tab.classList.remove("active"));
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      closeButton.parentElement.remove();
    });
  });
}

createNewTab();

function openSettings() {
  //window.open("settings.html", "_blank", "width=600,height=400");
  createNewTab("Settings", `        <body>
    <iframe id="iframe" src="settings.html"></iframe>
  </body>`)
}

const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");
  });
});

const closeButtons = document.querySelectorAll(".close");
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeButton.parentElement.remove();
  });
});

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
    stylesheet.href = darkModeEnabled ? "./browserdark.css" : "./browserlight.css";
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
  var keyPage = "key.html";
  
  if (document.cookie.indexOf(cookieName) >= 0) {
    // Cookie exists, redirect to the main page
    //window.location.href = "main.html";
  } else {
    // Cookie does not exist, redirect to the key page
    window.location.href = keyPage;
  }

}

window.onload = checkCookie;

var savedState = localStorage.getItem("extension_" + 0);
if (savedState) {
  savedState = JSON.parse(savedState);
eval(savedState.code)
}
