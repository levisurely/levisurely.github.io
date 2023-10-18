document.getElementById("submitBtn").addEventListener("click", function(event) {
    var keyInput = document.getElementById("keyInput").value;
    var validKey = "examplekey";

    if (keyInput === validKey) {
        event.preventDefault(); // Prevent form submission
  
        var cookieName = "accessKey";
        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        document.cookie = cookieName + "=" + validKey + "; expires=" + expirationDate.toUTCString() + "; path=/";
        window.location.href = "browser.html";
    } else {
        document.getElementById("errorMessage").innerHTML = "Invalid key. Please try again.";
    }
});

function checkCookie() {
    var cookieName = "accessKey";
    var keyPage = "key.html";
    
    if (document.cookie.indexOf(cookieName) >= 0) {
      // Cookie exists, redirect to the main page
      window.location.href = "browser.html";
    } else {
      // Cookie does not exist, redirect to the key page
     // window.location.href = keyPage;
    }
  }
  
  window.onload = checkCookie;