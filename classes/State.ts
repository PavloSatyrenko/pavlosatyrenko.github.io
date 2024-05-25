export class State {
    board: Tile[];
    emptyTile: Tile;
    previousState?: State;
    cost: number;
    heuristic: number;
    totalCost: number;

    constructor(board: Tile[], emptyTile: Tile, previousState?: State, cost: number = 0, heuristic: number = 0, totalCost: number = 0) {
        this.board = board;
        this.emptyTile = emptyTile;
        this.previousState = previousState;
        this.cost = cost;
        this.heuristic = heuristic;
        this.totalCost = totalCost;
    }

    stateToString(): string {
        return this.board.sort((a: Tile, b: Tile) => a.row - b.row || a.column - b.column)
            .map((tile: Tile) => tile.value).join("");
    }

    static stringToState(string: string): State {
        const board: Tile[] = string.split('').map((value: string, index: number) => {
            return {
                value: +value,
                row: Math.floor(index / 3) + 1,
                column: index % 3 + 1,
            };
        });

        const emptyTile: Tile = board.find((tile: Tile) => tile.value == 0)!;

        return new State(board, emptyTile);
    }
}