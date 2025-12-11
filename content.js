var toolboxCount = 0;
const WebPageType = findType();

window.onload = function() {
    //console.log(findType());
    WebPageType = findType();
    
};

window.onscroll = function() 
{
    if (WebPageType == "Quiz") 
    {
        if (countToolbars() != toolboxCount) 
        {
            processToolBars(WebPageType)
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
    tabButton.id = "addedButton";
    tabButton.innerHTML = "Indent";
    tabButton.title = "Add Tab Indent";
    tabButton.ariaLabel = "Add Tab Indent";
    tabButton.tabIndex = "-1";
    tabButton.ariaDisabled = false;
    tabButton.ariaPressed = false;
    tabButton.addEventListener("click", printTest);
    toolbar.appendChild(tabButton);
}

function printTest(e) 
{
    e.preventDefault();
    console.log("test button clicked");
    return false;
}