import { PuzzleSolver } from "../classes/PuzzleSolver";

document.addEventListener("DOMContentLoaded", () => {
    const board: HTMLElement[] = document.getElementsByClassName("tile") as unknown as HTMLElement[];
    const boardInput: HTMLInputElement = document.getElementById("boardInput") as HTMLInputElement;
    const generateButton: HTMLButtonElement = document.getElementById("generateButton") as HTMLButtonElement;
    const methodSelect: HTMLSelectElement = document.getElementById("methodSelect") as HTMLSelectElement;
    const solveButton: HTMLButtonElement = document.getElementById("solveButton") as HTMLButtonElement;

    const state: State = {
        board: [
            {
                value: 0,
                row: 1,
                column: 1,
            },
            {
                value: 1,
                row: 1,
                column: 2,
            },
            {
                value: 2,
                row: 1,
                column: 3,
            },
            {
                value: 3,
                row: 2,
                column: 1,
            },
            {
                value: 4,
                row: 2,
                column: 2,
            },
            {
                value: 5,
                row: 2,
                column: 3,
            },
            {
                value: 6,
                row: 3,
                column: 1,
            },
            {
                value: 7,
                row: 3,
                column: 2,
            },
            {
                value: 8,
                row: 3,
                column: 3,
            },
        ],
        emptyTile: {
            value: 0,
            row: 1,
            column: 1,
        },
        cost: 0,
        heuristic: 0,
        totalCost: 0,
    };

    const puzzleSolver: PuzzleSolver = new PuzzleSolver();
});