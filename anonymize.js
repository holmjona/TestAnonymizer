/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
holmjona - Test Anonymizer
-- Hides names of students when grading tests so that 
-- grading can be anonymous and more fair.
++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

var anonymUrlParams = new URLSearchParams(window.location.search);

// for (let param_key of anonym_url_params){
//     alert(param_key);
// }
if (anonymUrlParams.has("mode") &&
    anonymUrlParams.get("mode") !== "grading") {
    let options_forms = document.getElementsByClassName("mform");
    // assume first form is correct one.
    let fm = options_forms[0];

    // make grade report link
    let lnk = document.createElement("a");
    lnk.innerText = "Go to Manual Grading Page";

    let mode = anonymUrlParams.get("mode");
    // modifying window.location redirects viewport
    let oldURL = window.location + ""; // convert to string 
    // now as string we can modify the path.
    let newURL = oldURL.replace("mode=" + mode, "mode=grading");

    lnk.setAttribute("href", newURL);
    fm.appendChild(lnk);
}

// Need to eventually make a control panel. 
// var anonym_content = document.getElementById("maincontent");
// var anonym_holder = document.createElement("p");
// anonym_holder.innerText = "Hello";
// anonym_content.appendChild(anonym_holder);

// find h4s with student names in them. 
var anonymH4s = document.getElementsByTagName("h4");
var anonymH4sFound = false;
for (let h of anonymH4s) {
    let txt = h.innerText;
    // some h4s are not student names.
    if (txt.indexOf("Attempt number") > -1) {
        // only hide student names. 
        anonymH4sFound = true;
        h.style.display = "none";
    }
}

// inform user that student names have been hidden.
if (anonymH4sFound) {

    alert("Student names will be hidden on this page for anonymous grading.\n" +
        "To view the solution for each question, use the button provided..\n" +
        "To enter comments, use the button provided.")

    // hide solutions
    var solutionDivs = document.getElementsByClassName("graderinfo");
    for (let dv of solutionDivs) {
        dv.style.display = "none";
        dv.parentElement.insertBefore(getButton("Solution"), dv);
    }

    // hide comments
    var fieldDivs = document.getElementsByClassName("fcontainer");
    for (let fdv of fieldDivs) {
        let items = fdv.getElementsByClassName("fitem");
        let htmlEditor = fdv.getElementsByClassName("fhtmleditor");
        // only use when field set contains html editor.
        if (htmlEditor.length > 0) {
            // first item is comments  // second is points
            let dv = items[0];
            dv.style.display = "none";
            fdv.insertBefore(getButton("Comments"), dv);
        }
    }


}

// function to handle visibility toggles
function toggleVisibilityClick(evt) {
    evt = evt || window.event;
    let nxt = this.nextElementSibling;
    let spnText = this.getElementsByTagName("span")[0];
    let spnArrow = this.getElementsByTagName("span")[1];
    if (nxt.style.display === "none") {
        nxt.style.display = "block";
        spnText.innerText = "Hide"
        spnArrow.innerHTML = "&#9651;"; // up hollow
        this.style.backgroundColor = "#FEE";
    } else {
        nxt.style.display = "none";
        spnText.innerText = "Show"
        spnArrow.innerHTML = "&#9654;"; // right
        this.style.backgroundColor = "#EFE";
    }
    return false;
}

function getButton(nameToToggle) {
    let btn = document.createElement("button");
    // use span for toggle word
    btn.innerHTML = "<span class='actionText'>Show</span> "
        + nameToToggle
        + " <span class='directionIcon'>&#9654;</span>";
    //&#8651;
    btn.onclick = toggleVisibilityClick;
    btn.style.backgroundColor = "#EFE";
    return btn;
}

