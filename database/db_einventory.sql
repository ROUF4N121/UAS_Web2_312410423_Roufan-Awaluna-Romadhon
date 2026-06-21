-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2026 at 05:03 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_einventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int(11) NOT NULL,
  `nama_barang` varchar(150) NOT NULL,
  `kategori_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `stok` int(11) DEFAULT 0,
  `harga` decimal(12,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `nama_barang`, `kategori_id`, `supplier_id`, `stok`, `harga`, `created_at`, `updated_at`) VALUES
(1, 'Laptop Asus Vivobook', 1, 1, 20, 8500000.00, '2026-06-18 06:22:12', '2026-06-18 08:28:42'),
(2, 'Printer Epson L3210', 2, 2, 10, 2800000.00, '2026-06-18 06:22:12', '2026-06-18 06:22:12'),
(3, 'Mouse Wireless Logitech', 3, 5, 55, 250000.00, '2026-06-18 06:22:12', '2026-06-18 12:42:52'),
(4, 'Router TP-Link Archer C6', 4, 3, 20, 750000.00, '2026-06-18 06:22:12', '2026-06-18 06:22:12'),
(5, 'Meja Kerja Minimalis', 5, 4, 8, 1200000.00, '2026-06-18 06:22:12', '2026-06-18 06:22:12'),
(6, 'Keyboard Mechanical', 3, 5, 20, 450000.00, '2026-06-18 07:43:23', '2026-06-18 07:43:23');

-- --------------------------------------------------------

--
-- Table structure for table `histori_stok`
--

CREATE TABLE `histori_stok` (
  `id` int(11) NOT NULL,
  `barang_id` int(11) NOT NULL,
  `jenis` enum('masuk','keluar') NOT NULL,
  `jumlah` int(11) NOT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `histori_stok`
--

INSERT INTO `histori_stok` (`id`, `barang_id`, `jenis`, `jumlah`, `keterangan`, `tanggal`) VALUES
(1, 1, 'masuk', 15, 'Stok awal', '2026-06-18 06:25:11'),
(2, 2, 'masuk', 10, 'Stok awal', '2026-06-18 06:25:11'),
(3, 3, 'masuk', 50, 'Stok awal', '2026-06-18 06:25:11'),
(4, 4, 'masuk', 20, 'Stok awal', '2026-06-18 06:25:11'),
(5, 5, 'masuk', 8, 'Stok awal', '2026-06-18 06:25:11'),
(6, 1, 'masuk', 10, 'Pembelian Supplier', '2026-06-18 08:28:27'),
(7, 1, 'keluar', 5, 'Penjualan', '2026-06-18 08:28:42'),
(8, 3, 'masuk', 10, 'Restock Supplier', '2026-06-18 12:42:12'),
(9, 3, 'keluar', 5, 'Penjualan', '2026-06-18 12:42:52');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id` int(11) NOT NULL,
  `nama_kategori` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `nama_kategori`) VALUES
(1, 'Elektronik'),
(2, 'Peralatan Kantor'),
(3, 'Aksesoris Komputer'),
(4, 'Perangkat Jaringan'),
(5, 'Furniture'),
(6, 'Gaming');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `nama_supplier` varchar(100) NOT NULL,
  `alamat` text DEFAULT NULL,
  `telepon` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `nama_supplier`, `alamat`, `telepon`) VALUES
(1, 'PT Sumber Teknologi', 'Jakarta', '081234567890'),
(2, 'CV Maju Jaya', 'Bekasi', '081345678901'),
(3, 'PT Digital Nusantara', 'Bandung', '081456789012'),
(4, 'CV Karya Mandiri', 'Depok', '081567890123'),
(5, 'PT Global Komputer', 'Tangerang', '081678901234'),
(6, 'PT Teknologi Indonesia', 'Jakarta', '081234567890');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `token`, `created_at`) VALUES
(1, 'admin', '$2y$10$.nrQcaXV2s4MHA0QsA9U3u7Lbq0BIebOkBaX6gbSLIjOLpqhTXmXG', 'beb13fc243d4dbaba4794ed3996e00812809def719b2bfee28b477d504950ad6', '2026-06-18 06:22:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_barang_kategori` (`kategori_id`),
  ADD KEY `fk_barang_supplier` (`supplier_id`);

--
-- Indexes for table `histori_stok`
--
ALTER TABLE `histori_stok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_histori_barang` (`barang_id`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `histori_stok`
--
ALTER TABLE `histori_stok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barang`
--
ALTER TABLE `barang`
  ADD CONSTRAINT `fk_barang_kategori` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_barang_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `histori_stok`
--
ALTER TABLE `histori_stok`
  ADD CONSTRAINT `fk_histori_barang` FOREIGN KEY (`barang_id`) REFERENCES `barang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
