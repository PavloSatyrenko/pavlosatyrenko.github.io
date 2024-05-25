import { PuzzleSolver } from './PuzzleSolver';
import { State } from './State';

export class PuzzleSolverMethodRBFS extends PuzzleSolver {
    private counter: number = 0;

    solve(initialState: State): [State | null, number] {
        this.counter = 0;

        return [this.RBFS(initialState, Infinity)[0], this.counter];
    }

    RBFS(initialState: State, bound: number): [State | null, number] {
        if (initialState.stateToString() == "123456780") {
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
            this.counter++;

            availableStates.sort((a, b) => a.value - b.value);
            const bestState = availableStates[0];

            if (bestState.value > bound) {
                return [null, bestState.value];
            }

            const secondBestState: { state: State, value: number } = availableStates[1];

            const result = this.RBFS(bestState.state, Math.min(bound, secondBestState.value));

            bestState.value = result[1] || Infinity;

            if (result[0] != null) {
                return result;
            }
        }
    }
}