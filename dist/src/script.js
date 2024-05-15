import { PuzzleSolver } from "../classes/PuzzleSolver";
document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementsByClassName("tile");
    const boardInput = document.getElementById("boardInput");
    const generateButton = document.getElementById("generateButton");
    const methodSelect = document.getElementById("methodSelect");
    const solveButton = document.getElementById("solveButton");
    const state = {
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
    const puzzleSolver = new PuzzleSolver();
});
//# sourceMappingURL=script.js.map