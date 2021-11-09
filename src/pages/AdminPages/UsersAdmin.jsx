/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { HeaderPage } from '../../components/Admin'

import { useAuth, useUser } from '../../hooks'

export const UsersAdmin = () => {

    const { auth } = useAuth();
    const { users, getUsers } = useUser();

    useEffect(() => {
        getUsers();
    }, []);

    if(auth.me?.is_staff) {
        return (
            <>
                <HeaderPage 
                    title="Usuarios"
                    btnTitle="Nuevo Usuario"
                    btnTitleTwo="Eliminar Usuario"
                />
                <h1>Users Admin</h1>
            </>
        )
    } else {
        return (
            <div>
                <h3>Acceso restringido al Administrador</h3>
            </div>
        )
    }

    
    
}
