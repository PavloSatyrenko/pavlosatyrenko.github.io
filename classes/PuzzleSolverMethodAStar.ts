import { PuzzleSolver } from './PuzzleSolver';
import { PriorityQueue } from './PriorityQueue';
import { State } from './State';

export class PuzzleSolverMethodAStar extends PuzzleSolver {
    solve(initialState: State): [State | null, number] {
        const openSet = new PriorityQueue<State>();
        const closedSet = new Set<string>();
        let counter: number = 0;

        openSet.enqueue(initialState, 0);

        while (!openSet.isEmpty()) {
            counter++;

            const currentState: State = openSet.dequeue()!;

            if (currentState.stateToString() == "123456780") {
                return [currentState, counter];
            }

            closedSet.add(currentState.stateToString());

            const availableStates: State[] = this.getAvailableStates(currentState);
            for (const state of availableStates) {
                if (closedSet.has(state.stateToString())) {
                    continue;
                }

                openSet.enqueue(state, state.totalCost);
            }
        }

        return [null, counter];
    }
}