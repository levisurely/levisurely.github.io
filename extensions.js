document.querySelectorAll(".extension").forEach(function(extension) {
    var codeContainer = extension.querySelector(".codeContainer");
    var toggleButton = extension.querySelector(".toggleButton");
    var codeInput = codeContainer.querySelector(".codeInput");
    var extensionIndex = Array.from(extension.parentNode.children).indexOf(extension);
  
    // Load saved state and code
    var savedState = localStorage.getItem("extension_" + extensionIndex);
    if (savedState) {
      savedState = JSON.parse(savedState);
      toggleButton.classList.toggle("disabled", savedState.disabled);
      toggleButton.textContent = savedState.disabled ? "Disable" : "Enable";
      codeInput.value = savedState.code;
      codeContainer.classList.toggle("active", !savedState.disabled);
    }
  
    // Save state and code when changed
    codeInput.addEventListener("input", saveState);
    toggleButton.addEventListener("click", saveState);
  
    function saveState() {
      var state = {
        disabled: toggleButton.classList.contains("disabled"),
        code: codeInput.value
      };
      localStorage.setItem("extension_" + extensionIndex, JSON.stringify(state));
    }
  
    extension.addEventListener("click", function() {
      codeContainer.classList.toggle("active");
    });
  
    extension.querySelector(".injectButton").addEventListener("click", function(event) {
      event.stopPropagation();
      var code = codeInput.value;
      if (code) {
        eval(code)
      }
    });
  
    toggleButton.addEventListener("click", function(event) {
      event.stopPropagation();
      toggleButton.classList.toggle("disabled");
      toggleButton.textContent = toggleButton.classList.contains("disabled") ? "Disable" : "Enable";
      saveState();
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
      stylesheet.href = darkModeEnabled ? "./extensionslight.css" : "./extensionsdark.css";
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