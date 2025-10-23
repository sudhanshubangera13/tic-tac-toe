const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;


const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];


cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) {
      return; 
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
      gameActive = false;
    } else if (board.every(cell => cell !== "")) {
      statusText.textContent = "🤝 It's a Tie!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  });
});

// Check for winner
function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] !== "" && board[a] === board[b] && board[b] === board[c];
  });
}

// Reset game
resetBtn.addEventListener("click", () => {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = "Player X's Turn";
  cells.forEach(cell => (cell.textContent = ""));
});
