type State = {
    board: Tile[];
    emptyTile: Tile;
    cost: number;
    heuristic: number;
    totalCost: number;
    depth: number;
    previousState?: State;
}