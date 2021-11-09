import { AdminLayout } from '../layouts';
import { HomeAdmin, UsersAdmin } from '../pages/AdminPages'

const routesAdmin = [
    {
        path: '/admin',
        layout: AdminLayout,
        component: HomeAdmin,
        exact: true
    },
    {
        path: '/admin/users',
        layout: AdminLayout,
        component: UsersAdmin,
        exact: true
    },
];

export default routesAdmin;