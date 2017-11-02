<template>
	<div id="register" class="panel panel-primary">
		<div class="panel-heading">
			<h3>Register</h3>
		</div>
		<div class="panel-body">
			<form @submit.prevent="register" method="post">
				<div class="form-group">
					<label for="">Name:</label>
					<input type="text" class="form-control" name="name" v-model="user.name">
					<p v-if='error.name' class="text-danger">{{ error.name[0] }}</p>
				</div>
				<div class="form-group">
					<label for="">Email:</label>
					<input type="text" class="form-control" name="email" v-model="user.email">
					<p v-if='error.email' class="text-danger">{{ error.email[0] }}</p>
				</div>
				<div class="form-group">
					<label for="">Password</label>
					<input type="password" class="form-control" name="password" v-model="user.password">
					<p v-if='error.password' class="text-danger">{{ error.password[0] }}</p>
				</div>
				<div class="form-group">
					<input type="submit" class="btn btn-primary" value="Register">
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
	export default {
		data() {
			return {
				user: {
					name: '',
					email: '',
					password: ''
				},
				error: {
					email: '',
					name: '', 
					password: ''
				}
			}
	},
	methods: {
			register() {
				axios.post('/api/register', this.user).then(response => {
					this.$router.push('/login')
				}).catch(error => {
					console.log(error.response.data)
					this.error = error.response.data
				})
			}
		}
	}
</script>