import { PuzzleSolver } from './PuzzleSolver';
export class PuzzleSolverMethodRBFS extends PuzzleSolver {
    solve(initialState, maxDepth) {
        return this.RBFS(initialState, Infinity, maxDepth)[0];
    }
    RBFS(initialState, bound, depth) {
        if (!depth) {
            return [null, Infinity];
        }
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
            const result = this.RBFS(bestState.state, Math.min(bound, secondBestState.value), depth - 1);
            bestState.value = result[1] || Infinity;
            if (result[0] != null) {
                return result;
            }
        }
    }
}
//# sourceMappingURL=PuzzleSolverMethodRBFS.js.map