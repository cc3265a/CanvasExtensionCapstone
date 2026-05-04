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
    else if (WebPageType == "ANNOUNCEMENT") 
    {
        //console.log("canvas extension:", "announcement toolBarCount", toolBarCount)
        if (toolBarCount != 1) 
        {
            processToolBars(WebPageType);
        }
    };
};

function countToolbars() 
{
    //console.log("canvas extension:",  "counted");
    let toolbars = [];
    let allBars =  document.querySelectorAll(".tox-toolbar__group");     
    
    for (const bar of allBars) 
    {
        if (bar.title == "Formatting") 
        {
            toolbars.push(bar);
        }
    }
    //console.log("canvas extension:",  "all bars: " + allBars.length);
    return toolbars.length
}

function processToolBars(pageType) 
{
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
    //add the button to convert ~ to pharagraphs
    let tabButton = document.createElement('button');
    tabButton.classList.add('tox-tbtn');

    let tabID = "addedButton_";
    tabID = tabID.concat(buttonPos.toString())
    questionsNoted.push(buttonPos);
    
    tabButton.id = tabID;
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
    console.log("toolbar", toolbar);

    //now that everything is done. iterate buttonPos
    buttonPos += 1;
   
}

//add tab button clicked on, run code to add the tabs
function tabClicked(e) 
{
    e.preventDefault();
    // console.log("canvas extension:",  "clicked")
    //console.log("canvas extension:",  e.target);
    buttonClicked = e.target
    add_tab(buttonClicked, '~', '&numsp;&numsp;')
    return false;
};

const inputElement = document.getElementById("tinymce");

function add_tab(buttonClicked, convertedFrom, convertedTo) 
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
   /* if (replyFrame == null){
        
    }

    if (replyFrame != null){
        iframeObj = replyFrame;
        console.log("textboxes = " + textBoxes);
        console.log("textbox[0] = " + textBoxes[0]);
        bodyDiv = textBoxes[0];
        console.log(bodyDiv);
    }
    */
  let innerHTMLObj = bodyDiv.innerHTML;
  console.log("innerHTML is: " + innerHTMLObj);

  //the tab object to be inserted at will
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


