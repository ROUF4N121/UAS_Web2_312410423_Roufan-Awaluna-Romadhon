<?php

namespace App\Models;

use CodeIgniter\Model;

class BarangModel extends Model
{
    protected $table = 'barang';

    protected $primaryKey = 'id';

    protected $allowedFields = [
        'nama_barang',
        'kategori_id',
        'supplier_id',
        'stok',
        'harga'
    ];

    protected $returnType = 'array';
}