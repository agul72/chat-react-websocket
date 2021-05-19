import React, { useState } from "react";
import {emptyUser, User} from "../types";

type propsType = {
    setUser: (user: User) => void
}

const regexLength = /^.{6,10}$/;
const regexUpper = /[A-Z]/;
const regexLower = /[a-z]/;
const regexDigit = /\d/;
const regexNoSpace = /^\S*$/;

function AuthPage(props: propsType) {

    const [user, setUser] = useState(emptyUser);
    const [warningMessage, setWarningMessage] = useState("");

    function nameValidation(name: string): boolean {
        let warning = "";
        if (!regexNoSpace.test(name.trim())) {
            warning += "Name cannot include any space symbols.\n";
        }
        if (!regexLength.test(name.trim())) {
            warning += "Length must be between 6-10 characters.\n";
        }
        if (!regexUpper.test(name.trim())) {
            warning += "Name must contain at least one uppercase\n"
        }
        if (!regexLower.test(name.trim())) {
            warning += "Name must contain at least one lowercase\n"
        }
        if (!regexDigit.test(name.trim())) {
            warning += "It must contain at least one digit.";
        }

        if (warning.length > 0) {
            setWarningMessage(warning);
            return false;
        }
        return true;
    }

    function onNextClickHandler(e: React.FormEvent<HTMLButtonElement>): void {
        e.preventDefault();
        if (nameValidation(user.name)) {
            const newUser = {
                name: user.name,
                color: user.color
            }
            props.setUser(newUser);
        }
    }

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUser(prev => (
            {
                ...prev, [event.target.name]:
                event.target.value
            }
        ));
    }

    return (
        <form className="m-5 p-2 border border-1 form-group">
            <div>
                <div className="mb-2">
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={onChange}
                        placeholder="Enter your name..."
                        className="form-control"
                    />
                </div>
                {!!warningMessage.length &&
                <div>
                <span
                    className="text-warning"
                    style={{whiteSpace: "pre-line"}}
                >{warningMessage}</span>
                </div>
                }
                <div className="row mb-2">
                    <div className="col-auto">
                        <label htmlFor="colorInput">Choose your color</label>
                    </div>
                    <div className="col-1">
                        <input
                            type="color"
                            name="color"
                            id="colorInput"
                            value={user.color}
                            onChange={onChange}
                            className="form-control"
                            style={{height: '30px'}}
                        />
                    </div>

                </div>
                <div>
                    <button
                        className="btn btn-primary"
                        disabled={!(user.name && user.color)}
                        type="submit"
                        onClick={onNextClickHandler}
                    >Next
                    </button>
                </div>
            </div>

        </form>
    );
}

export default AuthPage
