import React, {useState} from "react";
import {Message, User} from "../types";

type PropsType = {
    user: User,
    wsReady: boolean,
    addMessage: ((message: Message) => void)
}

function AddMessageForm(props: PropsType): JSX.Element {

    const lengthRegex = /^.{5,120}$/;
    const alphabeticRegex = /^[a-zA-Z\s.,?!;:'-]*$/;

    const [content, setContent] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    function onChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        setContent(e.target.value);
    }

    function isDataValid(): boolean {
        let errors = [];
        setErrorMessage([]);
        const message = content.trim();
        if (!lengthRegex.test(message)) {
            errors.push("Each message must contain at least 5 characters and no more than 120 characters");
        }
        if (!alphabeticRegex.test(message)) {
            errors.push("The message content supports only English symbols.")
        }
        if (errors.length) {
            setErrorMessage(errors);
            return false;
        }
        return true;
    }

    function submitHandler(e: React.SyntheticEvent): void {
        e.preventDefault();
        if (isDataValid()) {
            const newMessage: Message = {
                date: new Date(Date.now()),
                user: {
                    name: props.user.name,
                    color: props.user.color
                },
                content
            };
            setContent("");
            props.addMessage(newMessage);
        }
    }

    return (
        <form
            onSubmit={submitHandler}
            className="mb-5"
        >
            <textarea
                name="content"
                rows={3}
                cols={80}
                value={content}
                onChange={onChangeHandler}
                placeholder="Enter your message"
            >
            </textarea>
            {!!errorMessage.length && errorMessage.map((message, index) =>
                <div
                    key={index}
                    className="text-warning mb-2"
                    style={{whiteSpace: "pre-line"}}
                >
                    {message}
                </div>
            )}
            <div>
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={!props.wsReady}
                >Submit
                </button>
            </div>

        </form>
    )
}

export default AddMessageForm
