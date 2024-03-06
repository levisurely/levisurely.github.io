let zIndex = 1;
let windows = document.getElementById('windows');
let tabsHolder = document.getElementById('tabsHolder');
let PT = document.getElementById('toggle');
let TT = document.getElementById('theme');
let addWindowButton = document.getElementById('addWindow');
var Proxy = false;

const iFrames = [...document.querySelectorAll("iframe[bypass-x-frame]")];
const bypassAPILink = "https://basicscript.glitch.me/bypass/";

iFrames.forEach(async (frame) => {
    let link = frame.getAttribute("bypass-x-frame");

    frame.src = bypassAPILink + link;
});

function createWindow(Src, Title) {
    let windowElement = document.createElement('div');
    windowElement.className = 'window';
    windowElement.style.width = '400px';
    windowElement.style.height = '300px';
    windowElement.style.top = '50px';
    windowElement.style.left = '50px';
    windowElement.style.zIndex = ++zIndex;
    windowElement.id = `Window_${Math.floor(Math.random() * 1000000000) + 1}`;

    let topbar = document.createElement('div');
    topbar.className = 'topbar';
    topbar.innerHTML = `
    <div class="title">${Title}</div>
    <div class="buttons">
    <button class="minimize">_</button>
    <button class="maximize">☐</button>
    <button class="close">X</button>
  </div>
  `;

    windowElement.appendChild(topbar);
    if (Proxy == true) {
        windowElement.innerHTML += `<iframe id="myframe" onLoad="this.Src=bypassAPILink+this.contentWindow.location" src="${bypassAPILink + Src}"></iframe>`
    } else {
        windowElement.innerHTML += `<iframe id="myframe" src="${Src}"></iframe>`
    }
    windows.appendChild(windowElement);

    makeDraggable(windowElement);
    setupWindowButtons(windowElement);
    setupWindowTabs(windowElement, Title);
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.querySelector('.topbar').onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        element.style.zIndex = ++zIndex;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + 'px';
        element.style.left = (element.offsetLeft - pos1) + 'px';
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function setupWindowButtons(windowElement) {
    let minimizeButton = windowElement.querySelector('.minimize');
    let closeButton = windowElement.querySelector('.close');
    let maximizeButton = windowElement.querySelector('.maximize');

    minimizeButton.addEventListener('click', () => {
        windowElement.style.display = 'none';
    });

    closeButton.addEventListener('click', () => {
        try {
            let Tab = tabsHolder.querySelector(`#${windowElement.id}`);
            Tab.remove();
        } catch (err) {
            alert(err)
        }
        windowElement.remove();
    });

    maximizeButton.addEventListener('click', () => {
        if (windowElement.style.width !== '100%') {
            windowElement.style.width = '100%';
            windowElement.style.height = '100%';
            windowElement.style.top = 0;
            windowElement.style.left = 0;
        } else {
            windowElement.style.width = '400px';
            windowElement.style.height = '300px';
            windowElement.style.top = '50px';
            windowElement.style.left = '50px';
        }
    });
}

function setupWindowTabs(windowElement, Title) {
    let tab = document.createElement('div');
    tab.id = windowElement.id;
    tab.textContent = Title;
    tab.className = 'tab';
    tab.addEventListener('click', () => {
        try {
            windowElement.style.zIndex = ++zIndex;
            if (windowElement.style.display === 'none') {
                windowElement.style.display = 'block';
            } else {
                windowElement.style.display = 'none';
            }
        }
        catch (err) {
            alert(err)
        }
    });
    tabsHolder.appendChild(tab);
}

addWindowButton.addEventListener('click', function () {
    const textBoxValue = document.getElementById('textBox').value;
    const baseUrl = textBoxValue.replace(/^https:\/\//, "").replace(/\/$/, "");
    createWindow(`${textBoxValue}`, `???`);
});

PT.addEventListener('click', function () {
    if (Proxy === false) { PT.style.backgroundColor = "rgba(0, 255, 0, 0.5)"; Proxy = true; PT.innerText = "Proxy: On" } else { PT.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; Proxy = false; PT.innerText = "Proxy: Off"; }
});

let savedSettings = JSON.parse(localStorage.getItem("settings")) || {};
var backgroundColorInput = savedSettings.backgroundColor || "#ffffff";
var backgroundImageURLInput = savedSettings.backgroundImageURL || "";
var backgroundImageFileInput = "";
var backgroundImageTransparencyInput = savedSettings.backgroundImageTransparency || "1";

// Apply settings function
function applySettings() {
    // Dark mode
    const darkModeEnabled = savedSettings.darkMode || false;
    const stylesheet = document.getElementById("stylesheet");
    stylesheet.href = darkModeEnabled ? "dark.css" : "light.css";
    TT.innerText = darkModeEnabled ? "Theme: Dark" : "Theme: Light";
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

TT.addEventListener('click', function () {
    if (savedSettings.darkMode === true) {
        savedSettings.darkMode = false;
        TT.innerText = "Theme: Light";

    } else {
        savedSettings.darkMode = true;
        TT.innerText = "Theme: Dark";

    }
    localStorage.setItem("settings", JSON.stringify(savedSettings));
    applySettings();
});

var script = document.createElement('script'); script.src = "https://cdn.jsdelivr.net/npm/eruda"; document.body.append(script); script.onload = function () { eruda.init(); }

document.addEventListener("DOMContentLoaded", function () {

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