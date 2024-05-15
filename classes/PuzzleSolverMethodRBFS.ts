import { PuzzleSolver } from './PuzzleSolver';

export class PuzzleSolverMethodRBFS extends PuzzleSolver {
    solve(initialState: State): State | null {
        return this.RBFS(initialState, Infinity);
    }

    RBFS(initialState: State, bound: number): State | null {
        if (this.stateToString(initialState) == "123456780") {
            return initialState;
        }

        const availableStates: { state: State, value: number }[] = this.getAvailableStates(initialState)
            .map((state: State) => {
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

            const secondBestState: { state: State, value: number } = availableStates.reduce((previous, current) => {
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