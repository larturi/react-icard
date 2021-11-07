import React from 'react';
import { LoginAdmin } from '../../pages/AdminPages/LoginAdmin';

import './AdminLayout.scss';

export const AdminLayout = (props) => {

    const { children } = props;
    const auth = null;

    if (!auth) return <LoginAdmin />

    return (
        <div>
            <p>AdminLayout</p>

            {children}
        </div>
    )
};
