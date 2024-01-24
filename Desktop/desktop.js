function updateTime() {
    var timeDisplay = document.getElementById("time");
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var timeString = hours + ":" + minutes + " " + ampm;
    timeDisplay.textContent = timeString;
  }
  
  setInterval(updateTime, 1000);

  function convertTo24Hour(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1].toLowerCase();
  
    if (AMPM === "pm" && hours < 12) hours = hours + 12;
    if (AMPM === "am" && hours === 12) hours = hours - 12;
  
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
  
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
  
    return sHours + ":" + sMinutes;
  }
  
  // Function to convert all 12-hour time formats to 24-hour time on the webpage
  function convertAllTimeFormatsTo24Hour() {
    var elements = document.getElementsByTagName("*");
  
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
  
      if (element.tagName === "INPUT" && element.type === "text") {
        if (element.value.match(/^\d{1,2}:\d{2}\s(am|pm)$/i)) {
          element.value = convertTo24Hour(element.value);
        }
      } else {
        var text = element.innerHTML;
  
        if (text.match(/^\d{1,2}:\d{2}\s(am|pm)$/i)) {
          element.innerHTML = text.replace(
            /^\d{1,2}:\d{2}\s(am|pm)$/i,
            convertTo24Hour(text)
          );
        }
      }
    }
  }
  
  // Call the function to convert all time formats to 24-hour time on page load
  //document.addEventListener("DOMContentLoaded", convertAllTimeFormatsTo24Hour);

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
      stylesheet.href = darkModeEnabled ? "./desktopdark.css" : "./desktopdark.css";
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