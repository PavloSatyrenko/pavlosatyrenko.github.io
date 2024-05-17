import { PuzzleSolver } from './PuzzleSolver';
export class PuzzleSolverMethodRBFS extends PuzzleSolver {
    solve(initialState) {
        return this.RBFS(initialState, Infinity)[0];
    }
    RBFS(initialState, bound) {
        if (this.stateToString(initialState) == "123456780") {
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