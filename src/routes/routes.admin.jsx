import { AdminLayout } from '../layouts';
import { 
    OrdersAdmin, 
    UsersAdmin, 
    CategoriesAdmin,
    ProductsAdmin,
    TablesAdmin,
    TableDetailsAdmin,
    PaymentsHistory,
} from '../pages/AdminPages'

const routesAdmin = [
    {
        path: '/admin',
        layout: AdminLayout,
        component: OrdersAdmin,
        exact: true
    },
    {
        path: '/admin/users',
        layout: AdminLayout,
        component: UsersAdmin,
        exact: true
    },
    {
        path: '/admin/categories',
        layout: AdminLayout,
        component: CategoriesAdmin,
        exact: true
    },
    {
        path: '/admin/products',
        layout: AdminLayout,
        component: ProductsAdmin,
        exact: true
    },
    {
        path: '/admin/tables',
        layout: AdminLayout,
        component: TablesAdmin,
        exact: true
    },
    {
        path: '/admin/table/:id',
        layout: AdminLayout,
        component: TableDetailsAdmin,
        exact: true
    },
    {
        path: '/admin/payments-history',
        layout: AdminLayout,
        component: PaymentsHistory,
        exact: true
    },
];

export default routesAdmin;