import { ClientLayout } from '../layouts';
import { Home } from '../pages/ClientPages';

const routesClient = [
    {
        path: '/',
        layout: ClientLayout,
        component: Home,
        exact: true
    },
];

export default routesClient;