
let squaresSize = 16;
const targetContainerSize = 440;
const buttonForSquares = document.querySelector(".change-number-squares");
const buttonToClearColors = document.querySelector(".clear-colors");
const buttonColorMode = document.querySelector(".color-mode");
const modalBoxGrid = document.getElementById("modal-pointer-size");
const modalBoxColor = document.getElementById("modal-color-mode");
const inputSquares = document.getElementById("input-squares");
const continueBtnGrid = document.getElementById("continue-button-grid");
const cancelBtnGrid = document.getElementById("cancel-button-grid");
const continueBtnColor = document.getElementById("continue-button-color");
const cancelBtnColor = document.getElementById("cancel-button-color");
const colorModes = document.querySelectorAll('input[name="color-option"]')


let isDrawing = false;


function createSquares(squaresSize) {
    
    const squaresContainer = document.querySelector(".squares-container");
    squaresContainer.replaceChildren(); //clears the existing squares

    /*there are tiny row gaps bug that prevents the user from drawing in certain areas of the screen in mobile view*/
    /*const totalSquares = squaresSize * squaresSize;
    const sizePercentage = 100 / squaresSize;*/
    
    /*below should solve it - let the computation of each square size be based on target max-width*/
    let perfectSquareSize = Math.floor(targetContainerSize / squaresSize);

    let finalContainerWidth = perfectSquareSize * squaresSize;
    
    squaresContainer.style.maxWidth = `${finalContainerWidth}px`;
    
    const totalSquares = squaresSize * squaresSize;
    
    for (let i = 0; i < totalSquares; i++) {
        const eachSquare = document.createElement("div");
        eachSquare.className = "square";
        /*eachSquare.style.flex = `0 0 ${sizePercentage}%`;*/
        eachSquare.style.flex = `0 0 ${perfectSquareSize}px`;
        eachSquare.style.aspectRatio = "1 / 1";
        squaresContainer.appendChild(eachSquare);

        //only start drawing on mousedown/touchstart
        eachSquare.addEventListener('pointerdown', (event) => {
            event.preventDefault();
            event.target.releasePointerCapture(event.pointerId);   
            
            if (eachSquare.style.backgroundColor !== '') {
                eachSquare.style.backgroundColor = '';
            }
            else {                
                mousedownTouchstartActions(eachSquare);
                
            }

        });

        eachSquare.addEventListener('pointerenter', () => {
            if (isDrawing) {
                eachSquare.style.backgroundColor = squareBackgroundColor();
                

            }
            
        });

        buttonToClearColors.addEventListener('click', () => {
            eachSquare.style.backgroundColor = '';
        });


    }

}


function mousedownTouchstartActions(element) {
    isDrawing = true;
    element.style.backgroundColor = squareBackgroundColor();

}



function createColorsSoftRGB() {
    const red = Math.floor(Math.random() * 76) + 100;
    const blue = Math.floor(Math.random() * 76) + 100;
    const green = Math.floor(Math.random() * 76) + 100;

    return `rgb(${red},${blue},${green})`;

}


function createColorsHex() {
    const base = Math.floor(Math.random() * 16777216);
    return `#${base.toString(16)}`;

}

let backgroundColor = "";
let selectedColorOption = "hex";

function selectColorOption() {
    const selectedRadioOption = modalBoxColor.querySelector('input[name="color-option"]:checked');
    if (selectedRadioOption) {
        selectedColorOption = selectedRadioOption.id;
    }

    return selectedColorOption;


}


function squareBackgroundColor() {
    
    if (selectedColorOption === "hex") {
        backgroundColor = createColorsHex();
    }
    else if (selectedColorOption === "rgb") {
        backgroundColor = createColorsSoftRGB();
    }
    else {
        backgroundColor = selectedColorOption;
    }

    return backgroundColor;

}



//stop drawing on mouseup/touchend
window.addEventListener('pointerup', () => {
    isDrawing = false;
});


inputSquares.value = squaresSize;
inputSquares.select(); //just highlight the entered text so user can easily change text
createSquares(squaresSize);


buttonForSquares.addEventListener('click', () => {
    inputSquares.value = squaresSize; //takes care of the case where when I enter an invalid number and I click Cancel and open the modal again, the invalid number shows up
    inputSquares.select(); //just highlight the entered text so user can easily change text
    modalBoxGrid.showModal();
    
})


continueBtnGrid.addEventListener('click', () => {
    const input = Number(inputSquares.value);
    inputSquares.select(); //just highlight the entered text so user can easily change text

    if (isNaN(input) || input < 16 || input > 100) {
        alert("Please enter a valid number between 16 and 100");

    }
    else {
        squaresSize = inputSquares.value;
        createSquares(squaresSize);
        modalBoxGrid.close();

    }

})

//when pressing the Enter key
inputSquares.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        continueBtnGrid.click();
    }

})


cancelBtnGrid.addEventListener('click', () => {
    inputSquares.select(); //just highlight the entered text so user can easily change text
    modalBoxGrid.close();

})


buttonColorMode.addEventListener('click', () => {
    const checkedRadio = document.getElementById(selectedColorOption);
    if (checkedRadio) {
        checkedRadio.checked = true;
    }
    modalBoxColor.showModal();

});


continueBtnColor.addEventListener('click', () => {
    selectedColorOption = selectColorOption();
    modalBoxColor.close();


})



cancelBtnColor.addEventListener('click', () => {
    modalBoxColor.close();

});





