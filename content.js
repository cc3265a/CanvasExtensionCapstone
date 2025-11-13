


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
  let iframeObj = document.getElementById("textentry_text_ifr").contentWindow;

  let bodyDiv = iframeObj.document.querySelector("body");

  let innerHTMLObj = bodyDiv.innerHTML;

  let tabObj= '&nbsp;';

  let pArray = innerHTMLObj.split("<p>");
  console.log(pArray);

  for (i = 0; i < pArray.length; i++){
    if (pArray[i] == ""){
      pArray.splice(i, 1);
    }
  }
  console.log(pArray);

  let firstPArrObj = pArray[0];
  console.log("first pArrObj = " + firstPArrObj);

  let newP = `<p>` + tabObj + firstPArrObj;
  console.log("the newP is = " + newP);

  let newHTML = newP;
  for (let i = 1; i < pArray.length; i++){
    newHTML = newHTML + `<p>&nbsp` + pArray[i];
    console.log("i = " + pArray[i]);
  }
  // newHTML = newHTML + newP;


  bodyDiv.innerHTML = newHTML;
  console.log("newHTML = " + newHTML);

}


