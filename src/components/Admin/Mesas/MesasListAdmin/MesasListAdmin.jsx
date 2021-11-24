/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { Button, Icon, Checkbox } from 'semantic-ui-react';
import { map } from 'lodash';
import { MesaAdmin } from '../'

import './MesasListAdmin.scss';

export const MesasListAdmin = (props) => {

    const { tables } = props;

    const [reload, setReload] = useState(false);
    const [autoReload, setAutoReload] = useState(false);

    const onReload = () => {
        setReload((prev) => !prev);
    };

    useEffect(() => {
        if (autoReload) {
            const autoReloadAction = () => {
                onReload();
                setTimeout((() => {
                    autoReloadAction();
                }), 5000);
            }
            autoReloadAction();
        }
    }, [autoReload]);

    const onChangeAutoReload = (checked) => {
        if (checked) {
            setAutoReload(true);
        } else {
            window.location.reload();
        }
    };

    return (
        <div className="tables-list-admin">

            <Button
                primary
                icon
                className="tables-list-admin__reload"
                onClick={() => onReload() }
            >
                <Icon name="refresh" />
            </Button>

            <div className="tables-list-admin__reload-toggle">
                <span>Reload automatico</span>
                <Checkbox 
                    toggle 
                    checked={autoReload}
                    onChange={(_, data) => onChangeAutoReload(data.checked)}
                />
            </div>

            {map(tables, (table) => (
                <MesaAdmin key={table.number} table={table} reload={reload} />
            ))}
        </div>
    )
}
