import { PuzzleSolverMethodAStar } from "./PuzzleSolverMethodAStar";
import { PuzzleSolverMethodRBFS } from "./PuzzleSolverMethodRBFS";
import { Message } from "./Message";
import { State } from "./State";

export class Game {
    boardElement: HTMLElement[];

    boardInput: HTMLInputElement;
    boardButton: HTMLButtonElement;
    generateButton: HTMLButtonElement;
    radioButton: HTMLInputElement[];
    solveButton: HTMLButtonElement;

    result: HTMLElement;
    tableElement: HTMLElement;
    complexityElement: HTMLElement;

    nextButton: HTMLButtonElement;
    previousButton: HTMLButtonElement;
    resetButton: HTMLButtonElement;
    animateButton: HTMLButtonElement;
    stopButton: HTMLButtonElement;
    downloadButton: HTMLButtonElement;

    puzzleSolver: PuzzleSolverMethodAStar | PuzzleSolverMethodRBFS;
    defaultBoard: State;
    solutionIndex: number = 0;
    animationInterval: ReturnType<typeof setTimeout> | null = null;

    constructor() {
        this.boardElement = document.getElementsByClassName("tile") as unknown as HTMLElement[];

        this.boardInput = (document.getElementsByClassName("boardInput") as unknown as HTMLInputElement[])[0];
        this.boardButton = (document.getElementsByClassName("boardButton") as unknown as HTMLButtonElement[])[0];
        this.generateButton = (document.getElementsByClassName("generateButton") as unknown as HTMLButtonElement[])[0];
        this.radioButton = document.getElementsByClassName("radioButton") as unknown as HTMLInputElement[];
        this.solveButton = (document.getElementsByClassName("solveButton") as unknown as HTMLButtonElement[])[0];

        this.result = (document.getElementsByClassName("result") as unknown as HTMLElement[])[0];
        this.tableElement = (document.getElementsByClassName("table") as unknown as HTMLElement[])[0];
        this.complexityElement = (document.getElementsByClassName("complexity") as unknown as HTMLElement[])[0];

        this.nextButton = (document.getElementsByClassName("nextButton") as unknown as HTMLButtonElement[])[0];
        this.previousButton = (document.getElementsByClassName("previousButton") as unknown as HTMLButtonElement[])[0];
        this.resetButton = (document.getElementsByClassName("resetButton") as unknown as HTMLButtonElement[])[0];
        this.animateButton = (document.getElementsByClassName("animateButton") as unknown as HTMLButtonElement[])[0];
        this.stopButton = (document.getElementsByClassName("stopButton") as unknown as HTMLButtonElement[])[0];
        this.downloadButton = (document.getElementsByClassName("downloadButton") as unknown as HTMLButtonElement[])[0];

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

    drawBoard(state: State = this.defaultBoard): void {
        state.board.forEach((tile: Tile) => {
            const tileElement: HTMLElement = [...this.boardElement].find((tileElement: HTMLElement) => +tileElement.dataset["value"]! == tile.value)!;
            tileElement.dataset["row"] = tile.row.toString();
            tileElement.dataset["column"] = tile.column.toString();
        });
    }

    onBoardInputType(value: string): void {
        let isValidBoard: boolean = true;

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

    onBoardButtonClick(value: string): void {
        this.onStopButtonClick();

        const state: State = value.length ? State.stringToState(value) : this.defaultBoard;
        this.drawBoard(state);
    }

    generateBoard(): void {
        const unusedValues: number[] = Array.from({ length: 9 }, (_, index) => index);
        let boardString: string = "";

        for (let i = 0; i < 9; i++) {
            const randomIndex: number = Math.floor(Math.random() * unusedValues.length);
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

    onMethodSelectChange(value: string): void {
        if (value === "A*") {
            this.puzzleSolver = new PuzzleSolverMethodAStar();
        }
        else if (value === "RBFS") {
            this.puzzleSolver = new PuzzleSolverMethodRBFS();
        }
    }

    solve(): void {
        const initialState: State = this.boardInput.value.length ? State.stringToState(this.boardInput.value) : this.defaultBoard;

        this.tableElement.innerHTML = "";
        this.result.classList.add("result_loading");
        this.solveButton.disabled = true;

        this.onStopButtonClick();

        setTimeout(() => {
            const [solution, counter]: [State | null, number] = this.puzzleSolver.solve(initialState);
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

    unpackState(state: State | null): string[] {
        const path: string[] = [];

        while (state) {
            path.unshift(state.stateToString());
            state = state.previousState!;
        }

        return path;
    }

    increaseSolutionIndex(isPressed: boolean): void {
        this.tableElement.children[this.solutionIndex++].children[1].classList.remove("table__button_active");

        this.tableElement.children[this.solutionIndex].children[1].classList.add("table__button_active");
        this.tableElement.children[this.solutionIndex].scrollIntoView({ block: "center", behavior: "smooth" });

        this.drawBoard(State.stringToState(this.tableElement.children[this.solutionIndex].children[1].textContent!));
        this.previousButton.disabled = false;

        if (this.solutionIndex == this.tableElement.children.length - 1) {
            this.nextButton.disabled = true;
        }

        if (isPressed) {
            this.onStopButtonClick();
        }
    }

    decreaseSolutionIndex(): void {
        this.tableElement.children[this.solutionIndex--].children[1].classList.remove("table__button_active");

        this.tableElement.children[this.solutionIndex].children[1].classList.add("table__button_active");
        this.tableElement.children[this.solutionIndex].scrollIntoView({ block: "center", behavior: "smooth" });

        this.drawBoard(State.stringToState(this.tableElement.children[this.solutionIndex].children[1].textContent!));
        this.nextButton.disabled = false;

        if (this.solutionIndex == 0) {
            this.previousButton.disabled = true;
        }

        this.onStopButtonClick();
    }

    resetSolutionIndex(): void {
        this.tableElement.children[this.solutionIndex].children[1].classList.remove("table__button_active");

        this.solutionIndex = 0;

        this.tableElement.children[this.solutionIndex].children[1].classList.add("table__button_active");
        this.tableElement.children[this.solutionIndex].scrollIntoView({ block: "center", behavior: "smooth" });

        this.drawBoard(State.stringToState(this.tableElement.children[this.solutionIndex].children[1].textContent!));
        this.previousButton.disabled = true;
        this.nextButton.disabled = this.tableElement.children.length <= 1;

        this.onStopButtonClick();
    }

    onTableButtonClick(path: string, index: number): void {
        this.tableElement.children[this.solutionIndex].children[1].classList.remove("table__button_active");

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

    onAnimateButtonClick(): void {
        if (!this.animationInterval) {
            this.resetSolutionIndex();
            if (this.tableElement.children.length > 1) {
                this.animateButton.style.display = "none";
                this.stopButton.style.display = "flex";


                this.animationInterval = setInterval(() => {
                    this.increaseSolutionIndex(false);

                    if (this.solutionIndex == this.tableElement.children.length - 1) {
                        this.onStopButtonClick();
                    }
                }, 1000);
            }
        }
    }

    onStopButtonClick(): void {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
            this.animateButton.style.display = "flex";
            this.stopButton.style.display = "none";
        }
    }

    generateTable(path: string[]): void {
        this.tableElement.innerHTML = "";
        this.solutionIndex = path.length - 1;

        for (let i = 0; i < path.length; i++) {
            let newIndexElement: HTMLElement = document.createElement("span");
            newIndexElement.classList.add("table__index");
            newIndexElement.innerText = i + 1 + ".";

            let newButtonElement: HTMLButtonElement = document.createElement("button");
            newButtonElement.classList.add("table__button");
            newButtonElement.innerText = path[i];
            newButtonElement.addEventListener("click", () => this.onTableButtonClick(path[i], i));

            let newElement: HTMLElement = document.createElement("div");
            newElement.classList.add("table__row");
            newElement.appendChild(newIndexElement);
            newElement.appendChild(newButtonElement);

            this.tableElement.appendChild(newElement);
        }

        this.downloadButton.onclick = () => this.dowloadSolution(path);
        this.nextButton.disabled = true;
        this.previousButton.disabled = this.tableElement.children.length <= 1;
    }

    dowloadSolution(path: string[]): void {
        const downloadLink = document.createElement("a");
        const text = path.map((state: string, index: number) => index + 1 + ". " + state).join("\n");

        downloadLink.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        downloadLink.setAttribute("download", "solution_" + path[0] + ".txt");

        downloadLink.style.display = "none";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}