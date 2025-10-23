console.log("this is a web page");

let hostNameVar = window.location.hostname;
// console.log(hostNameVar);
let dotLoc = hostNameVar.indexOf(".");
// console.log(dotLoc);
let newName = hostNameVar.slice(dotLoc+1);
console.log(newName + " is the host name!");

if (newName == "instructure.com"){
  console.log("this is canvas")
}



// addEventListener("DOMContentLoaded", (event) => { 
//   let textDiv = document.getElementsByClassName("input-block-level");
//   textDiv.innerHTML = "<p style='background-color: red'>";
//   console.log(textDiv.innerText);
// })

addEventListener("click", findBox);

function findBox(e){
  let textDiv = document.querySelector("#tinymce");
  // textDiv.innerHTML = "<p style='background-color: red'>";
  console.log(textDiv);
}


/* NOTES FROM QUIZ:
Noteable div classes
- class="form-control textarea-question-holder"
- class="tox tox-tinymce tox-tinymce--toolbar-sticky-off"

- class="tox-editor-container" (style editor BUTTONS HERE)


- class = "tox-sidebar-wrap"
  - class="tox-edit-area active""
*/