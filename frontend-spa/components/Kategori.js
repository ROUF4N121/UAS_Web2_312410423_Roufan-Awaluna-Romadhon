const Kategori = {

data() {
    return {
        kategori: [],
        nama_kategori: '',
        editMode: false,
        editId: null
    }
},

async mounted() {
    this.loadData();
},

methods: {

    async loadData() {

        try {

            const response =
                await api.get('/kategori');

            this.kategori =
                response.data;

        } catch(error) {

            console.log(error);
        }
    },

    async simpan() {

        try {

            if(this.editMode) {

                await api.put(
                    `/kategori/${this.editId}`,
                    {
                        nama_kategori:
                            this.nama_kategori
                    }
                );

            } else {

                await api.post(
                    '/kategori',
                    {
                        nama_kategori:
                            this.nama_kategori
                    }
                );
            }

            this.resetForm();

            this.loadData();

        } catch(error) {

            console.log(error);
        }
    },

    edit(item) {

        this.editMode = true;

        this.editId = item.id;

        this.nama_kategori =
            item.nama_kategori;
    },

    async hapus(id) {

        if(
            !confirm(
                'Yakin ingin menghapus data?'
            )
        ) return;

        await api.delete(
            `/kategori/${id}`
        );

        this.loadData();
    },

    resetForm() {

        this.nama_kategori = '';

        this.editMode = false;

        this.editId = null;
    }
},

template: `

<div>

<h1 class="text-3xl font-bold mb-5">
Kategori Barang
</h1>

<div class="bg-white p-5 rounded shadow mb-5">

<input
v-model="nama_kategori"
placeholder="Nama Kategori"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<button
@click="simpan"
class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">

{{ editMode ? 'Update' : 'Simpan' }}

</button>

<button
v-if="editMode"
@click="resetForm"
class="bg-gray-500 text-white px-4 py-2 rounded ml-2">

Batal

</button>

</div>

<div class="bg-white p-5 rounded-xl shadow">

<table class="w-full border-collapse">

<thead>

<tr class="border-b hover:bg-gray-50">

<th>ID</th>
<th>Nama Kategori</th>
<th>Aksi</th>

</tr>

</thead>

<tbody>

<tr
v-for="item in kategori"
:key="item.id"
class="border-b">

<td>{{ item.id }}</td>

<td>
{{ item.nama_kategori }}
</td>

<td>

<button
@click="edit(item)"
class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">

Edit

</button>

<button
@click="hapus(item.id)"
class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">

Hapus

</button>

</td>

</tr>

</tbody>

</table>

</div>

</div>

`
}