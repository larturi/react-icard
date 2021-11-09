import React from 'react';
import { LoginAdmin } from '../../pages/AdminPages/LoginAdmin';
import { useAuth } from '../../hooks';
import { TopMenu, SideMenu } from '../../components/Admin';

import './AdminLayout.scss';

export const AdminLayout = (props) => {

    const { children } = props;
    const { auth } = useAuth();

    if (!auth) return <LoginAdmin />

    return (
        <div className="admin-layout">
            <div className="admin-layout__menu">
                <TopMenu />
            </div>

            <div className="admin-layout__main-content">
                <SideMenu>
                    {children}
                </SideMenu>
            </div>

        </div>
    )
};
