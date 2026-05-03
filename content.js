const AllowedPageTypes = ["Quiz", "Discussion", "Teacher View", "Test"];

var toolboxCount = 0;
var WebPageType = findType();
var textBoxes = [];
var buttonPos = 0;
var buttonClicked = 0;
var foundtoolbars = 0;
var questionsNoted = [];
var tabReplaceSet = '~';

// var script = document.createElement('script');
// script.type = 'text/javascript';

// script.src = ""; //'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js';
// document.body.appendChild(script);
// const inputElement = document.getElementById("tinymce");


//on load of website code
window.onload = function() {
    console.log(findType());
    //console.log("canvas extension:",  findType());
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
    console.log("canvas extension:",  "new run");
    //look for quiz content
    console.log("canvas extension:",  document.querySelector(`[aria-label="${"Quiz content"}"]`)); 
    if (existsCheck(quizContent = document.querySelector(`[aria-label="${"Quiz content"}"]`))) //randobly doesnt load?
    {
        console.log("canvas extension:",  "doc type quiz");
        return "Quiz";
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
        console.log("my doc is = ");
        console.log(document);
        console.log("my doc's first child is")
        console.log(document.body);
        console.log("my doc thing is = ");
        console.log(document.activeElement);
        let myHold = document.body
        console.log("my text boxes");
        // console.log(document.querySelectorAll('*[id]'));
        let textBoxThings = document.querySelectorAll('iframe   ');
        console.log(textBoxThings);

        let myThing = document.getElementById("message-body-root_ifr");
        let myThing2 = document.getElementsByClassName("tox-edit-area active");
        // myThing = document.getElementById("tox-editor-container");
        console.log("mything2: ");
        console.log(myThing2);

        let thing2IFrame = myThing2.item(0);
        console.log(thing2IFrame);
        let myIFrame = thing2IFrame.contentWindow;
        console.log(myIFrame);
        textBoxes.push(myIFrame.document.getElementById("tinymce"));
        console.log(textBoxes);
    }
    
}

function findType() 
{
    let pageType = "";
    const bodyObjects = document.querySelectorAll('body');
    bodyElement = bodyObjects[0];
    //console.log("canvas extension:",  bodyElement);

    const classString = bodyElement.className
    //console.log("canvas extension:",  classString);
    //console.log("canvas extension:",  typeof classString);

    if (classString.includes("with"))
    {
        if (classString.includes("quizzes")) 
        {
            console.log("canvas extension:",  "doc type quiz");
            pageType = "Quiz";
        }
        else if (classString.includes("discussions")) 
        {
            console.log("canvas extension:",  "doc type discussion");
            pageType = "Discussion";
        }
        else if (classString.includes("student-view")) 
        {
            console.log("canvas extension:",  "doc type teacher");
            pageType = "Quiz"
            //processTeacherView(); why is it like this. why is canvas programed like this.
        }
        else 
        {
            console.log("canvas extension:",  "other canvas page");
            pageType = "Other"
        }
    }
    else 
    {
        console.log("canvas extension:",  "not canvas");
        pageType = "none"
    }

    return pageType;
}

//on click of website
window.onclick = () => 
{
    console.log("canvas extension:",  "toolboxCount", toolboxCount);
    if (WebPageType == "Discussion") 
    {
        console.log("textBoxes")
        console.log("canvas extension:",  "discussion clicked");
        questionCount = countToolbars();
        console.log("canvas extension:",  "count returned: ", questionCount);
        console.log("canvas extension:",  "toolboxes filled: ", toolboxCount);

        if (questionCount > textBoxes.length) 
        {
            textBoxes = document.querySelectorAll('iframe[id^="message-body-"]')
            console.log("canvas extension:",  textBoxes);
        }

        if (questionCount != toolboxCount) 
        {
            processToolBars(WebPageType);
        }
    }
}

//on scroll of website code
window.onscroll = function() 
{
    //if this is not a page we have targeted to act on, disregard
    if (!AllowedPageTypes.includes(WebPageType)) 
    {
        console.log("canvas extension:",  "not canvas, not running");
        console.log("canvas extension:",  WebPageType);
        return;
    }
    //console.log("canvas extension:",  "running onscroll");

    questionCount = countToolbars();
    //logic to decide how much of the website to run
    if (WebPageType == "Quiz") 
    {
        if (questionCount != toolboxCount) 
        {
            //buttonPos = 0;
            processToolBars(WebPageType)
        }

        if (questionCount > textBoxes.length) 
        {
            textBoxes = [];
            console.log("canvas extension:",  questionCount, " < ", textBoxes.length, " ran")
            for (let i = 0; i < questionCount; i++)
            {
                //let frameId = `question_input_${i}_ifr`;
                let frameId = "question_input_"
                frameId = frameId.concat(i.toString());
                frameId = frameId.concat("_ifr");
                //console.log("canvas extension:",  frameId);
                textBoxes.push(document.getElementById(frameId));
            }
            console.log("canvas extension:",  textBoxes);
        }
    }

    if (WebPageType == "Discussion") 
    {
        console.log("canvas extension:",  "count returned: ", questionCount);
        console.log("canvas extension:",  "toolboxes filled: ", toolboxCount);
    }
  
}

function processTeacherView() 
{
    //check if there is quiz conntent on the page
    quizContent = document.querySelector(`[aria-label="${"Quiz content"}"]`);
    console.log("canvas extension:",  "techer view", quizContent);
}

function countToolbars() 
{
    console.log("canvas extension:",  "counted");
    let toolbars = [];
    let allBars =  document.querySelectorAll(".tox-toolbar__group");     
    
    for (const bar of allBars) 
    {
        if (bar.title == "Formatting") 
        {
            console.log("format");
            toolbars.push(bar);
        }
    }
    console.log("canvas extension:",  "all bars: " + allBars.length);
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
    console.log("canvas extension:",  "finding tool bars");
    //console.log("canvas extension:",  pageType);
    if (pageType == "Quiz") 
    {
        console.log("canvas extension:",  "ran toolbar if");
        let allBars =  document.querySelectorAll(".tox-toolbar__group");     
        //console.log("canvas extension:",  "all bars: " + allBars.length)
        for (const bar of allBars) 
        {
            if (bar.title == "Formatting" && bar.id != "hasButton") 
            {
                console.log("canvas extension:",  bar, "status: ", checkForButton(bar));
                toolbars.push(bar);
            }
        }

        //console.log("canvas extension:",  toolbars);
        //console.log("canvas extension:",  "length " + toolbars.length)
    }
    else if (pageType == "Discussion") 
    {
        console.log("canvas extension:",  "ran toolbar if");
        let allBars =  document.querySelectorAll(".tox-toolbar__group");     
        //console.log("canvas extension:",  "all bars: " + allBars.length)
        for (const bar of allBars) 
        {
            if (bar.title == "Formatting" && bar.id != "hasButton") 
            {
                console.log("canvas extension:",  bar, "status: ", checkForButton(bar));
                toolbars.push(bar);
            }
        }
    }
    for (const bar of toolbars)     
    {
        console.log("canvas extension:",  bar);
        if (checkForButton(bar) == false) 
        {
            addButton(bar)
        }
    }

function checkForButton(toolbar) 
{
    var hasButton = toolbar.id == "hasButton";
    //console.log("canvas extension:",  toolbar + " status = " + hasButton)
    return hasButton
}

//button code, designs functionality
function addButton(toolbar) 
{
    console.log("canvas extension:",  "added button to ", buttonPos)
    let tabButton = document.createElement('button');
    tabButton.classList.add('tox-tbtn');

    let newID = "addedButton_";
    newID = newID.concat(buttonPos.toString())
    questionsNoted.push(buttonPos);
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
    toolbar.setAttribute("id", "hasButton")
}


//add tab on click code
function tabClicked(e) 
{
    e.preventDefault();
    console.log("canvas extension:",  "clicked")
    //console.log("canvas extension:",  e.target);
    buttonClicked = e.target
    add_tab(buttonClicked)
    return false;
}

const inputElement = document.getElementById("tinymce");

function add_tab(buttonClicked) 
{
    console.log("Rin Checkpoint");
    console.log(buttonClicked)
    let buttonIdParts = buttonClicked.id.split("_")
    let selectedQuestion = Number(buttonIdParts[1])
    console.log("ID = " + selectedQuestion)

    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGot, onError);
    console.log(gettingItem);

    function onGot(item) {
        console.log(item);
        if (item.tabValue != null){
            console.log(item.tabValue);
            tabReplaceSet = item.tabValue;
        }
        else{
            console.log("NULL");
        }
    }
    function onError(error) {
        console.log(`Error: ${error}`);
    }
    console.log("tabReplaceSet = " + tabReplaceSet);
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
  iframeObj = selectedIframe.contentWindow;
        bodyDiv = iframeObj.document.querySelector("body");
   /* if (myThing == null){
        
    }

    if (myThing != null){
        iframeObj = myThing;
        console.log("textboxes = " + textBoxes);
        console.log("textbox[0] = " + textBoxes[0]);
        bodyDiv = textBoxes[0];
        console.log(bodyDiv);
    }
    */
  let innerHTMLObj = bodyDiv.innerHTML;
  console.log("innerHTML is: " + innerHTMLObj);

  //the tab object to be inserted at will
  let tabObj= '&nbsp;&nbsp;&nbsp;&nbsp;';
  let wideTabObj = '&numsp;&numsp;';

  //grab whats in the textbox
  let textString = innerHTMLObj.toString();


  //from other popup, in as temp value while popup is troubleshooted 
  let tabValue = '~';
  let tabReplacable = '~';
  //let tabValue = getVal();
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
}
async function wahoo() {
    // const myModule = import("./popup.js");
    // use myModule

    // let gottenVal = getVal();
    // console.log(gottenVal);
    // console.log(tabValue);
//Show added paragraphs


//revert added paragraphs
}

//helper function to locate the specific value of the iframe
function locate_iframe(selectedBox, pageType) 
{
    console.log("canvas extension:",  "selectedBox", selectedBox);
}


//helper method to check if a value is null
//no calls to this currently. it exists to enable something i want to pursue eventually but right now am not using.
function existsCheck(obj) 
{
    console.log("canvas extension:",  "running check")
    if (obj && obj !== 'null' && obj !== 'undefined') 
    {
        console.log("canvas extension:",  "passed existance check");
        return true;
    }
    else 
    {
        console.log("canvas extension:",  "failed existence check");
        return false;
    }
    //return (obj && obj !== 'null' && obj !== 'undefined');
}

wahoo();



// import {tabValue} from './popup.js';
// let tabTextInput = tabValue;
// console.log(tabTextInput);