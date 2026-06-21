<?php

namespace App\Models;

use CodeIgniter\Model;

class HistoriStokModel extends Model
{
    protected $table = 'histori_stok';

    protected $primaryKey = 'id';

    protected $allowedFields = [
        'barang_id',
        'jenis',
        'jumlah',
        'keterangan'
    ];

    protected $returnType = 'array';
}