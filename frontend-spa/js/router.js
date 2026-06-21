const routes = [

{
    path: '/',
    component: Home
},

{
    path: '/login',
    component: Login
},

{
    path: '/dashboard',
    component: Dashboard,
    meta: {
        requiresAuth: true
    }
},

{
    path:'/kategori',
    component: Kategori,
    meta:{
        requiresAuth:true
    }
},

{
    path:'/supplier',
    component: Supplier,
    meta:{
        requiresAuth:true
    }
},

{
    path:'/barang',
    component: Barang,
    meta:{
        requiresAuth:true
    }
},

{
    path:'/histori',
    component: Histori,
    meta:{
        requiresAuth:true
    }
}

];

const router = VueRouter.createRouter({

    history: VueRouter.createWebHashHistory(),

    routes

});

// ======================
// Navigation Guard
// ======================

router.beforeEach((to, from, next) => {

    const isLoggedIn =
        localStorage.getItem('isLoggedIn');

    if (
        to.meta.requiresAuth &&
        !isLoggedIn
    ) {

        next('/login');

    } else {

        next();
    }
});

router.afterEach((to) => {

    const titles = {
        '/dashboard': 'Dashboard',
        '/kategori': 'Kategori',
        '/supplier': 'Supplier',
        '/barang': 'Barang',
        '/histori': 'Histori'
    };

    document.title =
        'E-Inventory - ' +
        (titles[to.path] || 'Home');
});