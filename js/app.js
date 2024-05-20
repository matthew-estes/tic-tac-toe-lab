/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', ''];
let turn = '';
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
console.log(squareEls);

const messageEl = document.querySelector('.message');
console.log(messageEl);

const resetBtnEl = document.querySelector('.reset');
console.log(resetBtnEl);

/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((square, idx) => {
    squareEls[idx].innerText = square;
  });
}

function updateMessage() {
  if (winner === false && tie === false) {
    messageEl.innerText = `It's ${turn}'s turn!`;
  } else if (winner === false && tie === true) {
    messageEl.innerText = `It's a tie!`;
  } else if (winner === true) {
    messageEl.innerText = `${turn} is the winner!`;
  }
  }

function handleClick(event) {
  const squareIndex = event.target.id;
  if (board[squareIndex] === '') {
    if (turn === 'X') {
      turn = 'O';
    } else {
      turn = 'X';
    }
  }
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  render();
}

function placePiece(index) {
  board[index] = turn;
  console.log(`Placed ${turn} at index ${index}`);
}

function checkForWinner () {
  winningCombos.forEach((value) => {
    if (board[value[0]] !== '' && board[value[0]] === board[value[1]] && board[value[0]] === board[value[2]]) {
       winner = true;
    }
  })
}

function checkForTie () {
  if (winner === true) {
    return;
  } else if (board.includes('')) {
    return
  } else {
    tie = true;
  }
}

function switchPlayerTurn(){
  if (winner === true) {
    return;
  } 
  if (winner === false && turn === 'X') {
    turn = 'O';
  } else if (winner === false && turn === 'O') {
    turn = 'X';
  }
}


/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
  square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);


