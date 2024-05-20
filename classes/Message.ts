export class Message {
    static message: string = "";
    static type: string = "";

    static messageElement: HTMLElement = (document.getElementsByClassName("message") as unknown as HTMLElement[])[0];

    static create(message: string, type: string): void {
        this.message = message;
        this.type = type;

        this.messageElement.classList.add("message_" + this.type);

        this.messageElement.innerHTML = "";

        const newTitle: HTMLElement = document.createElement("h3");
        newTitle.innerText = this.type.charAt(0).toUpperCase() + this.type.slice(1) + "!";

        const newMessage: HTMLElement = document.createElement("p");
        newMessage.innerText = this.message;

        this.messageElement.appendChild(newTitle);
        this.messageElement.appendChild(newMessage);
    }

    static clear(): void {
        this.messageElement.classList.remove("message_" + this.type);
        this.messageElement.innerHTML = "";
    }
}