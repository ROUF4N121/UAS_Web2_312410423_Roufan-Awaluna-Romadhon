const app = Vue.createApp({

methods: {

    logout() {

        if(!confirm('Yakin logout?')) {
            return;
        }

        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');

        this.$router.push('/login');
    }
},

computed: {

    isLogin() {

        return localStorage.getItem('isLoggedIn');
    }
},

template: `

<div class="min-h-screen bg-gray-100">

    <div class="flex">

        <!-- Sidebar -->

        <div
            class="w-64 bg-slate-800 min-h-screen text-white">

            <div class="p-5 border-b border-slate-700">

                <h1 class="text-2xl font-bold">
                    E-Inventory
                </h1>

                <p class="text-sm text-gray-300">
                    Admin Panel
                </p>

            </div>

            <div class="p-3">

                <router-link
                    to="/dashboard"
                    class="block p-3 rounded hover:bg-slate-700 mb-2"
                    active-class="bg-slate-700">

                    Dashboard

                </router-link>

                <router-link
                    to="/kategori"
                    class="block p-3 rounded hover:bg-slate-700 mb-2"
                    active-class="bg-slate-700">

                    Kategori

                </router-link>

                <router-link
                    to="/supplier"
                    class="block p-3 rounded hover:bg-slate-700 mb-2"
                    active-class="bg-slate-700">

                    Supplier

                </router-link>

                <router-link
                    to="/barang"
                    class="block p-3 rounded hover:bg-slate-700 mb-2"
                    active-class="bg-slate-700">

                    Barang

                </router-link>

                <router-link
                    to="/histori"
                    class="block p-3 rounded hover:bg-slate-700 mb-2"
                    active-class="bg-slate-700">

                    Histori

                </router-link>

                <button
                    @click="logout"
                    class="w-full text-left p-3 rounded bg-red-600 hover:bg-red-700">

                    Logout

                </button>

            </div>

        </div>

        <!-- Content -->

        <div class="flex-1">

            <!-- Header -->

            <div
                v-if="isLogin"
                class="bg-white shadow p-4">

                <h2 class="text-xl font-semibold">

                    Sistem Inventaris Barang

                </h2>

            </div>

            <div class="p-6">

                <router-view></router-view>

            </div>

            <div
            class="text-center text-gray-500 text-sm mt-10">

                © 2026 E-Inventory |
                Pemrograman Web 2

            </div>

        </div>

    </div>

</div>

`
});

app.use(router);

app.mount('#app');
