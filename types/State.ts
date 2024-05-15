type State = {
    board: Tile[];
    emptyTile: Tile;
    cost: number;
    heuristic: number;
    totalCost: number;
    previousState?: State;
}