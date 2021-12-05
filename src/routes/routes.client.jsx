import { BasicLayout, ClientLayout } from '../layouts';
import { 
    SelectTable, 
    Categories, 
    Products, 
    Cart,
    OrdersHistory,
} from '../pages/ClientPages';

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
        path: '/client/:tableNumber/cart',
        layout: ClientLayout,
        component: Cart,
        exact: true
    },
    {
        path: '/client/:tableNumber/orders',
        layout: ClientLayout,
        component: OrdersHistory,
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