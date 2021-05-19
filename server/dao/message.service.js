class MessageService {

    constructor() {
        this.messages = [];
    }

    getMessages() {
        return this.messages;
    }

    addMessage(message) {
        this.messages.push(message);
    }
}

module.exports = MessageService;
