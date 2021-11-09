/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';

import { useAuth, useUser } from '../../hooks'

export const UsersAdmin = () => {

    const { auth } = useAuth();
    const { loading, users, getUsers } = useUser();

    console.log(users);

    useEffect(() => {
        getUsers();
    }, []);

    if(auth.me?.is_staff) {
        return (
            <div>
                <h1>Users Admin</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Acceso restringido al Administrador</h3>
            </div>
        )
    }

    
    
}
