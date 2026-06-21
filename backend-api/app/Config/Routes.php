<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

// auth

$routes->post('api/login', 'Auth::login');
$routes->post(
    'api/logout',
    'Auth::logout',
    ['filter' => 'authToken']
);

// dashboard

$routes->get(
    'api/dashboard',
    'Dashboard::index'
);

// kategoti
$routes->get('api/kategori', 'Kategori::index');
$routes->get('api/kategori/(:num)', 'Kategori::show/$1');

$routes->post(
    'api/kategori',
    'Kategori::create',
    ['filter' => 'authToken']
);

$routes->put(
    'api/kategori/(:num)',
    'Kategori::update/$1',
    ['filter' => 'authToken']
);

$routes->delete(
    'api/kategori/(:num)',
    'Kategori::delete/$1',
    ['filter' => 'authToken']
);

// supplier

$routes->get('api/supplier', 'Supplier::index');
$routes->get('api/supplier/(:num)', 'Supplier::show/$1');

$routes->post(
    'api/supplier',
    'Supplier::create',
    ['filter' => 'authToken']
);

$routes->put(
    'api/supplier/(:num)',
    'Supplier::update/$1',
    ['filter' => 'authToken']
);

$routes->delete(
    'api/supplier/(:num)',
    'Supplier::delete/$1',
    ['filter' => 'authToken']
);

// barang

$routes->get('api/barang', 'Barang::index');
$routes->get('api/barang/(:num)', 'Barang::show/$1');

$routes->post(
    'api/barang',
    'Barang::create',
    ['filter' => 'authToken']
);

$routes->put(
    'api/barang/(:num)',
    'Barang::update/$1',
    ['filter' => 'authToken']
);

$routes->delete(
    'api/barang/(:num)',
    'Barang::delete/$1',
    ['filter' => 'authToken']
);

// histori

$routes->get(
    'api/histori',
    'Histori::index'
);

$routes->post(
    'api/histori',
    'Histori::create',
    ['filter' => 'authToken']
);