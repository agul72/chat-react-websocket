import React from "react";
import {Message} from "../types";

function MessageItem(
    props: {
        message: Message
    }) {
    return (
        <div
            className="list-group-item"
            style={{color: props.message.user.color}}
        >
            <div>
                [{props.message.date.toLocaleString()}] {props.message.user.name}
            </div>
            <div>
                {props.message.content}
            </div>
        </div>

    )
}

export default MessageItem
