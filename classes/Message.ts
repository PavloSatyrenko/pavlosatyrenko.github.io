export class Message {
    static message: string = "";
    static type: string = "";

    static messageElement: HTMLElement = (document.getElementsByClassName("message") as unknown as HTMLElement[])[0];

    static create(message: string, type: string): void {
        this.message = message;
        this.type = type;

        this.clear();

        const newText: HTMLElement = document.createElement("div");
        newText.classList.add("message__text");

        const newTitle: HTMLElement = document.createElement("h3");
        newTitle.innerText = this.type.charAt(0).toUpperCase() + this.type.slice(1) + "!";
        newTitle.classList.add("message__title");

        const newMessage: HTMLElement = document.createElement("p");
        newMessage.innerText = this.message;
        newMessage.classList.add("message__info");

        newText.appendChild(newTitle);
        newText.appendChild(newMessage);

        const newIcon: HTMLImageElement = document.createElement("img");
        newIcon.src = "assets/" + this.type + ".svg";
        newIcon.classList.add("message__icon");

        this.messageElement.classList.add("message_" + this.type);
        this.messageElement.appendChild(newIcon);
        this.messageElement.appendChild(newText);
    }

    static clear(): void {
        this.messageElement.setAttribute("class", "message");
        this.messageElement.innerHTML = "";
    }
}