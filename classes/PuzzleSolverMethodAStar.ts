import { PuzzleSolver } from './PuzzleSolver';
import { PriorityQueue } from './PriorityQueue';

export class PuzzleSolverMethodAStar extends PuzzleSolver {
    solve(initialState: State): [State | null, number] {
        const openSet = new PriorityQueue<State>();
        const closedSet = new Set<string>();
        let counter: number = 0;

        openSet.enqueue(initialState, 0);

        while (!openSet.isEmpty()) {
            counter++;

            const currentState: State = openSet.dequeue()!;

            if (this.stateToString(currentState) == "123456780") {
                return [currentState, counter];
            }

            closedSet.add(this.stateToString(currentState));

            const availableStates: State[] = this.getAvailableStates(currentState);
            for (const state of availableStates) {
                if (closedSet.has(this.stateToString(state))) {
                    continue;
                }

                openSet.enqueue(state, state.totalCost);
            }
        }

        return [null, counter];
    }
}