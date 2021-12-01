import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

import { useTable } from '../../../hooks';

import './SelectTable.scss';

export const SelectTable = (props) => {

    const { history } = props;

    const [ tableNum , setTableNum ] = useState(null);
    const [ error, setError ] = useState(null);

    const { isExistTable } = useTable();

    const onSubmit = async () => {
        setError(null);

        if (!tableNum) {
            setError('Debe introducir una mesa');
        } else {
            const existTable = await isExistTable(tableNum);

            if (existTable) {
                history.push(`/client/${tableNum}`);
            } else {
                setError('La mesa no existe');
            }
        }
    }

    return (
        <div className="select-table">
            <div className="select-table__content">
                <h1>Bienvenido a iCard</h1>
                <h2>Intruduce tu numero de mesa</h2>

                <Form onSubmit={onSubmit}>
                    <Form.Input
                        placeholder="Ejemplo: 135, 873, 904, 337"
                        type="number"
                        onChange={(_, data) => setTableNum(data.value)}
                    />

                    <Button primary fluid>
                        Entrar
                    </Button>
                </Form>

                <p className="select-table__content-error">{error}</p>
            </div>
        </div>
    )
}
