const Barang = {

data() {
    return {
        barang: [],
        kategori: [],
        supplier: [],

        form: {
            nama_barang: '',
            kategori_id: '',
            supplier_id: '',
            stok: '',
            harga: ''
        },

        editMode: false,
        editId: null
    }
},

async mounted() {

    await this.loadKategori();
    await this.loadSupplier();
    await this.loadBarang();
},

methods: {

    async loadBarang() {

        const response =
            await api.get('/barang');

        this.barang =
            response.data;
    },

    async loadKategori() {

        const response =
            await api.get('/kategori');

        this.kategori =
            response.data;
    },

    async loadSupplier() {

        const response =
            await api.get('/supplier');

        this.supplier =
            response.data;
    },

    async simpan() {

        if(this.editMode) {

            await api.put(
                `/barang/${this.editId}`,
                this.form
            );

        } else {

            await api.post(
                '/barang',
                this.form
            );
        }

        this.resetForm();

        this.loadBarang();
    },

    edit(item) {

        this.editMode = true;

        this.editId = item.id;

        this.form = {
            nama_barang: item.nama_barang,
            kategori_id: item.kategori_id,
            supplier_id: item.supplier_id,
            stok: item.stok,
            harga: item.harga
        };
    },

    async hapus(id) {

        if(
            !confirm('Hapus data barang?')
        ) return;

        await api.delete(
            `/barang/${id}`
        );

        this.loadBarang();
    },

    resetForm() {

        this.form = {
            nama_barang:'',
            kategori_id:'',
            supplier_id:'',
            stok:'',
            harga:''
        };

        this.editMode = false;
        this.editId = null;
    },

    formatRupiah(nilai) {

        return new Intl.NumberFormat(
            'id-ID'
        ).format(nilai);
    }
},

template: `

<div>

<h1 class="text-3xl font-bold mb-5">
Data Barang
</h1>

<div class="bg-white p-5 rounded shadow mb-5">

<input
v-model="form.nama_barang"
placeholder="Nama Barang"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<select
v-model="form.kategori_id"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<option value="">
Pilih Kategori
</option>

<option
v-for="item in kategori"
:value="item.id">

{{ item.nama_kategori }}

</option>

</select>

<select
v-model="form.supplier_id"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<option value="">
Pilih Supplier
</option>

<option
v-for="item in supplier"
:value="item.id">

{{ item.nama_supplier }}

</option>

</select>

<input
type="number"
v-model="form.stok"
placeholder="Stok"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<input
type="number"
v-model="form.harga"
placeholder="Harga"
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

<div class="bg-white p-5 rounded shadow overflow-x-auto">

<table class="w-full border-collapse">

<thead>

<tr class="border-b hover:bg-gray-50">

<th>ID</th>
<th>Barang</th>
<th>Kategori</th>
<th>Supplier</th>
<th>Stok</th>
<th>Harga</th>
<th>Aksi</th>

</tr>

</thead>

<tbody>

<tr
v-for="item in barang"
:key="item.id"
class="border-b">

<td>{{ item.id }}</td>

<td>
{{ item.nama_barang }}
</td>

<td>
{{ item.nama_kategori }}
</td>

<td>
{{ item.nama_supplier }}
</td>

<td>
{{ item.stok }}
</td>

<td>
Rp {{ item.harga }}
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