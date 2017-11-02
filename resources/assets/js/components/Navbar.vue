<template>
<!-- Static navbar -->
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <router-link class="navbar-brand" to="/" tag="a">Notebooks</router-link>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <ul v-if="auth" class="nav navbar-nav">
        <li>
          <router-link to="/" tag="a">Home</router-link>
        </li>
        <li>
          <router-link to="/about" tag="a">About</router-link>
        </li>
        <li>
          <router-link to="/create" tag="a">Create</router-link>
        </li>
      </ul>
      <ul v-if="auth" class="nav navbar-nav navbar-right">
      <li class="dropdown">
        <a class="dropdown-toggle" href="#" data-toggle="dropdown">{{ user.name }}
        <span class="caret"></span></a>

        <ul class="dropdown-menu">
          <li @click="logout"><a href="#">Logout</a></li>
        </ul>
      </li>
      </ul>
      <ul v-if="!auth" class="nav navbar-nav navbar-right">
        <li>
          <router-link to="/login" tag="a">Login</router-link>
        </li>
        <li>
          <router-link to="/register" tag="a">Register</router-link>
        </li>
      </ul>
    </div><!--/.nav-collapse -->
  </div><!--/.container-fluid -->
</nav>
</template>

<script>
  export default {
    computed: {
      auth() {
        return this.$store.getters.getToken
      },
      user() {
        return this.$store.getters.getUser
      }

    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.$store.commit("setToken", '');
        this.$store.commit("setUser", '');
        this.$router.push('/login')
      }
    }
  }
</script>