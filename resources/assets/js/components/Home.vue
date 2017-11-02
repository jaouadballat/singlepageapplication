<template>
	<div id="home">
        <h2 v-if="loading">Loading...</h2>
         <div v-for="(notebook, index) in notebooks">
            <div class="panel panel-default" v-if="editing === index">
                <div class="panel-heading">
                <a class="btn btn-xs btn-success pull-right" @click="cancel">Cancel</a>
                <form @submit.prevent="update(notebook)" method="post">
                    <input type="submit" value="Update" class="btn btn-xs btn-primary pull-right" >
                     <div class="form-group">
                        <label for="title">Title: </label>
                         <input type="text" class="form-control" v-model="notebook.title">
                     </div>
                </form>
                </div>
                <div class="panel-body">
                    <div class="form-group">
                        <label for="body">Content: </label>
                         <input type="text" class="form-control" v-model="notebook.body">
                     </div>
                </div>
            </div> 
            <div class="panel panel-default" v-if="editing !== index">
                <div class="panel-heading">
                <form v-if="auth.email == notebook.user.email" @submit.prevent="destroy(notebook)" method="delete">
                    <input type="submit" class="btn btn-xs btn-danger pull-right" value="Delete">
                </form>
                <a v-if="auth.email == notebook.user.email" class="btn btn-xs btn-primary pull-right" @click="edit(index)">Edit</a>
                     {{ notebook.title }} by: <strong>{{ notebook.user.name }}</strong>
                </div>
                <div class="panel-body">
                    <p>{{ notebook.body }}</p>
                </div>
            </div>
        </div>   
    </div>
</template>
<script>
import axios from 'axios';

	export default {
        data(){
            return {
                notebooks: [],
                loading: true,
                editing: '',
                
            }
        },
        computed: {
            token() {
                return this.$store.getters.getToken
            },
            auth() {
                return this.$store.getters.getUser
            }
        },
		mounted() {
            this.fetch();
		},
        methods: {
            edit(index) {
                this.editing = index
            },
            cancel() {
                this.editing = ''
            },
            update(notebook) {
                axios.put('/api/notebooks/'+notebook.id, notebook).then(response => {
                    this.editing = ''
                    this.$router.push('/');
                }).catch(error => {
                    console.log(error)
                })
            },
            destroy(notebook) {
                axios.delete('/api/notebooks/'+notebook.id).then(response => {
                    this.fetch();
                    this.$router.push('/');
                }).catch(error => {
                    console.log(error)
                })
            }, 
            fetch() {
                axios.get('api/notebooks', {
                    params: {
                        token: this.token
                    }
                }).then(response => {
                    this.loading = false;
                    this.notebooks = response.data.notebooks;
                }).catch(error => {
                    console.log(error);
                })
            }
        }
	}
</script>
<style scoped>
    h2{
        text-align: center;
    }
    .btn{
        margin-right: 5px;
    }
</style>