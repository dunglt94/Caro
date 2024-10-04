
class GameBoard {
    rows; cols; elementId;

    constructor(rows, cols, elementId) {
        this.rows = rows;
        this.cols = cols;
        this.elementId = elementId;
        this.turn = VALUE_O;
        this.cells = [];
        this.isOver = false;
        this.isPaused = false;
    }

    draw() {
        let gameBoardDiv = document.getElementById(this.elementId);
        gameBoardDiv.innerHTML = "";
        for(let i = 0; i < this.rows; i++){
            let row = [];
            for(let j = 0; j < this.cols; j++){
                let cell = new Cell(i, j);
                row.push(cell);
                gameBoardDiv.innerHTML += cell.getHtml();
            }
            this.cells.push(row);
        }
    }

    play(x, y) {
        if (this.isOver) return;
        if (this.isPaused) return;
        let cell = this.cells[x][y];
        if (cell.value === VALUE_EMPTY) {
            cell.value = this.turn;
            cell.draw();
            this.check(x, y);
            if (this.turn === VALUE_O) {
                this.turn = VALUE_X;
            } else {
                this.turn = VALUE_O;
            }
        }
    }

    check(x, y) {
        let cell = this.cells[x][y];
        if (
            this.checkDirection(x, y, 0, 1, cell.value) || // Horizontal —
            this.checkDirection(x, y, 1, 0, cell.value) || // Vertical |
            this.checkDirection(x, y, 1, 1, cell.value) || // Diagonal \
            this.checkDirection(x, y, 1, -1, cell.value)   // Diagonal /
        ) {
            this.endGame();
        }
    }

    checkDirection(x, y, dx, dy, value) {
        let count = 0;

        // Count in the positive direction
        for (let i = 0; i < 5; i++) { // Check for up to 5 in a row
            let newX = x + dx * i;
            let newY = y + dy * i;
            if (this.isValidCell(newX, newY) && this.cells[newX][newY].value === value) {
                count++;
            } else {
                break;
            }
        }

        // Count in the negative direction
        for (let i = 1; i < 5; i++) { // Check for up to 5 in a row
            let newX = x - dx * i;
            let newY = y - dy * i;
            if (this.isValidCell(newX, newY) && this.cells[newX][newY].value === value) {
                count++;
            } else {
                break;
            }
        }
        console.log(`Count for position (${x}, ${y}): ${count}`);
        // Win condition check
        if (count >= 5) {
            return true; // Win with 5 in a row
        }
        else if (count === 4) {
            // Check for blockages
            if (this.cells[x][y].value === this.cells[x+dx][y+dy].value) {
                let startBlocked1 = this.isValidCell(x - dx, y - dy)
                    && this.cells[x - dx][y - dy].value !== "";
                let endBlocked1 = this.isValidCell(x + dx * 4, y + dy * 4)
                    && this.cells[x + dx * 4][y + dy * 4].value !== "";
                console.log(`Checking blockages at count 4:`);
                console.log(`Start coordinates: (${x - dx}, ${y - dy}), Blocked: ${startBlocked1}`);
                console.log(`End coordinates: (${x + dx * 4}, ${y + dy * 4}), Blocked: ${endBlocked1}`)
                return !startBlocked1 && !endBlocked1;
            } else if (this.cells[x][y].value === this.cells[x-dx][y-dy].value) {
                let startBlocked2 = this.isValidCell(x + dx, y + dy)
                    && this.cells[x + dx][y + dy].value !== "";
                let endBlocked2 = this.isValidCell(x + dx * 4, y + dy * 4)
                    && this.cells[x - dx * 4][y - dy * 4].value !== "";
                console.log(`Checking blockages at count 4:`);
                console.log(`Start coordinates: (${x - dx * 4}, ${y - dy * 4}), Blocked: ${startBlocked2}`);
                console.log(`End coordinates: (${x + dx}, ${y + dy}), Blocked: ${endBlocked2}`)
                return !startBlocked2 && !endBlocked2;
            }



             // Must be unblocked on both ends
        }
        return false; // No win condition met
    }


    isValidCell(x, y) {
        return x >= 0 && x < this.rows && y >= 0 && y < this.cols;
    }

    endGame() {
        this.isOver = true;
        if (this.turn === VALUE_X) this.announceWinner(`<span style="color: blue">X</span> Thắng!`);
        else if (this.turn === VALUE_O) this.announceWinner(`<span style="color: red">O</span> Thắng!`);
    }

    announceWinner(result) {
        let winner = document.getElementById("turn");
        winner.innerHTML = result;
    }

    getPlayerTurn() {
        return this.turn;
    }
}

