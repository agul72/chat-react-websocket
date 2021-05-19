export class WebSocketService {

    client: WebSocket;

    constructor() {
        this.client = new WebSocket('ws://localhost:9000');
    }

    getChannel(): WebSocket {
        return this.client;
    }

    closeChannel(): void {
        this.client.close();
    }
}



