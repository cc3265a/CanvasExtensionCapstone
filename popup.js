// export { tabValue, change };    
let input = document.querySelector('input');

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
        kitten: { name: "Mog", eats: "mice" },
        monster: { name: "Kraken", eats: "people" },
    });
    
}

function onGot(item) {
  console.log(item);
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

export function getVal() {
    return myVal;
}

// export {tabValue};
