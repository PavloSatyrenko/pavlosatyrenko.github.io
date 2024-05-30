import { PuzzleSolver } from './PuzzleSolver';
import { PriorityQueue } from './PriorityQueue';
export class PuzzleSolverMethodAStar extends PuzzleSolver {
    solve(initialState) {
        const openSet = new PriorityQueue();
        const closedSet = new Set();
        let counter = 0;
        openSet.enqueue(initialState, 0);
        while (!openSet.isEmpty()) {
            counter++;
            const currentState = openSet.dequeue();
            if (currentState.stateToString() == "123456780") {
                return [currentState, counter];
            }
            closedSet.add(currentState.stateToString());
            const availableStates = this.getAvailableStates(currentState);
            for (const state of availableStates) {
                if (closedSet.has(state.stateToString())) {
                    continue;
                }
                openSet.enqueue(state, state.totalCost);
            }
        }
        return [null, counter];
    }
}
//# sourceMappingURL=PuzzleSolverMethodAStar.js.map