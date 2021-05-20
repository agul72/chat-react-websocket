const WebSocket = require('ws');
// const {v4} = require('uuid');
const { uuid } = require('uuidv4');
const MessageService = require('./dao/message.service');

const messageService = new MessageService();

const wsServer = new WebSocket.Server({port: 9000});

wsServer.on('connection', onConnect);

function onConnect(wsClient) {
    wsClient.id = uuid();
    console.log('New user connected', wsClient.id);
    // Send hello-message to client
    wsClient.send(JSON.stringify({
        date: new Date(Date.now),
        user: {
            name: 'Chat bot',
            color: '#0000FF'
        },
        content: 'Hello there!'
    }));
    wsClient.on('message', (message) => {
        /* client message handler */
        try {
            // convert text message to JSON
            const jsonMessage = JSON.parse(message);
            switch (jsonMessage.action) {
                case 'MESSAGE':
                    const newMessage = jsonMessage.data;
                    messageService.addMessage(newMessage);
                    wsServer.clients.forEach(client => {
                        if(client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(newMessage));
                        }
                    });
                    break;
                default:
                    console.log('Unknown command');
            }
        } catch (error) {
            console.log('Error', error);
        }
    });
    wsClient.on('close', () => {
        console.log('User ' + wsClient.id + ' disconnected');
    });
}

console.log('Server have started o port 9000');

