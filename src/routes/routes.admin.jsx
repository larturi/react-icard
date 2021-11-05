import { AdminLayout } from '../layouts';
import { LoginAdmin } from '../pages/AdminPages'

const routesAdmin = [
    {
        path: '/admin',
        layout: AdminLayout,
        component: LoginAdmin,
        exact: true
    }
];

export default routesAdmin;