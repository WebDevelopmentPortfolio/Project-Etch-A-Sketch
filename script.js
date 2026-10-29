
let squaresSize = 16;
const targetContainerSize = 440;
const buttonForSquares = document.querySelector(".change-number-squares");
const buttonToClearColors = document.querySelector(".clear-colors");
const modalBox = document.getElementById("custom-modal");
const inputSquares = document.getElementById("input-squares");
const continueBtn = document.getElementById("continue-button");
const cancelBtn = document.getElementById("cancel-button");
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
                eachSquare.style.backgroundColor = createColorsHex();
            }
            
        });

        buttonToClearColors.addEventListener('click', () => {
            eachSquare.style.backgroundColor = '';
        });


    }

}


function mousedownTouchstartActions(element) {
    isDrawing = true;
    element.style.backgroundColor = createColorsHex();
}


function createColorsSoftRGB() {
    const red = Math.floor(Math.random() * 76) + 180;
    const blue = Math.floor(Math.random() * 76) + 180;
    const green = Math.floor(Math.random() * 76) + 180;

    return `rgb(${red},${blue},${green})`;

}


function createColorsHex() {
    const base = Math.floor(Math.random() * 16777216);
    return `#${base.toString(16)}`;

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
    modalBox.showModal();
    
})


continueBtn.addEventListener('click', () => {
    const input = Number(inputSquares.value);
    inputSquares.select(); //just highlight the entered text so user can easily change text

    if (isNaN(input) || input < 2 || input > 100) {
        alert("Please enter a valid number between 2 and 100");

    }
    else {
        squaresSize = inputSquares.value;
        createSquares(squaresSize);
        modalBox.close();

    }

})

//when pressing the Enter key
inputSquares.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        continueBtn.click();
    }

})


cancelBtn.addEventListener('click', () => {
    inputSquares.select(); //just highlight the entered text so user can easily change text
    modalBox.close();

})


