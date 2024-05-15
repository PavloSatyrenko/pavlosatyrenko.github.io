export class PuzzleSolver {
    stateToString(state) {
        return state.board.sort((a, b) => {
            if (a.row == b.row) {
                return a.column - b.column;
            }
            return a.row - b.row;
        }).map((tile) => tile.value).join('');
    }
    stringToState(string) {
        const board = string.split('').map((value, index) => {
            return {
                value: parseInt(value),
                row: Math.floor(index / 3) + 1,
                column: index % 3 + 1,
            };
        });
        const emptyTile = board.find((tile) => tile.value == 0);
        return {
            board,
            emptyTile,
            cost: 0,
            heuristic: 0,
            totalCost: 0,
        };
    }
}
//# sourceMappingURL=PuzzleSolver.js.map