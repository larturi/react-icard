import React from 'react';
import { Button, Icon, Checkbox } from 'semantic-ui-react';
import { map } from 'lodash';
import { MesaAdmin } from '../'

import './MesasListAdmin.scss';

export const MesasListAdmin = (props) => {

    const { tables } = props;

    return (
        <div className="tables-list-admin">

            <Button
                primary
                icon
                className="tables-list-admin__reload"
                onClick={() => console.log('onRefetch')}
            >
                <Icon name="refresh" />
            </Button>

            <div className="tables-list-admin__reload-toggle">
                <span>Reload automatico</span>
                <Checkbox toggle onChange={(_, data) => console.log(data.checked)}/>
            </div>

            {map(tables, (table) => (
                <MesaAdmin key={table.number} table={table} />
            ))}
        </div>
    )
}
