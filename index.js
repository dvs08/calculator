//input/output basic cal

let calInput = document.getElementById('inputFn');

let calOutput = document.getElementById('rsDisplay');

let resultBox= document.querySelector('.resultArray');

let dropdownItems = document.querySelectorAll('.dropdown-content a');

let hideItem = document.querySelector('.dropdown-content');

let dropdownButton = document.querySelector('.dropdownBtn');



//dynamically adding buttons

let buttonCont = document.querySelector('.game');

const buttonText = [
    // {value: 'AC', className: 'box'}

    'AC', '/', '*', '7', '8', '9', '4', '5', '6', '1','2','3','0','.'

];

for(let i = 0; i< buttonText.length; i++){

    const but = document.createElement('button');

        but.setAttribute('class','box');
        but.textContent = buttonText[i];
        buttonCont.appendChild(but);

        but.addEventListener('click', () =>{

        calculation(but.textContent);

        });

}

let buttonCont2 = document.querySelector('.colGame');

const buttonText2 = ['-','+','Enter'];

for(let i = 0; i< buttonText2.length; i++){

    const but = document.createElement('button');

    if(buttonText2[i] === '-'){

        but.setAttribute('class','box');
        but.textContent = buttonText2[i];
        buttonCont2.appendChild(but);
    } else{

        but.setAttribute('class','box-merged');
        but.textContent = buttonText2[i];
        buttonCont2.appendChild(but);

    }

    but.addEventListener('click', () =>{

        calculation(but.textContent);

    });

}

//adding a seperate listner for kedown so not all buttons have click event attached ot them
document.querySelector('body').addEventListener('keydown', (event) =>{

    console.log(event, 'enter event listener for keydown');
    if(event.key === 'Enter'){
        event.preventDefault();
        calculation('Enter');
    } 
});


function Q1(){

    this.items = [];
    this.enqueue = function(element) {
        if (this.items.length >= 5) {
            this.items.shift();
        }
        this.items.push(element);    
    }

    this.printQueue = function() {
        return this.items.join(" ");
    }

}


let resultQueue = new Q1(); 

//calc func

function calculation(valInp) {

    console.log(valInp, 'valinp');

    if(valInp === 'Enter'){

        if(!isNaN(calInput.value) && calInput.value !== ''){

            calOutput.textContent = "Error not an expression";

        } else {

            try {
                const exp = eval(calInput.value);
                calOutput.textContent = exp;
                resultQueue.enqueue(exp); 
            } catch (error) {
                calOutput.textContent = 'Error';
            }   
        }

    } else if (valInp === 'AC') {
        calInput.value = '';
        calOutput.textContent = '';
        
    } else {
        calInput.value += valInp;
    }
}


//dynamically adding anchors

for(let i = 1; i<=5;i++){

    let anchor = document.createElement('a');
    anchor.setAttribute('href', '#');
    anchor.setAttribute('data-value', i);
    anchor.textContent = i;
    hideItem.appendChild(anchor);

}

//drop down logic --Event delegation

hideItem.addEventListener('click', (event) => {

            const target = event.target;

            if(target.tagName === 'A'){

            const index = parseInt(target.getAttribute('data-value'), 10) - 1;
            const length = resultQueue.items.length;
            const targetIndex = length - index - 1; 

            if (targetIndex >= 0 && targetIndex < length) {
                resultBox.textContent = resultQueue.items[targetIndex];
                
            } else {
                resultBox.textContent = 'No Operation';
                
            }

        hideItem.style.display = 'none';

            }
    });


//toggle func to hide[]
dropdownButton.addEventListener('mouseover', () => {


    if (hideItem.style.display == 'none') {
        hideItem.style.display = 'block';
    } else {
        hideItem.style.display = 'none';
    }

});







