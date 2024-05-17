import { Game } from './Game';
import { PuzzleSolver } from './PuzzleSolver';

export class PuzzleSolverMethodRBFS extends PuzzleSolver {
    solve(initialState: State, maxDepth: number): State | null {
        return this.RBFS(initialState, Infinity, maxDepth);
    }

    RBFS(initialState: State, bound: number, depth: number): State | null {
        if (!depth) {
            return null;
        }

        if (this.stateToString(initialState) == "123456780") {
            return initialState;
        }

        const availableStates: { state: State, value: number }[] = this.getAvailableStates(initialState)
            .map((state: State) => {
                return {
                    state,
                    value: Math.max(state.totalCost, initialState.totalCost)
                };
            });

        while (availableStates.some((state: { state: State, value: number }) => state.value != Infinity)) {
            const bestState = availableStates.reduce((previous, current) => {
                return previous.value < current.value ? previous : current;
            });

            if (bestState.value > bound) {
                return null;
            }

            const secondBestState: { state: State, value: number } = availableStates.reduce((previous, current) => {
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