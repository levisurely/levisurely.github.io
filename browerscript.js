function openSettings() {
    window.open("settings.html", "_blank", "width=600,height=400");
  }

  const isDarkMode = localStorage.getItem("darkMode") === "true";

  if (isDarkMode) {
    var linkElement = document.getElementById("stylesheet");
    linkElement.href = "./darktabs.css";
  } else {
    var linkElement = document.getElementById("stylesheet");
    linkElement.href = "./lighttabs.css";
  }

  function createNewTab() {
    const tabsContainer = document.querySelector(".tabs");
    const newTab = document.createElement("div");
    newTab.classList.add("tab");
    newTab.innerHTML = `
    <div class="title">Tab ${tabsContainer.children.length + 1}</div>
    <div class="close">×</div>
  `;
    tabsContainer.appendChild(newTab);
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