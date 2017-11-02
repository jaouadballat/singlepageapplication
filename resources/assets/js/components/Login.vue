<template>
	<div id="login" class="panel panel-primary">
		<div class="panel-heading">
			<h3>Login</h3>
		</div>
		<div class="panel-body">
			<form @submit.prevent="login" method="post">
				<div class="form-group">
					<label for="">Email:</label>
					<input type="email" class="form-control" name="email" v-model="user.email">
				</div>
				<div class="form-group">
					<label for="">Password</label>
					<input type="password" class="form-control" name="password" v-model="user.password">
				</div>
				<div class="form-group">
					<input type="submit" class="btn btn-primary" value="Login">
				</div>
			</form>
			<div class="alert alert-danger" v-if="error">
				{{ error }}
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				user: {
					email: '',
					password: ''
				},
				error: '',
				token:''
			}
		},
		methods: {
			login() {
				axios.post('/api/login', this.user).then(response => {
					this.token = response.data.token;
					if(this.token) {
						axios.get('/api/user/?token='+this.token)
                        .then(response => {
                            this.$store.commit('setUser', response.data.user)
                            localStorage.setItem('user', JSON.stringify(response.data.user))
                        }).catch(error => {
                            console.log(error.response)
                        })

						localStorage.setItem('token', this.token);
						this.$store.commit('setToken', this.token);
						this.$router.push('/')
					}
				}).catch(error => {
					this.error = error.response.data.error
				})
			}
		}
	}
</script>