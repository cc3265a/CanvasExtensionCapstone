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

console.log("test");

let header = document.querySelector(".ic-app-crumbs ic-app-crumbs-enhanced-rubrics")
console.log("header" + header);

let replyButtonQuery = document.querySelector(".css-1hxiviv-view--inlineBlock-baseButton");
let replyButtonId = document.getElementById("discussion-topic-reply");
console.log("button query = " + replyButtonQuery);
console.log(replyButtonQuery.className);
//console.log("button id = " + replyButtonId);
replyButtonQuery.addEventListener("click", findDiscussionBox);
//addEventListener("click", addButton);

//addButton();
//onLaunch();
testButton();

function testButton() 
{
  console.log("added button")
  let testButton = document.createElement("button");
  testButton.classList.add("testing-button")
  testButton.addEventListener("click", clicked)
}

function clicked() 
{
  console.log("clicked button");
}


function onLaunch() 
{
  console.log("launched");
  
}

function addButton() 
{
  console.log("run button");
  let toolbar = document.querySelector(".tox-toolbar__group");
  console.log("toolbar " + toolbar);

  let testButton = document.createElement('button');
  testButton.innerHTML = "test";
  testButton.addEventListener("click", printTest);
  toolbar.appendChild(testButton);
}

function printTest() 
{
  console.log("pushed");
}

function findDiscussionBox(e){
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

function findQuizBox(e) 
{
  let iframeObj = document.getElementById("question_input_0_ifr");
  console.log("quiz iframe is " + iframeObj);

  let iframeObj2 = document.getElementById("question_input_0_ifr").contentWindow;
  console.log("quiz iframe window is " + iframeObj2);

  let pDiv = iframeObj2.document.querySelector("p");
  console.log("quiz " + pDiv);
  console.log("innerhtml = " + pDiv.innerHTML);
}

function findAnnouncementBox(e) 
{
  let iframeObj = document.getElementById("discussion-topic-message-body_ifr");
  console.log("announcement is " + iframeObj);

  let iframeObj2 = document.getElementById("discussion-topic-message-body_ifr").contentWindow;
  console.log("announcement is " + iframeObj2);

  let pDiv = iframeObj2.document.querySelector("p");
  console.log("quiz " + pDiv);
  console.log("innerHTML = " + pDiv.innerHTML);
}

function findDiscussionBox(e) 
{
  let iframeObj = document.getElementById("message-body-root_ifr");
  console.log("discussion is " + iframeObj);

  let iframeObj2 = document.getElementById("message-body-root_ifr").contentWindow;
  console.log("discussion is " + iframeObj2);

  let pDiv = iframeObj2.document.querySelector("p");
  console.log("quiz " + pDiv);
  console.log("innerHTML = " + pDiv.innerHTML);
}