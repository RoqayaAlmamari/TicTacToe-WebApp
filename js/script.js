// Variables
const squares = document.querySelectorAll('.square'); // select all the squares on the board
const resetButton = document.querySelector('#reset-button'); // select the reset button
const winnerLabel = document.querySelector('#winner-label'); // select the winner label

let playerTurn = 'X'; // set the initial player turn to X
let gameActive = true; // set the game to active

// Functions

// function to handle square clicks
function handleSquareClick() {
// check if game is not active or square is already clicked
if (!gameActive || this.textContent !== '') {
return;
}

// display player turn in square
this.textContent = playerTurn;
// set the color of the square based on the player turn
this.style.color = playerTurn === 'X' ? '#F4A261' : '#3D405B';

// check for win or draw
checkForWin();
checkForDraw();
// toggle player turn
togglePlayerTurn();
}

// function to toggle the player turn between X and O
function togglePlayerTurn() {
playerTurn = playerTurn === 'X' ? 'O' : 'X';
}

// function to check if a player has won the game
function checkForWin() {
const winningConditions = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6],
];

// loop through all the possible winning conditions
for (let i = 0; i < winningConditions.length; i++) {
const [a, b, c] = winningConditions[i];
// check if the squares at the indexes match the current player turn
if (squares[a].textContent === playerTurn && squares[b].textContent === playerTurn && squares[c].textContent === playerTurn) {
// if true, game is no longer active, change color of winning squares, display winner and return
gameActive = false;
squares[a].style.backgroundColor = squares[b].style.backgroundColor = squares[c].style.backgroundColor = '#A8DADC';
winnerLabel.textContent = Player ${playerTurn} wins!;
return;
}
}
}

// function to check for a draw
function checkForDraw() {
let roundDraw = true;
// loop through all squares to check if any are empty
for (let i = 0; i < squares.length; i++) {
if (squares[i].textContent === '') {
roundDraw = false;
break;
}
}

// if all squares are filled and no winner, game is no longer active, display draw message
if (roundDraw) {
gameActive = false;
winnerLabel.textContent = "It's a tie!";
}
}

// function to reset the game
function resetGame() {
playerTurn = 'X';
gameActive = true;

// loop through all squares and reset text and background color
squares.forEach(square => {
square.textContent = '';
square.style.backgroundColor = '';
});

winnerLabel.textContent = '';
}

// Event Listeners
// add click event listeners to all the squares that will call handleSquareClick function
squares.forEach(square => square.addEventListener('click', handleSquareClick));
// add click event listener to the reset button that will call the resetGame function
resetButton.addEventListener('click', resetGame);