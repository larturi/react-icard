/* eslint-disable react-hooks/exhaustive-deps */

import { map } from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';
import { Form, Image, Button, Checkbox } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useCategories, useProduct } from '../../../../hooks'

import './AddEditProductForm.scss';

export const AddEditProductForm = (props) => {

    const { onClose, onRefetch, product } = props;

    const [categoriesFormat, setCategoriesFormat] = useState([]);
    const [previewImage, setPreviewImage] = useState(product ? product.image : null);

    const { categories, getCategories } = useCategories();
    const { addProduct, updateProduct } = useProduct();

    useEffect(() => getCategories(), []);

    useEffect(() => {
        setCategoriesFormat(formatDrownData(categories))
    }, [categories]);

    const onDrop = useCallback( async (acceptedFile) => {
        const file = acceptedFile[0];
        await formik.setFieldValue('image', file);
        setPreviewImage(URL.createObjectURL(file));
    },[]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    const formik = useFormik({
        initialValues: initialValues(product),
        validationSchema: Yup.object(product ? updateValidationSchema() : newValidationSchema()),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            if (product) {
                await updateProduct(product.id, formValues);
            } else {
                await addProduct(formValues);
            }

            onRefetch();
            onClose();
        }
    })

    return (
        <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                name="title" 
                placeholder="Nombre del producto"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.errors.title}

            />

            <Form.Input 
                type="number" 
                name="price" 
                placeholder="Precio" 
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.errors.price}
            />

            <Form.Dropdown 
                placeholder="Categoria" 
                fluid 
                selection 
                search 
                options={categoriesFormat}
                value={formik.values.category}
                onChange={(_, data) => formik.setFieldValue('category', data.value)}
                error={formik.errors.category}
            />

            <div className="add-edit-product-form__active">
                <Checkbox 
                    toggle 
                    checked={formik.values.active} 
                    onChange={(_, data) => formik.setFieldValue('active', data.checked) }
                /> Producto activo
            </div>

            <Button type="button" fluid {...getRootProps()} color={formik.errors.image && 'red'}>
                {previewImage ? 'Cambiar Imagen' : 'Subir Imagen'}
            </Button>

            <input {...getInputProps()} />

            <Image src={previewImage}/>

            <Button type="submit" primary fluid>{product ? 'Actualizar Producto' : "Crear Producto"}</Button>
        </Form>
    )
};

function formatDrownData(data) {
    return map(data, (item) => ({
      key: item.id,
      text: item.title,
      value: item.id,
    }));
};

function initialValues(data) {
    return {
        title: data?.title || '',
        price: data?.price || '',
        category: data?.category || '',
        active: data?.active ? true : false,
        image: '',
    }
};

function newValidationSchema() {
    return {
        title: Yup.string().required(true),
        price: Yup.number().required(true),
        category: Yup.number().required(true),
        active: Yup.boolean().required(true),
        image: Yup.string().required(true),
    }
};

function updateValidationSchema() {
    return {
        title: Yup.string().required(true),
        price: Yup.number().required(true),
        category: Yup.number().required(true),
        active: Yup.boolean().required(true),
        image: Yup.string(),
    }
};