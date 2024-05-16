import { PuzzleSolver } from './PuzzleSolver';
export class PuzzleSolverMethodRBFS extends PuzzleSolver {
    solve(initialState) {
        return this.RBFS(initialState, Infinity);
    }
    RBFS(initialState, bound) {
        if (this.stateToString(initialState) == "123456780") {
            return initialState;
        }
        const availableStates = this.getAvailableStates(initialState)
            .map((state) => {
            return {
                state,
                value: Math.max(state.cost + state.heuristic, initialState.cost + initialState.heuristic)
            };
        });
        while (true) {
            const bestState = availableStates.reduce((previous, current) => {
                return previous.value < current.value ? previous : current;
            });
            if (bestState.value > bound) {
                return null;
            }
            const secondBestState = availableStates.reduce((previous, current) => {
                return current.value < previous.value ? previous : current;
            });
            const result = this.RBFS(bestState.state, Math.min(bound, secondBestState.value));
            if (result !== null) {
                return result;
            }
            bestState.value = Infinity;
        }
    }
}
//# sourceMappingURL=PuzzleSolverMethodRBFS.js.map