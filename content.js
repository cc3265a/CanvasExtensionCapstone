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
}
