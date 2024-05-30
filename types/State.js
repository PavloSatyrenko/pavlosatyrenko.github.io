"use strict";
class State {
    board;
    emptyTile;
    previousState;
    cost;
    heuristic;
    totalCost;
    constructor(board, emptyTile, previousState, cost = 0, heuristic = 0, totalCost = 0) {
        this.board = board;
        this.emptyTile = emptyTile;
        this.cost = cost;
        this.heuristic = heuristic;
        this.totalCost = totalCost;
    }
    stateToString(state) {
        return state.board.sort((a, b) => a.row - b.row || a.column - b.column)
            .map((tile) => tile.value).join("");
    }
    stringToState(string) {
        const board = string.split('').map((value, index) => {
            return {
                value: +value,
                row: Math.floor(index / 3) + 1,
                column: index % 3 + 1,
            };
        });
        const emptyTile = board.find((tile) => tile.value == 0);
        return new State(board, emptyTile);
    }
}
//# sourceMappingURL=State.js.map