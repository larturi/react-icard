import React from 'react';
import { Form, Button, Checkbox } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUser } from '../../../../hooks'

import './AddEditUserForm.scss';

export const AddEditUserForm = (props) => {

    const { onClose, onRefetch, btnName, user } = props;

    const { addUser, updateUser } = useUser();

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: Yup.object(user ? updateUserValidationSchema() : newUserValidationSchema()),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                if(user) {
                    await updateUser(user.id, formValues);
                } else {
                    await addUser(formValues);
                }
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                name="username"
                placeholder="Nombre de usuario"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.errors.username}
            />
            <Form.Input
                name="email"
                placeholder="Correo electrónico"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <Form.Input
                name="first_name"
                placeholder="Nombre"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={formik.errors.first_name}
            />
            <Form.Input
                name="last_name"
                placeholder="Apellido"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                error={formik.errors.last_name}
            />
            <Form.Input
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />

            <div className="add-edit-user-form__active">
                <Checkbox 
                    toggle 
                    checked={formik.values.is_active}
                    onChange={(_, data) => formik.setFieldValue("is_active", data.checked)}
                /> Activo
            </div>

            <div className="add-edit-user-form__staff">
                <Checkbox 
                    toggle
                    checked={formik.values.is_staff}
                    onChange={(_, data) => formik.setFieldValue("is_staff", data.checked)}
                /> Administrador
            </div>

            <Button type="submit" content={btnName} primary fluid />
        </Form>
    )
};

const initialValues = (data) => ({
    username: data?.username || '',
    email: data?.email || '',
    first_name: data?.first_name || '',
    last_name: data?.last_name || '',
    is_active: data?.is_active ? true : false,
    is_staff: data?.is_staff ? true : false,
    password: '',
});

const newUserValidationSchema = () => ({
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
    password: Yup.string().required(true),
});

const updateUserValidationSchema = () => ({
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
    password: Yup.string(),
});