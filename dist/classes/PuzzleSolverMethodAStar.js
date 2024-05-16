import { PuzzleSolver } from './PuzzleSolver';
import { PriorityQueue } from './PriorityQueue';
export class PuzzleSolverMethodAStar extends PuzzleSolver {
    solve(initialState) {
        const openSet = new PriorityQueue();
        const closedSet = new Set();
        openSet.enqueue(initialState, 0);
        while (!openSet.isEmpty()) {
            const currentState = openSet.dequeue();
            if (this.stateToString(currentState) == "123456780") {
                return currentState;
            }
            closedSet.add(this.stateToString(currentState));
            const availableStates = this.getAvailableStates(currentState);
            for (const state of availableStates) {
                if (closedSet.has(this.stateToString(state))) {
                    continue;
                }
                openSet.enqueue(state, state.totalCost);
            }
        }
        return null;
    }
}
//# sourceMappingURL=PuzzleSolverMethodAStar.js.map