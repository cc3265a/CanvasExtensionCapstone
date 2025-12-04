

console.log("here");
var script = document.createElement('script');
script.type = 'text/javascript';

script.src = ""; //'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js';
document.body.appendChild(script);

const inputElement = document.getElementById("tinymce");

addEventListener("click", add_tab);

function add_tab(e){

  // console.log(tinymce.activeEditor.selection);

  console.log("here");
  // console.log(inputElement.selectionStart);

  //grab the location of the textbox and what is currently in it
  let iframeObj = document.getElementById("textentry_text_ifr").contentWindow;
  let bodyDiv = iframeObj.document.querySelector("body");
  let innerHTMLObj = bodyDiv.innerHTML;

  //the tab object to be inserted at will
  let tabObj= '&nbsp;';

  //slice text into seperate paragraphs
  let pArray = innerHTMLObj.split("<p>");
  console.log(pArray);

  //remove broken slices
  for (i = 0; i < pArray.length; i++){
    if (pArray[i] == ""){
      pArray.splice(i, 1);
    }
  }
  console.log(pArray);

  // get first paragraph
  let firstPArrObj = pArray[0];
  console.log("first pArrObj = " + firstPArrObj);

  let myNum = 1;
  let newHTML;
  let newP;

  if (myNum === 0){
    // add tab to first paragraph
    newP = `<p>` + tabObj + firstPArrObj;
    console.log("myNum == 0");
  }
  else{
    newP = tabObj + firstPArrObj;
    console.log("my num != 0");
  }
  newHTML = newP;
  console.log("this newHTML is " + newHTML);

  for (let i = 1; i < pArray.length; i++){
    if (i === myNum){
      newHTML = newHTML + `<p>&nbsp` + pArray[i];
    }
    else{
      newHTML = newHTML + pArray[i];
    }
    console.log("i = " + pArray[i]);
  }
  
  bodyDiv.innerHTML = newHTML;
  console.log("newHTML = " + newHTML);

}


