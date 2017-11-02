<template>
	<div id="home">
         <div class="panel panel-default">
            <div class="panel-heading">
                 Create a Notebook
            </div>
            <div class="panel-body">
                <form @submit.prevent="create" method="post">
                    <div class="form-group">
                        <label for="title">Title: </label>
                        <input type="text" v-model="notebook.title" name="title" class="form-control">
                    </div>
                     <div class="form-group">
                        <label for="title">Content: </label>
                        <textarea name="body" v-model='notebook.body' cols="10" rows="5" class="form-control"></textarea>
                    </div>
                    <div class="form-group">
                        <input type="submit"  class="btn btn-success pull-right" value="Add Notebook">
                    </div>
                </form>
            </div>
        </div>   
    </div>
</template>
<script>
    export default {
        data() {
            return {
                notebook: {
                    title: '',
                    body: '',
                }
            }
        },
        computed: {
            token() {
                return this.$store.getters.getToken
            },
            user() {
                return this.$store.getters.getUser
            }
        },
        methods:{
            create()  {
                var data = {
                    user_id: this.user.id,
                    notebook: this.notebook
                }
                var user_id = this.user.id;
                var title = this.notebook.title;
                var body = this.notebook.body;

                axios.post('api/notebooks', {user_id, title, body})
                    .then(response => {
                        this.notebook = {};
                        this.$router.push('/');
                        /*this.getUser();*/
                    }).catch(error => {
                        console.log(error.response)
                    })
            }
        }
    }
</script>