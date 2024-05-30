import { State } from "./State";
export class PuzzleSolver {
    isSolvable(string) {
        let inversionCount = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = i + 1; j < 9; j++) {
                if (string[i] != "0" && string[j] != "0" && string[i] > string[j]) {
                    inversionCount++;
                }
            }
        }
        return inversionCount % 2 == 0;
    }
    calculateManhattanHeuristic(tile) {
        if (tile.value == 0) {
            return 0;
        }
        const targetPosition = {
            row: Math.floor((tile.value - 1) / 3) + 1,
            column: (tile.value - 1) % 3 + 1
        };
        return Math.abs(tile.row - targetPosition.row) + Math.abs(tile.column - targetPosition.column);
    }
    calculateTotalHeuristic(state) {
        let heuristic = 0;
        state.board.forEach((tile) => {
            heuristic += this.calculateManhattanHeuristic(tile);
        });
        return heuristic;
    }
    getAvailableStates(state) {
        const availableStates = [];
        const directions = [{ row: -1, column: 0 }, { row: 1, column: 0 }, { row: 0, column: -1 }, { row: 0, column: 1 }];
        for (const direction of directions) {
            const newRow = state.emptyTile.row + direction.row;
            const newColumn = state.emptyTile.column + direction.column;
            if (newRow >= 1 && newRow <= 3 && newColumn >= 1 && newColumn <= 3) {
                const newBoard = state.board.map((tile) => Object.assign({}, tile));
                const tileToChange = newBoard.find((tile) => tile.row == newRow && tile.column == newColumn);
                tileToChange.row = state.emptyTile.row;
                tileToChange.column = state.emptyTile.column;
                newBoard.find((tile) => tile.value == 0).row = newRow;
                newBoard.find((tile) => tile.value == 0).column = newColumn;
                const newEmpyTile = newBoard.find((tile) => tile.value == 0);
                const newState = new State(newBoard, newEmpyTile, state, state.cost + 1);
                newState.heuristic = this.calculateTotalHeuristic(newState);
                newState.totalCost = newState.cost + newState.heuristic;
                availableStates.push(newState);
            }
        }
        return availableStates;
    }
}
//# sourceMappingURL=PuzzleSolver.js.map