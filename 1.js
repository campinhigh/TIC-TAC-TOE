let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newbutton = document.querySelector(".newbutton");
let messageContainer = document.getElementById("message-container");
let msg = document.querySelector(".msg");

let board = ["", "", "", "", "", "", "", "", ""];
let player = "O";
let computer = "X";
let turn1 = false;  // This variable will define that the Computer starts first

/* WINNING PATTERNS
0, 1, 2  
3, 4, 5  
6, 7, 8  
0, 3, 6  
1, 4, 7  
2, 5, 8  
0, 4, 8  
2, 4, 6  */

const winPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// This function will Handle the player's moves
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (board[index] === "" && !turn1) {
            box.innerText = player;
            board[index] = player;
            box.disabled = true;
            turn1 = true;

            if (!checkWinner()) {
                setTimeout(computerMove, 500);
            }
        }
    });
});

// Computer move using MiniMax
function computerMove() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = computer;
            let score = minimax(board, false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    if (bestMove !== undefined) {
        boxes[bestMove].innerText = computer;
        board[bestMove] = computer;
        boxes[bestMove].disabled = true;
        turn1 = false;
        checkWinner();
    }
}

// MiniMax Algorithm
function minimax(board, isMaximizing) {
    let winner = checkWinState();
    if (winner === computer) return 1;
    if (winner === player) return -1;
    if (!board.includes("")) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = computer;
                let score = minimax(board, false);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = player;
                let score = minimax(board, true);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Check if someone has won
function checkWinner() {
    let winner = checkWinState();
    if (winner) {
        msg.innerText = `Congratulations, The Winner is ${winner}`;
        messageContainer.style.display = "block";
        disableButtons();
        return true;
    }
    if (!board.includes("")) {
        msg.innerText = "It's a Draw!";
        messageContainer.style.display = "block";
        disableButtons();
        return true;
    }
    return false;
}

// Helper function to check the win state
function checkWinState() {
    for (let pattern of winPattern) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return board[a];
        }
    }
    return null;
}

// Disable all boxes after game ends
function disableButtons() {
    boxes.forEach(box => box.disabled = true);
}

// Reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    turn1 = false;
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    messageContainer.style.display = "none";
}

// Attach event listeners
reset.addEventListener("click", resetGame);
newbutton.addEventListener("click", resetGame);
