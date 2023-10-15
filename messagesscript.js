const isDarkMode = localStorage.getItem("darkMode") === "true";

if (isDarkMode) {
  var linkElement = document.getElementById("stylesheet");
  linkElement.href = "./messagesdark.css";
} else {
  var linkElement = document.getElementById("stylesheet");
  linkElement.href = "./messageslight.css";
}