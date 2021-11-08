import React from 'react';
import { LoginAdmin } from '../../pages/AdminPages/LoginAdmin';
import { useAuth } from '../../hooks';

import './AdminLayout.scss';

export const AdminLayout = (props) => {

    const { children } = props;
    const { auth } = useAuth();

    if (!auth) return <LoginAdmin />

    return (
        <div>
            <p>AdminLayout</p>

            {children}
        </div>
    )
};
