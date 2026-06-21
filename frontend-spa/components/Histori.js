const Histori = {

data() {

    return {

        histori: [],

        barang: [],

        form: {
            barang_id: '',
            jenis: 'masuk',
            jumlah: '',
            keterangan: ''
        }
    }
},

async mounted() {

    await this.loadBarang();

    await this.loadHistori();
},

methods: {

    async loadBarang() {

        const response =
            await api.get('/barang');

        this.barang =
            response.data;
    },

    async loadHistori() {

        const response =
            await api.get('/histori');

        this.histori =
            response.data;
    },

    async simpan() {

        try {

            await api.post(
                '/histori',
                this.form
            );

            alert(
                'Transaksi berhasil'
            );

            this.form = {
                barang_id: '',
                jenis: 'masuk',
                jumlah: '',
                keterangan: ''
            };

            await this.loadHistori();

            await this.loadBarang();

        } catch(error) {

            alert(
                error.response?.data?.message ||
                'Terjadi kesalahan'
            );
        }
    }
},

template: `

<div>

<h1 class="text-3xl font-bold mb-5">
Histori Stok
</h1>

<div class="bg-white p-5 rounded shadow mb-5">

<div class="grid grid-cols-2 gap-3">

<select
v-model="form.barang_id"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<option value="">
Pilih Barang
</option>

<option
v-for="item in barang"
:value="item.id">

{{ item.nama_barang }}

</option>

</select>

<select
v-model="form.jenis"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<option value="masuk">
Barang Masuk
</option>

<option value="keluar">
Barang Keluar
</option>

</select>

<input
type="number"
v-model="form.jumlah"
placeholder="Jumlah"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<input
v-model="form.keterangan"
placeholder="Keterangan"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

</div>

<button
@click="simpan"
class="bg-blue-500 text-white px-4 py-2 rounded mt-3">

Simpan

</button>

</div>

<div class="bg-white p-5 rounded-xl shadow">

<table class="w-full border-collapse">

<thead>

<tr class="border-b hover:bg-gray-50">

<th>ID</th>
<th>Barang</th>
<th>Jenis</th>
<th>Jumlah</th>
<th>Keterangan</th>

</tr>

</thead>

<tbody>

<tr
v-for="item in histori"
:key="item.id"
class="border-b">

<td>{{ item.id }}</td>

<td>
{{ item.nama_barang }}
</td>

<td>

<span
v-if="item.jenis=='masuk'"
class="text-green-600 font-bold">

Masuk

</span>

<span
v-else
class="text-red-600 font-bold">

Keluar

</span>

</td>

<td>
{{ item.jumlah }}
</td>

<td>
{{ item.keterangan }}
</td>

</tr>

</tbody>

</table>

</div>

</div>

`
}