const Dashboard = {

data() {

    return {
        data: {}
    }
},

async mounted() {

    try {

        const response =
            await api.get('/dashboard');

        this.data = response.data;

    } catch(error) {

        console.log(error);
    }
},

template: `

<div>

    <h1 class="text-3xl font-bold mb-6">
        Dashboard
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        <div class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-gray-500">
                Total Barang
            </h3>

            <p class="text-4xl font-bold mt-2">
                {{ data.total_barang || 0 }}
            </p>
        </div>

        <div class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-gray-500">
                Total Kategori
            </h3>

            <p class="text-4xl font-bold mt-2">
                {{ data.total_kategori || 0 }}
            </p>
        </div>

        <div class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-gray-500">
                Total Supplier
            </h3>

            <p class="text-4xl font-bold mt-2">
                {{ data.total_supplier || 0 }}
            </p>
        </div>

        <div class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-gray-500">
                Total Stok
            </h3>

            <p class="text-4xl font-bold mt-2">
                {{ data.total_stok || 0 }}
            </p>
        </div>

        <div class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-gray-500">
                Barang Masuk
            </h3>

            <p class="text-4xl font-bold mt-2">
                {{ data.barang_masuk || 0 }}
            </p>
        </div>

        <div class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-gray-500">
                Barang Keluar
            </h3>

            <p class="text-4xl font-bold mt-2">
                {{ data.barang_keluar || 0 }}
            </p>
        </div>

    </div>

</div>

`
}