import React, { useCallback, useState } from 'react';
import { Form, Image, Button} from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useCategories } from '../../../../hooks';

import './AddEditCategoryForm.scss';

export const AddEditCategoryForm = (props) => {

    const { onClose, onRefech } = props;

    const [previewImage, setPreviewImage] = useState(null);

    const { addCategory } = useCategories();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
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
                color={formik.errors.image ? 'red' : 'green'}
                {...getRootProps()}
            >
                Subir imagen
            </Button>

            <input {...getInputProps()} />

            <Image 
                src={previewImage}
                fluid
            />

            <Button type="submit" primary fluid>
                Crear Categoria
            </Button>
        </Form>
    )
}

const initialValues = () => ({
    title: '',
    image: ''
});

const newSchema = () => ({
    title: Yup.string().required(true),
    image: Yup.string().required(true)
});
