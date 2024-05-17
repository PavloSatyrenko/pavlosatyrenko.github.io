import { Game } from './Game';
import { PuzzleSolver } from './PuzzleSolver';
export class PuzzleSolverMethodRBFS extends PuzzleSolver {
    solve(initialState, maxDepth) {
        return this.RBFS(initialState, Infinity, maxDepth);
    }
    RBFS(initialState, bound, depth) {
        if (!depth) {
            return null;
        }
        if (this.stateToString(initialState) == "123456780") {
            return initialState;
        }
        const availableStates = this.getAvailableStates(initialState)
            .map((state) => {
            return {
                state,
                value: Math.max(state.totalCost, initialState.totalCost)
            };
        });
        while (availableStates.some((state) => state.value != Infinity)) {
            const bestState = availableStates.reduce((previous, current) => {
                return previous.value < current.value ? previous : current;
            });
            if (bestState.value > bound) {
                return null;
            }
            const secondBestState = availableStates.reduce((previous, current) => {
                return current.value <= previous.value ? previous : current;
            });
            console.log(bestState.value, secondBestState.value, bound, depth - 1);
            const game = new Game();
            game.drawBoard(bestState.state);
            const result = this.RBFS(bestState.state, Math.min(bound, secondBestState.value), depth - 1);
            bestState.value = result?.totalCost || Infinity;
            if (result !== null) {
                return result;
            }
        }
        return null;
    }
}
//# sourceMappingURL=PuzzleSolverMethodRBFS.js.map