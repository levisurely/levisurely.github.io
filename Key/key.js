document.getElementById("submitBtn").addEventListener("click", function (event) {
  var keyInput = document.getElementById("keyInput").value;


  async function checkKey() {
    await fetch(
      `https://basicscript.glitch.me/checkkey?key=${keyInput}`
    )
      .then(response => response.json())
      .then(response => {
        if (response === true) {
          event.preventDefault();

          var cookieName = "accessKey";
          
          var expires = "";
          var date = new Date();
          var midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
          expires = "; expires=" + midnight.toGMTString();

          document.cookie = cookieName + "=" + keyInput + "; expires=" + midnight.toUTCString() + "; path=/";
          window.location.href = "../OS";
        } else {
          
          setTimeout(function(){
            while(1)location.reload(1)
          }, 1000)

          document.getElementById("errorMessage").innerHTML = "Invalid key. Please try again.";
        }
      });
  }

  checkKey();
});

function checkCookie() {
  var cookieName = "accessKey";
  var keyPage = "../Key";;

  if (document.cookie.indexOf(cookieName) >= 0) {
    // Cookie exists, redirect to the main page
    window.location.href = "../Browser";
  } else {
    // Cookie does not exist, redirect to the key page
    // window.location.href = keyPage;
  }
}

window.onload = checkCookie;

var script = document.createElement('script'); script.src = "https://cdn.jsdelivr.net/npm/eruda"; document.body.append(script); script.onload = function () { eruda.init(); }
