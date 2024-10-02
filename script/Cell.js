let VALUE_EMPTY = 1;
let VALUE_X = 2;
let VALUE_O = 3;
let DEFAULT_COLS = 10;
let DEFAULT_ROWS = 10;
let DEFAULT_CELL_SIZE = 40;

class Cell {
    x;y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = VALUE_EMPTY;
    }

    getHtml() {
        let top = this.x * DEFAULT_CELL_SIZE;
        let left = this.y * DEFAULT_CELL_SIZE;
        return `<div 
                id="cell-${this.x}-${this.y}" 
                onclick="play(${this.x}, ${this.y})"
                class="cell" style="position: absolute; 
                width: ${DEFAULT_CELL_SIZE}px; 
                height: ${DEFAULT_CELL_SIZE}px; 
                left: ${left}px; top: ${top}px;
                line-height: ${DEFAULT_CELL_SIZE}px"></div>`;
    }

    draw() {
        let cellDiv = document.getElementById(`cell-${this.x}-${this.y}`);
        switch (this.value){
            case VALUE_X:
                cellDiv.innerHTML = "X";
                break;
            case VALUE_O:
                cellDiv.innerHTML = "O";
                break;
            default:
                cellDiv.innerHTML = "";
                break;
        }
    }
}