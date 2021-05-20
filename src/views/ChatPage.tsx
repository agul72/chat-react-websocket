import React, {useEffect, useState} from "react";
import AddMessageForm from "../components/AddMessageForm";
import MessageList from "../components/MessageList";
import {Message, User} from "../types";
import {WebSocketService} from "../services/WebSocketService";


type propsType = {
    user: User,
    webSocketService: WebSocketService | undefined,
}

function ChatPage(props: propsType): JSX.Element {

    const [messages, setMessages] = useState<Array<Message>>([]);
    const [wsChannel, setWsChannel] =
        useState<WebSocket | undefined>(undefined);
    const [wsReady, setWsReady] = useState(!!wsChannel);

    useEffect(() => {
        setWsChannel(props.webSocketService?.getChannel());

        return () => {
            setWsChannel(undefined);
        }
    }, [props.webSocketService]);

    useEffect(() => {
        setWsReady(!!wsChannel);
    }, [wsChannel]);


    useEffect(() => {
        wsChannel?.addEventListener('open', () => {
            setWsReady(true);
        });
        wsChannel?.addEventListener('close', () => {
            setWsReady(false);
        });
        wsChannel?.addEventListener('message', (e) => {
            // console.log(JSON.parse(e.data));
            setMessages((prevMessages) => [JSON.parse(e.data)].concat(...prevMessages));
        });

    }, [wsChannel]);

    function addMessageHandler(message: Message): void {
        wsChannel?.send(JSON.stringify({action: 'MESSAGE', data: message}));
    }


    return (
        <div className="container">
            <div>
                Web socket status: {wsReady? 'CONNECTED' : 'DISCONNECTED'}
            </div>
            <strong>{props.user.name}</strong>
            <MessageList messages={messages}/>
            <AddMessageForm
                user={props.user}
                addMessage={addMessageHandler}
                wsReady={wsReady}
            />
        </div>
    )
}

export default ChatPage;
