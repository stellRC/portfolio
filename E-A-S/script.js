// Background 

const imgFall = "url('https://media.giphy.com/media/ToMjGpCZNK9xgg2DJEQ/giphy.gif')"
const imgWinter = "url('https://media.giphy.com/media/PkaZUCdVm2c5G/giphy.gif')"
const imgSpring = "url('https://media.giphy.com/media/H5nO1jCnadHRC/giphy.gif')"
const imgSummer = "url('https://media.giphy.com/media/xT0wlvGLHmojbeu5vq/giphy.gif')"


document.getElementById('img__btn--fall').onclick = btnFall
document.getElementById('img__btn--winter').onclick = btnWinter
document.getElementById('img__btn--spring').onclick = btnSpring
document.getElementById('img__btn--summer').onclick = btnSummer


function btnFall() {
    document.querySelector('body').style.backgroundImage = imgFall

}

function btnWinter() {
    document.querySelector('body').style.backgroundImage = imgWinter
}

function btnSpring() {
    document.querySelector('body').style.backgroundImage = imgSpring
}

function btnSummer() {
    document.querySelector('body').style.backgroundImage = imgSummer
}



// Grid

let color = "black";
let click = true;


function createGrid(size) {
    let board = document.querySelector('.board');
    let squares = board.querySelectorAll('div');
    squares.forEach((div) => div.remove());
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i=0; i < size * size; i++) {
        let square = document.createElement('div')
        square.addEventListener('mouseover', colorSquare);
        // square.style.backgroundColor = "white";
        board.insertAdjacentElement('beforeend', square)
    }
}

function changeSize(input) {
    if(input >= 2 && input <= 100) {
        createGrid(input);
    } else { 
        alert("Oops! Pick another size!");
    }
}

function colorSquare() {
    if(click) {
        if(color === 'random') {
            this.style.backgroundColor = `hsl(${Math.random() *360}, 100%, 50%)`;
        } else {
            this.style.backgroundColor = color;
        }
    }
}

function changeColor(choice) {
    color = choice;
}

function resetBoard() {
    let board = document.querySelector('.board');
    let squares = board.querySelectorAll('div')
    squares.forEach((div) => div.style.backgroundColor = "white");
}

document.querySelector('body').addEventListener('click', () => {
    click = !click;
})

// why change back tick to front tick and vice versa
// this.value is whatever value goes in input field
 // this.style is referencing square.eventlistener currently being called

//  click = !click is a boolean