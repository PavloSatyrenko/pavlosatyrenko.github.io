import { PuzzleSolver } from './PuzzleSolver';
export class PuzzleSolverMethodRBFS extends PuzzleSolver {
    counter = 1;
    solve(initialState) {
        this.counter = 1;
        return [this.RBFS(initialState, Infinity)[0], this.counter];
    }
    RBFS(initialState, bound) {
        if (initialState.stateToString() == "123456780") {
            return [initialState, initialState.totalCost];
        }
        const availableStates = this.getAvailableStates(initialState)
            .map((state) => {
            return {
                state,
                value: Math.max(state.totalCost, initialState.totalCost)
            };
        });
        while (true) {
            this.counter++;
            availableStates.sort((a, b) => a.value - b.value);
            const bestState = availableStates[0];
            if (bestState.value > bound) {
                return [null, bestState.value];
            }
            const secondBestState = availableStates[1];
            const result = this.RBFS(bestState.state, Math.min(bound, secondBestState.value));
            bestState.value = result[1] || Infinity;
            if (result[0] != null) {
                return result;
            }
        }
    }
}
//# sourceMappingURL=PuzzleSolverMethodRBFS.js.map