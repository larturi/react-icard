import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useTable } from '../../../../hooks';

import './AddEditMesaForm';

export const AddEditMesaForm = (props) => {

    const { onClose, onRefetch } = props;

    const { addTable } = useTable();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            await addTable(formValues);
            onRefetch();
            onClose();
        }
    });


    return (
        <Form className="add-adit-table-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                name = "number"
                type = "number"
                label = "Numero de Mesa" 
                placeholder = "Numero de Mesa"
                value = {formik.values.number}
                onChange = {formik.handleChange}
                error = {formik.errors.number}
            />
            <Button type="submit" primary fluid >Crear Mesa</Button>
        </Form>
    )
}

function initialValues() {
    return {
        number: ''
    }
}

function validationSchema() {
    return {
        number: Yup.number()
            .required('El numero de mesa es requerido')
    }
}
