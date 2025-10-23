// console.log("this is a web page");

let hostNameVar = window.location.hostname;
// console.log(hostNameVar);
let dotLoc = hostNameVar.indexOf(".");
// console.log(dotLoc);
let newName = hostNameVar.slice(dotLoc+1);
// console.log(newName + " is the host name!");

if (newName == "instructure.com"){
  // console.log("this is canvas")
}


addEventListener("click", findBox);

function findBox(e){
  let iframeObj = document.getElementById("textentry_text_ifr");
  // console.log("iframe is" + iframeObj);

  let iframeObj2 = document.getElementById("textentry_text_ifr").contentWindow;
  // console.log("iframe2 is" + iframeObj2);

  let pDiv = iframeObj2.document.querySelector("p");
  // console.log(pDiv);

  let innerHTMLObj = pDiv.innerHTML;
  console.log(innerHTMLObj); 

  // pDiv.innerText = "HELP ME";
  // pDiv.innerHTML = <pre>  hello</pre>;

  let tabObj= '&emsp;h';
  pDiv.innerHTML = innerHTMLObj + tabObj;

  let myItem = iframeObj2.document.querySelector("#tinymce");
  // console.log(myItem.activeEditor.selection);
}


//<button ="Italic" >
function setUpButton() 
{
  let questionToolbars = document.querySelectorAll(tox-toolbar__primary);

  let tabButton = document.createElement(button);
  tabButton.classList.add("tox-tbtn");
  tabButton.setAttribute("aria-label", "Tab");
  tabButton.setAttribute("title", "Tab");
  tabButton.setAttribute("type","button");
  tabButton.setAttribute("tabindex", "-1");
  tabButton.setAttribute("aria-disabled", "false");
  tabButton.setAttribute("aria-pressed", "false");

  let iconWrapper = document.createElement("span");
  iconWrapper.classList.add("tox-icon tox-tbtn__icon-wrap");

  //<svg viewBox="" xmlns="http://www.w3.org/2000/svg" focusable="false">
  let iconSVG = document.createElement("svg");
  iconSVG.setAttribute("viewBox", "0 0 1920 1920");
  iconSVG.setAttribute("focusable", "false");
  iconSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  //path is the icon for the image (sample triangle from w3: M150 5 L75 200 L225 200 Z)
  let iconImage = document.createElement("path");
  iconImage.setAttribute("d", "M150 5 L75 200 L225 200 Z");
  iconImage.setAttribute("fill-rule", "evenodd");

  iconSVG.appendChild(iconImage);
  iconWrapper.appendChild(iconSVG);
  tabButton.appendChild(iconWrapper);

}

addEventListener("onclick", findbox());
