import { PuzzleSolverMethodAStar } from "../classes/PuzzleSolverMethodAStar";
import { PuzzleSolverMethodRBFS } from "../classes/PuzzleSolverMethodRBFS";

document.addEventListener("DOMContentLoaded", () => {
    const board: HTMLElement[] = document.getElementsByClassName("tile") as unknown as HTMLElement[];
    const boardInput: HTMLInputElement = (document.getElementsByClassName("boardInput") as unknown as HTMLInputElement[])[0];
    const generateButton: HTMLButtonElement = (document.getElementsByClassName("generateButton") as unknown as HTMLButtonElement[])[0];
    const methodSelect: HTMLSelectElement = (document.getElementsByClassName("methodSelect") as unknown as HTMLSelectElement[])[0];
    const solveButton: HTMLButtonElement = (document.getElementsByClassName("solveButton") as unknown as HTMLButtonElement[])[0];

    let puzzleSolver: PuzzleSolverMethodAStar | PuzzleSolverMethodRBFS = new PuzzleSolverMethodAStar();
    const defaultBoard: State = puzzleSolver.stringToState("012345678");

    drawBoard(board, defaultBoard);

    boardInput.addEventListener("input", () => {
        if ((boardInput.value.length !== 9 ||
            !boardInput.value.match(/[0-8]{9}/) ||
            new Set(boardInput.value).size != boardInput.value.length) &&
            boardInput.value.length != 0) {
            solveButton.disabled = true;
            return;
        }

        drawBoard(board, puzzleSolver.stringToState(boardInput.value));
        solveButton.disabled = false;
    });

    generateButton.addEventListener("click", () => {
        const unusedValues: number[] = Array.from({ length: 9 }, (_, index) => index);
        let boardString: string = "";

        for (let i = 0; i < 9; i++) {
            const randomIndex: number = Math.floor(Math.random() * unusedValues.length);
            boardString += unusedValues.splice(randomIndex, 1)[0];
        }

        boardInput.value = boardString;
        drawBoard(board, puzzleSolver.stringToState(boardString));
    });

    methodSelect.addEventListener("change", () => {
        if (methodSelect.value === "A*") {
            puzzleSolver = new PuzzleSolverMethodAStar();
        }
        else if (methodSelect.value === "RBFS") {
            puzzleSolver = new PuzzleSolverMethodRBFS();
        }
    });

    solveButton.addEventListener("click", () => {
        const initialState: State = puzzleSolver.stringToState(boardInput.value);
        const solution: State | null = puzzleSolver.solve(initialState);

        if (!solution) {
            alert("No solution found.");
            return;
        }

        drawBoard(board, solution);
    });
});

function drawBoard(board: HTMLElement[], state: State): void {
    state.board.forEach((tile: Tile) => {
        const tileElement: HTMLElement = [...board].find((tileElement: HTMLElement) => +tileElement.dataset["value"]! == tile.value)!;
        tileElement.dataset["row"] = tile.row.toString();
        tileElement.dataset["column"] = tile.column.toString();
    });
}