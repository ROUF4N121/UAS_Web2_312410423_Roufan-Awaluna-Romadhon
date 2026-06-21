<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Dashboard extends ResourceController
{
    public function index()
    {
        $db = \Config\Database::connect();

        $totalBarang = $db->table('barang')
            ->countAllResults();

        $totalKategori = $db->table('kategori')
            ->countAllResults();

        $totalSupplier = $db->table('supplier')
            ->countAllResults();

        $totalStok = $db->table('barang')
            ->selectSum('stok')
            ->get()
            ->getRow()
            ->stok ?? 0;

        $barangMasuk = $db->table('histori_stok')
            ->selectSum('jumlah')
            ->where('jenis', 'masuk')
            ->get()
            ->getRow()
            ->jumlah ?? 0;

        $barangKeluar = $db->table('histori_stok')
            ->selectSum('jumlah')
            ->where('jenis', 'keluar')
            ->get()
            ->getRow()
            ->jumlah ?? 0;

        return $this->respond([
            'total_barang' => $totalBarang,
            'total_kategori' => $totalKategori,
            'total_supplier' => $totalSupplier,
            'total_stok' => $totalStok,
            'barang_masuk' => $barangMasuk,
            'barang_keluar' => $barangKeluar
        ]);
    }
}