import { tabValue } from './popup.js';

var toolboxCount = 0;
var WebPageType = findType();
var textBoxes = [];
var buttonPos = 0;
var buttonClicked = 0;
var foundtoolbars = 0;
window.onload = function() {
    console.log(findType());
    WebPageType = findType();
    
};

window.onmouseup = function() 
{
    console.log("mouseup");
    questionCount = countToolbars();
    findType();
    if (WebPageType == "Discussion" || WebPageType == "Quiz") 
    {
        processToolBars(WebPageType);
        console.log("quiz or discussion webpagetype");
        if (questionCount != toolboxCount) 
        {
            buttonPos = 0;
            // processToolBars(WebPageType);
        }
    }

    if (WebPageType == "Quiz"){
        if (questionCount > textBoxes.length) 
    {
        textBoxes = [];
        console.log(questionCount, " < ", textBoxes.length, " ran")
        for (let i = 0; i < questionCount; i++)
        {
            //let frameId = `question_input_${i}_ifr`;
            let frameId = "question_input_"
            frameId = frameId.concat(i.toString());
            frameId = frameId.concat("_ifr");
            //console.log(frameId);
            textBoxes.push(document.getElementById(frameId));
        }
        console.log(textBoxes);
    }
    }
    
    if (WebPageType == "Discussion") 
    {
        console.log("HEREAGAIN");
        textBoxes = [];

        myThing = document.getElementById("message-body-root_ifr");
        console.log("mything: ");
        console.log(myThing);

        let myIFrame = myThing.contentWindow;
        console.log(myIFrame);
        textBoxes.push(myIFrame.document.getElementById("tinymce"));
        console.log(textBoxes);
    }
    
}

function findType() 
{
    let pageType = "";
    const bodyObjects = document.querySelectorAll('body');
    let bodyElement = bodyObjects[0];
    console.log(bodyObjects);
    console.log(bodyElement);

    const classString = bodyElement.className
    console.log(classString);
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
            WebPageType = "Discussion";
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
            console.log("format");
            toolbars.push(bar);
        }
    }
    return toolbars.length
}

function processToolBars(pageType) 
{
    let toolbars = [];
    console.log("finding tool bars");
    console.log(pageType);
    if (foundtoolbars < 1){
        if (pageType == "Quiz" || pageType == "Discussion") 
        {
            let allBars =  document.querySelectorAll(".tox-toolbar__group");     
            console.log("process");
            //console.log("all bars: " + allBars.length)
            for (const bar of allBars) 
            {
                if (bar.title == "Formatting") 
                {
                    toolbars.push(bar);
                    foundtoolbars++;
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

const inputElement = document.getElementById("tinymce");


function add_tab(buttonClicked){

    console.log(buttonClicked)
    let buttonIdParts = buttonClicked.id.split("_")
    let selectedQuestion = Number(buttonIdParts[1])
    console.log("ID = " + selectedQuestion)


  //grab the location of the textbox and what is currently in it
  //doesnt work for discussion so an error is thrown but there is a workaround below so its ok
  console.log("textboxes: " + textBoxes);
  console.log("selectedQuestion: " + textBoxes[selectedQuestion]);
    let selectedIframe = textBoxes[selectedQuestion];
    console.log(selectedIframe);
    //console.log(selectedIframe);

  let iframeObj;
  let bodyDiv;
  //rn this is for quiz vs discussion, myThing means its a discussion board
  if (myThing == null){
    iframeObj = selectedIframe.contentWindow;
    bodyDiv = iframeObj.document.querySelector("body");
  }
  if (myThing != null){
    iframeObj = myThing;
    console.log("textboxes = " + textBoxes);
    console.log("textbox[0] = " + textBoxes[0]);
    bodyDiv = textBoxes[0];
    console.log(bodyDiv);
  }
  let innerHTMLObj = bodyDiv.innerHTML;
  console.log("innerHTML is: " + innerHTMLObj);

  //the tab object to be inserted at will
  let tabObj= '&nbsp;&nbsp;&nbsp;&nbsp;';
  let wideTabObj = '&numsp;&numsp;';

  //grab whats in the textbox
  let textString = innerHTMLObj.toString();

  let tabReplacable = '~';
  if (tabValue != null){
    tabReplacable = tabValue;
    console.log("YES YEAH YIPPEE");
  }
  else{
    console.log("NOOOO");
  }
  console.log(tabReplacable);

  //replace any instances of "TAB" with tabObj, loop through until all TABs are replaced
  let Tabbed = textString.replace(tabReplacable, wideTabObj);
  console.log(Tabbed);
  while (Tabbed != Tabbed.replace(tabReplacable, wideTabObj)){
    Tabbed = Tabbed.replace(tabReplacable, wideTabObj);
  }

  //set newly tabbed string as text
  bodyDiv.innerHTML = Tabbed;

}

async function wahoo() {
    // const myModule = import("./popup.js");
    // use myModule

    // let gottenVal = getVal();
    // console.log(gottenVal);
    console.log(tabValue);
}

wahoo();



// import {tabValue} from './popup.js';
// let tabTextInput = tabValue;
// console.log(tabTextInput);