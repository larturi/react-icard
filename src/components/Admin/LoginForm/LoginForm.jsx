import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { useAuth } from '../../../hooks/useAuth';
import './LoginForm.scss';

import { loginApi } from '../../../api/user';

export const LoginForm = () => {

    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValues) => {
            try {
                const response = await loginApi(formValues);
                const { access } = response;
                login(access);

            } catch (error) {
                toast.error(error.message);
            }
        }
    });

    return (
        <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
            <Form.Input 
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />

            <Form.Input 
                name="password"
                placeholder="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />

            <Button type="submit" content="Iniciar Sesión" primary fluid />
        </Form>
    )
}

function initialValues () {
    return {
        email: '',
        password: ''
    }
};

function validationSchema () {
    return {
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
    }
};