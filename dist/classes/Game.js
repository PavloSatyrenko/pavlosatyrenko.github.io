import { PuzzleSolverMethodAStar } from "./PuzzleSolverMethodAStar";
import { PuzzleSolverMethodRBFS } from "./PuzzleSolverMethodRBFS";
import { Message } from "./Message";
import { State } from "./State";
export class Game {
    boardElement;
    boardInput;
    boardButton;
    generateButton;
    radioButton;
    solveButton;
    result;
    tableElement;
    complexityElement;
    nextButton;
    previousButton;
    resetButton;
    animateButton;
    stopButton;
    downloadButton;
    puzzleSolver;
    defaultBoard;
    solutionIndex = 0;
    animationInterval = null;
    constructor() {
        this.boardElement = document.getElementsByClassName("tile");
        this.boardInput = document.getElementsByClassName("boardInput")[0];
        this.boardButton = document.getElementsByClassName("boardButton")[0];
        this.generateButton = document.getElementsByClassName("generateButton")[0];
        this.radioButton = document.getElementsByClassName("radioButton");
        this.solveButton = document.getElementsByClassName("solveButton")[0];
        this.result = document.getElementsByClassName("result")[0];
        this.tableElement = document.getElementsByClassName("table")[0];
        this.complexityElement = document.getElementsByClassName("complexity")[0];
        this.nextButton = document.getElementsByClassName("nextButton")[0];
        this.previousButton = document.getElementsByClassName("previousButton")[0];
        this.resetButton = document.getElementsByClassName("resetButton")[0];
        this.animateButton = document.getElementsByClassName("animateButton")[0];
        this.stopButton = document.getElementsByClassName("stopButton")[0];
        this.downloadButton = document.getElementsByClassName("downloadButton")[0];
        this.puzzleSolver = new PuzzleSolverMethodAStar();
        this.defaultBoard = State.stringToState("012345678");
        this.boardButton.addEventListener("click", () => this.onBoardButtonClick(this.boardInput.value));
        this.boardInput.addEventListener("input", () => this.onBoardInputType(this.boardInput.value));
        this.generateButton.addEventListener("click", () => this.generateBoard());
        for (let i = 0; i < this.radioButton.length; i++) {
            this.radioButton[i].addEventListener("change", () => this.onMethodSelectChange(this.radioButton[i].value));
        }
        this.solveButton.addEventListener("click", () => this.solve());
        this.nextButton.addEventListener("click", () => this.increaseSolutionIndex(true));
        this.previousButton.addEventListener("click", () => this.decreaseSolutionIndex());
        this.resetButton.addEventListener("click", () => this.resetSolutionIndex());
        this.animateButton.addEventListener("click", () => this.onAnimateButtonClick());
        this.stopButton.addEventListener("click", () => this.onStopButtonClick());
        this.stopButton.style.display = "none";
    }
    drawBoard(state = this.defaultBoard) {
        state.board.forEach((tile) => {
            const tileElement = [...this.boardElement].find((tileElement) => +tileElement.dataset["value"] == tile.value);
            tileElement.dataset["row"] = tile.row.toString();
            tileElement.dataset["column"] = tile.column.toString();
        });
    }
    onBoardInputType(value) {
        let isValidBoard = true;
        if (value.length != 0) {
            if (value.length != 9) {
                isValidBoard = false;
                Message.create("The board must contain 9 digits.", "error");
            }
            else if (!value.match(/[0-8]{9}/)) {
                isValidBoard = false;
                Message.create("The board must contain only digits from 0 to 8.", "error");
            }
            else if (new Set(value).size != value.length) {
                isValidBoard = false;
                Message.create("The board must contain unique digits.", "error");
            }
        }
        if (!isValidBoard) {
            this.solveButton.disabled = true;
            this.boardButton.disabled = true;
            return;
        }
        if (!this.puzzleSolver.isSolvable(value)) {
            this.solveButton.disabled = true;
            Message.create("This board is unsolvable.", "warning");
        }
        else {
            this.solveButton.disabled = false;
            Message.clear();
        }
        this.boardButton.disabled = false;
    }
    onBoardButtonClick(value) {
        this.onStopButtonClick();
        const state = value.length ? State.stringToState(value) : this.defaultBoard;
        this.drawBoard(state);
    }
    generateBoard() {
        const unusedValues = Array.from({ length: 9 }, (_, index) => index);
        let boardString = "";
        for (let i = 0; i < 9; i++) {
            const randomIndex = Math.floor(Math.random() * unusedValues.length);
            boardString += unusedValues.splice(randomIndex, 1)[0];
        }
        this.onStopButtonClick();
        this.boardInput.value = boardString;
        this.drawBoard(State.stringToState(boardString));
        if (!this.puzzleSolver.isSolvable(boardString)) {
            this.solveButton.disabled = true;
            Message.create("This board is unsolvable.", "warning");
        }
        else {
            this.solveButton.disabled = false;
            Message.clear();
        }
    }
    onMethodSelectChange(value) {
        this.solveButton.disabled = true;
        if (value === "A*") {
            this.puzzleSolver = new PuzzleSolverMethodAStar();
        }
        else if (value === "RBFS") {
            this.puzzleSolver = new PuzzleSolverMethodRBFS();
        }
        this.solveButton.disabled = !this.puzzleSolver.isSolvable(this.boardInput.value);
    }
    solve() {
        const initialState = this.boardInput.value.length ? State.stringToState(this.boardInput.value) : this.defaultBoard;
        this.tableElement.innerHTML = "";
        this.result.classList.add("result_loading");
        this.solveButton.disabled = true;
        this.onStopButtonClick();
        setTimeout(() => {
            const [solution, counter] = this.puzzleSolver.solve(initialState);
            this.solveButton.disabled = false;
            this.result.classList.remove("result_loading");
            if (solution) {
                this.complexityElement.innerText = "Nodes traversed: " + counter;
                this.result.classList.add("result_visible");
                Message.create("A solution has been found.", "success");
                this.generateTable(this.unpackState(solution));
                this.drawBoard(solution);
                this.tableElement.children[this.solutionIndex].scrollIntoView({ block: "center", behavior: "smooth" });
                this.tableElement.children[this.solutionIndex].children[1].classList.add("table__button_active");
            }
        }, 100);
    }
    unpackState(state) {
        const path = [];
        while (state) {
            path.unshift(state.stateToString());
            state = state.previousState;
        }
        return path;
    }
    increaseSolutionIndex(isPressed) {
        this.tableElement.children[this.solutionIndex++].children[1].classList.remove("table__button_active");
        this.tableElement.children[this.solutionIndex].children[1].classList.add("table__button_active");
        this.tableElement.children[this.solutionIndex].scrollIntoView({ block: "center", behavior: "smooth" });
        this.drawBoard(State.stringToState(this.tableElement.children[this.solutionIndex].children[1].textContent));
        this.previousButton.disabled = false;
        if (this.solutionIndex == this.tableElement.children.length - 1) {
            this.nextButton.disabled = true;
        }
        if (isPressed) {
            this.onStopButtonClick();
        }
    }
    decreaseSolutionIndex() {
        this.tableElement.children[this.solutionIndex--].children[1].classList.remove("table__button_active");
        this.tableElement.children[this.solutionIndex].children[1].classList.add("table__button_active");
        this.tableElement.children[this.solutionIndex].scrollIntoView({ block: "center", behavior: "smooth" });
        this.drawBoard(State.stringToState(this.tableElement.children[this.solutionIndex].children[1].textContent));
        this.nextButton.disabled = false;
        if (this.solutionIndex == 0) {
            this.previousButton.disabled = true;
        }
        this.onStopButtonClick();
    }
    resetSolutionIndex() {
        this.tableElement.children[this.solutionIndex].children[1].classList.remove("table__button_active");
        this.solutionIndex = 0;
        this.tableElement.children[this.solutionIndex].children[1].classList.add("table__button_active");
        this.tableElement.children[this.solutionIndex].scrollIntoView({ block: "center", behavior: "smooth" });
        this.drawBoard(State.stringToState(this.tableElement.children[this.solutionIndex].children[1].textContent));
        this.previousButton.disabled = true;
        this.nextButton.disabled = false;
        this.onStopButtonClick();
    }
    onTableButtonClick(path, index) {
        this.tableElement.children[this.solutionIndex--].children[1].classList.remove("table__button_active");
        this.solutionIndex = index;
        this.tableElement.children[this.solutionIndex].children[1].classList.add("table__button_active");
        this.tableElement.children[this.solutionIndex].scrollIntoView({ block: "center", behavior: "smooth" });
        this.drawBoard(State.stringToState(path));
        this.nextButton.disabled = false;
        this.previousButton.disabled = false;
        if (this.solutionIndex == 0) {
            this.previousButton.disabled = true;
        }
        if (this.solutionIndex == this.tableElement.children.length - 1) {
            this.nextButton.disabled = true;
        }
        this.onStopButtonClick();
    }
    onAnimateButtonClick() {
        if (!this.animationInterval) {
            this.resetSolutionIndex();
            this.animateButton.style.display = "none";
            this.stopButton.style.display = "flex";
            this.animationInterval = setInterval(() => {
                this.increaseSolutionIndex(false);
                if (this.solutionIndex == this.tableElement.children.length - 1 && this.animationInterval) {
                    clearInterval(this.animationInterval);
                    this.animationInterval = null;
                    this.animateButton.style.display = "flex";
                    this.stopButton.style.display = "none";
                }
            }, 1000);
        }
    }
    onStopButtonClick() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
            this.animateButton.style.display = "flex";
            this.stopButton.style.display = "none";
        }
    }
    generateTable(path) {
        this.tableElement.innerHTML = "";
        this.solutionIndex = path.length - 1;
        for (let i = 0; i < path.length; i++) {
            let newIndexElement = document.createElement("span");
            newIndexElement.classList.add("table__index");
            newIndexElement.innerText = i + 1 + ".";
            let newButtonElement = document.createElement("button");
            newButtonElement.classList.add("table__button");
            newButtonElement.innerText = path[i];
            newButtonElement.addEventListener("click", () => this.onTableButtonClick(path[i], i));
            let newElement = document.createElement("div");
            newElement.classList.add("table__row");
            newElement.appendChild(newIndexElement);
            newElement.appendChild(newButtonElement);
            this.tableElement.appendChild(newElement);
        }
        this.downloadButton.onclick = () => this.dowloadSolution(path);
        this.nextButton.disabled = true;
    }
    dowloadSolution(path) {
        const downloadLink = document.createElement("a");
        const text = path.map((state, index) => index + 1 + ". " + state).join("\n");
        downloadLink.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        downloadLink.setAttribute("download", "solution_" + path[0] + ".txt");
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
//# sourceMappingURL=Game.js.map