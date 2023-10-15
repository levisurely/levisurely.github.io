const darkModeCheckbox = document.getElementById("darkModeCheckbox");
const isDarkMode = localStorage.getItem("darkMode") === "true";

if (isDarkMode) {
  darkModeCheckbox.checked = true;
  var linkElement = document.getElementById("stylesheet");
  linkElement.href = "./settingsdark.css";
} else {
  var linkElement = document.getElementById("stylesheet");
  linkElement.href = "./settingslight.css";
}

darkModeCheckbox.addEventListener("change", () => {
  document.documentElement.setAttribute(
    "data-theme",
    darkModeCheckbox.checked ? "dark" : "light"
  );
  localStorage.setItem("darkMode", darkModeCheckbox.checked);
  if (darkModeCheckbox.checked) {
    var linkElement = document.getElementById("stylesheet");
    linkElement.href = "./settingsdark.css";
  } else {
    var linkElement = document.getElementById("stylesheet");
    linkElement.href = "./settingslight.css";
  }
});