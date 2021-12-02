/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Container, Icon, Button } from 'semantic-ui-react';
import { useTable } from '../../hooks';

import './ClientLayout.scss';

export const ClientLayout = (props) => {

    const { children } = props;

    const { tableNumber } = useParams();
    const { isExistTable } = useTable();
    const history = useHistory();

    useEffect(() => {
        (async() => {
            const exist = await isExistTable(tableNumber);
            if (!exist) closeTable();
        })();
    }, [tableNumber]);

    const closeTable = () => {
        history.push('/');
    };

    const goToCart = () => {
        history.push(`/client/${tableNumber}/cart`);
    };

    const goToOrders = () => {
        history.push(`/client/${tableNumber}/orders`);
    };

    return (
        <div className="client-layout-bg">
            <Container className="client-layout">
                <div className="client-layout__header">
                    <Link to={`/client/${tableNumber}`}>
                        <h1>iCard</h1>
                    </Link>
                    <span>Mesa {tableNumber}</span>
                </div>
                <div className="client-layout__menu">
                    <Button icon onClick={goToCart}>
                        <Icon name="shopping cart" />
                    </Button>
                    <Button icon onClick={goToOrders}>
                        <Icon name="list" />
                    </Button>
                    <Button icon onClick={closeTable}>
                        <Icon name="sign-out" />
                    </Button>
                </div>
                <div className="client-layout__content">
                    {children}
                </div>
            </Container>
        </div>
    )
};
