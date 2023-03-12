// Variables
const squares = document.querySelectorAll('.square');
const resetButton = document.querySelector('#reset-button');
const winnerLabel = document.querySelector('#winner-label');

let playerTurn = 'X';
let gameActive = true;

// Functions
function handleSquareClick() {
  if (!gameActive || this.textContent !== '') {
    return;
  }

  this.textContent = playerTurn;
  this.style.color = playerTurn === 'X' ? '#F4A261' : '#3D405B';

  checkForWin();
  checkForDraw();
  togglePlayerTurn();
}

function togglePlayerTurn() {
  playerTurn = playerTurn === 'X' ? 'O' : 'X';
}

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

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (squares[a].textContent === playerTurn && squares[b].textContent === playerTurn && squares[c].textContent === playerTurn) {
      gameActive = false;
      squares[a].style.backgroundColor = squares[b].style.backgroundColor = squares[c].style.backgroundColor = '#A8DADC';
      winnerLabel.textContent = `Player ${playerTurn} wins!`;
      return;
    }
  }
}

function checkForDraw() {
  let roundDraw = true;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === '') {
      roundDraw = false;
      break;
    }
  }

  if (roundDraw) {
    gameActive = false;
    winnerLabel.textContent = "It's a tie!";
  }
}

function resetGame() {
  playerTurn = 'X';
  gameActive = true;

  squares.forEach(square => {
    square.textContent = '';
    square.style.backgroundColor = '';
  });

  winnerLabel.textContent = '';
}


// Event Listeners
squares.forEach(square => square.addEventListener('click', handleSquareClick));
resetButton.addEventListener('click', resetGame);
