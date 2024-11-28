const mainRoutes = [
    {
        path: '/hjBot',
        name: 'main0001',
        props: true,
        component: () => import(/* webpackChunkName: "main" */ '@/views/main/main0001.vue')
    },
    {
        path: '/hjBot/c/:randomCode?',
        name: 'main0002',
        props: true,
        component: () => import(/* webpackChunkName: "main" */ '@/views/main/main0002.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import(/* webpackChunkName: "main" */ '@/views/main/notFound.vue')
    },
];
export default mainRoutes;