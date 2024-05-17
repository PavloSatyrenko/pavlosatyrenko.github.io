import { Game } from './Game';
import { PuzzleSolver } from './PuzzleSolver';

export class PuzzleSolverMethodRBFS extends PuzzleSolver {
    solve(initialState: State, maxDepth: number): State | null {
        return this.RBFS(initialState, Infinity, maxDepth)[0];
    }

    RBFS(initialState: State, bound: number, depth: number): [State | null, number] {
        if (!depth) {
            return [null, Infinity];
        }

        if (this.stateToString(initialState) == "123456780") {
            return [initialState, initialState.totalCost];
        }

        const availableStates: { state: State, value: number }[] = this.getAvailableStates(initialState)
            .map((state: State) => {
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

            const secondBestState: { state: State, value: number } = availableStates[1];

            const result = this.RBFS(bestState.state, Math.min(bound, secondBestState.value), depth - 1);

            bestState.value = result[1] || Infinity;

            if (result[0] != null) {
                return result;
            }
        }
    }
}