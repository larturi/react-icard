import { BasicLayout } from '../layouts';
import { SelectTable } from '../pages/ClientPages';

const routesClient = [
    {
        path: '/',
        layout: BasicLayout,
        component: SelectTable,
        exact: true
    },
];

export default routesClient;