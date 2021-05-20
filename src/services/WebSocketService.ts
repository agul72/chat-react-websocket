export class WebSocketService {

    client: WebSocket;

    constructor() {
        this.client = new WebSocket('ws://192.168.1.23:9000');
    }

    getChannel(): WebSocket {
        return this.client;
    }

    closeChannel(): void {
        this.client.close();
    }
}



