export class PuzzleSolver {
    stateToString(state: State): string {
        return state.board.sort((a: Tile, b: Tile) => a.row - b.row || a.column - b.column)
            .map((tile: Tile) => tile.value).join("");
    }

    stringToState(string: string): State {
        const board: Tile[] = string.split('').map((value: string, index: number) => {
            return {
                value: +value,
                row: Math.floor(index / 3) + 1,
                column: index % 3 + 1,
            };
        });

        const emptyTile: Tile = board.find((tile: Tile) => tile.value == 0)!;

        return {
            board,
            emptyTile,
            cost: 0,
            heuristic: 0,
            depth: 0,
            totalCost: 0,
        };
    }

    isSolvable(string: string): boolean {
        let inversionCount = 0;

        for (let i = 0; i < 8; i++) {
            for (let j = i + 1; j < 9; j++) {
                if (string[i] != "0" && string[j] != "0" && string[i] > string[j]) {
                    inversionCount++;
                }
            }
        }
        return inversionCount % 2 == 0;
    }

    calculateManhattanHeuristic(tile: Tile): number {
        if (tile.value == 0) {
            return 0;
        }

        const targetPosition: { row: number, column: number } = {
            row: Math.floor((tile.value - 1) / 3) + 1,
            column: (tile.value - 1) % 3 + 1
        };

        return Math.abs(tile.row - targetPosition.row) + Math.abs(tile.column - targetPosition.column);
    }

    calculateTotalHeuristic(state: State): number {
        let heuristic: number = 0;

        state.board.forEach((tile: Tile) => {
            heuristic += this.calculateManhattanHeuristic(tile);
        });

        return heuristic;
    }

    getAvailableStates(state: State): State[] {
        const availableStates: State[] = [];
        const directions = [{ row: -1, column: 0 }, { row: 1, column: 0 }, { row: 0, column: -1 }, { row: 0, column: 1 }];

        for (const direction of directions) {
            const newRow = state.emptyTile.row + direction.row;
            const newColumn = state.emptyTile.column + direction.column;

            if (newRow >= 1 && newRow <= 3 && newColumn >= 1 && newColumn <= 3) {
                const newBoard = state.board.map((tile: Tile) => Object.assign({}, tile));
                const tileToChange = newBoard.find((tile: Tile) => tile.row == newRow && tile.column == newColumn)!

                tileToChange.row = state.emptyTile.row;
                tileToChange.column = state.emptyTile.column;

                newBoard.find((tile: Tile) => tile.value == 0)!.row = newRow;
                newBoard.find((tile: Tile) => tile.value == 0)!.column = newColumn;

                const newEmpyTile: Tile = newBoard.find((tile: Tile) => tile.value == 0)!;

                const newState: State = {
                    board: newBoard,
                    emptyTile: newEmpyTile,
                    cost: state.cost + 1,
                    heuristic: 0,
                    totalCost: 0,
                    depth: state.depth + 1,
                    previousState: state
                };

                newState.heuristic = this.calculateTotalHeuristic(newState);
                newState.totalCost = newState.cost + newState.heuristic;
                availableStates.push(newState);
            }
        }

        return availableStates;
    }
}