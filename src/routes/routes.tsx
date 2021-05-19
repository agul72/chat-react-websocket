import React, {useEffect, useState} from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import {emptyUser} from "../types";

import AuthPage from '../views/AuthPage';
import ChatPage from '../views/ChatPage';
import NavBar from "../components/NavBar";
import {WebSocketService} from "../services/WebSocketService";

export const useRoutes = () => {

    const [user, setUser] = useState(emptyUser);
    const [webSocketService, setWebSocketService] = useState<WebSocketService | undefined>();

    useEffect(() => {
        if (!webSocketService || webSocketService.client.readyState > 1) {
            setWebSocketService(new WebSocketService());
            console.log('New webSocketService created');
        }
    }, [webSocketService, webSocketService?.client.readyState]);

    if (!!user.name) {
        return (
            <>
                <NavBar
                    setUser={setUser}
                    webSocketService={webSocketService}
                />
                <Switch>
                    <Route path={['/chat']}>
                        <ChatPage
                            user={user}
                            webSocketService={webSocketService}
                        />
                    </Route>
                    <Redirect to={'/chat'}/>
                </Switch>
            </>
        )
    }

    return (
        <Switch>
            <Route path={['/', '/login']}>
                <AuthPage
                    setUser={setUser}
                />
            </Route>
            <Redirect to={'/login'}/>
        </Switch>
    );
}
