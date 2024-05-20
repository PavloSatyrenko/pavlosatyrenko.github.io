export class Message {
    static message = "";
    static type = "";
    static messageElement = document.getElementsByClassName("message")[0];
    static create(message, type) {
        this.message = message;
        this.type = type;
        this.messageElement.classList.add("message_" + this.type);
        this.messageElement.innerHTML = "";
        const newTitle = document.createElement("h3");
        newTitle.innerText = this.type.charAt(0).toUpperCase() + this.type.slice(1) + "!";
        const newMessage = document.createElement("p");
        newMessage.innerText = this.message;
        this.messageElement.appendChild(newTitle);
        this.messageElement.appendChild(newMessage);
    }
    static clear() {
        this.messageElement.classList.remove("message_" + this.type);
        this.messageElement.innerHTML = "";
    }
}
//# sourceMappingURL=Message.js.map