import { PuzzleSolverMethodAStar } from "./PuzzleSolverMethodAStar";
import { PuzzleSolverMethodRBFS } from "./PuzzleSolverMethodRBFS";
export class Game {
    boardElement;
    boardInput;
    generateButton;
    methodSelect;
    solveButton;
    depthInput;
    tableElement;
    puzzleSolver;
    defaultBoard;
    constructor() {
        this.boardElement = document.getElementsByClassName("tile");
        this.boardInput = document.getElementsByClassName("boardInput")[0];
        this.generateButton = document.getElementsByClassName("generateButton")[0];
        this.methodSelect = document.getElementsByClassName("methodSelect")[0];
        this.solveButton = document.getElementsByClassName("solveButton")[0];
        this.depthInput = document.getElementsByClassName("depthInput")[0];
        this.tableElement = document.getElementsByClassName("table")[0];
        this.puzzleSolver = new PuzzleSolverMethodAStar();
        this.defaultBoard = this.puzzleSolver.stringToState("012345678");
        this.boardInput.addEventListener("input", () => this.onBoardInputType(this.boardInput.value));
        this.generateButton.addEventListener("click", () => this.generateBoard());
        this.methodSelect.addEventListener("change", () => this.onMethodSelectChange(this.methodSelect.value));
        this.solveButton.addEventListener("click", () => this.solve());
    }
    drawBoard(state = this.defaultBoard) {
        state.board.forEach((tile) => {
            const tileElement = [...this.boardElement].find((tileElement) => +tileElement.dataset["value"] == tile.value);
            tileElement.dataset["row"] = tile.row.toString();
            tileElement.dataset["column"] = tile.column.toString();
        });
    }
    onBoardInputType(value) {
        if ((value.length !== 9 ||
            !value.match(/[0-8]{9}/) ||
            new Set(value).size != value.length) &&
            value.length != 0) {
            this.solveButton.disabled = true;
            return;
        }
        this.drawBoard(this.puzzleSolver.stringToState(value));
        this.solveButton.disabled = !this.puzzleSolver.isSolvable(value);
    }
    generateBoard() {
        const unusedValues = Array.from({ length: 9 }, (_, index) => index);
        let boardString = "";
        for (let i = 0; i < 9; i++) {
            const randomIndex = Math.floor(Math.random() * unusedValues.length);
            boardString += unusedValues.splice(randomIndex, 1)[0];
        }
        this.boardInput.value = boardString;
        this.drawBoard(this.puzzleSolver.stringToState(boardString));
        this.solveButton.disabled = !this.puzzleSolver.isSolvable(boardString);
    }
    onMethodSelectChange(value) {
        if (value === "A*") {
            this.puzzleSolver = new PuzzleSolverMethodAStar();
        }
        else if (value === "RBFS") {
            this.puzzleSolver = new PuzzleSolverMethodRBFS();
        }
    }
    solve() {
        const initialState = this.boardInput.value.length ? this.puzzleSolver.stringToState(this.boardInput.value) : this.defaultBoard;
        this.drawBoard(initialState);
        this.tableElement.innerHTML = "";
        setTimeout(() => {
            const solution = this.puzzleSolver.solve(initialState, +this.depthInput.value || 25);
            if (!solution) {
                alert("No solution found");
            }
            else {
                this.generateTable(this.unpackState(solution));
                this.drawBoard(solution);
            }
        }, 0);
    }
    unpackState(state) {
        const path = [];
        while (state) {
            path.unshift(this.puzzleSolver.stateToString(state));
            state = state.previousState;
        }
        return path;
    }
    generateTable(path) {
        let newElement;
        this.tableElement.innerHTML = "";
        for (let i = 0; i < path.length; i++) {
            newElement = document.createElement("div");
            newElement.classList.add("table__row");
            newElement.innerText = i + ". " + path[i];
            newElement.addEventListener("click", () => this.drawBoard(this.puzzleSolver.stringToState(path[i])));
            this.tableElement.appendChild(newElement);
        }
    }
}
//# sourceMappingURL=Game.js.map