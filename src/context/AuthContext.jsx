import React, { createContext, useEffect, useState } from 'react';

import { getToken, removeToken, setToken } from '../api/token';
import { useUser } from '../hooks/useUser'

export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null
});

export function AuthProvider(props) {

    const { children } = props;
    const [auth, setAuth] = useState(undefined);
    const { getMe } = useUser();

    useEffect(() => {
        (async() => {
            const token = getToken();
            
            if (token) {
                const me = await getMe(token);
                setAuth({ token, me });
            } else {
                setAuth(null)
            }
        })();
    }, [getMe])

    const login = async (token) => {
        setToken(token);
        const me = await getMe(token);
        setAuth({ token, me });
    };

    const logout = async () => {
        if (auth) {
            setAuth(null);
            removeToken();
        }
    };

    const valueContext = {
        auth,
        login,
        logout
    };

    if (auth === undefined) return null;

    return (
        <AuthContext.Provider value={valueContext}>
            { children }
        </AuthContext.Provider>
    )

}