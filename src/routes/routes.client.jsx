import { ClientLayout } from '../layouts';
import { Home } from '../pages/ClientPages';
import { Error404 } from '../pages';

const routesClient = [
    {
        path: '/',
        layout: ClientLayout,
        component: Home,
        exact: true
    }
];

export default routesClient;