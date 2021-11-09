/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TableUsers } from '../../components/Admin'

import { useAuth, useUser } from '../../hooks'

export const UsersAdmin = () => {

    const { auth } = useAuth();
    const { loading, users, getUsers } = useUser();

    useEffect(() => {
        getUsers();
    }, []);

    if(auth.me?.is_staff) {
        return (
            <>
                <HeaderPage 
                    title="Usuarios"
                    btnTitle="Nuevo Usuario"
                />
                {loading ? (
                    <Loader active inline="centered">Cargando...</Loader>
                ) : (
                    <TableUsers users={users} />
                )}
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
