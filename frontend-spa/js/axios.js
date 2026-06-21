const api = axios.create({
    baseURL: 'http://localhost/UAS_Web2/backend-api/public/api'
});

api.interceptors.request.use(config => {

    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(

    response => response,

    error => {

        if (error.response?.status === 401) {

            alert('Session habis, silakan login lagi');

            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');

            router.push('/login');
        }

        return Promise.reject(error);
    }
);