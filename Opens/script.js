let zIndex = 1;
let windows = document.getElementById('windows');
let tabsHolder = document.getElementById('tabsHolder');
let addWindowButton = document.getElementById('addWindow');

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

    windowElement.innerHTML += `<iframe id="myframe" src="${Src}"></iframe>`

    windows.appendChild(windowElement);

    makeDraggable(windowElement);
    setupWindowButtons(windowElement);
    setupWindowTabs(windowElement, Title);

    //var x = document.getElementById("myframe");
    //windowElement.onload = function () {
    //var y = x.contentDocument;
    //alert(y.body)
    //y.body.style.backgroundColor = "red";
    //}
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
        windowElement.style.width = '100%';
        windowElement.style.height = '100%';
        windowElement.style.top = 0;
        windowElement.style.left = 0;
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
    createWindow("https://magic.is-a.dev/", "Test");
});