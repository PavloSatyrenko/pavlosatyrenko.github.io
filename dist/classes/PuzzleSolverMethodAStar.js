import { PuzzleSolver } from './PuzzleSolver';
export class PuzzleSolverMethodAStar extends PuzzleSolver {
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
        const directions = [{ row: -1, col: 0 }, { row: 1, col: 0 }, { row: 0, col: -1 }, { row: 0, col: 1 }];
        for (const dir of directions) {
            const newRow = state.emptyTilePos.row + dir.row;
            const newCol = state.emptyTilePos.col + dir.col;
            if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
                const newTiles = state.tiles.map(row => row.slice());
                [newTiles[state.emptyTilePos.row][state.emptyTilePos.col], newTiles[newRow][newCol]] =
                    [newTiles[newRow][newCol], newTiles[state.emptyTilePos.row][state.emptyTilePos.col]];
                const newState = {
                    tiles: newTiles,
                    emptyTilePos: { row: newRow, col: newCol },
                    cost: state.cost + 1,
                    heuristic: 0,
                    totalCost: 0,
                    parent: state
                };
                newState.heuristic = this.calculateTotalHeuristic(newState);
                newState.totalCost = newState.cost + newState.heuristic;
                availableStates.push(newState);
            }
        }
        return availableStates;
    }
    solve(initialState) {
        const initialStateObj = {
            tiles: initialState,
            emptyTilePos: { row: 0, col: 0 },
            cost: 0,
            heuristic: 0,
            totalCost: 0
        };
        initialStateObj.emptyTilePos = this.findEmptyTilePosition(initialStateObj);
        const openSet = new PriorityQueue();
        const closedSet = new Set();
        openSet.enqueue(initialStateObj, initialStateObj.totalCost);
        while (!openSet.isEmpty()) {
            const currentState = openSet.dequeue();
            if (this.isGoalState(currentState)) {
                return currentState;
            }
            closedSet.add(this.stateToString(currentState));
            const successorStates = this.getSuccessorStates(currentState);
            for (const successorState of successorStates) {
                if (closedSet.has(this.stateToString(successorState))) {
                    continue;
                }
                openSet.enqueue(successorState, successorState.totalCost);
            }
        }
        return null; // No solution found
    }
    findEmptyTilePosition(state) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (state.tiles[i][j] === 0) {
                    return { row: i, col: j };
                }
            }
        }
        throw new Error("Invalid state: Empty tile not found.");
    }
    isGoalState(state) {
        const goalState = "123456780";
        return this.stateToString(state) === this.stateToString({ tiles: this.goalState, emptyTilePos: { row: 0, col: 0 }, cost: 0, heuristic: 0, totalCost: 0 });
    }
}
//# sourceMappingURL=PuzzleSolverMethodAStar.js.map