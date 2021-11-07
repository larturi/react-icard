import { AdminLayout } from '../layouts';
import { HomeAdmin } from '../pages/AdminPages/HomeAdmin'

const routesAdmin = [
    {
        path: '/admin',
        layout: AdminLayout,
        component: HomeAdmin,
        exact: true
    }
];

export default routesAdmin;