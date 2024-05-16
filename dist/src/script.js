import { PuzzleSolverMethodAStar } from "../classes/PuzzleSolverMethodAStar";
import { PuzzleSolverMethodRBFS } from "../classes/PuzzleSolverMethodRBFS";
document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementsByClassName("tile");
    const boardInput = document.getElementsByClassName("boardInput")[0];
    const generateButton = document.getElementsByClassName("generateButton")[0];
    const methodSelect = document.getElementsByClassName("methodSelect")[0];
    const solveButton = document.getElementsByClassName("solveButton")[0];
    let puzzleSolver = new PuzzleSolverMethodAStar();
    const defaultBoard = puzzleSolver.stringToState("012345678");
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
        const unusedValues = Array.from({ length: 9 }, (_, index) => index);
        let boardString = "";
        for (let i = 0; i < 9; i++) {
            const randomIndex = Math.floor(Math.random() * unusedValues.length);
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
        const initialState = puzzleSolver.stringToState(boardInput.value);
        const solution = puzzleSolver.solve(initialState);
        if (!solution) {
            alert("No solution found.");
            return;
        }
        drawBoard(board, solution);
    });
});
function drawBoard(board, state) {
    state.board.forEach((tile) => {
        const tileElement = [...board].find((tileElement) => +tileElement.dataset["value"] == tile.value);
        tileElement.dataset["row"] = tile.row.toString();
        tileElement.dataset["column"] = tile.column.toString();
    });
}
//# sourceMappingURL=script.js.map