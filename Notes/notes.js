function addNote() {
    var input = document.getElementById("noteInput").value;
    if (input !== "") {
        var ul = document.getElementById("noteList");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(input));
        ul.appendChild(li);
        document.getElementById("noteInput").value = "";
    }
}

document.getElementById("noteInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addNote();
    }
});

document.getElementById("noteList").addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("completed");
    }
});