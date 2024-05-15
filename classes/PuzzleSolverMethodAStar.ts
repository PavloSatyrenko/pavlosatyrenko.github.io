import { PuzzleSolver } from './PuzzleSolver';

export class PuzzleSolverMethodAStar extends PuzzleSolver {
    solve(initialState: number[][]): State | null {
        const initialStateObj: State = {
            tiles: initialState,
            emptyTilePos: { row: 0, col: 0 },
            cost: 0,
            heuristic: 0,
            totalCost: 0
        };
        initialStateObj.emptyTilePos = this.findEmptyTilePosition(initialStateObj);

        const openSet = new PriorityQueue<State>();
        const closedSet = new Set<string>();
        openSet.enqueue(initialStateObj, initialStateObj.totalCost);

        while (!openSet.isEmpty()) {
            const currentState = openSet.dequeue()!;
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

    findEmptyTilePosition(state: State): { row: number, col: number } {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (state.tiles[i][j] === 0) {
                    return { row: i, col: j };
                }
            }
        }
        throw new Error("Invalid state: Empty tile not found.");
    }

    isGoalState(state: State): boolean {
        const goalState: string = "123456780";
        return this.stateToString(state) === this.stateToString({ tiles: this.goalState, emptyTilePos: { row: 0, col: 0 }, cost: 0, heuristic: 0, totalCost: 0 });
    }
}