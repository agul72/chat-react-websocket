import React from "react";
import { NavLink } from "react-router-dom";
import {emptyUser, User} from "../types";
import {WebSocketService} from "../services/WebSocketService";

type propsType = {
    setUser: (user: User) => void
    webSocketService: WebSocketService | undefined
}

function NavBar(props: propsType) {

    function logoutHandler(): void {
        props.setUser(emptyUser);
        props.webSocketService?.closeChannel();
    }

    return (
        <nav className="p-2 bg-light navbar navbar-expand">
            <div className="nav-item">
                <button
                    className="btn btn-warning"
                    onClick={logoutHandler}
                >
                    Logout
                </button>
            </div>

            <div className='nav-item'>
                <NavLink className='nav-link' to='/chat'>
                    Chat
                </NavLink>
            </div>

        </nav>
    )
}

export default NavBar;
