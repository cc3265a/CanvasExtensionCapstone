// export { tabValue, change };    
let input = document.querySelector('input');
let tabChar = "~";

input.addEventListener('change', e => setValue(e.target.value));

async function setValue(value){
    console.log(value);
    if (value == 'tabValue'){
        value = '~';
    };
    await localStorage.setItem("tabValue", value);
    let holdVal = localStorage.getItem("tabValue");
    console.log(holdVal);
    browser.storage.local.set({
        tabValue: { value },
    });
    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGot, onError);
    console.log(gettingItem);
}


function onGot(item) {
  console.log(item);
    if (item.tabValue != null){
        console.log(item.tabValue);
        console.log(item.tabValue.value)
        tabChar = item.tabValue.value;
    }
    else{
        console.log("NULL");
    }
    let pString = document.getElementById("tabString");
    console.log("pstring = " + pString.innerText);
    pString.innerText = tabChar;
        
}

function onError(error) {
  console.log(`Error: ${error}`);
}

async function init(){
    // console.log("DDDDD");
    let myVal = localStorage.getItem('tabValue');
    if (myVal == 'tabValue'){
        myVal = '~';
    };
    
    input.value = myVal;
    setValue("tabValue", myVal);
}

init().catch(e => console.error(e));
var tabValue = localStorage.getItem("tabValue");
const change = () => tabValue;

// export function getVal() {
//     return myVal;
// }

// export {tabValue};
