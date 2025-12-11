var toolboxCount = 0;
const WebPageType = findType();
var textBoxes = [];
var buttonPos = 0;
var buttonClicked = 0;

window.onload = function() {
    //console.log(findType());
    WebPageType = findType();
    
};

window.onscroll = function() 
{
    questionCount = countToolbars();
    if (WebPageType == "Quiz") 
    {
        if (questionCount != toolboxCount) 
        {
            processToolBars(WebPageType)
        }
    }

    if (questionCount > textBoxes.length) 
    {
        textBoxes = [];
        console.log(questionCount, " < ", textBoxes.length, " ran")
        for (let i = 1; i <= questionCount + 1; i++)
        {
            //let frameId = `question_input_${i}_ifr`;
            let frameId = "question_input_"
            frameId = frameId.concat(i.toString());
            frameId = frameId.concat("_ifr");
            //console.log(frameId);
            textBoxes.push(document.getElementById(frameId));
            console.log(textBoxes);
        }
    }
    
}

function findType() 
{
    let pageType = "";
    const bodyObjects = document.querySelectorAll('body');
    bodyElement = bodyObjects[0];
    //console.log(bodyElement);

    const classString = bodyElement.className
    //console.log(classString);
    //console.log(typeof classString);

    if (classString.includes("with"))
    {
        if (classString.includes("quizzes")) 
        {
            console.log("doc type quiz");
            pageType = "Quiz";
        }
        else if (classString.includes("discussions")) 
        {
            console.log("doc type discussion");
            pageType = "Dicussion";
        }
        else 
        {
            console.log("other canvas page");
            pageType = "Other"
        }
    }
    else 
    {
        console.log("not canvas");
        pageType = "none"
    }

    return pageType;
}

function countToolbars() 
{
    let toolbars = [];
    let allBars =  document.querySelectorAll(".tox-toolbar__group");     
    //console.log("all bars: " + allBars.length)
    for (const bar of allBars) 
    {
        if (bar.title == "Formatting") 
        {
            toolbars.push(bar);
        }
    }
    return toolbars.length
}

function processToolBars(pageType) 
{
    let toolbars = [];
    console.log("finding tool bars");
    //console.log(pageType);
    if (pageType == "Quiz") 
    {
        let allBars =  document.querySelectorAll(".tox-toolbar__group");     
        //console.log("all bars: " + allBars.length)
        for (const bar of allBars) 
        {
            if (bar.title == "Formatting") 
            {
                toolbars.push(bar);
            }
        }

        //console.log(toolbars);
        //console.log("length " + toolbars.length)
    }
    for (const bar of toolbars)     
    {
        console.log(bar);
        if (checkForButton(bar) == false) 
        {
            addButton(bar)
        }
    }
    toolboxCount = toolbars.length
}

function checkForButton(toolbar) 
{
    var hasButton = toolbar.querySelector("#addedButton") != null;
    //console.log(toolbar + " status = " + hasButton)
    return hasButton
}

function addButton(toolbar) 
{
    let tabButton = document.createElement('button');
    tabButton.classList.add('tox-tbtn');

    let newID = "addedButton_";
    newID = newID.concat(buttonPos.toString())
    buttonPos += 1;
    tabButton.id = newID;
    tabButton.innerHTML = "P";
    tabButton.title = "Add Tab Indent";
    tabButton.ariaLabel = "Add Tab Indent";
    tabButton.tabIndex = "-1";

    tabButton.ariaDisabled = false;
    tabButton.ariaPressed = false;
    tabButton.addEventListener("click", tabClicked);
    toolbar.appendChild(tabButton);
}

function tabClicked(e) 
{
    e.preventDefault();
    console.log("clicked")
    //console.log(e.target);
    buttonClicked = e.target
    add_tab(buttonClicked)
    return false;
}


console.log("here");
var script = document.createElement('script');
script.type = 'text/javascript';

script.src = ""; //'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js';
document.body.appendChild(script);

const inputElement = document.getElementById("tinymce");

//addEventListener("click", add_tab);

function add_tab(buttonClicked){

    console.log(buttonClicked)
    let buttonIdParts = buttonClicked.id.split("_")
    let selectedQuestion = Number(buttonIdParts[1])
    console.log(selectedQuestion)
  // console.log(tinymce.activeEditor.selection);

  // console.log(inputElement.selectionStart);

  //grab the location of the textbox and what is currently in it
    let selectedIframe = textBoxes[selectedQuestion];
    //console.log(selectedIframe);

  //console.log("found", document.getElementById("textentry_text_ifr"));
  let iframeObj = selectedIframe.contentWindow;
  let bodyDiv = iframeObj.document.querySelector("body");
  let innerHTMLObj = bodyDiv.innerHTML;

  //the tab object to be inserted at will
  let tabObj= '&nbsp;';

  //slice text into seperate paragraphs
  let pArray = innerHTMLObj.split("<p>");
  console.log(pArray);

  //remove broken slices
  for (i = 0; i < pArray.length; i++){
    if (pArray[i] == "" | pArray[i] == "</p>"){
      pArray.splice(i, 1);
    }
  }
  console.log(pArray);

  // get first paragraph
  let firstPArrObj = pArray[0];
  console.log("first pArrObj = " + firstPArrObj);

  let myNum = 1;
  let newHTML = firstPArrObj;
  let newP;

  // if (myNum === 0){
  //   // add tab to first paragraph
  //   newP = `<p>` + tabObj + firstPArrObj;
  //   console.log("myNum == 0");
  // }
  // else{
  //   newP = tabObj + firstPArrObj;
  //   console.log("my num != 0");
  // }
  // newHTML = newP;
  // console.log("this newHTML is " + newHTML);

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


