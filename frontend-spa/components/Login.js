const Login = {

data() {
    return {
        username: '',
        password: ''
    }
},

methods: {

    async login() {

        try {

            const response =
                await api.post('/login', {

                    username: this.username,
                    password: this.password
                });

            localStorage.setItem(
                'token',
                response.data.token
            );

            localStorage.setItem(
                'isLoggedIn',
                'true'
            );

            this.$router.push('/dashboard');

        } catch (error) {

            alert('Username atau Password salah');
        }
    }
},

template: `

<div class="flex justify-center mt-20">

<div class="bg-white p-8 rounded shadow w-96">

<h2 class="text-2xl font-bold mb-5">
Login Admin
</h2>

<input
v-model="username"
placeholder="Username"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<input
type="password"
v-model="password"
placeholder="Password"
class="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

<button
@click="login"
class="bg-blue-500 text-white w-full py-2 rounded">

Login

</button>

</div>
</div>
`
}