import React from 'react';
import { Table, Image, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';

import './TableCategoriesAdmin.scss';

export const TableCategoriesAdmin = (props) => {

    const { categories, editCategory } = props;

    return (
        <Table className="table-categories-admin">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Imagen</Table.HeaderCell>
                    <Table.HeaderCell>Categoria</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {map(categories, (category, index) => (
                    <Table.Row key={index}>
                        <Table.Cell width={2}>
                            <Image src={category.image} />
                        </Table.Cell>
                        <Table.Cell width={2}>
                            {category.title}
                        </Table.Cell>
                        <Actions 
                            category={category} 
                            editCategory={editCategory} 
                            category={category}
                        />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
};

const Actions = (props) => {

    const { category, editCategory } = props;

    return (
        <Table.Cell textAlign="right">
            <Button icon onClick={() => editCategory(category)}>
                <Icon name="pencil" />
            </Button>
            <Button icon negative onClick={() => console.log(category)}>
                <Icon name="close" />
            </Button>
        </Table.Cell>
    )

}
