<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class Auth extends ResourceController
{
    public function login()
    {
        $username = $this->request->getJSON()->username ?? '';
        $password = $this->request->getJSON()->password ?? '';

        $userModel = new UserModel();

        $user = $userModel
            ->where('username', $username)
            ->first();

        if (!$user) {
            return $this->failUnauthorized('Username tidak ditemukan');
        }

        if (!password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Password salah');
        }

        $token = bin2hex(random_bytes(32));

        $userModel->update($user['id'], [
            'token' => $token
        ]);

        return $this->respond([
            'status' => true,
            'message' => 'Login berhasil',
            'token' => $token,
            'username' => $user['username']
        ]);
    }

    public function logout()
    {
        $token = $this->request
            ->getHeaderLine('Authorization');

        $token = str_replace('Bearer ', '', $token);

        $userModel = new UserModel();

        $userModel
            ->where('token', $token)
            ->set(['token' => null])
            ->update();

        return $this->respond([
            'status' => true,
            'message' => 'Logout berhasil'
        ]);
    }
}