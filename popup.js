// export { tabValue, change };    
let input = document.querySelector('input');

input.addEventListener('change', e => setValue(e.target.value));

<<<<<<< Updated upstream
async function setValue(value){
=======
export async function setValue(value){
>>>>>>> Stashed changes
    console.log(value);
    if (value == 'tabValue'){
        value = '~';
    };
    await localStorage.setItem("tabValue", value);
    let holdVal = localStorage.getItem("tabValue");
    console.log(holdVal);
    
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

<<<<<<< Updated upstream
// export {tabValue};
=======
// export {tabValue};
>>>>>>> Stashed changes
