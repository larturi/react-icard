import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

import './SelectTable.scss';

export const SelectTable = () => {

    const [ tableNum , setTableNum ] = useState(null);
    const [ error, setError ] = useState(null);

    const onSubmit = () => {
        setError(null);
        
        if (!tableNum) {
            setError('Debe introducir una mesa');
        } else {
            console.log('Entrando');
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
