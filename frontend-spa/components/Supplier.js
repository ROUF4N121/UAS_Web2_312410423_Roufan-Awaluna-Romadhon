const Supplier = {

data() {
    return {
        supplier: [],
        form: {
            nama_supplier: '',
            alamat: '',
            telepon: ''
        },
        editMode: false,
        editId: null
    }
},

async mounted() {
    this.loadData();
},

methods: {

    async loadData() {

        const response =
            await api.get('/supplier');

        this.supplier =
            response.data;
    },

    async simpan() {

        if(this.editMode) {

            await api.put(
                `/supplier/${this.editId}`,
                this.form
            );

        } else {

            await api.post(
                '/supplier',
                this.form
            );
        }

        this.resetForm();

        this.loadData();
    },

    edit(item) {

        this.editMode = true;

        this.editId = item.id;

        this.form = {
            nama_supplier:
                item.nama_supplier,
            alamat:
                item.alamat,
            telepon:
                item.telepon
        };
    },

    async hapus(id) {

        if(
            !confirm('Hapus data?')
        ) return;

        await api.delete(
            `/supplier/${id}`
        );

        this.loadData();
    },

    resetForm() {

        this.form = {
            nama_supplier:'',
            alamat:'',
            telepon:''
        };

        this.editMode = false;
        this.editId = null;
    }
},

template: `

<div>

<h1 class="text-3xl font-bold mb-5">
Supplier
</h1>

<div class="bg-white p-5 rounded shadow mb-5">

<input
v-model="form.nama_supplier"
placeholder="Nama Supplier"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<input
v-model="form.alamat"
placeholder="Alamat"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<input
v-model="form.telepon"
placeholder="Telepon"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<button
@click="simpan"
class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">

{{ editMode ? 'Update' : 'Simpan' }}

</button>

</div>

<div class="bg-white p-5 rounded-xl shadow">

<table class="w-full border-collapse">

<thead>

<tr>

<th>ID</th>
<th>Supplier</th>
<th>Alamat</th>
<th>Telepon</th>
<th>Aksi</th>

</tr>

</thead>

<tbody>

<tr
v-for="item in supplier"
:key="item.id">

<td>{{ item.id }}</td>
<td>{{ item.nama_supplier }}</td>
<td>{{ item.alamat }}</td>
<td>{{ item.telepon }}</td>

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