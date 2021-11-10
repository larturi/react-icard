import React from 'react';
import { Form, Button, Checkbox } from 'semantic-ui-react';

import './AddEditUserForm.scss';

export const AddEditUserForm = () => {
    return (
        <Form className="add-edit-user-form">
            <Form.Input
                name="username"
                placeholder="Nombre de usuario"
            />
            <Form.Input
                name="email"
                placeholder="Correo electrónico"
            />
            <Form.Input
                name="first_name"
                placeholder="Nombre"
            />
            <Form.Input
                name="last_name"
                placeholder="Apellido"
            />
            <Form.Input
                name="password"
                type="password"
                placeholder="Contraseña"
            />

            <div className="add-edit-user-form__active">
                <Checkbox toggle /> Activo
            </div>

            <div className="add-edit-user-form__staff">
                <Checkbox toggle /> Administrador
            </div>

            <Button type="submit" content="Crear" primary fluid />
        </Form>
    )
};
