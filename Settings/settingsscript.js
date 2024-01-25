document.addEventListener("DOMContentLoaded", function() {
  // Load saved settings or set default values
  const darkModeCheckbox = document.getElementById("darkModeCheckbox");
  const backgroundColorInput = document.getElementById("backgroundColor");
  const backgroundImageChoiceURL = document.getElementById("backgroundImageChoiceURL");
  const backgroundImageChoiceFile = document.getElementById("backgroundImageChoiceFile");
  const backgroundImageURLInput = document.getElementById("backgroundImageURL");
  const backgroundImageFileInput = document.getElementById("backgroundImageFile");
  const backgroundImageTransparencyInput = document.getElementById("backgroundImageTransparency");

  // Load saved settings or set default values
  let savedSettings = JSON.parse(localStorage.getItem("settings")) || {};
  darkModeCheckbox.checked = savedSettings.darkMode || false;
  backgroundColorInput.value = savedSettings.backgroundColor || "#ffffff";
  backgroundImageURLInput.value = savedSettings.backgroundImageURL || "";
  backgroundImageFileInput.value = "";
  backgroundImageTransparencyInput.value = savedSettings.backgroundImageTransparency || "1";

  // Apply settings function
  function applySettings() {
    // Dark mode
    const darkModeEnabled = darkModeCheckbox.checked;
    const stylesheet = document.getElementById("stylesheet");
    stylesheet.href = darkModeEnabled ? "./settingsdark.css" : "./settingslight.css";
    savedSettings.darkMode = darkModeEnabled;

    // Background color
    const backgroundColor = backgroundColorInput.value;
    document.body.style.backgroundColor = backgroundColor;
    savedSettings.backgroundColor = backgroundColor;

    // Background image
    if (backgroundImageChoiceURL.checked) {
      const backgroundImageURL = backgroundImageURLInput.value;
      document.body.style.backgroundImage = `url("${backgroundImageURL}")`;
      savedSettings.backgroundImageURL = backgroundImageURL;
    } else {
      document.body.style.backgroundImage = "";
      savedSettings.backgroundImageURL = "";
    }

    // Background image transparency
    const transparency = backgroundImageTransparencyInput.value;
    document.body.style.opacity = transparency;
    savedSettings.backgroundImageTransparency = transparency;

    // Save settings
    localStorage.setItem("settings", JSON.stringify(savedSettings));
    //location.reload()
  }

  // Apply settings on change
  darkModeCheckbox.addEventListener("change", applySettings);
  backgroundColorInput.addEventListener("change", applySettings);
  backgroundImageChoiceURL.addEventListener("change", applySettings);
  backgroundImageChoiceFile.addEventListener("change", applySettings);
  backgroundImageURLInput.addEventListener("input", applySettings);
  backgroundImageFileInput.addEventListener("change", applySettings);
  backgroundImageTransparencyInput.addEventListener("input", applySettings);

  // Apply settings on page load
  applySettings();
});

function checkCookie() {
  var cookieName = "accessKey";
  var keyPage = "../Key";;
  
  if (document.cookie.indexOf(cookieName) >= 0) {
    // Cookie exists, redirect to the main page
    //window.location.href = "main";
  } else {
    // Cookie does not exist, redirect to the key page
    window.location.href = keyPage;
  }
}

window.onload = checkCookie;