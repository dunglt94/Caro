let caroBoard;
function drawBoard() {
    caroBoard= new GameBoard(DEFAULT_ROWS, DEFAULT_COLS, "gameBoard");
    document.getElementById("turn").innerHTML = `<span>O</span> Bắt đầu`;
    clockCD.reset();
    caroBoard.draw();
    caroBoard.isOver = true;
}

function gameStart() {
    caroBoard.isOver = false;
    clockCD.start();
}

// Đổi màu X và O
function playerColor(x, y) {
    let player = document.getElementById("turn");
    let color = document.getElementById(`cell-${x}-${y}`);
    let cellHTML = color.innerText;
    if (caroBoard.isOver === false) {
        if (caroBoard.getPlayerTurn() === 2 && cellHTML === "") {
            color.style.color = "blue";
            player.innerHTML = `Đến lượt <span style="color: red">O</span>`;
        } else if (caroBoard.getPlayerTurn() === 3 && cellHTML === "") {
            color.style.color = "red";
            player.innerHTML = `Đến lượt <span style="color: blue">X</span>`;
        }
    }
}

function play(x, y) {
    playerColor(x, y);
    caroBoard.play(x, y);
    if (caroBoard.isOver === true) clockCD.stop();
}

// Đôi size bàn cờ
function changeDivSize(width) {
    let divWidth = document.getElementById('tableFunction');
    let boardSizeDiv = document.getElementById('boardSize');
    if (width === 401) {
        divWidth.style.width = "401px";
        boardSizeDiv.style.padding = "0 0 0 30px";
    }
    else if (width === 481) {
        divWidth.style.width = "481px";
        boardSizeDiv.style.padding = "0 0 0 70px";
    }
    else {
        divWidth.style.width = "561px";
        boardSizeDiv.style.padding = "0 0 0 110px";
    }
}

function changeBoardSize(rows, cols, width) {
    DEFAULT_ROWS = rows;
    DEFAULT_COLS = cols;
    changeDivSize(width);
    clockCD.reset();
    drawBoard();
}