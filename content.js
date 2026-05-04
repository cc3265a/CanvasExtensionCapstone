<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { getVal } from './popup.js';
=======
//import { getVal } from './popup.js';
const AllowedPageTypes = ["Quiz", "Discussion", "Teacher View", "Test"];
>>>>>>> Stashed changes

var toolboxCount = 0;
=======
const AllowedPageTypes = ["QUIZ", "DISCUSSION", "OTHER CANVAS", "ANNOUNCEMENT"];

var toolBarCount = 0;
>>>>>>> Stashed changes
var WebPageType = findType();
var textBoxes = [];
var buttonPos = 0;
var buttonClicked = 0;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
var foundtoolbars = 0;
=======
var questionsNoted = [];
>>>>>>> Stashed changes
=======
var foundtoolbars = 0;
var questionsNoted = [];
var tabReplaceSet = '~';
>>>>>>> Stashed changes

// var script = document.createElement('script');
// script.type = 'text/javascript';

// script.src = ""; //'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js';
// document.body.appendChild(script);
// const inputElement = document.getElementById("tinymce");


//on load of website code
window.onload = function() {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    console.log(findType());
=======
    //console.log("canvas extension:",  findType());
>>>>>>> Stashed changes
    WebPageType = findType();
};

window.onmouseup = function() 
{
<<<<<<< Updated upstream
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
=======
    console.log("canvas extension:",  "new run");
    //look for quiz content
    console.log("canvas extension:",  document.querySelector(`[aria-label="${"Quiz content"}"]`)); 
    if (existsCheck(quizContent = document.querySelector(`[aria-label="${"Quiz content"}"]`))) //randobly doesnt load?
    {
        console.log("canvas extension:",  "doc type quiz");
        return "Quiz";
>>>>>>> Stashed changes
    }

    if (WebPageType == "Quiz"){
        if (questionCount > textBoxes.length) 
    {
        textBoxes = [];
        console.log(questionCount, " < ", textBoxes.length, " ran")
        for (let i = 0; i < questionCount; i++)
=======
    //console.log(findType());
    //console.log("canvas extension:",  findType());
    WebPageType = findType();
};

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
            //console.log("canvas extension:",  "doc type quiz");
            pageType = "QUIZ";
        }
        else if (classString.includes("discussions")) 
        {
            //console.log("canvas extension:",  "doc type discussion");
            pageType = "DISCUSSION";
        }
        else if (classString.includes("student-view")) 
        {
            console.log("canvas extension:",  "doc type teacher");
            pageType = "QUIZ"
            //processTeacherView(); why is it like this. why is canvas programed like this.
        }
        else 
        {
            let checkAnnouncement = document.querySelector('.css-f647ev-view-flexItem');
            //console.log("canvas extension:", "checkAnnouncement", checkAnnouncement)
            if (checkAnnouncement != null) 
            {
                const announcemntText = Array.from(document.querySelectorAll('h1'))
                   .some(el => el.textContent.trim() === "Create Announcement");
                //console.log("canvas extension: ", "text search test", announcemntText);
                pageType = "ANNOUNCEMENT"
            }
            else 
            {
                //console.log("canvas extension:",  "other canvas page");
                pageType = "OTHER CANVAS"
            }
            
        }
    }
    else 
    {
        console.log("canvas extension:",  "not canvas");
        pageType = "none"
    }
    return pageType;
};

//on click of website
window.onclick = () => 
{
   
    if (WebPageType == "DISCUSSION") 
    {
        //console.log("textBoxes")
        //console.log("canvas extension:",  "discussion clicked");
        //console.log("canvas extension:",  "count returned: ", questionCount);
        //console.log("canvas extension:",  "toolboxes filled: ", toolBarCount);
        questionCount = countToolbars();

        if (questionCount > textBoxes.length) 
        {
            textBoxes = document.querySelectorAll('iframe[id^="message-body-"]')
            //console.log("canvas extension: textboxes",  textBoxes);
        }

        if (questionCount != toolBarCount) 
        {
            processToolBars(WebPageType);
        }

        let replyFrame = findDiscussionFrames()
        //console.log("canvas extension: textboxes", textBoxes)
        //console.log("canvas extension: replyFrame", replyFrame)
        //let replyFrame2 = document.getElementsByClassName("tox-edit-area active");
    }
};

//on scroll of website code
window.onscroll = function() 
{
    //if this is not a page we have targeted to act on, disregard
    if (!AllowedPageTypes.includes(WebPageType)) 
    {
        console.log("canvas extension:",  "not canvas, not running");
        //console.log("canvas extension:",  WebPageType);
        return;
    }
    //console.log("canvas extension:",  "running onscroll");

    
    //logic to decide how much of the website to run
    if (WebPageType == "QUIZ") 
    {
        questionCount = countToolbars();
        if (questionCount != toolBarCount) 
        {
            //buttonPos = 0;
            processToolBars(WebPageType)
        }

        if (questionCount > textBoxes.length) 
>>>>>>> Stashed changes
        {
            textBoxes = [];
            //console.log("canvas extension:",  questionCount, " < ", textBoxes.length, " ran")
            for (let i = 0; i < questionCount; i++)
            {
                //let frameId = `question_input_${i}_ifr`;
                let frameId = "question_input_"
                frameId = frameId.concat(i.toString());
                frameId = frameId.concat("_ifr");
                //console.log("canvas extension:",  frameId);
                textBoxes.push(document.getElementById(frameId));
            }
            //console.log("canvas extension:",  textBoxes);
        }
    }
<<<<<<< Updated upstream
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
=======
    else if (WebPageType == "ANNOUNCEMENT") 
    {
        //console.log("canvas extension:", "announcement toolBarCount", toolBarCount)
        if (toolBarCount != 1) 
        {
            processToolBars(WebPageType);
        }
    };
};
>>>>>>> Stashed changes

function findType() 
{
    let pageType = "";
    const bodyObjects = document.querySelectorAll('body');
<<<<<<< Updated upstream
    let bodyElement = bodyObjects[0];
    console.log(bodyObjects);
    console.log(bodyElement);

    const classString = bodyElement.className
    console.log(classString);
    //console.log(typeof classString);
=======
    bodyElement = bodyObjects[0];
    //console.log("canvas extension:",  bodyElement);

    const classString = bodyElement.className
    //console.log("canvas extension:",  classString);
    //console.log("canvas extension:",  typeof classString);
>>>>>>> Stashed changes

    if (classString.includes("with"))
    {
        if (classString.includes("quizzes")) 
        {
            console.log("canvas extension:",  "doc type quiz");
            pageType = "Quiz";
        }
        else if (classString.includes("discussions")) 
        {
<<<<<<< Updated upstream
            console.log("doc type discussion");
            pageType = "Dicussion";
            WebPageType = "Discussion";
=======
            console.log("canvas extension:",  "doc type discussion");
            pageType = "Discussion";
        }
        else if (classString.includes("student-view")) 
        {
            console.log("canvas extension:",  "doc type teacher");
            pageType = "Quiz"
            //processTeacherView(); why is it like this. why is canvas programed like this.
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
    //if this is not a page we have targeted to act on, disregard
    if (!AllowedPageTypes.includes(WebPageType)) 
    {
        console.log("canvas extension:",  "not canvas, not running");
        console.log("canvas extension:",  WebPageType);
        return;
    }
    //console.log("canvas extension:",  "running onscroll");

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
function processTeacherView() 
{
    //check if there is quiz conntent on the page
    quizContent = document.querySelector(`[aria-label="${"Quiz content"}"]`);
    console.log("canvas extension:",  "techer view", quizContent);
}

>>>>>>> Stashed changes
function countToolbars() 
{
<<<<<<< Updated upstream
    console.log("canvas extension:",  "counted");
=======
    //console.log("canvas extension:",  "counted");
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    console.log("canvas extension:",  "all bars: " + allBars.length);
=======
    //console.log("canvas extension:",  "all bars: " + allBars.length);
>>>>>>> Stashed changes
    return toolbars.length
}

function processToolBars(pageType) 
{
<<<<<<< Updated upstream
    let toolbars = [];
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
=======
    let toolbars = []; //used to store all the toolbars currently being handled
    //console.log("finding tool bars");

    //since an announcement writing screen only has one possible outcome, process that first
    if (pageType == "ANNOUNCEMENT") 
    {
        //find the one group of bars, and select the correct "formatting" bar from it
        //because there is only ever one text entry field we don't have to worry about other 
        //clusters of bars
        let bar = document.querySelectorAll(".tox-toolbar__group")[1];
        toolbars.push(bar)
        
        //check if there is a button on the bar, if not, add the button
        if(checkForButton(bar) == false) 
        {
            addButton(bar)
        }
        
        //update the counter of toolbars
        toolBarCount = toolbars.length
    };

    //find all the bars on all the pages & process them
    if (foundtoolbars < 1){
        if (pageType == "QUIZ" || pageType == "DISCUSSION") 
        {
            //select all the toolbars
            let allBars =  document.querySelectorAll(".tox-toolbar__group");     
            //console.log("all bars: " + allBars.length)

            //filter down to just the bars labeled by the website as "Formatting" section of
            //of the toolbar, which is where our button should go
            for (const bar of allBars) 
            {
                if (bar.title == "Formatting") 
                {
                    toolbars.push(bar);
                    foundtoolbars++;
                }
            }
        }
        //now that the correct buttons have been isolated, go through them and check if it
        // has been flagged as having a button added. if not, add a button.
        for (const bar of toolbars)     
        {
            //console.log(bar);
            if (checkForButton(bar) == false) 
            {
                addButton(bar)
            }
        }
        //update count of toolbars on the page
        toolBarCount = toolbars.length
    }
   
    //outdated version. if i delete this the code looses its mind. sure. why not. 
    if (pageType == "QUIZ") 
    {
        let allBars =  document.querySelectorAll(".tox-toolbar__group");     
        //console.log("canvas extension:",  "all bars: " + allBars.length)
        for (const bar of allBars) 
        {
            if (bar.title == "Formatting" && bar.id != "hasButton") 
            {
                //console.log("canvas extension:",  bar, "status: ", checkForButton(bar));
                toolbars.push(bar);
            }
        }
>>>>>>> Stashed changes
    }

function checkForButton(toolbar) 
{
    var hasButton = toolbar.id == "hasButton";
    //console.log("canvas extension:",  toolbar + " status = " + hasButton)
    return hasButton
};

//button code, designs functionality
function addButton(toolbar) 
{
<<<<<<< Updated upstream
    console.log("canvas extension:",  "added button to ", buttonPos)
    let tabButton = document.createElement('button');
    tabButton.classList.add('tox-tbtn');

    let newID = "addedButton_";
    newID = newID.concat(buttonPos.toString())
    questionsNoted.push(buttonPos);
    buttonPos += 1;
    tabButton.id = newID;
=======
    //add the button to convert ~ to pharagraphs
    let tabButton = document.createElement('button');
    tabButton.classList.add('tox-tbtn');

    let tabID = "addedButton_";
    tabID = tabID.concat(buttonPos.toString())
    questionsNoted.push(buttonPos);
    
    tabButton.id = tabID;
>>>>>>> Stashed changes
    tabButton.innerHTML = "P";
    tabButton.title = "Add Tab Indent";
    tabButton.ariaLabel = "Add Tab Indent";
    tabButton.tabIndex = "-1";

    tabButton.ariaDisabled = false;
    tabButton.ariaPressed = false;
    tabButton.addEventListener("click", tabClicked);
    
    //add all the new buttons
    toolbar.appendChild(tabButton);
    toolbar.setAttribute("id", "hasButton")
<<<<<<< Updated upstream
}


//add tab on click code
function tabClicked(e) 
{
    e.preventDefault();
    console.log("canvas extension:",  "clicked")
=======
    console.log("toolbar", toolbar);

    //now that everything is done. iterate buttonPos
    buttonPos += 1;
   
}

//add tab button clicked on, run code to add the tabs
function tabClicked(e) 
{
    e.preventDefault();
    // console.log("canvas extension:",  "clicked")
>>>>>>> Stashed changes
    //console.log("canvas extension:",  e.target);
    buttonClicked = e.target
    add_tab(buttonClicked, '~', '&numsp;&numsp;')
    return false;
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
const inputElement = document.getElementById("tinymce");


function add_tab(buttonClicked){

=======
function add_tab(buttonClicked) 
{
    
>>>>>>> Stashed changes
=======
const inputElement = document.getElementById("tinymce");

function add_tab(buttonClicked, convertedFrom, convertedTo) 
{
    console.log("Rin Checkpoint");
>>>>>>> Stashed changes
    console.log(buttonClicked)
    let buttonIdParts = buttonClicked.id.split("_")
    let selectedQuestion = Number(buttonIdParts[1])
    console.log("ID = " + selectedQuestion)

<<<<<<< Updated upstream

  //grab the location of the textbox and what is currently in it
  //doesnt work for discussion so an error is thrown but there is a workaround below so its ok
  console.log("textboxes: " + textBoxes);
  console.log("selectedQuestion: " + textBoxes[selectedQuestion]);
=======
    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGot, onError);
    console.log(gettingItem);

    function onGot(item) {
        console.log(item);
        if (item.tabValue != null){
            console.log(item.tabValue);
            console.log(item.tabValue.value)
            tabReplaceSet = item.tabValue.value;
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

    replyFrame = findDiscussionFrames();
    console.log("textboxes2:", frames);
    console.log("replyFrame", replyFrame);
    console.log("selectedQuestion: " + textBoxes[selectedQuestion]);
>>>>>>> Stashed changes
    let selectedIframe = textBoxes[selectedQuestion];
    console.log(selectedIframe);
    //console.log(selectedIframe);

  let iframeObj;
  let bodyDiv;
<<<<<<< Updated upstream
  //rn this is for quiz vs discussion, myThing means its a discussion board
<<<<<<< Updated upstream
  if (myThing == null){
    iframeObj = selectedIframe.contentWindow;
    bodyDiv = iframeObj.document.querySelector("body");
  }
  if (myThing != null){
    iframeObj = myThing;
=======
  //rn this is for quiz vs discussion, replyFrame means its a discussion board
  if (replyFrame == null){
    iframeObj = selectedIframe.contentWindow;
    bodyDiv = iframeObj.document.querySelector("body");
  }
  if (replyFrame != null){
    iframeObj = replyFrame;
>>>>>>> Stashed changes
    console.log("textboxes = " + textBoxes);
    console.log("textbox[0] = " + textBoxes[0]);
    bodyDiv = textBoxes[0];
    console.log(bodyDiv);
  }
<<<<<<< Updated upstream
=======
  iframeObj = selectedIframe.contentWindow;
        bodyDiv = iframeObj.document.querySelector("body");
   /* if (myThing == null){
        
    }

    if (myThing != null){
        iframeObj = myThing;
=======
  iframeObj = selectedIframe.contentWindow;
        bodyDiv = iframeObj.document.querySelector("body");
   /* if (replyFrame == null){
        
    }

    if (replyFrame != null){
        iframeObj = replyFrame;
>>>>>>> Stashed changes
        console.log("textboxes = " + textBoxes);
        console.log("textbox[0] = " + textBoxes[0]);
        bodyDiv = textBoxes[0];
        console.log(bodyDiv);
    }
    */
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  let innerHTMLObj = bodyDiv.innerHTML;
  console.log("innerHTML is: " + innerHTMLObj);

  //the tab object to be inserted at will
<<<<<<< Updated upstream
  let tabObj= '&nbsp;&nbsp;&nbsp;&nbsp;';
  let wideTabObj = '&numsp;&numsp;';

  //grab whats in the textbox
  let textString = innerHTMLObj.toString();

<<<<<<< Updated upstream
  let tabReplacable = '~';
  let tabValue = getVal();
=======

  //from other popup, in as temp value while popup is troubleshooted 
  let tabValue = '~';
  let tabReplacable = '~';
  //let tabValue = getVal();
>>>>>>> Stashed changes
=======
  //let tabObj= '&nbsp;&nbsp;&nbsp;&nbsp;';
  //let wideTabObj = '&numsp;&numsp;';

  let tabObj = convertedTo;
  let wideTabObj = convertedTo;

  //grab whats in the textbox
  let textString = innerHTMLObj.toString();


  //from other popup, in as temp value while popup is troubleshooted 
  //let tabValue = '~';
  //let tabReplacable = '~';
  let tabValue = convertedFrom;
  let tabReplacable = convertedFrom;
  //let tabValue = getVal();
>>>>>>> Stashed changes
  if (tabValue != null){
    tabReplacable = tabValue;
    console.log("YES YEAH YIPPEE");
  }
  else{
    console.log("NOOOO");
  }
  console.log(tabReplacable);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======

  //replace any instances of "TAB" with tabObj, loop through until all TABs are replaced
  let Tabbed = textString.replace(tabReplacable, wideTabObj);
  console.log(Tabbed);
  while (Tabbed != Tabbed.replace(tabReplacable, wideTabObj)){
    Tabbed = Tabbed.replace(tabReplacable, wideTabObj);
  }

  //set newly tabbed string as text
  bodyDiv.innerHTML = Tabbed;
}
function showTabs(buttonClicked) 
{
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
            console.log(item.tabValue.value)
            tabReplaceSet = item.tabValue.value;
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

    replyFrame = findDiscussionFrames();
    console.log("textboxes2:", frames);
    console.log("replyFrame", replyFrame);
    console.log("selectedQuestion: " + textBoxes[selectedQuestion]);
    let selectedIframe = textBoxes[selectedQuestion];
    console.log(selectedIframe);
    //console.log(selectedIframe);

  let iframeObj;
  let bodyDiv;
  //rn this is for quiz vs discussion, replyFrame means its a discussion board
  if (replyFrame == null){
    iframeObj = selectedIframe.contentWindow;
    bodyDiv = iframeObj.document.querySelector("body");
  }
  if (replyFrame != null){
    iframeObj = replyFrame;
    console.log("textboxes = " + textBoxes);
    console.log("textbox[0] = " + textBoxes[0]);
    bodyDiv = textBoxes[0];
    console.log(bodyDiv);
  }
  iframeObj = selectedIframe.contentWindow;
        bodyDiv = iframeObj.document.querySelector("body");
  let innerHTMLObj = bodyDiv.innerHTML;
  console.log("innerHTML is: " + innerHTMLObj);

  //the tab object to be inserted at will
  let tabObj= "~";
  let wideTabObj = "~";

  //grab whats in the textbox
  let textString = innerHTMLObj.toString();


  //from other popup, in as temp value while popup is troubleshooted 
  let tabValue = '&numsp;&numsp;';
  let tabReplacable = '&numsp;&numsp;';
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

>>>>>>> Stashed changes

  //replace any instances of "TAB" with tabObj, loop through until all TABs are replaced
  let Tabbed = textString.replace(tabReplacable, wideTabObj);
  console.log(Tabbed);
  while (Tabbed != Tabbed.replace(tabReplacable, wideTabObj)){
    Tabbed = Tabbed.replace(tabReplacable, wideTabObj);
  }

  //set newly tabbed string as text
  bodyDiv.innerHTML = Tabbed;
=======
>>>>>>> Stashed changes

  //replace any instances of "TAB" with tabObj, loop through until all TABs are replaced
  let Tabbed = textString.replace(tabReplacable, wideTabObj);
  console.log(Tabbed);
  while (Tabbed != Tabbed.replace(tabReplacable, wideTabObj)){
    Tabbed = Tabbed.replace(tabReplacable, wideTabObj);
  }

  //set newly tabbed string as text
  bodyDiv.innerHTML = Tabbed;
}

<<<<<<< Updated upstream
async function wahoo() {
    // const myModule = import("./popup.js");
    // use myModule

    // let gottenVal = getVal();
    // console.log(gottenVal);
    console.log(tabValue);
=======
//Show added paragraphs


//revert added paragraphs


//helper function to locate the specific value of the iframe
function locate_iframe(selectedBox, pageType) 
{
    console.log("canvas extension:",  "selectedBox", selectedBox);
}

//helper method to find the iframe for a discussion, 
// because for some reason its making me call it several times
function findDiscussionFrames() 
{
    let frames = document.querySelectorAll('iframe[id^="message-body-"]');
    replyFrame = frames[0];
    return replyFrame;
};

//helper method to check if a value is null
//no calls to this currently. it exists to enable something i want to pursue eventually but right now am not using.
function existsCheck(obj) 
{
    console.log("canvas extension:",  "running check")
    if (obj && obj !== 'null' && obj !== 'undefined') 
    {
        //console.log("canvas extension:",  "passed existance check");
        return true;
    }
    else 
    {
        //console.log("canvas extension:",  "failed existence check");
        return false;
    }
    //return (obj && obj !== 'null' && obj !== 'undefined');
}

wahoo();


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
>>>>>>> Stashed changes
}

wahoo();



// import {tabValue} from './popup.js';
// let tabTextInput = tabValue;
// console.log(tabTextInput);