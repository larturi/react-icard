import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react'

import './LoginForm.scss';

export const LoginForm = () => {
    return (
        <Form className="login-form-admin">
            <Form.Input 
                name="email"
                placeholder="Email"
            />

            <Form.Input 
                name="password"
                placeholder="Password"
                type="password"
            />

            <Button type="submit" content="Iniciar Sesión" primary fluid />
        </Form>
    )
}
