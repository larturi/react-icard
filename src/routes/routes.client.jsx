import { BasicLayout, ClientLayout } from '../layouts';
import { SelectTable, Categories, Products } from '../pages/ClientPages';

const routesClient = [
    {
        path: '/',
        layout: BasicLayout,
        component: SelectTable,
        exact: true
    },
    {
        path: '/client/:tableNumber',
        layout: ClientLayout,
        component: Categories,
        exact: true
    },
    {
        path: '/client/:tableNumber/:categoryId',
        layout: ClientLayout,
        component: Products,
        exact: true
    },
];

export default routesClient;