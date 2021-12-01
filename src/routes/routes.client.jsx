import { BasicLayout, ClientLayout } from '../layouts';
import { SelectTable, Categories } from '../pages/ClientPages';

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
];

export default routesClient;