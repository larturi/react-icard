/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useState } from 'react';
import { Form, Image, Button} from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useCategories } from '../../../../hooks';

import './AddEditCategoryForm.scss';

export const AddEditCategoryForm = (props) => {

    const { onClose, onRefech, category } = props;
    const [previewImage, setPreviewImage] = useState(category?.image || null);
    const { addCategory, updateCategory } = useCategories();

    const formik = useFormik({
        initialValues: initialValues(category),
        validationSchema: Yup.object(category ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                if (category) 
                    await updateCategory(category.id, formValues);
                else 
                    await addCategory(formValues);
                
                onRefech();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    })

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        await formik.setFieldValue('image', file);
        setPreviewImage(URL.createObjectURL(file));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop
    })

    return (
        <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                name="title"
                placeholder="Nombre de la categoria"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.errors.title}
            />
            <Button 
                type="button" 
                fluid 
                color={formik.errors.image ? 'red' : 'grey'}
                {...getRootProps()}
            >
                {previewImage ? "Cambiar imagen" : "Subir imagen"}
            </Button>

            <input {...getInputProps()} />

            <Image 
                src={previewImage}
                fluid
            />

            <Button 
                type="submit" 
                primary 
                fluid
                content={category ? "Actualizar" : "Crear"}
            />
        </Form>
    )
}

const initialValues = (data) => ({
    title: data?.title || '',
    image: ''
});

const newSchema = () => ({
    title: Yup.string().required(true),
    image: Yup.string().required(true)
});

const updateSchema = () => ({
    title: Yup.string().required(true),
    image: Yup.string()
});
