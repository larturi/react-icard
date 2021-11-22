import React from 'react';
import { default as iconTable } from '../../../../assets/mesa.png';

import './MesaAdmin.scss';

export const MesaAdmin = (props) => {

    const { table } = props;

    return (
        <div className="table-admin">
            <img src={iconTable} />
            <p>Mesa {table.number}</p>
        </div>
    )
}
