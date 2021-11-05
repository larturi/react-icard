import React from 'react';

import './AdminLayout.scss';

export const AdminLayout = (props) => {

    const { children } = props;

    return (
        <div>
            <p>AdminLayout</p>

            {children}
        </div>
    )
};
