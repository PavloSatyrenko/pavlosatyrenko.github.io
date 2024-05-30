export class Message {
    static message = "";
    static type = "";
    static messageElement = document.getElementsByClassName("message")[0];
    static create(message, type) {
        this.message = message;
        this.type = type;
        this.clear();
        const newText = document.createElement("div");
        newText.classList.add("message__text");
        const newTitle = document.createElement("h3");
        newTitle.innerText = this.type.charAt(0).toUpperCase() + this.type.slice(1) + "!";
        newTitle.classList.add("message__title");
        const newMessage = document.createElement("p");
        newMessage.innerText = this.message;
        newMessage.classList.add("message__info");
        newText.appendChild(newTitle);
        newText.appendChild(newMessage);
        const newIcon = document.createElement("img");
        newIcon.src = "assets/" + this.type + ".svg";
        newIcon.classList.add("message__icon");
        this.messageElement.classList.add("message_" + this.type);
        this.messageElement.appendChild(newIcon);
        this.messageElement.appendChild(newText);
    }
    static clear() {
        this.messageElement.setAttribute("class", "message");
        this.messageElement.innerHTML = "";
    }
}
//# sourceMappingURL=Message.js.map