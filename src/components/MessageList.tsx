import React from "react";
import MessageItem from "./MessageItem";
import {Message} from "../types";

type PropsType = {
    messages: Array<Message>
};

function MessageList(props: PropsType) {

    return (
        <div
            className="list-group"
            style={{height: '60vh', overflowY: 'auto'}}
        >
            {!!props.messages && !!props.messages.length && props.messages.map((message, index) =>
                <MessageItem
                    key={index}
                    message={message}
                />
            )}
        </div>
    )
}

export default MessageList
