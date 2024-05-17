import { PuzzleSolverMethodAStar } from "./PuzzleSolverMethodAStar";
import { PuzzleSolverMethodRBFS } from "./PuzzleSolverMethodRBFS";

export class Game {
    boardElement: HTMLElement[];
    boardInput: HTMLInputElement;
    generateButton: HTMLButtonElement;
    methodSelect: HTMLSelectElement;
    solveButton: HTMLButtonElement;
    depthInput: HTMLInputElement;

    puzzleSolver: PuzzleSolverMethodAStar | PuzzleSolverMethodRBFS;
    defaultBoard: State;

    constructor() {
        this.boardElement = document.getElementsByClassName("tile") as unknown as HTMLElement[];
        this.boardInput = (document.getElementsByClassName("boardInput") as unknown as HTMLInputElement[])[0];
        this.generateButton = (document.getElementsByClassName("generateButton") as unknown as HTMLButtonElement[])[0];
        this.methodSelect = (document.getElementsByClassName("methodSelect") as unknown as HTMLSelectElement[])[0];
        this.solveButton = (document.getElementsByClassName("solveButton") as unknown as HTMLButtonElement[])[0];
        this.depthInput = (document.getElementsByClassName("depthInput") as unknown as HTMLInputElement[])[0];

        this.puzzleSolver = new PuzzleSolverMethodAStar();
        this.defaultBoard = this.puzzleSolver.stringToState("012345678");

        this.boardInput.addEventListener("input", () => this.onBoardInputType(this.boardInput.value));
        this.generateButton.addEventListener("click", () => this.generateBoard());
        this.methodSelect.addEventListener("change", () => this.onMethodSelectChange(this.methodSelect.value));
        this.solveButton.addEventListener("click", () => this.solve());
    }

    drawBoard(state: State = this.defaultBoard): void {
        state.board.forEach((tile: Tile) => {
            const tileElement: HTMLElement = [...this.boardElement].find((tileElement: HTMLElement) => +tileElement.dataset["value"]! == tile.value)!;
            tileElement.dataset["row"] = tile.row.toString();
            tileElement.dataset["column"] = tile.column.toString();
        });
    }

    onBoardInputType(value: string): void {
        if ((value.length !== 9 ||
            !value.match(/[0-8]{9}/) ||
            new Set(value).size != value.length) &&
            value.length != 0) {
            this.solveButton.disabled = true;
            return;
        }

        this.drawBoard(this.puzzleSolver.stringToState(value));
        this.solveButton.disabled = false;
    }

    generateBoard(): void {
        const unusedValues: number[] = Array.from({ length: 9 }, (_, index) => index);
        let boardString: string = "";

        for (let i = 0; i < 9; i++) {
            const randomIndex: number = Math.floor(Math.random() * unusedValues.length);
            boardString += unusedValues.splice(randomIndex, 1)[0];
        }

        this.boardInput.value = boardString;
        this.drawBoard(this.puzzleSolver.stringToState(boardString));
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
        const initialState: State = this.boardInput.value.length ? this.puzzleSolver.stringToState(this.boardInput.value) : this.defaultBoard;

        this.drawBoard(initialState);

        const solution: State | null = this.puzzleSolver.solve(initialState, +this.depthInput.value || 20);
        console.log(this.unpackState(solution));

        if (!solution) {
            alert("No solution found");
            return;
        }

        this.drawBoard(solution);
    }

    unpackState(state: State | null): string[] {
        const path: string[] = [];

        while (state) {
            path.unshift(this.puzzleSolver.stateToString(state));
            state = state.previousState!;
        }

        return path;
    }

    // generateTable(path: string[]): void {
    //     this.tableElement.innerHTML = "";

    //     path.forEach((stateString: string) => {
    //         const row: HTMLTableRowElement = tableElement.insertRow();

    //         state.board.forEach((tile: Tile) => {
    //             const cell: HTMLTableCellElement = row.insertCell();
    //             cell.textContent = tile.value ? tile.value.toString() : "";
    //         });
    //     });
    // }
}