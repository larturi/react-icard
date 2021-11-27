/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { Form, Image, Button, Dropdown } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { map } from 'lodash';
import { useProduct, useOrder } from '../../../../hooks';

import './AddOrderForm.scss';

export const AddOrderForm = (props) => {

    const { idTable, openCloseModal, onReloadorders} = props;
    const { products, getProducts, getProductById } = useProduct();
    const { addOrderToTable } = useOrder();

    const [productsFormat, setProductsFormat] = useState([]);
    const [productsData, setProductsData] = useState([]);

    useEffect(() => getProducts(), []);
    useEffect(() => setProductsFormat(formatDropdownData(products)), [products]);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            for await (const idProduct of formValues.products) {
                await addOrderToTable(idTable, idProduct);
            }
            onReloadorders();
            openCloseModal();
        }
    });

    useEffect(() => addProductList(), [formik.values]);

    const addProductList = async () => {
        try {
            const productsId = formik.values.products;

            const arrayTemp = [];

            for await (const idProduct of productsId) {
                const response = await getProductById(idProduct);
                arrayTemp.push(response);
            }

            setProductsData(arrayTemp);
        } catch (error) {
            console.error(error);
        }
    }

    const removeProductList = (index) => {
        const idProducts = [...formik.values.products];
        idProducts.splice(index, 1);
        formik.setFieldValue('products', idProducts);
    }

    return (
        <Form className="add-order-form" onSubmit={formik.handleSubmit}>
            <Dropdown 
                placeholder="Productos" 
                fluid 
                search 
                selection 
                options={productsFormat}
                value={null}
                onChange={(_, data) => {
                    formik.setFieldValue('products', [ ...formik.values.products, data.value ]);
                }}
            /> 
            
            <div className="add-order-form__list">
                {map(productsData, (product, index) => (
                    <div className="add-order-form__list-product" key={index}>
                        <div>
                            <Image src={product.image} size="tiny" avatar />
                            <span>{product.title}</span>
                        </div>
                        <Button 
                            type="button" 
                            basic 
                            color="red"
                            onClick={() => removeProductList(index)}
                        >
                            Eliminar
                        </Button>
                    </div>
                ))}
            </div>

            <Button type="submit" primary fluid>
                Añadir Productos a la Mesa
            </Button>
        </Form>
    )
}

function formatDropdownData(data) {
    return map(data, item => ({
        key: item.id,
        text: item.title,
        value: item.id,
    }));
}

function initialValues() {
    return {
        products: []
    }
}

function validationSchema() {
    return {
        products: Yup.array()
            .required('Debe seleccionar al menos un producto')
    }
}