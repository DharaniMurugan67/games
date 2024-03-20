const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameEnd = false;
let winner = null;

const cells = [];
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', cellClick);
    board.appendChild(cell);
    cells.push(cell);
}

function cellClick() {
    if (gameEnd || this.textContent !== '') return;
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer === 'X' ? 'x-clicked' : 'o-clicked'); // Add class based on player
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            gameEnd = true;
            winner = currentPlayer;
            message.textContent = `Congratulations! ${winner} wins!`;
            break;
        }
    }
    if (!gameEnd && !cells.some(cell => cell.textContent === '')) {
        gameEnd = true;
        message.innerHTML = "It's a draw! &#x1F91D;";
    }
}

restartButton.addEventListener('click', () => {
    currentPlayer = 'X';
    gameEnd = false;
    winner = null;
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x-clicked', 'o-clicked'); // Remove both classes
    });
});