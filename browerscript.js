const isDarkMode = localStorage.getItem("darkMode") === "true";

if (isDarkMode) {
  var linkElement = document.getElementById("stylesheet");
  linkElement.href = "./darktabs.css";
} else {
  var linkElement = document.getElementById("stylesheet");
  linkElement.href = "./lighttabs.css";
}

function createNewTab(Title, Cache) {
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