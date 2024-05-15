export class PriorityQueue<T> {
    private items: { value: T, priority: number }[] = [];

    public enqueue(value: T, priority: number): void {
        this.items.push({ value, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    public dequeue(): T | undefined {
        return this.items.shift()?.value;
    }

    public isEmpty(): boolean {
        return this.items.length == 0;
    }
}