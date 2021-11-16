/* eslint-disable react-hooks/exhaustive-deps */

import { map } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Form, Image, Button, Dropdown, Checkbox } from 'semantic-ui-react';

import { useCategories } from '../../../../hooks'

import './AddEditProductForm.scss';

export const AddEditProductForm = () => {

    const [categoriesFormat, setCategoriesFormat] = useState([]);

    const { categories, getCategories } = useCategories();

    useEffect(() => getCategories(), []);

    useEffect(() => {
        setCategoriesFormat(formatDrownData(categories))
    }, [categories]);

    return (
        <Form className="add-edit-product-form">
            <Form.Input name="title" placeholder="Nombre del producto" />
            <Form.Input type="number" name="price" placeholder="Precio" />

            <Form.Dropdown 
                placeholder="Categoria" 
                fluid 
                selection 
                search 
                options={categoriesFormat}
            />

            <div className="add-edit-product-form__active">
                <Checkbox toggle /> Producto activo
            </div>

            <Button type="button" fluid>Subir Imagen</Button>

            <Button type="submit" primary fluid>Crear Producto</Button>
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