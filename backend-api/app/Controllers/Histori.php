<?php

namespace App\Controllers;

use App\Models\BarangModel;
use App\Models\HistoriStokModel;
use CodeIgniter\RESTful\ResourceController;

class Histori extends ResourceController
{
    protected $modelName = HistoriStokModel::class;
    protected $format = 'json';

    public function index()
    {
        $db = \Config\Database::connect();

        $data = $db->table('histori_stok')
            ->select('
                histori_stok.*,
                barang.nama_barang
            ')
            ->join('barang', 'barang.id = histori_stok.barang_id')
            ->orderBy('histori_stok.id', 'DESC')
            ->get()
            ->getResult();

        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        $barangModel = new BarangModel();

        $barang = $barangModel->find($data['barang_id']);

        if (!$barang) {
            return $this->failNotFound('Barang tidak ditemukan');
        }

        if ($data['jenis'] == 'masuk') {

            $stokBaru = $barang['stok'] + $data['jumlah'];

        } else {

            if ($barang['stok'] < $data['jumlah']) {

                return $this->fail([
                    'message' => 'Stok tidak mencukupi'
                ]);

            }

            $stokBaru = $barang['stok'] - $data['jumlah'];
        }

        $this->model->insert($data);

        $barangModel->update(
            $barang['id'],
            ['stok' => $stokBaru]
        );

        return $this->respondCreated([
            'status' => true,
            'message' => 'Transaksi stok berhasil',
            'stok_sekarang' => $stokBaru
        ]);
    }
}