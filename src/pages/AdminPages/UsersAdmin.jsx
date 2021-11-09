import React from 'react';

import { useAuth } from '../../hooks'


export const UsersAdmin = () => {

    const { auth } = useAuth();

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
