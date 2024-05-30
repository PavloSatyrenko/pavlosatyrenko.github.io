export class PriorityQueue {
    items = [];
    enqueue(value, priority) {
        this.items.push({ value, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }
    dequeue() {
        return this.items.shift()?.value;
    }
    isEmpty() {
        return this.items.length == 0;
    }
}
//# sourceMappingURL=PriorityQueue.js.map